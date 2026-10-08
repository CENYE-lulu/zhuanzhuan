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
  const server=new McpServer({name:'zhuanzhuan-spinner',version:'0.2.1'},{
    instructions:'Local-first random deck spinner. The MCP exposes both the deck library and the same machine controls available in the web UI. Use get_machine to inspect installed axes and spin_machine to spin all enabled axes in one call. Use draw only when you intentionally want entries from one deck.'
  });
  const entry=z.union([z.string().min(1).max(200),z.object({label:z.string().min(1).max(200),detail:z.string().optional()}).strict()]);
  const classicRule=z.union([
    z.object({type:z.literal('all-same')}).strict(),
    z.object({type:z.literal('at-least'),n:z.number().int().min(2).max(60)}).strict(),
    z.object({type:z.literal('target'),n:z.number().int().min(2).max(60),target:z.string().min(1).max(200)}).strict()
  ]);
  server.registerTool('list_decks',{
    title:'List decks',description:'List decks, optionally filtered by query or category.',
    inputSchema:z.object({query:z.string().optional(),category:z.string().optional()}).strict(),
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({decks:await store.listDecks(input)})));
  server.registerTool('get_deck',{
    title:'Get deck',description:'Read one deck and its entries.',
    inputSchema:z.object({deckId:z.string().min(1)}).strict(),
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({deck:await store.getDeck(input.deckId)})));
  server.registerTool('create_deck',{
    title:'Create deck',description:'Create a new deck.',
    inputSchema:z.object({name:z.string().min(1).max(100),category:z.string().max(100).optional(),icon:z.string().max(20).optional(),recorder:z.enum(['用户','AI','共同','导入']).optional(),entries:z.array(entry).max(500).optional()}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({deck:await store.createDeck(input)})));
  server.registerTool('update_deck',{
    title:'Update deck',description:'Update deck metadata or replace its entries.',
    inputSchema:z.object({deckId:z.string().min(1),name:z.string().min(1).max(100).optional(),category:z.string().max(100).optional(),icon:z.string().max(20).optional(),recorder:z.enum(['用户','AI','共同','导入']).optional(),entries:z.array(entry).max(500).optional()}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>{const{deckId,...patch}=input;return{deck:await store.updateDeck(deckId,patch)}}));
  server.registerTool('duplicate_deck',{
    title:'Duplicate deck',description:'Copy a deck and all of its entries, like the web UI copy action.',
    inputSchema:z.object({deckId:z.string().min(1),name:z.string().min(1).max(100).optional()}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({deck:await store.duplicateDeck(input.deckId,input.name)})));
  server.registerTool('delete_deck',{
    title:'Delete deck',description:'Delete one local deck.',
    inputSchema:z.object({deckId:z.string().min(1)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:true,openWorldHint:false}
  },safe(async input=>await store.deleteDeck(input.deckId)));
  server.registerTool('draw',{
    title:'Draw from deck',description:'Draw unique entries from a deck and save the result to local history.',
    inputSchema:z.object({deckId:z.string().min(1),count:z.number().int().min(1).max(20).optional().default(1)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>await store.draw(input.deckId,input.count)));
  server.registerTool('get_machine',{
    title:'Get machine',description:'Read the current spinner machine: axes, installed decks, enabled state, per-axis draw counts, and mode.',
    inputSchema:z.object({}).strict(),
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}
  },safe(async()=>({machine:await store.getMachine()})));
  server.registerTool('assign_deck_to_axis',{
    title:'Assign deck to axis',description:'Put a specific deck on a specific axis. Replaces any deck currently on that axis.',
    inputSchema:z.object({axisId:z.string().min(1),deckId:z.string().min(1)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({machine:await store.assignAxis(input)})));
  server.registerTool('install_deck',{
    title:'Install deck',description:'Install a deck into the first empty axis, creating a new axis if needed. Set allowDuplicate to install the same deck more than once.',
    inputSchema:z.object({deckId:z.string().min(1),allowDuplicate:z.boolean().optional().default(false)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>await store.installMachineDeck(input)));
  server.registerTool('eject_axis',{
    title:'Eject axis',description:'Remove the deck from one axis without deleting the deck from the library.',
    inputSchema:z.object({axisId:z.string().min(1)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({machine:await store.assignAxis({axisId:input.axisId,deckId:null})})));
  server.registerTool('eject_deck',{
    title:'Eject deck everywhere',description:'Remove every installation of one deck from the machine without deleting the deck.',
    inputSchema:z.object({deckId:z.string().min(1)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({machine:await store.ejectMachineDeck(input)})));
  server.registerTool('set_axis_enabled',{
    title:'Enable or disable axis',description:'Toggle whether one installed axis participates in a machine spin.',
    inputSchema:z.object({axisId:z.string().min(1),enabled:z.boolean()}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({machine:await store.toggleAxis(input)})));
  server.registerTool('set_axis_draw_count',{
    title:'Set axis draw count',description:'Set how many unique entries this axis draws per combo spin (1-20).',
    inputSchema:z.object({axisId:z.string().min(1),drawCount:z.number().int().min(1).max(20)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({machine:await store.setDrawCount(input)})));
  server.registerTool('add_axis',{
    title:'Add axis',description:'Add one empty axis to the machine.',
    inputSchema:z.object({axisId:z.string().min(1).optional()}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>await store.addMachineAxis(input)));
  server.registerTool('delete_axis',{
    title:'Delete axis',description:'Delete one axis. If a deck is installed, it is ejected first. At least three axes are always kept.',
    inputSchema:z.object({axisId:z.string().min(1)}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:true,openWorldHint:false}
  },safe(async input=>({machine:await store.deleteMachineAxis(input)})));
  server.registerTool('clear_axes',{
    title:'Clear axes',description:'Clear the whole machine back to three empty axes while keeping the deck library and history.',
    inputSchema:z.object({}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:true,openWorldHint:false}
  },safe(async()=>({machine:await store.clearMachine()})));
  server.registerTool('reset_machine',{
    title:'Reset machine',description:'Reset axes and machine mode to defaults while keeping the deck library and history.',
    inputSchema:z.object({}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:true,openWorldHint:false}
  },safe(async()=>({machine:await store.resetMachineState()})));
  server.registerTool('set_mode',{
    title:'Set spinner mode',description:'Switch between combo mode and classic hit mode. Classic mode can use all-same, at-least N, or target rules.',
    inputSchema:z.object({
      mode:z.enum(['combo','classic']),
      rule:classicRule.optional(),
      maxRounds:z.number().int().min(1).max(20).optional()
    }).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({machine:await store.setMachineMode(input)})));
  server.registerTool('random_install',{
    title:'Randomly install decks',description:'Randomly choose and install multiple decks, matching the web UI random-install feature.',
    inputSchema:z.object({
      category:z.string().optional(),
      count:z.number().int().min(1).max(60).optional().default(5),
      mode:z.enum(['fresh','append']).optional().default('fresh'),
      allowRepeat:z.boolean().optional().default(false)
    }).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async input=>await store.randomInstallDecks(input)));
  server.registerTool('spin_machine',{
    title:'Spin machine',description:'Spin ALL currently enabled axes in one call, respecting each axis draw count and the current machine mode. Use this for a normal multi-axis Zhuanzhuan spin.',
    inputSchema:z.object({}).strict(),
    annotations:{readOnlyHint:false,destructiveHint:false,openWorldHint:false}
  },safe(async()=>({spin:await store.spinWholeMachine()})));
  server.registerTool('get_history',{
    title:'Get history',description:'Read recent local draw history.',
    inputSchema:z.object({limit:z.number().int().min(1).max(100).optional().default(20)}).strict(),
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}
  },safe(async input=>({history:await store.history(input.limit)})));
  server.registerTool('export_data',{
    title:'Export local data',description:'Read the full local data object for backup or migration.',
    inputSchema:z.object({}).strict(),
    annotations:{readOnlyHint:true,destructiveHint:false,openWorldHint:false}
  },safe(async()=>await store.exportData()));
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