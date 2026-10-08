import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { randomInt, randomUUID } from 'node:crypto';
import {
  normalizeMachine,machineView,assignDeck,setAxisEnabled,setAxisDrawCount,addAxis,deleteAxis,
  clearAxes,resetMachine,setMode,installDeck,ejectDeckEverywhere,randomInstall,spinMachine
} from './machine.js';

function entry(value){
  if(typeof value==='string')return{id:randomUUID(),label:value.trim(),detail:''};
  return{id:String(value?.id||randomUUID()),label:String(value?.label||'').trim(),detail:String(value?.detail||'')};
}
function deck(value){
  const out={
    id:String(value?.id||`reel-${randomUUID()}`),
    name:String(value?.name||'').trim(),
    category:String(value?.category||'自定义').trim()||'自定义',
    icon:String(value?.icon||'🎞️').trim()||'🎞️',
    recorder:String(value?.recorder||'AI'),
    source:String(value?.source||'shared'),
    entries:Array.isArray(value?.entries)?value.entries.map(entry):[]
  };
  if(!out.name)throw new Error('卡带名不能为空');
  if(out.entries.some(item=>!item.label))throw new Error('候选内容不能为空');
  return out;
}
function drawUnique(items,count){
  const n=Number(count);
  if(!Number.isInteger(n)||n<1||n>20)throw new Error('抽取数必须在 1～20');
  if(items.length<n)throw new Error('候选数量不足');
  const pool=items.slice(),out=[];
  for(let i=0;i<n;i++){
    const j=i+randomInt(pool.length-i);
    [pool[i],pool[j]]=[pool[j],pool[i]];
    out.push(pool[i]);
  }
  return out;
}
function defaultHistoryFile(){
  return process.env.ZHUANZHUAN_HISTORY||path.join(os.homedir(),'.zhuanzhuan','mcp-history.json');
}
function readHistory(file){
  try{const value=JSON.parse(fs.readFileSync(file,'utf8'));return Array.isArray(value)?value:[]}catch{return[]}
}
function writeHistory(file,items){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const tmp=file+'.tmp-'+process.pid+'-'+Date.now();
  fs.writeFileSync(tmp,JSON.stringify(items.slice(0,500),null,2),'utf8');
  fs.renameSync(tmp,file);
}

