(function(root){
  'use strict';

  const SETTINGS_KEY='zhuanzhuan:sync:settings:v1';
  const MAX_OUTBOX_ITEMS=100;
  const MAX_OUTBOX_BYTES=1024*1024;

  function canonical(value){
    if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
    if(value&&typeof value==='object')return '{'+Object.keys(value).sort().map(key=>JSON.stringify(key)+':'+canonical(value[key])).join(',')+'}';
    return JSON.stringify(value);
  }
  function hashText(value){
    let hash=0x811c9dc5;
    for(let i=0;i<value.length;i++){hash^=value.charCodeAt(i);hash=Math.imul(hash,0x01000193)>>>0}
    return hash.toString(36).padStart(7,'0');
  }
  function stableImportId(originalId,item){
    const base=String(originalId||'item').replace(/[^a-zA-Z0-9_-]/g,'-').slice(0,72)||'item';
    return `${base}-local-${hashText(canonical(item))}`;
  }
  function mergeNamedItems(serverItems,localItems,{idKey='id',nameKey='name'}={}){
    const merged=(Array.isArray(serverItems)?serverItems:[]).map(item=>structuredClone(item));
    const byId=new Map(merged.map(item=>[String(item[idKey]),item]));
    for(const source of Array.isArray(localItems)?localItems:[]){
      const item=structuredClone(source),id=String(item[idKey]??'');
      const existing=byId.get(id);
      if(!existing){merged.push(item);byId.set(id,item);continue}
      if(canonical(existing)===canonical(item))continue;
      const base=stableImportId(id,item);let next=base,suffix=2;
      item[nameKey]=`${String(item[nameKey]||'未命名')}（本地导入）`;
      while(byId.has(next))next=`${base}-${suffix++}`;
      item[idKey]=next;merged.push(item);byId.set(next,item);
    }
    return merged;
  }
  function byteLength(value){return new TextEncoder().encode(value).byteLength}
  function readSettings(){
    try{
      const value=JSON.parse(localStorage.getItem(SETTINGS_KEY)||'null');
      if(!value||typeof value!=='object')return null;
      const baseUrl=String(value.baseUrl||'').trim().replace(/\/+$/,'');
      if(!/^https?:\/\//i.test(baseUrl))return null;
      return{baseUrl,token:String(value.token||'')};
    }catch{return null}
  }
  function writeSettings(value){
    const baseUrl=String(value?.baseUrl||'').trim().replace(/\/+$/,'');
    if(!/^https?:\/\//i.test(baseUrl))throw new Error('同步服务器地址必须以 http:// 或 https:// 开头');
    localStorage.setItem(SETTINGS_KEY,JSON.stringify({baseUrl,token:String(value?.token||'')}));
  }
  function clearSettings(){localStorage.removeItem(SETTINGS_KEY)}
  function isConfigured(){return Boolean(readSettings())}

  function create({gameId,onConfig=()=>{},onStatus=()=>{},applyOptimistic=null}){
    if(!gameId)throw new Error('gameId required');
    const settings=readSettings();
    if(!settings)throw new Error('sync bridge is not configured');
    const endpoint=`${settings.baseUrl}/api/shared-config/${encodeURIComponent(gameId)}`;
    const prefix=`zhuanzhuan:sync:${gameId}`;
    const keys={cache:`${prefix}:cache:v1`,outbox:`${prefix}:outbox:v1`,migration:`${prefix}:migration:v1`};
    let version=0,updatedAt=null,config=null,isDefault=true,status='loading',flushing=null;

    function emit(next,detail){status=next;onStatus(next,detail)}
    function authHeaders(extra={}){
      return{...(settings.token?{authorization:`Bearer ${settings.token}`}:{}),...extra};
    }
    function load(key,fallback){
      try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}
    }
    let outbox=load(keys.outbox,[]);
    const cached=load(keys.cache,null);
    if(cached&&Number.isInteger(cached.version)&&cached.config){
      version=cached.version;updatedAt=cached.updatedAt||null;config=structuredClone(cached.config);isDefault=cached.isDefault===true;
      notify();
    }
    function saveCache(){localStorage.setItem(keys.cache,JSON.stringify({version,updatedAt,config,isDefault}))}
    function saveOutbox(next){
      if(next.length>MAX_OUTBOX_ITEMS)throw new Error(`离线同步队列最多 ${MAX_OUTBOX_ITEMS} 项`);
      const raw=JSON.stringify(next);
      if(byteLength(raw)>MAX_OUTBOX_BYTES)throw new Error('离线同步队列最多 1 MiB');
      localStorage.setItem(keys.outbox,raw);outbox=next;
    }
    function accept(body,{notifyNow=true}={}){
      version=body.version;updatedAt=body.updatedAt||null;config=structuredClone(body.config);isDefault=body.isDefault===true;
      saveCache();if(notifyNow)notify();
    }
    function notify(){
      if(config===null)return;
      let visible=structuredClone(config);
      if(typeof applyOptimistic==='function')for(const item of outbox)visible=applyOptimistic(visible,structuredClone(item));
      onConfig(structuredClone(visible));
    }
    async function readServer(){
      emit('loading');
      const response=await fetch(endpoint,{headers:authHeaders()});
      const body=await response.json().catch(()=>({}));
      if(!response.ok||!body.ok)throw new Error(body?.error?.message||'读取同步设置失败');
      accept(body);return body;
    }
    async function runFlush(){
      while(outbox.length){
        const item=outbox[0];
        let response,body;
        try{
          response=await fetch(endpoint+'/actions',{
            method:'POST',
            headers:authHeaders({'content-type':'application/json'}),
            body:JSON.stringify({actionId:item.actionId,expectedVersion:version,operation:item.operation,payload:item.payload})
          });
          body=await response.json();
        }catch(error){emit('offline');throw Object.assign(new Error('设置已保留，等待同步'),{queued:true,cause:error})}
        if(response.status===409&&body.current){
          accept(body.current,{notifyNow:false});
          if((item.retries||0)>=1){notify();emit('conflict');throw Object.assign(new Error('同步冲突，已保留本地修改'),{queued:true,conflict:true})}
          item.retries=(item.retries||0)+1;saveOutbox([...outbox]);notify();continue;
        }
        if(!response.ok||!body.ok){
          emit('offline');throw Object.assign(new Error(body?.error?.message||'同步服务器拒绝了修改'),{queued:true,status:response.status});
        }
        accept(body,{notifyNow:false});saveOutbox(outbox.slice(1));notify();emit('saved');
      }
      return snapshot();
    }
    function flush(){
      if(flushing)return flushing;
      flushing=runFlush().finally(()=>{flushing=null});
      return flushing;
    }
    async function act(operation,payload={}){
      const item={actionId:crypto.randomUUID(),operation,payload:structuredClone(payload),retries:0};
      saveOutbox([...outbox,item]);emit('queued');notify();return flush();
    }
    async function start({migrate}={}){
      try{await readServer()}catch(error){emit('offline');if(config===null)throw error}
      if(outbox.length)await flush();
      if(typeof migrate==='function'&&!localStorage.getItem(keys.migration)){
        await migrate({config:structuredClone(config),isDefault,act,helpers:{stableImportId,mergeNamedItems}});
        if(outbox.length)await flush();
        localStorage.setItem(keys.migration,JSON.stringify({version:1,completedAt:new Date().toISOString()}));
      }
      if(!outbox.length)emit('saved');
      return snapshot();
    }
    function draft(){return snapshot()}
    function snapshot(){return{gameId,version,updatedAt,config:structuredClone(config),isDefault,status,outbox:structuredClone(outbox)}}
    if(typeof root.addEventListener==='function'){
      root.addEventListener('online',()=>{if(outbox.length)void flush().catch(()=>{})});
      root.addEventListener('focus',()=>{if(outbox.length)void flush().catch(()=>{})});
    }
    return Object.freeze({start,act,draft,flush,snapshot});
  }

  root.ZhuanzhuanSync=Object.freeze({SETTINGS_KEY,readSettings,writeSettings,clearSettings,isConfigured});
  root.SharedGameConfig=Object.freeze({create,isConfigured,helpers:Object.freeze({stableImportId,mergeNamedItems})});
})(typeof globalThis!=='undefined'?globalThis:this);
