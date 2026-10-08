import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { randomInt, randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
import {
  defaultMachine,normalizeMachine,machineView,assignDeck,setAxisEnabled,setAxisDrawCount,
  addAxis,deleteAxis,clearAxes,resetMachine,setMode,installDeck,ejectDeckEverywhere,
  randomInstall,spinMachine
} from './machine.js';

const require=createRequire(import.meta.url);
const { FIRST_PARTY_TAPES }=require('../../web/core.js');
const DEFAULT_FILE=path.join(os.homedir(),'.zhuanzhuan','data.json');

function entry(value){
  if(typeof value==='string')return{id:randomUUID(),label:value.trim(),detail:''};
  return{id:String(value?.id||randomUUID()),label:String(value?.label||'').trim(),detail:String(value?.detail||'')};
}
function deck(value){
  const out={
    id:String(value?.id||randomUUID()),
    name:String(value?.name||'').trim(),
    category:String(value?.category||'自定义').trim()||'自定义',
    icon:String(value?.icon||'🎞️').trim()||'🎞️',
    recorder:['用户','AI','共同','导入'].includes(String(value?.recorder||''))?String(value.recorder):'AI',
    source:String(value?.source||'mcp').trim()||'mcp',
    entries:Array.isArray(value?.entries)?value.entries.map(entry):[]
  };
  if(!out.name)throw new Error('卡带名不能为空');
  if(out.entries.some(item=>!item.label))throw new Error('候选内容不能为空');
  return out;
}
function samples(){
  return FIRST_PARTY_TAPES.map(item=>deck({
    id:item.id,name:item.name,category:item.category,icon:item.icon,recorder:'导入',source:'builtin',
    entries:item.entries.map(entry=>({id:entry.id,label:entry.label,detail:entry.detail}))
  }));
}
function initial(){return{version:2,decks:samples(),machine:defaultMachine(),history:[]}}
function normalize(data){
  return{
    version:2,
    decks:Array.isArray(data?.decks)?data.decks.map(deck):[],
    machine:normalizeMachine(data?.machine||defaultMachine()),
    history:Array.isArray(data?.history)?data.history.slice(0,500):[]
  };
}
function atomicWrite(file,data){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const tmp=file+'.tmp-'+process.pid+'-'+Date.now();
  fs.writeFileSync(tmp,JSON.stringify(normalize(data),null,2),'utf8');
  fs.renameSync(tmp,file);
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
function pushHistory(data,item){
  data.history.unshift(item);data.history=data.history.slice(0,500);
}

export function createStore(file=process.env.ZHUANZHUAN_DATA||DEFAULT_FILE){
  function read(){
    if(!fs.existsSync(file)){const data=initial();atomicWrite(file,data);return data}
    return normalize(JSON.parse(fs.readFileSync(file,'utf8')));
  }
  function write(data){atomicWrite(file,data);return normalize(data)}
  function listDecks({query='',category=''}={}){
    const q=String(query).trim().toLocaleLowerCase();
    return read().decks.filter(item=>(!category||item.category===category)&&(!q||(`${item.name} ${item.category}`).toLocaleLowerCase().includes(q)));
  }
  function getDeck(deckId){
    const found=read().decks.find(item=>item.id===deckId);
    if(!found)throw new Error('找不到卡带');
    return found;
  }
  function createDeck(input){
    const data=read(),created=deck(input);
    data.decks.unshift(created);write(data);return created;
  }
  function updateDeck(deckId,patch){
    const data=read(),index=data.decks.findIndex(item=>item.id===deckId);
    if(index<0)throw new Error('找不到卡带');
    data.decks[index]=deck({...data.decks[index],...patch,id:deckId});
    write(data);return data.decks[index];
  }
  function duplicateDeck(deckId,name){
    const data=read(),found=data.decks.find(item=>item.id===deckId);
    if(!found)throw new Error('找不到卡带');
    const created=deck({
      ...found,id:randomUUID(),name:String(name||`${found.name}（副本）`).trim(),
      recorder:'AI',source:'mcp',
      entries:found.entries.map(item=>({id:randomUUID(),label:item.label,detail:item.detail}))
    });
    data.decks.unshift(created);write(data);return created;
  }
  function deleteDeck(deckId){
    const data=read(),found=data.decks.find(item=>item.id===deckId);
    if(!found)throw new Error('找不到卡带');
    data.machine=ejectDeckEverywhere(data.machine,data.decks,{deckId});
    data.decks=data.decks.filter(item=>item.id!==deckId);write(data);
    return{deleted:deckId,name:found.name};
  }
  function draw(deckId,count=1){
    const data=read(),found=data.decks.find(item=>item.id===deckId);
    if(!found)throw new Error('找不到卡带');
    const result={id:randomUUID(),at:new Date().toISOString(),type:'deck',deckId:found.id,deckName:found.name,entries:drawUnique(found.entries,count)};
    pushHistory(data,result);write(data);return result;
  }

  function getMachine(){const data=read();return machineView(data.machine,data.decks)}
  function saveMachine(mutator){
    const data=read(),result=mutator(data);
    write(data);return result;
  }
  function assignAxis(input){return saveMachine(data=>{data.machine=assignDeck(data.machine,data.decks,input);return machineView(data.machine,data.decks)})}
  function toggleAxis(input){return saveMachine(data=>{data.machine=setAxisEnabled(data.machine,data.decks,input);return machineView(data.machine,data.decks)})}
  function setDrawCount(input){return saveMachine(data=>{data.machine=setAxisDrawCount(data.machine,input);return machineView(data.machine,data.decks)})}
  function addMachineAxis(input={}){
    return saveMachine(data=>{const result=addAxis(data.machine,input);data.machine=result.machine;return{axisId:result.axisId,machine:machineView(data.machine,data.decks)}})
  }
  function deleteMachineAxis(input){return saveMachine(data=>{
    const slot=data.machine.slots.find(item=>item.id===input.axisId);
    if(!slot)throw new Error('找不到轴位');
    if(slot.tapeRef||slot.localTape)data.machine=assignDeck(data.machine,data.decks,{axisId:input.axisId,deckId:null});
    data.machine=deleteAxis(data.machine,input);
    return machineView(data.machine,data.decks);
  })}
  function installMachineDeck(input){
    return saveMachine(data=>{const result=installDeck(data.machine,data.decks,input);data.machine=result.machine;return{axisId:result.axisId,machine:machineView(data.machine,data.decks)}})
  }
  function ejectMachineDeck(input){return saveMachine(data=>{data.machine=ejectDeckEverywhere(data.machine,data.decks,input);return machineView(data.machine,data.decks)})}
  function clearMachine(){return saveMachine(data=>{data.machine=clearAxes(data.machine);return machineView(data.machine,data.decks)})}
  function resetMachineState(){return saveMachine(data=>{data.machine=resetMachine();return machineView(data.machine,data.decks)})}
  function setMachineMode(input){return saveMachine(data=>{data.machine=setMode(data.machine,input);return machineView(data.machine,data.decks)})}
  function randomInstallDecks(input){
    return saveMachine(data=>{
      const result=randomInstall(data.machine,data.decks,input);data.machine=result.machine;
      return{installed:result.installed,machine:machineView(data.machine,data.decks)};
    })
  }
  function spinWholeMachine(){
    return saveMachine(data=>{
      const result=spinMachine(data.machine,data.decks);
      const historyItem={...result,type:'machine'};
      pushHistory(data,historyItem);
      return result;
    })
  }

  function history(limit=20){return read().history.slice(0,Math.max(1,Math.min(100,Number(limit)||20)))}
  function exportData(){return read()}
  return{
    file,read,listDecks,getDeck,createDeck,updateDeck,duplicateDeck,deleteDeck,draw,history,exportData,
    getMachine,assignAxis,toggleAxis,setDrawCount,addMachineAxis,deleteMachineAxis,
    installMachineDeck,ejectMachineDeck,clearMachine,resetMachineState,setMachineMode,
    randomInstallDecks,spinWholeMachine
  };
}
