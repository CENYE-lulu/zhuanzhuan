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
