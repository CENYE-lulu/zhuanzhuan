import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initialConfig, normalizeConfig, applyAction } from './state.js';

function stable(value){
  if(Array.isArray(value))return '['+value.map(stable).join(',')+']';
  if(value&&typeof value==='object')return '{'+Object.keys(value).sort().map(key=>JSON.stringify(key)+':'+stable(value[key])).join(',')+'}';
  return JSON.stringify(value);
}
export function openBridgeDatabase(file){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const db=new DatabaseSync(file);
  db.exec(`PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS sync_state(
      id INTEGER PRIMARY KEY CHECK(id=1),
      version INTEGER NOT NULL,
      config_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sync_actions(
      action_id TEXT PRIMARY KEY,
      request_json TEXT NOT NULL,
      response_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );`);
  const row=db.prepare('SELECT id FROM sync_state WHERE id=1').get();
  if(!row){
    const now=new Date().toISOString();
    db.prepare('INSERT INTO sync_state(id,version,config_json,updated_at) VALUES(1,0,?,?)')
      .run(JSON.stringify(initialConfig()),now);
  }
  const readStmt=db.prepare('SELECT version,config_json,updated_at FROM sync_state WHERE id=1');
  const actionStmt=db.prepare('SELECT request_json,response_json FROM sync_actions WHERE action_id=?');
  const saveStmt=db.prepare('UPDATE sync_state SET version=?,config_json=?,updated_at=? WHERE id=1');
  const insertAction=db.prepare('INSERT INTO sync_actions(action_id,request_json,response_json,created_at) VALUES(?,?,?,?)');

  function read(){
    const value=readStmt.get();
    return{version:Number(value.version),config:normalizeConfig(JSON.parse(value.config_json)),updatedAt:value.updated_at};
  }
  function execute(input){
    const request={expectedVersion:input.expectedVersion,operation:input.operation,payload:input.payload};
    db.exec('BEGIN IMMEDIATE');
    try{
      const prior=actionStmt.get(input.actionId);
      if(prior){
        if(prior.request_json!==stable(request)){
          const error=new Error('actionId 已用于其他内容');error.code='ACTION_ID_CONFLICT';error.status=409;throw error;
        }
        const response=JSON.parse(prior.response_json);db.exec('COMMIT');return{...response,replayed:true};
      }
      const current=read();
      if(current.version!==input.expectedVersion){
        const error=new Error('同步版本已变化');error.code='VERSION_CONFLICT';error.status=409;error.current=current;throw error;
      }
      const next=applyAction(current.config,input.operation,input.payload);
      const version=current.version+1,updatedAt=new Date().toISOString();
      saveStmt.run(version,JSON.stringify(next),updatedAt);
      const response={ok:true,version,updatedAt,config:next,replayed:false};
      insertAction.run(input.actionId,stable(request),JSON.stringify(response),updatedAt);
      db.exec('COMMIT');return response;
    }catch(error){try{db.exec('ROLLBACK')}catch{};throw error}
  }
  return{db,read,execute,close:()=>db.close()};
}