export function createBridgeStore({
  baseUrl=process.env.ZHUANZHUAN_BRIDGE_URL,
  token=process.env.ZHUANZHUAN_BRIDGE_TOKEN||'',
  historyFile=defaultHistoryFile()
}={}){
  if(!baseUrl)throw new Error('ZHUANZHUAN_BRIDGE_URL is required');
  const root=String(baseUrl).replace(/\/+$/,'');
  const endpoint=root+'/api/shared-config/zhuanzhuan-spinner';
  const headers=extra=>({...token?{authorization:'Bearer '+token}:{},...extra});

  async function request(url,options={}){
    const response=await fetch(url,{...options,headers:headers(options.headers||{})});
    const body=await response.json().catch(()=>({}));
    if(!response.ok||!body.ok)throw new Error(body?.error?.message||('HTTP '+response.status));
    return body;
  }
  async function snapshot(){return request(endpoint)}
  async function act(operation,payloadOrFactory){
    const actionId=randomUUID();
    let current=await snapshot();
    for(let attempt=0;attempt<2;attempt++){
      const payload=typeof payloadOrFactory==='function'?payloadOrFactory(current):payloadOrFactory;
      const response=await fetch(endpoint+'/actions',{
        method:'POST',
        headers:headers({'content-type':'application/json'}),
        body:JSON.stringify({actionId,expectedVersion:current.version,operation,payload})
      });
      const body=await response.json().catch(()=>({}));
      if(response.ok&&body.ok)return body;
      if(response.status===409&&body.current){current=body.current;continue}
      throw new Error(body?.error?.message||('HTTP '+response.status));
    }
    throw new Error('同步冲突，请重试');
  }
  async function listDecks({query='',category=''}={}){
    const decks=(await snapshot()).config.roomReels||[],q=String(query).trim().toLocaleLowerCase();
    return decks.filter(item=>(!category||item.category===category)&&(!q||(`${item.name} ${item.category}`).toLocaleLowerCase().includes(q)));
  }
  async function getDeck(deckId){
    const found=(await listDecks()).find(item=>item.id===deckId);
    if(!found)throw new Error('找不到卡带');
    return found;
  }
  async function createDeck(input){
    const created=deck(input);
    await act('assign_reel',{reel:created});
    return created;
  }
  async function updateDeck(deckId,patch){
    const current=await getDeck(deckId);
    const next=deck({...current,...patch,id:deckId});
    await act('assign_reel',{reel:next});
    return next;
  }
  async function deleteDeck(deckId){
    const current=await getDeck(deckId);
    await act('delete_reel',{reelId:deckId});
    return{deleted:deckId,name:current.name};
  }
  async function draw(deckId,count=1){
    const current=await getDeck(deckId);
    const result={id:randomUUID(),at:new Date().toISOString(),deckId:current.id,deckName:current.name,entries:drawUnique(current.entries,count)};
    const history=readHistory(historyFile);history.unshift(result);writeHistory(historyFile,history);
    return result;
  }
  function stateMachine(config){
    return normalizeMachine({
      layoutVersion:config.layoutVersion,
      slots:config.slots,
      mode:config.mode,
      classic:config.classic
    });
  }
  async function getMachine(){
    const current=await snapshot();
    return machineView(stateMachine(current.config),current.config.roomReels||[]);
  }
  async function replaceMachine(transform){
    let extra={};
    const body=await act('replace_machine',current=>{
      const decks=current.config.roomReels||[];
      const transformed=transform(stateMachine(current.config),decks)||{};
      extra=transformed.extra||{};
      return{machine:transformed.machine||transformed};
    });
    return{...extra,machine:machineView(stateMachine(body.config),body.config.roomReels||[])};
  }
  async function assignAxis(input){
    const result=await replaceMachine((machine,decks)=>assignDeck(machine,decks,input));
    return result.machine;
  }
  async function toggleAxis(input){
    const result=await replaceMachine((machine,decks)=>setAxisEnabled(machine,decks,input));
    return result.machine;
  }
  async function setDrawCount(input){
    const result=await replaceMachine(machine=>setAxisDrawCount(machine,input));
    return result.machine;
  }
  async function addMachineAxis(input={}){
    return replaceMachine(machine=>{
      const result=addAxis(machine,input);
      return{machine:result.machine,extra:{axisId:result.axisId}};
    });
  }
  async function deleteMachineAxis(input){
    const result=await replaceMachine((machine,decks)=>{
      let next=machine;
      const slot=next.slots.find(item=>item.id===input.axisId);
      if(!slot)throw new Error('找不到轴位');
      if(slot.tapeRef||slot.localTape)next=assignDeck(next,decks,{axisId:input.axisId,deckId:null});
      return deleteAxis(next,input);
    });
    return result.machine;
  }
  async function installMachineDeck(input){
    return replaceMachine((machine,decks)=>{
      const result=installDeck(machine,decks,input);
      return{machine:result.machine,extra:{axisId:result.axisId}};
    });
  }
  async function ejectMachineDeck(input){
    const result=await replaceMachine((machine,decks)=>ejectDeckEverywhere(machine,decks,input));
    return result.machine;
  }
  async function clearMachine(){
    const result=await replaceMachine(machine=>clearAxes(machine));return result.machine;
  }
  async function resetMachineState(){
    const result=await replaceMachine(()=>resetMachine());return result.machine;
  }
  async function setMachineMode(input){
    const result=await replaceMachine(machine=>setMode(machine,input));return result.machine;
  }
  async function randomInstallDecks(input){
    return replaceMachine((machine,decks)=>{
      const result=randomInstall(machine,decks,input);
      return{machine:result.machine,extra:{installed:result.installed}};
    });
  }
  async function spinWholeMachine(){
    const current=await snapshot();
    const result=spinMachine(stateMachine(current.config),current.config.roomReels||[]);
    const history=readHistory(historyFile);history.unshift({...result,type:'machine'});writeHistory(historyFile,history);
    return result;
  }

  async function history(limit=20){return readHistory(historyFile).slice(0,Math.max(1,Math.min(100,Number(limit)||20)))}
  async function exportData(){
    const current=await snapshot();
    return{version:2,decks:current.config.roomReels||[],machine:stateMachine(current.config),history:readHistory(historyFile)};
  }

  return{
    file:`bridge:${root}`,listDecks,getDeck,createDeck,updateDeck,deleteDeck,draw,history,exportData,
    getMachine,assignAxis,toggleAxis,setDrawCount,addMachineAxis,deleteMachineAxis,
    installMachineDeck,ejectMachineDeck,clearMachine,resetMachineState,setMachineMode,
    randomInstallDecks,spinWholeMachine
  };
}
