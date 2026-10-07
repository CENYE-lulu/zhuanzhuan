import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createStore } from '../src/store.js';

test('store persists decks and history',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'zhuanzhuan-'));
  const file=path.join(dir,'data.json');
  const store=createStore(file);
  const created=store.createDeck({name:'测试卡带',entries:['甲','乙','丙']});
  assert.equal(createStore(file).getDeck(created.id).name,'测试卡带');
  const drawn=store.draw(created.id,2);
  assert.equal(drawn.entries.length,2);
  assert.equal(createStore(file).history(10).length,1);
  fs.rmSync(dir,{recursive:true,force:true});
});