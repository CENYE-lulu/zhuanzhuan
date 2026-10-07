import http from 'node:http';
import { McpServer, createMcpHandler } from '@modelcontextprotocol/server';
import { toNodeHandler } from '@modelcontextprotocol/node';
import { z } from 'zod';
import { createStore } from './store.js';
import { createBridgeStore } from './bridge-store.js';

function result(value,isError=false){
  const structured=value&&typeof value==='object'?value:{value};
  return{content:[{type:'text',text:JSON.stringify(structured,null,2)}],structuredContent:structured,...(isError?{isError:true}:{})};
}
function safe(fn){return async input=>{try{return result(await fn(input||{}))}catch(error){return result({ok:false,error:error?.message||'操作失败'},true)}}}

export function createZhuanzhuanMcp(store){
  const server=new McpServer({name:'zhuanzhuan-spinner',version:'0.1.0'},{
    instructions:'Local-first random deck spinner. It can use either a local JSON file or an optional self-hosted Zhuanzhuan bridge. Use list_decks before draw when the deck id is unknown.'
  });
  const entry=z.union([z.string().min(1).max(200),z.object({label:z.string().min(1).max(200),detail:z.string().optional()}).strict()]);
  server.registerTool('list_decks',{
    title:'List decks',description:'List decks, optionally filtered by query or category.',
    inputSchema:z.object({query:z.string().optional(),category:z.string().optional()}).strict(),
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}
  },safe(input=>({decks:store.listDecks(input)})));
  server.registerTool('get_deck',{
    title:'Get deck',description:'Read one deck and its entries.',
    inputSchema:z.object({deckId:z.string().min(1)}).strict(),
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}
  },safe(input=>({deck:store.getDeck(input.deckId)})));
  server.registerTool('create_deck',{
    title:'Create deck',description:'Create a new deck.',
    inputSchema:z.object({name:z.string().min(1).max(100),category:z.string().max(100).optional(),icon:z.string().max(20).optional(),entries:z.array(entry).max(500).optional()}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(input=>({deck:store.createDeck(input)})));
  server.registerTool('update_deck',{
    title:'Update deck',description:'Update deck metadata or replace its entries.',
    inputSchema:z.object({deckId:z.string().min(1),name:z.string().min(1).max(100).optional(),category:z.string().max(100).optional(),icon:z.string().max(20).optional(),entries:z.array(entry).max(500).optional()}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(input=>{const{deckId,...patch}=input;return{deck:store.updateDeck(deckId,patch)}}));
  server.registerTool('delete_deck',{
    title:'Delete deck',description:'Delete one local deck.',
    inputSchema:z.object({deckId:z.string().min(1)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:true,openWorldHint:false}
  },safe(input=>store.deleteDeck(input.deckId)));
  server.registerTool('draw',{
    title:'Draw from deck',description:'Draw unique entries from a deck and save the result to local history.',
    inputSchema:z.object({deckId:z.string().min(1),count:z.number().int().min(1).max(20).optional().default(1)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(input=>store.draw(input.deckId,input.count)));
  server.registerTool('get_history',{
    title:'Get history',description:'Read recent local draw history.',
    inputSchema:z.object({limit:z.number().int().min(1).max(100).optional().default(20)}).strict(),
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}
  },safe(input=>({history:store.history(input.limit)})));
  server.registerTool('export_data',{
    title:'Export local data',description:'Read the full local data object for backup or migration.',
    inputSchema:z.object({}).strict(),
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}
  },safe(()=>store.exportData()));
  return server;
}
async function body(req){
  if(req.method!=='POST')return undefined;
  const chunks=[];let size=0;
  for await(const part of req){const b=Buffer.from(part);size+=b.length;if(size>1024*1024)throw new Error('request too large');chunks.push(b)}
  if(!chunks.length)return undefined;
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
export function start(){
  const host=process.env.ZHUANZHUAN_HOST||'127.0.0.1';
  const port=Number(process.env.ZHUANZHUAN_PORT||8787);
  const store=process.env.ZHUANZHUAN_BRIDGE_URL?createBridgeStore():createStore();
  const handler=createMcpHandler(()=>createZhuanzhuanMcp(store));
  const nodeHandler=toNodeHandler(handler);
  const server=http.createServer(async(req,res)=>{
    try{
      const url=new URL(req.url||'/',`http://${req.headers.host||'localhost'}`);
      if(url.pathname==='/health'){res.writeHead(200,{'content-type':'application/json; charset=utf-8'});res.end(JSON.stringify({ok:true,dataFile:store.file}));return}
      if(url.pathname!=='/mcp'){res.writeHead(404,{'content-type':'application/json; charset=utf-8'});res.end(JSON.stringify({error:'not found'}));return}
      await nodeHandler(req,res,await body(req));
    }catch(error){
      if(!res.headersSent)res.writeHead(400,{'content-type':'application/json; charset=utf-8'});
      if(!res.writableEnded)res.end(JSON.stringify({error:error?.message||'bad request'}));
    }
  });
  server.listen(port,host,()=>{console.log(`zhuanzhuan MCP: http://${host}:${port}/mcp`);console.log(`data source: ${store.file}`)});
  return{server,handler,store};
}
if(import.meta.url===`file://${process.argv[1]}`)start();