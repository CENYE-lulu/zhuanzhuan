import test from 'node:test';
import assert from 'node:assert/strict';
import { initialConfig, applyAction } from '../src/state.js';

test('bridge reducer updates shared reels and axes',()=>{
  let state=initialConfig();
  assert.equal(state.roomReels.length,12);
  const reel={id:'test-deck',name:'测试',category:'测试',icon:'🎲',recorder:'用户',source:'shared',entries:[{id:'e1',label:'甲',detail:''}]};
  state=applyAction(state,'assign_reel',{reel});
  assert.equal(state.roomReels.some(x=>x.id==='test-deck'),true);
  state=applyAction(state,'set_axis_reel',{axisId:state.slots[0].id,reelId:'test-deck'});
  assert.equal(state.slots[0].tapeRef,'test-deck');
});


test('bridge can replace machine state atomically for MCP parity',()=>{
  let state=initialConfig();
  const machine={
    layoutVersion:state.layoutVersion,
    slots:[
      {id:'slot-1',enabled:true,tapeRef:'world-era',localTape:null,drawCount:1},
      {id:'slot-2',enabled:true,tapeRef:'macro-region',localTape:null,drawCount:1},
      {id:'slot-3',enabled:true,tapeRef:'specific-scene',localTape:null,drawCount:1},
      {id:'axis-4',enabled:true,tapeRef:'identity-pairs',localTape:null,drawCount:1},
      {id:'axis-5',enabled:true,tapeRef:'character-relations',localTape:null,drawCount:1}
    ],
    mode:'combo',
    classic:{rule:{type:'all-same'},maxRounds:5}
  };
  state=applyAction(state,'replace_machine',{machine});
  assert.equal(state.slots.length,5);
  assert.equal(state.slots.filter(slot=>slot.enabled).length,5);
});
