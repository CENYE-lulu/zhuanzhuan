import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createStore } from '../src/store.js';

function tempStore(){
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'zhuanzhuan-'));
  const file=path.join(dir,'data.json');
  return{dir,file,store:createStore(file)};
}

test('store persists decks and history',()=>{
  const {dir,file,store}=tempStore();
  try{
    const created=store.createDeck({name:'测试卡带',entries:['甲','乙','丙']});
    assert.equal(createStore(file).getDeck(created.id).name,'测试卡带');
    const drawn=store.draw(created.id,2);
    assert.equal(drawn.entries.length,2);
    assert.equal(createStore(file).history(10).length,1);
  }finally{fs.rmSync(dir,{recursive:true,force:true})}
});

test('spin_machine spins five installed axes in one operation',()=>{
  const {dir,file,store}=tempStore();
  try{
    for(const deckId of ['world-era','macro-region','specific-scene','identity-pairs','character-relations']){
      store.installMachineDeck({deckId});
    }
    const machine=store.getMachine();
    assert.equal(machine.slots.length,5);
    assert.equal(machine.slots.filter(slot=>slot.enabled).length,5);

    const spin=store.spinWholeMachine();
    assert.equal(spin.mode,'combo');
    assert.equal(spin.values.length,5);
    assert.deepEqual(
      spin.values.map(value=>value.tapeId),
      ['world-era','macro-region','specific-scene','identity-pairs','character-relations']
    );
    assert.equal(createStore(file).history(10)[0].type,'machine');
  }finally{fs.rmSync(dir,{recursive:true,force:true})}
});

test('machine respects per-axis draw count and random install',()=>{
  const {dir,store}=tempStore();
  try{
    const installed=store.randomInstallDecks({category:'剧情创作',count:5,mode:'fresh',allowRepeat:false});
    assert.equal(installed.installed.length,5);
    assert.equal(installed.machine.slots.length,5);

    const first=installed.machine.slots[0];
    store.setDrawCount({axisId:first.id,drawCount:2});
    const spin=store.spinWholeMachine();
    const firstResult=spin.values.find(value=>value.slotId===first.id);
    assert.equal(firstResult.entries.length,2);
  }finally{fs.rmSync(dir,{recursive:true,force:true})}
});

test('old v1 local data migrates to machine-capable v2 without losing decks',()=>{
  const {dir,file}=tempStore();
  try{
    const legacy={version:1,decks:[{id:'legacy',name:'旧卡带',category:'测试',icon:'🎲',entries:[{id:'e1',label:'甲',detail:''}]}],history:[]};
    fs.writeFileSync(file,JSON.stringify(legacy),'utf8');
    const store=createStore(file);
    assert.equal(store.getDeck('legacy').name,'旧卡带');
    assert.equal(store.getMachine().slots.length,3);
  }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
