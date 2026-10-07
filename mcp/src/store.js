import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { randomInt, randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';

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
    entries:Array.isArray(value?.entries)?value.entries.map(entry):[]
  };
  if(!out.name)throw new Error('卡带名不能为空');
  if(out.entries.some(item=>!item.label))throw new Error('候选内容不能为空');
  return out;
}
function samples(){
  return FIRST_PARTY_TAPES.map(item=>deck({
    id:item.id,name:item.name,category:item.category,icon:item.icon,
    entries:item.entries.map(entry=>({id:entry.id,label:entry.label,detail:entry.detail}))
  }));
}
function initial(){return{version:1,decks:samples(),history:[]}}
function normalize(data){
  return{
    version:1,
    decks:Array.isArray(data?.decks)?data.decks.map(deck):[],
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
  function deleteDeck(deckId){
    const data=read(),found=data.decks.find(item=>item.id===deckId);
    if(!found)throw new Error('找不到卡带');
    data.decks=data.decks.filter(item=>item.id!==deckId);write(data);
    return{deleted:deckId,name:found.name};
  }
  function draw(deckId,count=1){
    const data=read(),found=data.decks.find(item=>item.id===deckId);
    if(!found)throw new Error('找不到卡带');
    const result={id:randomUUID(),at:new Date().toISOString(),deckId:found.id,deckName:found.name,entries:drawUnique(found.entries,count)};
    data.history.unshift(result);data.history=data.history.slice(0,500);write(data);
    return result;
  }
  function history(limit=20){return read().history.slice(0,Math.max(1,Math.min(100,Number(limit)||20)))}
  function exportData(){return read()}
  return{file,read,listDecks,getDeck,createDeck,updateDeck,deleteDeck,draw,history,exportData};
}