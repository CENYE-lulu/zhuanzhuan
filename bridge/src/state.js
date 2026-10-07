import { createRequire } from 'node:module';
import { randomUUID } from 'node:crypto';

const require=createRequire(import.meta.url);
const core=require('../../web/core.js');
const MAX_CONFIG_BYTES=1024*1024;

function copyTape(tape){
  return core.validateTape({
    ...tape,
    recorder:core.normalizeRecorder(tape?.recorder),
    source:core.normalizeTapeSource(tape?.source),
    entries:Array.isArray(tape?.entries)?tape.entries.map(entry=>({
      id:entry.id,label:entry.label,detail:core.entryDetail(entry)
    })):[]
  });
}
function assertSize(config){
  if(Buffer.byteLength(JSON.stringify(config),'utf8')>MAX_CONFIG_BYTES)throw new Error('同步配置超过 1 MiB');
  return config;
}
function newAxisId(value){return String(value||'').trim()||`axis-${randomUUID()}`;}
function findSlot(config,id){
  const slot=config.slots.find(item=>item.id===id);
  if(!slot)throw new Error('找不到轴位');
  return slot;
}
function findTape(config,id){
  const tape=config.roomReels.find(item=>item.id===id);
  if(!tape)throw new Error('找不到卡带');
  return tape;
}
export function initialConfig(){
  return {
    libraryVersion:2,
    layoutVersion:core.SPINNER_LAYOUT_VERSION,
    roomReels:core.FIRST_PARTY_TAPES.map(tape=>copyTape({...tape,recorder:'导入',source:'builtin'})),
    slots:core.makeSlots(),
    mode:'combo',
    classic:{rule:{type:'all-same'},maxRounds:5}
  };
}
export function normalizeConfig(input={}){
  const roomReels=Array.isArray(input.roomReels)?input.roomReels.map(copyTape):initialConfig().roomReels;
  const known=new Set(roomReels.map(tape=>tape.id));
  let slots=Array.isArray(input.slots)?input.slots.map(core.copySlotData):core.makeSlots();
  if(input.layoutVersion!==core.SPINNER_LAYOUT_VERSION)slots=core.migrateSpinnerSlots(slots,()=>newAxisId());
  slots=slots.map(slot=>slot.tapeRef&&!known.has(slot.tapeRef)?{...slot,enabled:false,tapeRef:null,localTape:null}:slot);
  return assertSize({
    libraryVersion:2,layoutVersion:core.SPINNER_LAYOUT_VERSION,roomReels,slots,
    mode:input.mode==='classic'?'classic':'combo',
    classic:input.classic&&typeof input.classic==='object'?structuredClone(input.classic):{rule:{type:'all-same'},maxRounds:5}
  });
}
export function applyAction(current,operation,payload={}){
  let config=normalizeConfig(current);
  if(!payload||typeof payload!=='object'||Array.isArray(payload))throw new Error('payload 必须是对象');
  switch(operation){
    case 'assign_reel': {
      const reel=copyTape(payload.reel);
      config={...config,roomReels:[...config.roomReels.filter(item=>item.id!==reel.id),reel]};
      break;
    }
    case 'delete_reel': {
      findTape(config,payload.reelId);
      config={...config,
        roomReels:config.roomReels.filter(item=>item.id!==payload.reelId),
        slots:config.slots.map(slot=>slot.tapeRef===payload.reelId?{...slot,enabled:false,tapeRef:null,localTape:null}:slot)
      };
      break;
    }
    case 'set_axis_reel': {
      findSlot(config,payload.axisId);
      if(payload.reelId==null)config={...config,slots:core.ejectSlot(config.slots,payload.axisId)};
      else {findTape(config,payload.reelId);config={...config,slots:core.loadTapeIntoSlot(config.slots,payload.axisId,payload.reelId)};}
      break;
    }
    case 'set_axis_enabled': {
      const slot=findSlot(config,payload.axisId);
      if(payload.enabled===true&&core.isEmptySlot(slot))throw new Error('空轴不能启用');
      config={...config,slots:core.toggleSlot(config.slots,payload.axisId,payload.enabled===true)};
      break;
    }
    case 'set_axis_draw_count': {
      findSlot(config,payload.axisId);
      config={...config,slots:core.updateSlot(config.slots,payload.axisId,slot=>({...slot,drawCount:core.normalizeDrawCount(payload.drawCount)}))};
      break;
    }
    case 'set_mode': {
      const mode=payload.mode==='classic'?'classic':'combo';
      config={...config,mode,classic:{rule:structuredClone(payload.rule||{type:'all-same'}),maxRounds:Math.max(1,Math.min(20,Number(payload.maxRounds)||5))}};
      break;
    }
    case 'add_axis':
      config={...config,slots:core.addAxis(config.slots,newAxisId(payload.axisId))};
      break;
    case 'delete_axis':
      findSlot(config,payload.axisId);config={...config,slots:core.deleteAxis(config.slots,payload.axisId)};break;
    case 'install_reel': {
      findTape(config,payload.reelId);
      const installed=core.installTape(config.slots,payload.reelId,{allowDuplicate:payload.allowDuplicate===true,newAxisId:payload.newAxisId?newAxisId(payload.newAxisId):undefined});
      config={...config,slots:installed.slots};break;
    }
    case 'eject_reel_all':
      findTape(config,payload.reelId);config={...config,slots:core.ejectTapeEverywhere(config.slots,payload.reelId)};break;
    case 'clear_axes': {
      const ids=Array.isArray(payload.axisIds)&&payload.axisIds.length===core.MIN_AXIS_COUNT?payload.axisIds.map(newAxisId):Array.from({length:core.MIN_AXIS_COUNT},()=>newAxisId());
      config={...config,slots:core.clearAxes(ids)};break;
    }
    case 'reset_machine':
      config={...config,slots:core.makeSlots(),mode:'combo',classic:{rule:{type:'all-same'},maxRounds:5}};break;
    default: throw new Error(`不支持的同步操作：${operation}`);
  }
  return normalizeConfig(config);
}
