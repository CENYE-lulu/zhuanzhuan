import { randomInt, randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';

const require=createRequire(import.meta.url);
const core=require('../../web/core.js');

export function defaultMachine(){
  return {
    layoutVersion:core.SPINNER_LAYOUT_VERSION,
    slots:core.makeSlots(),
    mode:'combo',
    classic:{rule:{type:'all-same'},maxRounds:5}
  };
}

export function normalizeMachine(machine={}){
  let slots=Array.isArray(machine?.slots)?machine.slots.map(core.copySlotData):core.makeSlots();
  if(machine?.layoutVersion!==core.SPINNER_LAYOUT_VERSION){
    slots=core.migrateSpinnerSlots(slots,()=>`axis-${randomUUID()}`);
  }
  return{
    layoutVersion:core.SPINNER_LAYOUT_VERSION,
    slots,
    mode:machine?.mode==='classic'?'classic':'combo',
    classic:machine?.classic&&typeof machine.classic==='object'
      ? structuredClone(machine.classic)
      : {rule:{type:'all-same'},maxRounds:5}
  };
}

function deckMap(decks){return new Map((decks||[]).map(deck=>[deck.id,deck]))}
function requireDeck(decks,id){
  const found=(decks||[]).find(deck=>deck.id===id);
  if(!found)throw new Error('找不到卡带');
  return found;
}
function requireSlot(machine,id){
  const found=machine.slots.find(slot=>slot.id===id);
  if(!found)throw new Error('找不到轴位');
  return found;
}
function axisId(){return `axis-${randomUUID()}`}

export function machineView(machine,decks){
  const state=normalizeMachine(machine),map=deckMap(decks);
  return{
    layoutVersion:state.layoutVersion,
    mode:state.mode,
    classic:structuredClone(state.classic),
    slots:state.slots.map((slot,index)=>{
      const tape=core.getTapeForSlot(slot,map);
      return{
        ordinal:index+1,
        id:slot.id,
        enabled:Boolean(slot.enabled),
        drawCount:core.normalizeDrawCount(slot.drawCount),
        deckId:tape?.id||null,
        deckName:tape?.name||null,
        empty:!tape
      };
    })
  };
}

export function assignDeck(machine,decks,{axisId:slotId,deckId}){
  const state=normalizeMachine(machine);requireSlot(state,slotId);
  if(deckId==null)return{...state,slots:core.ejectSlot(state.slots,slotId)};
  requireDeck(decks,deckId);
  return{...state,slots:core.loadTapeIntoSlot(state.slots,slotId,deckId)};
}
export function setAxisEnabled(machine,decks,{axisId:slotId,enabled}){
  const state=normalizeMachine(machine),slot=requireSlot(state,slotId);
  if(enabled===true&&!core.getTapeForSlot(slot,deckMap(decks)))throw new Error('空轴不能启用');
  return{...state,slots:core.toggleSlot(state.slots,slotId,enabled===true)};
}
export function setAxisDrawCount(machine,{axisId:slotId,drawCount}){
  const state=normalizeMachine(machine);requireSlot(state,slotId);
  return{...state,slots:core.updateSlot(state.slots,slotId,slot=>({...slot,drawCount:core.normalizeDrawCount(drawCount)}))};
}
export function addAxis(machine,{axisId:requested}={}){
  const state=normalizeMachine(machine),id=String(requested||'').trim()||axisId();
  return{machine:{...state,slots:core.addAxis(state.slots,id)},axisId:id};
}
export function deleteAxis(machine,{axisId:slotId}){
  const state=normalizeMachine(machine);requireSlot(state,slotId);
  return{...state,slots:core.deleteAxis(state.slots,slotId)};
}
export function clearAxes(machine){
  const ids=Array.from({length:core.MIN_AXIS_COUNT},()=>axisId());
  return{...normalizeMachine(machine),slots:core.clearAxes(ids)};
}
export function resetMachine(){
  return defaultMachine();
}
export function setMode(machine,{mode,rule,maxRounds}){
  const state=normalizeMachine(machine),nextMode=mode==='classic'?'classic':'combo';
  const nextRule=structuredClone(rule||{type:'all-same'});
  const rounds=Math.max(1,Math.min(20,Number(maxRounds)||5));
  if(nextMode==='classic'){
    const active=state.slots.filter(slot=>slot.enabled);
    core.validateClassicConfig(active,nextRule,rounds);
  }
  return{...state,mode:nextMode,classic:{rule:nextRule,maxRounds:rounds}};
}
export function installDeck(machine,decks,{deckId,allowDuplicate=false}){
  requireDeck(decks,deckId);
  const state=normalizeMachine(machine);
  const needsNew=!state.slots.some(core.isEmptySlot);
  const installed=core.installTape(state.slots,deckId,{
    allowDuplicate:allowDuplicate===true,
    ...(needsNew?{newAxisId:axisId()}:{})
  });
  return{machine:{...state,slots:installed.slots},axisId:installed.axisId};
}
export function ejectDeckEverywhere(machine,decks,{deckId}){
  requireDeck(decks,deckId);
  const state=normalizeMachine(machine);
  return{...state,slots:core.ejectTapeEverywhere(state.slots,deckId)};
}

function shuffle(values){
  const out=values.slice();
  for(let i=out.length-1;i>0;i--){const j=randomInt(i+1);[out[i],out[j]]=[out[j],out[i]]}
  return out;
}
export function randomInstall(machine,decks,{category='',count=5,mode='fresh',allowRepeat=false}={}){
  let state=normalizeMachine(machine);
  const wanted=Math.max(1,Math.min(core.MAX_AXIS_COUNT,Number(count)||1));
  let pool=(decks||[]).filter(deck=>!category||deck.category===category);
  if(mode==='append'&&!allowRepeat){
    const installed=new Set(state.slots.map(slot=>slot.tapeRef).filter(Boolean));
    pool=pool.filter(deck=>!installed.has(deck.id));
  }
  if(!pool.length)throw new Error('没有符合条件的卡带');

  const chosen=[];
  if(allowRepeat){
    for(let i=0;i<wanted;i++)chosen.push(pool[randomInt(pool.length)]);
  }else chosen.push(...shuffle(pool).slice(0,wanted));
  if(!chosen.length)throw new Error('没有可安装的卡带');

  if(mode==='fresh')state=clearAxes(state);
  else if(mode!=='append')throw new Error('mode 必须是 fresh 或 append');

  const installed=[];
  for(const deck of chosen){
    if(state.slots.length>=core.MAX_AXIS_COUNT&&!state.slots.some(core.isEmptySlot))break;
    const result=installDeck(state,decks,{deckId:deck.id,allowDuplicate:true});
    state=result.machine;installed.push({axisId:result.axisId,deckId:deck.id,deckName:deck.name});
  }
  return{machine:state,installed};
}

export function spinMachine(machine,decks){
  const state=normalizeMachine(machine),map=deckMap(decks);
  const active=state.slots.filter(slot=>slot.enabled);
  if(!active.length)throw new Error('至少启用 1 个轴');

  if(state.mode==='classic'){
    core.validateClassicConfig(active,state.classic.rule,state.classic.maxRounds);
    const rounds=[];
    let hit=null;
    for(let i=0;i<state.classic.maxRounds;i++){
      const values=core.prepareSpin(state.slots,map,randomInt,'classic');
      const evaluated=core.evaluateHit(values.map(value=>value.entry),state.classic.rule);
      rounds.push({index:i+1,values,hit:evaluated});
      if(evaluated.hit){hit=evaluated;break}
    }
    return{
      id:randomUUID(),at:new Date().toISOString(),mode:'classic',
      rounds,hit,values:rounds.at(-1)?.values||[]
    };
  }

  const values=core.prepareSpin(state.slots,map,randomInt,'combo');
  return{id:randomUUID(),at:new Date().toISOString(),mode:'combo',rounds:[{index:1,values}],hit:null,values};
}
