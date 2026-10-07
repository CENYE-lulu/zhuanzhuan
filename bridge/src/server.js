import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { timingSafeEqual } from 'node:crypto';
import { openBridgeDatabase } from './db.js';

const HOST=process.env.ZHUANZHUAN_BRIDGE_HOST||'127.0.0.1';
const PORT=Number(process.env.ZHUANZHUAN_BRIDGE_PORT||8788);
const DATA=process.env.ZHUANZHUAN_BRIDGE_DATA||path.join(os.homedir(),'.zhuanzhuan','bridge.sqlite');
const SECRET=process.env.ZHUANZHUAN_BRIDGE_TOKEN||'';
const ORIGINS=(process.env.ZHUANZHUAN_ALLOWED_ORIGINS||'').split(',').map(x=>x.trim()).filter(Boolean);
const ROUTE='/api/shared-config/zhuanzhuan-spinner';

if(!['127.0.0.1','localhost','::1'].includes(HOST)&&!SECRET){
  throw new Error('公网监听必须设置 ZHUANZHUAN_BRIDGE_TOKEN');
}

const store=openBridgeDatabase(DATA);

function applyCors(req,res){
  const origin=String(req.headers.origin||'');
  if(origin&&ORIGINS.includes(origin)){
    res.setHeader('access-control-allow-origin',origin);
    res.setHeader('vary','Origin');
    res.setHeader('access-control-allow-headers','authorization,content-type');
    res.setHeader('access-control-allow-methods','GET,POST,OPTIONS');
  }
}
function send(req,res,status,value){
  applyCors(req,res);
  const body=JSON.stringify(value);
  res.writeHead(status,{
    'content-type':'application/json; charset=utf-8',
    'cache-control':'no-store',
    'content-length':Buffer.byteLength(body)
  });
  res.end(body);
}
function allowed(req){
  if(!SECRET)return true;
  const match=/^Bearer\s+(.+)$/i.exec(String(req.headers.authorization||''));
  if(!match)return false;
  const left=Buffer.from(match[1]),right=Buffer.from(SECRET);
  return left.length===right.length&&timingSafeEqual(left,right);
}
async function readBody(req){
  let size=0;const parts=[];
  for await(const part of req){
    const chunk=Buffer.from(part);size+=chunk.length;
    if(size>512*1024){
      const error=new Error('请求超过 512 KiB');error.status=413;error.code='ACTION_TOO_LARGE';throw error;
    }
    parts.push(chunk);
  }
  try{return JSON.parse(Buffer.concat(parts).toString('utf8')||'{}')}
  catch{
    const error=new Error('JSON 格式错误');error.status=400;error.code='BAD_JSON';throw error;
  }
}
function snapshot(current){
  return{ok:true,gameId:'zhuanzhuan-spinner',version:current.version,updatedAt:current.updatedAt,config:current.config,isDefault:current.version===0};
}

const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);
    if(req.method==='OPTIONS'){applyCors(req,res);res.writeHead(204);res.end();return}
    if(url.pathname==='/health'){send(req,res,200,{ok:true,service:'zhuanzhuan-bridge'});return}
    if(url.pathname!==ROUTE&&url.pathname!==ROUTE+'/actions'){
      send(req,res,404,{ok:false,error:{code:'NOT_FOUND',message:'not found'}});return;
    }
    if(!allowed(req)){send(req,res,401,{ok:false,error:{code:'UNAUTHORIZED',message:'bridge token required'}});return}
    if(url.pathname===ROUTE&&req.method==='GET'){send(req,res,200,snapshot(store.read()));return}
    if(url.pathname===ROUTE+'/actions'&&req.method==='POST'){
      const input=await readBody(req);
      if(typeof input.actionId!=='string'||!input.actionId){
        const error=new Error('actionId required');error.status=400;error.code='BAD_ACTION_ID';throw error;
      }
      if(!Number.isInteger(input.expectedVersion)||input.expectedVersion<0){
        const error=new Error('expectedVersion must be nonnegative integer');error.status=400;error.code='BAD_VERSION';throw error;
      }
      if(typeof input.operation!=='string'||!input.operation){
        const error=new Error('operation required');error.status=400;error.code='BAD_OPERATION';throw error;
      }
      if(!input.payload||typeof input.payload!=='object'||Array.isArray(input.payload)){
        const error=new Error('payload must be object');error.status=400;error.code='BAD_PAYLOAD';throw error;
      }
      try{send(req,res,200,{...store.execute(input),gameId:'zhuanzhuan-spinner'});}
      catch(error){
        if(error.status===409&&error.code==='VERSION_CONFLICT'){
          send(req,res,409,{ok:false,error:{code:error.code,message:error.message},current:snapshot(error.current)});return;
        }
        throw error;
      }
      return;
    }
    send(req,res,405,{ok:false,error:{code:'METHOD_NOT_ALLOWED',message:'method not allowed'}});
  }catch(error){
    send(req,res,error.status||400,{ok:false,error:{code:error.code||'BAD_REQUEST',message:error.message||'bad request'}});
  }
});

server.listen(PORT,HOST,()=>{
  console.log(`Zhuanzhuan bridge: http://${HOST}:${PORT}`);
  console.log(`SQLite: ${DATA}`);
});
for(const signal of ['SIGINT','SIGTERM']){
  process.on(signal,()=>server.close(()=>{store.close();process.exit(0)}));
}
