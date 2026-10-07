function copySpinnerTape(tape){
  return {
    ...tape,
    recorder:normalizeRecorder(tape&&tape.recorder),
    source:normalizeTapeSource(tape&&tape.source),
    entries:(tape&&Array.isArray(tape.entries)?tape.entries:[]).map(entry=>({
      id:entry.id,label:entry.label,detail:entryDetail(entry)
    }))
  };
}
function spinnerSeededReels(){
  return FIRST_PARTY_TAPES.map(reel=>copySpinnerTape({...reel,recorder:'导入',source:'builtin'}));
}
function upgradeSpinnerConfig(config={}){
  const room=Array.isArray(config.roomReels)?config.roomReels.map(copySpinnerTape):[];
  if(config.libraryVersion===2)return {...structuredClone(config),roomReels:room};
  const merged=[...spinnerSeededReels().filter(reel=>!room.some(item=>item.id===reel.id)),...room];
  return {...structuredClone(config),libraryVersion:2,roomReels:merged};
}
function applySpinnerOptimistic(config,item){
  const next=upgradeSpinnerConfig(config),payload=item.payload||{};
  if(item.operation==='assign_reel')return{...next,roomReels:[...(next.roomReels||[]).filter(reel=>reel.id!==payload.reel.id),copySpinnerTape(payload.reel)]};
  if(item.operation==='delete_reel')return{...next,roomReels:(next.roomReels||[]).filter(reel=>reel.id!==payload.reelId),slots:(next.slots||[]).map(slot=>slot.tapeRef===payload.reelId?{...slot,enabled:false,tapeRef:null,localTape:null}:slot)};
  if(item.operation==='set_axis_reel')return{...next,slots:(next.slots||[]).map(slot=>slot.id===payload.axisId?{...slot,enabled:payload.reelId!==null,tapeRef:payload.reelId,localTape:null}:slot)};
  if(item.operation==='set_axis_enabled')return{...next,slots:(next.slots||[]).map(slot=>slot.id===payload.axisId?{...slot,enabled:payload.enabled===true}:slot)};
  if(item.operation==='set_axis_draw_count')return{...next,slots:(next.slots||[]).map(slot=>slot.id===payload.axisId?{...slot,drawCount:normalizeDrawCount(payload.drawCount)}:slot)};
  if(item.operation==='set_mode')return{...next,mode:payload.mode,classic:{rule:structuredClone(payload.rule||{type:'all-same'}),maxRounds:payload.maxRounds??5}};
  if(item.operation==='add_axis')return{...next,layoutVersion:SPINNER_LAYOUT_VERSION,slots:addAxis(next.slots||makeSlots(),payload.axisId)};
  if(item.operation==='delete_axis')return{...next,layoutVersion:SPINNER_LAYOUT_VERSION,slots:deleteAxis(next.slots||makeSlots(),payload.axisId)};
  if(item.operation==='install_reel')return{...next,layoutVersion:SPINNER_LAYOUT_VERSION,slots:installTape(next.slots||makeSlots(),payload.reelId,{allowDuplicate:payload.allowDuplicate===true,newAxisId:payload.newAxisId}).slots};
  if(item.operation==='eject_reel_all')return{...next,layoutVersion:SPINNER_LAYOUT_VERSION,slots:ejectTapeEverywhere(next.slots||makeSlots(),payload.reelId)};
  if(item.operation==='clear_axes')return{...next,layoutVersion:SPINNER_LAYOUT_VERSION,slots:clearAxes(payload.axisIds)};
  if(item.operation==='reset_machine')return{...next,layoutVersion:SPINNER_LAYOUT_VERSION,slots:makeSlots(),mode:'combo',classic:{rule:{type:'all-same'},maxRounds:5}};
  return next;
}
function createSpinnerSharedClient(api,handlers){return api.create({gameId:'zhuanzhuan-spinner',...handlers,applyOptimistic:applySpinnerOptimistic})}
function spinnerEscape(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
function sameSpinnerTape(left,right){
  if(!left||!right||left.id!==right.id||left.name!==right.name||String(left.category||'')!==String(right.category||'')||
    String(left.icon||'')!==String(right.icon||'')||normalizeRecorder(left.recorder)!==normalizeRecorder(right.recorder)||
    normalizeTapeSource(left.source)!==normalizeTapeSource(right.source)||left.entries.length!==right.entries.length)return false;
  return left.entries.every((entry,index)=>{
    const other=right.entries[index];
    return other&&entry.id===other.id&&entry.label===other.label&&entryDetail(entry)===entryDetail(other);
  });
}
function spinnerCategory(tape){return String(tape&&tape.category||'').trim()||'未分类';}
function spinnerCategories(tapes){return ['全部',...new Set((tapes||[]).map(spinnerCategory))]}
function spinnerInstallations(slots,reelId){
  const items=[];(slots||[]).forEach((slot,index)=>{if(slot.tapeRef===reelId)items.push({axisId:slot.id,ordinal:index+1})});
  items.count=items.length;items.ordinals=items.map(item=>item.ordinal);return items;
}
function spinnerShortLabel(value){return String(value||'').split('｜')[0].trim()}
function spinnerStateFromConfig(config={}){
  const upgraded=upgradeSpinnerConfig(config);
  const roomReels=Array.isArray(upgraded.roomReels)?upgraded.roomReels:[];
  const sourceSlots=Array.isArray(upgraded.slots)?upgraded.slots:makeSlots();
  const dynamicSlots=upgraded.layoutVersion===SPINNER_LAYOUT_VERSION
    ? sourceSlots.map(copySlotData)
    : migrateSpinnerSlots(sourceSlots,()=>makeId('axis'));
  return{
    libraryVersion:2,layoutVersion:SPINNER_LAYOUT_VERSION,
    tapes:roomReels.map(copySpinnerTape),slots:dynamicSlots,
    mode:upgraded.mode==='classic'?'classic':'combo',
    classic:upgraded.classic?structuredClone(upgraded.classic):{rule:{type:'all-same'},maxRounds:5}
  };
}
function spinnerHistoryText(results){
  return `转出 ${results.length} 轴 → ${results.map(result=>{
    const entries=Array.isArray(result.entries)?result.entries:(result.entry?[result.entry]:[]);
    return entries.map(entry=>spinnerShortLabel(entry.label)).join(' / ');
  }).join(' · ')}`;
}
function spinnerAxisOrdinals(slots){return new Map((slots||[]).map((slot,index)=>[slot.id,index+1]))}
function filterSpinnerTapes(tapes,{category='全部',query='',recorder='全部',load='全部',slots=[]}={}){
  const needle=String(query||'').trim().toLocaleLowerCase();
  return (tapes||[]).filter(tape=>{
    if(category!=='全部'&&spinnerCategory(tape)!==category)return false;
    if(recorder!=='全部'&&normalizeRecorder(tape.recorder)!==recorder)return false;
    const installs=spinnerInstallations(slots,tape.id).length;
    if(load==='未装'&&installs!==0)return false;
    if(load==='已装'&&installs===0)return false;
    if(load==='重复装载'&&installs<2)return false;
    return !needle||`${tape.name} ${spinnerCategory(tape)}`.toLocaleLowerCase().includes(needle);
  });
}
function spinnerInstallPlan(slots,reelId){
  const installations=spinnerInstallations(slots,reelId),emptyIndex=(slots||[]).findIndex(isEmptySlot);
  const full=emptyIndex<0&&(slots||[]).length>=MAX_AXIS_COUNT;
  return {count:installations.length,ordinals:installations.ordinals,targetOrdinal:emptyIndex>=0?emptyIndex+1:(full?null:(slots||[]).length+1),
    canUseExisting:emptyIndex>=0,canCreateNew:(slots||[]).length<MAX_AXIS_COUNT,needsNewAxis:emptyIndex<0&&!full,full,
    action:full?null:{reelId,allowDuplicate:installations.length>0}};
}
function spinnerSlotsHtml(slots,tapeMap){
  return (slots||[]).map((slot,index)=>{
    const tape=getTapeForSlot(slot,tapeMap);
    return `<article class="slot" aria-label="轴 ${index+1}" data-slot-id="${spinnerEscape(slot.id)}">
      <div class="slot-top"><span class="slot-no">${index+1}</span><span class="slot-controls">
        <button class="axis-delete" data-delete-axis="${spinnerEscape(slot.id)}" type="button">×</button>
        <button class="sw ${slot.enabled?'':'off'}" data-toggle="${spinnerEscape(slot.id)}" type="button"></button>
      </span></div>
      <div class="reel-window ${tape?'':'empty'}">${tape?spinnerEscape(tape.icon||'🎞️'):'＋'}</div>
      <div class="slot-name">${tape?spinnerEscape(tape.name):'空轴'}</div>
      ${tape?`<div class="draw-count-control"><button data-count-step="-1" data-axis="${spinnerEscape(slot.id)}">−</button><input data-draw-count="${spinnerEscape(slot.id)}" value="${normalizeDrawCount(slot.drawCount)}"><button data-count-step="1" data-axis="${spinnerEscape(slot.id)}">＋</button></div>`:''}
    </article>`;
  }).join('');
}
function spinnerResultHtml(results,ordinalById=new Map()){
  return (results||[]).map((result,index)=>{
    const entries=Array.isArray(result.entries)?result.entries:(result.entry?[result.entry]:[]);
    return `<div class="result-row"><div class="result-axis">${spinnerEscape(result.tapeName||`轴 ${ordinalById.get(result.slotId)||index+1}`)}</div><div class="result-divider"></div><div class="result-name">${spinnerEscape(entries.map(entry=>spinnerShortLabel(entry.label)).join('、'))}</div></div>`;
  }).join('');
}
function spinnerReelAction(reel){return{operation:'assign_reel',payload:{reel:copySpinnerTape(reel)}}}
function spinnerDeleteReelAction(reelId){return{operation:'delete_reel',payload:{reelId}}}
function spinnerAssignAction(axisId,reelId){return{operation:'set_axis_reel',payload:{axisId,reelId}}}
function spinnerToggleAction(axisId,enabled){return{operation:'set_axis_enabled',payload:{axisId,enabled:Boolean(enabled)}}}
function spinnerEjectAction(axisId){return spinnerAssignAction(axisId,null)}
function spinnerDrawCountAction(axisId,drawCount){return{operation:'set_axis_draw_count',payload:{axisId,drawCount:normalizeDrawCount(drawCount)}}}
function spinnerDefinedFields(fields){return Object.fromEntries(Object.entries(fields).filter(([,value])=>value!==undefined))}
function spinnerCreateReelAction(name,category,icon,recorder,source){return{operation:'create_reel',payload:spinnerDefinedFields({name,category,icon,recorder,source})}}
function spinnerUpdateReelAction(reelId,patch={}){return{operation:'update_reel',payload:{reelId,...spinnerDefinedFields({name:patch.name,category:patch.category,icon:patch.icon,recorder:patch.recorder,source:patch.source})}}}
function spinnerAddEntryAction(reelId,label,detail){return{operation:'add_reel_entry',payload:{reelId,...spinnerDefinedFields({label,detail})}}}
function spinnerUpdateEntryAction(reelId,entryId,patch={}){return{operation:'update_reel_entry',payload:{reelId,entryId,...spinnerDefinedFields({label:patch.label,detail:patch.detail})}}}
function spinnerDeleteEntryAction(reelId,entryId){return{operation:'delete_reel_entry',payload:{reelId,entryId}}}
function spinnerAddAxisAction(axisId=makeId('axis')){return{operation:'add_axis',payload:{axisId}}}
function spinnerDeleteAxisAction(axisId){return{operation:'delete_axis',payload:{axisId}}}
function spinnerInstallReelAction(reelId,{allowDuplicate=false,newAxisId}={}){return{operation:'install_reel',payload:spinnerDefinedFields({reelId,allowDuplicate:Boolean(allowDuplicate),newAxisId})}}
function spinnerEjectReelAllAction(reelId){return{operation:'eject_reel_all',payload:{reelId}}}
function spinnerClearAxesAction(axisIds=Array.from({length:MIN_AXIS_COUNT},()=>makeId('axis'))){return{operation:'clear_axes',payload:{axisIds:[...axisIds]}}}
function prepareSpinnerMigration({localTapes=[],config={},helpers}){
  const serverReels=Array.isArray(config.roomReels)?config.roomReels:[];
  const localReels=[];
  for(const source of localTapes){
    const builtin=FIRST_PARTY_TAPES.find(item=>item.id===source.id);
    if(builtin&&sameSpinnerTape({...source,recorder:'导入',source:'builtin'},{...builtin,recorder:'导入',source:'builtin'}))continue;
    let reel=copySpinnerTape(source);
    if(builtin)reel={...reel,id:helpers.stableImportId(reel.id,reel),name:`${reel.name}（手机导入）`,source:'legacy-import'};
    localReels.push(reel);
  }
  const merged=helpers.mergeNamedItems(serverReels,localReels);
  const serverJson=new Set(serverReels.map(reel=>JSON.stringify(reel)));
  return{actions:merged.filter(reel=>!serverJson.has(JSON.stringify(reel))).map(reel=>spinnerReelAction(reel))};
}

if(typeof document!=='undefined'){
  const $=id=>document.getElementById(id);
  const el={
    slotGrid:$('slotGrid'),spin:$('spinBtn'),spinNotice:$('spinNotice'),addAxis:$('addAxisBtn'),clearAxes:$('clearAxesBtn'),
    openCabinet:$('openReelCabinet'),cabinetOverlay:$('reelCabinetOverlay'),closeCabinet:$('closeReelCabinet'),cabinetCount:$('reelCabinetCount'),
    search:$('reelSearch'),categoryTabs:$('reelCategoryTabs'),rack:$('tapeRack'),newTape:$('newTapeBtn'),batchDone:$('batchDoneBtn'),
    filterOpen:$('openFilterBtn'),normalBar:$('libraryNormalBar'),batchBar:$('libraryBatchBar'),randomInstall:$('randomInstallBtn'),
    batchMode:$('batchModeBtn'),librarySpin:$('librarySpinBtn'),batchSummary:$('batchSummary'),selectAll:$('selectAllBtn'),invert:$('invertBtn'),batchActions:$('batchActionsBtn'),
    filterOverlay:$('filterOverlay'),recorderFilters:$('recorderFilters'),loadFilters:$('loadFilters'),resetFilter:$('resetFilterBtn'),applyFilter:$('applyFilterBtn'),
    createOverlay:$('createOverlay'),blankCreate:$('blankCreateBtn'),importFile:$('importFileInput'),
    randomOverlay:$('randomInstallOverlay'),randomCategory:$('randomCategory'),randomCounts:$('randomCountChoices'),randomCustom:$('randomCustomCount'),randomAllowRepeat:$('randomAllowRepeat'),randomGo:$('randomGoBtn'),
    installOverlay:$('reelInstallOverlay'),installTitle:$('reelInstallTitle'),installMeta:$('reelInstallMeta'),installBody:$('reelInstallBody'),
    cardMenuOverlay:$('cardMenuOverlay'),cardMenuTitle:$('cardMenuTitle'),
    batchMenuOverlay:$('batchMenuOverlay'),batchMenuCount:$('batchMenuCount'),batchValueOverlay:$('batchValueOverlay'),batchValueTitle:$('batchValueTitle'),batchValueBody:$('batchValueBody'),batchValueApply:$('batchValueApplyBtn'),
    detailOverlay:$('detailOverlay'),detailTitle:$('detailTitle'),detailMeta:$('detailMeta'),detailEntries:$('detailEntries'),
    editorOverlay:$('editorOverlay'),editorTitle:$('editorTitle'),edName:$('edName'),edCategory:$('edCategory'),edIcon:$('edIcon'),edRecorder:$('edRecorder'),candidateList:$('candidateList'),addEntry:$('addEntryBtn'),exportTape:$('exportTapeBtn'),deleteTape:$('deleteTapeBtn'),saveTape:$('saveTapeBtn'),
    entryOverlay:$('entryOverlay'),entryTitle:$('entryTitle'),entryLabel:$('entryLabel'),entryDetail:$('entryDetail'),deleteEntry:$('deleteEntryBtn'),saveEntry:$('saveEntryBtn'),
    resultOverlay:$('spinResultOverlay'),resultMeta:$('spinResultMeta'),resultBody:$('spinResultBody'),resultClose:$('spinResultClose'),spinAgain:$('spinAgainBtn'),saveResult:$('saveResultBtn'),copyResult:$('copyResultBtn'),
    storage:$('storageStatus'),toast:$('toast')
  };

  const MIGRATION_KEY='zhuanzhuan:shared-config:zhuanzhuan-spinner:migration:v1';
  const LIBRARY_KEY='zhuanzhuan:spinner:library:v2';
  const MACHINE_KEY='zhuanzhuan:spinner:machine:v1';
  const loaded=loadCustomTapes();
  const legacyTapes=(loaded.ok?loaded.tapes:[]).map(copySpinnerTape);
  let storageBad=!loaded.ok,legacyWriteEnabled=false;
  try{legacyWriteEnabled=loaded.ok&&!!localStorage.getItem(MIGRATION_KEY)}catch(e){}

  function readLibrarySnapshot(){
    try{
      const raw=localStorage.getItem(LIBRARY_KEY);
      if(!raw)return null;
      const parsed=JSON.parse(raw);
      if(!parsed||parsed.version!==2||!Array.isArray(parsed.tapes))throw new Error('library version');
      return parsed.tapes.map(tape=>copySpinnerTape(validateTape(tape)));
    }catch(error){
      storageBad=true;
      return null;
    }
  }
  function saveLibrarySnapshot(){
    try{
      localStorage.setItem(LIBRARY_KEY,JSON.stringify({version:2,tapes:tapes.map(copySpinnerTape)}));
      return true;
    }catch(error){
      storageBad=true;
      return false;
    }
  }

  const savedLibrary=readLibrarySnapshot();
  let tapes=savedLibrary?savedLibrary:spinnerSeededReels();
  if(!savedLibrary&&loaded.ok){
    const custom=loaded.tapes.filter(t=>!tapes.some(x=>x.id===t.id)).map(t=>copySpinnerTape({...t,source:t.source||'legacy-import'}));
    tapes=[...tapes,...custom];
  }
  function readMachineSnapshot(){
    try{
      const raw=localStorage.getItem(MACHINE_KEY);
      if(!raw)return null;
      const parsed=JSON.parse(raw);
      if(!parsed||parsed.version!==1)throw new Error('machine version');
      const known=new Set(tapes.map(tape=>tape.id));
      const savedSlots=validateSlotList(parsed.slots).map(slot=>{
        if(slot.localTape||!slot.tapeRef||known.has(slot.tapeRef))return slot;
        return {...slot,enabled:false,tapeRef:null,localTape:null};
      });
      return{
        slots:savedSlots,
        mode:parsed.mode==='classic'?'classic':'combo',
        classic:parsed.classic&&typeof parsed.classic==='object'?parsed.classic:{rule:{type:'all-same'},maxRounds:5}
      };
    }catch(error){
      storageBad=true;
      return null;
    }
  }
  const savedMachine=readMachineSnapshot();
  let slots=savedMachine?.slots||makeSlots(),mode=savedMachine?.mode||'combo',classic=savedMachine?.classic||{rule:{type:'all-same'},maxRounds:5};
  function saveMachineSnapshot(){
    try{
      localStorage.setItem(MACHINE_KEY,JSON.stringify({version:1,slots:slots.map(copySlotData),mode,classic}));
      return true;
    }catch(error){
      storageBad=true;
      return false;
    }
  }
  let sharedConfig=null,syncStatus='',syncError='',spinning=false;
  let reelCategory='全部',reelQuery='',filterRecorder='全部',filterLoad='全部',draftRecorder='全部',draftLoad='全部';
  let batchMode=false,selectedTapeIds=new Set();
  let activeInstallReelId=null,menuTapeId=null;
  let editorTapeId=null,editorDraft=null,entryEditIndex=-1;
  let batchValueMode=null;
  let randomCount=5;
  let lastResults=[],expandedResults=new Set();

  const esc=spinnerEscape;
  const tapeMap=()=>new Map(tapes.map(t=>[t.id,t]));
  const findTape=id=>tapes.find(t=>t.id===id)||null;
  function toast(message){
    el.toast.textContent=message;el.toast.classList.add('show');
    clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.toast.classList.remove('show'),1500);
  }
  function persistLegacy(){if(legacyWriteEnabled&&!storageBad){try{saveCustomTapes(tapes)}catch(e){}}}
  function persistLibrary(){saveLibrarySnapshot();saveMachineSnapshot();persistLegacy()}
  function upsertLocalTape(tape){
    const next=copySpinnerTape(tape);
    tapes=[...tapes.filter(item=>item.id!==next.id),next];
    persistLibrary();
  }
  function removeLocalTape(id){
    tapes=tapes.filter(t=>t.id!==id);
    slots=slots.map(slot=>slot.tapeRef===id?{...slot,enabled:false,tapeRef:null,localTape:null}:slot);
    selectedTapeIds.delete(id);persistLibrary();
  }
  function queueShared(action,{retryOnConflict=true}={}){
    saveMachineSnapshot();
    if(!sharedConfig)return Promise.resolve();
    return sharedConfig.act(action.operation,action.payload,{retryOnConflict}).catch(error=>{
      if(error.queued)setSyncStatus('queued');
      else{syncError=error.message;setSyncStatus(error.conflict?'conflict':'invalid-local')}
    });
  }
  function setSyncStatus(status){syncStatus=status;if(status==='saved')syncError='';renderStorage()}
  function applySharedConfig(config){
    const next=spinnerStateFromConfig(config);
    tapes=next.tapes;slots=next.slots;mode=next.mode;classic=next.classic;
    saveLibrarySnapshot();
    selectedTapeIds=new Set([...selectedTapeIds].filter(id=>tapes.some(t=>t.id===id)));
    if(activeInstallReelId&&!findTape(activeInstallReelId))activeInstallReelId=null;
    if(editorTapeId&&!findTape(editorTapeId)){editorTapeId=null;editorDraft=null}
    renderAll();
  }

  function renderStorage(){
    const sync=syncStatus==='queued'||syncStatus==='offline'||syncStatus==='conflict'
      ? '<div class="warning">设置已留在本机，联网后会继续同步。</div>':'';
    const rejected=syncError?`<div class="error-box">共享设置未被接受：${esc(syncError)}</div>`:'';
    if(!storageBad){el.storage.innerHTML=rejected+sync;return}
    el.storage.innerHTML=`<div class="error-box">本地卡带读取失败。原始数据没有被覆盖。 <button id="blankStart" type="button">从空白开始</button></div>${sync}`;
    const button=$('blankStart');
    if(button)button.onclick=()=>{tapes=spinnerSeededReels();storageBad=false;legacyWriteEnabled=true;persistLibrary();renderAll()}
  }

  function slotHtml(slot,index,map){
    const tape=getTapeForSlot(slot,map),off=tape&&!slot.enabled?' off':'';
    return `<article class="slot${off}" data-slot-id="${esc(slot.id)}">
      <div class="slot-top"><span class="slot-no">${index+1}</span><span class="slot-controls">
        <button class="axis-delete" data-delete-axis="${esc(slot.id)}" type="button" aria-label="删除第 ${index+1} 轴">×</button>
        <button class="sw ${slot.enabled?'':'off'}" data-toggle="${esc(slot.id)}" type="button" aria-label="开关第 ${index+1} 轴"></button>
      </span></div>
      <button class="reel-window ${tape?'':'empty'}" data-open-installed="${tape?esc(tape.id):''}" type="button">${tape?esc(tape.icon||'🎞️'):'＋'}</button>
      <div class="slot-name" title="${tape?esc(tape.name):'空轴'}">${tape?esc(tape.name):'空轴'}</div>
      ${tape?`<div class="draw-count-control"><button data-count-step="-1" data-axis="${esc(slot.id)}" type="button">−</button><input data-draw-count="${esc(slot.id)}" type="number" inputmode="numeric" min="1" max="20" value="${normalizeDrawCount(slot.drawCount)}"><button data-count-step="1" data-axis="${esc(slot.id)}" type="button">＋</button></div>`:''}
    </article>`;
  }
  function renderSlots(){
    const map=tapeMap();
    el.slotGrid.style.setProperty('--axis-columns',Math.min(slots.length,5));
    el.slotGrid.innerHTML=slots.map((slot,index)=>slotHtml(slot,index,map)).join('');
    el.addAxis.disabled=slots.length>=MAX_AXIS_COUNT;
    el.addAxis.textContent=slots.length>=MAX_AXIS_COUNT?'已到 60 轴上限':'＋ 添加空轴';
    const shortage=slots.filter(slot=>slot.enabled).map(slot=>({slot,tape:getTapeForSlot(slot,map)}))
      .find(({slot,tape})=>tape&&normalizeDrawCount(slot.drawCount)>tape.entries.length);
    el.spin.disabled=spinning||Boolean(shortage);
    if(shortage)showSpinNotice(`第 ${slots.indexOf(shortage.slot)+1} 轴候选不足`);
    else if(!spinning)showSpinNotice('');
  }
  function showSpinNotice(message){el.spinNotice.textContent=message||'';el.spinNotice.hidden=!message}
  function setDrawCount(slotId,value){
    try{
      const count=normalizeDrawCount(value);
      slots=updateSlot(slots,slotId,slot=>({...slot,drawCount:count}));
      renderSlots();queueShared(spinnerDrawCountAction(slotId,count));
    }catch(error){toast(error.message);renderSlots()}
  }
  function deleteAxisFromMain(axisId){
    if(slots.length<=MIN_AXIS_COUNT){toast(`至少保留 ${MIN_AXIS_COUNT} 个轴`);return}
    const slot=slots.find(item=>item.id===axisId);if(!slot)return;
    if(!isEmptySlot(slot)){
      slots=ejectSlot(slots,axisId);queueShared(spinnerAssignAction(axisId,null));
    }
    try{slots=deleteAxis(slots,axisId);renderAll();queueShared(spinnerDeleteAxisAction(axisId))}
    catch(error){toast(error.message)}
  }

  function visibleTapes(){
    const needle=reelQuery.trim().toLocaleLowerCase();
    return tapes.filter(tape=>{
      if(reelCategory!=='全部'&&spinnerCategory(tape)!==reelCategory)return false;
      if(filterRecorder!=='全部'&&normalizeRecorder(tape.recorder)!==filterRecorder)return false;
      const installs=spinnerInstallations(slots,tape.id).length;
      if(filterLoad==='未装'&&installs!==0)return false;
      if(filterLoad==='已装'&&installs===0)return false;
      if(filterLoad==='重复装载'&&installs<2)return false;
      return !needle||`${tape.name} ${spinnerCategory(tape)}`.toLocaleLowerCase().includes(needle);
    });
  }
  function loadClass(count){return count>=3?' three':count>=2?' many':count===1?' one':''}
  function renderCategories(){
    const categories=spinnerCategories(tapes);
    if(!categories.includes(reelCategory))reelCategory='全部';
    el.categoryTabs.innerHTML=categories.map(category=>`<button class="reel-category-tab" type="button" role="tab" aria-selected="${category===reelCategory}" data-category="${esc(category)}">${esc(category)}</button>`).join('');
  }
  function renderRack(){
    renderCategories();
    const visible=visibleTapes();
    el.cabinetCount.textContent=`${visible.length} / ${tapes.length} 个卡带`;
    el.rack.classList.toggle('batch-mode',batchMode);
    el.newTape.hidden=batchMode;el.batchDone.hidden=!batchMode;
    el.normalBar.hidden=batchMode;el.batchBar.hidden=!batchMode;
    el.batchSummary.textContent=`已选 ${selectedTapeIds.size} 张`;
    el.rack.innerHTML=visible.length?visible.map(tape=>{
      const installed=spinnerInstallations(slots,tape.id).length;
      return `<article class="reel-card ${selectedTapeIds.has(tape.id)?'selected':''}" data-tape-id="${esc(tape.id)}" tabindex="0">
        <span class="select-dot">${selectedTapeIds.has(tape.id)?'✓':''}</span>
        <button class="reel-more" data-more="${esc(tape.id)}" type="button" aria-label="更多">⋯</button>
        <div class="tape-disc" aria-hidden="true">${esc(tape.icon||'🎞️')}</div>
        <strong>${esc(tape.name)}</strong>
        <div class="meta" title="${esc(spinnerCategory(tape))} · ${tape.entries.length} 项">${esc(spinnerCategory(tape))} · ${tape.entries.length} 项</div>
        <button class="load-pill${loadClass(installed)}" data-load="${esc(tape.id)}" type="button">🎞 装载 ${installed}</button>
      </article>`;
    }).join(''):'<p class="reel-cabinet-empty">没有符合条件的卡带。</p>';
  }
  function enterBatchMode(){batchMode=true;selectedTapeIds.clear();renderRack()}
  function exitBatchMode(){batchMode=false;selectedTapeIds.clear();renderRack()}
  function toggleSelected(id){if(!batchMode)return;if(selectedTapeIds.has(id))selectedTapeIds.delete(id);else selectedTapeIds.add(id);renderRack()}

  function renderFilterChoices(){
    el.recorderFilters.innerHTML=['全部','用户','AI','共同','导入'].map(value=>`<button class="choice-chip ${draftRecorder===value?'active':''}" data-recorder-filter="${value}" type="button">${value}</button>`).join('');
    el.loadFilters.innerHTML=['全部','未装','已装','重复装载'].map(value=>`<button class="choice-chip ${draftLoad===value?'active':''}" data-load-filter="${value}" type="button">${value}</button>`).join('');
  }
  function openFilter(){draftRecorder=filterRecorder;draftLoad=filterLoad;renderFilterChoices();el.filterOverlay.hidden=false}

  function openCreate(){el.createOverlay.hidden=false}
  function blankDraft(){
    return {id:makeId('reel'),name:'新卡带',category:'自定义',icon:'🎞️',recorder:'用户',source:'browser',entries:[]};
  }
  function exportPayload(tape){return{version:1,type:'starleaf-spinner-tape',exportedAt:new Date().toISOString(),tape:{
    id:tape.id,name:tape.name,category:tape.category,icon:tape.icon,recorder:normalizeRecorder(tape.recorder),source:normalizeTapeSource(tape.source),
    entries:tape.entries.map(entry=>({id:entry.id,label:entry.label,detail:entryDetail(entry)}))
  }}}
  function downloadJson(name,data){
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name.replace(/[\\/:*?"<>|]/g,'_');document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)
  }
  function downloadTape(tape){downloadJson(`${tape.name}.json`,exportPayload(tape))}
  function normalizeImportedTape(raw,index=0){
    const source=raw&&raw.type==='starleaf-spinner-tape'?raw.tape:(raw&&raw.tape?raw.tape:raw);
    if(!source||typeof source!=='object')throw new Error('JSON 中没有可识别的卡带');
    const id=(source.id&&!findTape(source.id))?String(source.id):makeId('reel');
    const entries=Array.isArray(source.entries)?source.entries.map((entry,i)=>{
      if(typeof entry==='string')return{id:makeId('entry'),label:entry,detail:''};
      if(Array.isArray(entry))return{id:makeId('entry'),label:String(entry[0]||'').trim(),detail:String(entry[1]||'')};
      return{id:String(entry&&entry.id||makeId('entry')),label:String(entry&&(entry.label??entry.title??entry.name)||'').trim(),detail:String(entry&&(entry.detail??entry.note)||'')};
    }).filter(entry=>entry.label):[];
    return validateTape({id,name:String(source.name||`导入卡带 ${index+1}`).trim(),category:String(source.category||'自定义'),icon:String(source.icon||'🎞️'),recorder:normalizeRecorder(source.recorder),source:'import',entries});
  }
  async function importJsonFile(file){
    const data=JSON.parse(await file.text());
    const raws=data&&data.type==='starleaf-spinner-tape-bundle'&&Array.isArray(data.tapes)?data.tapes:[data];
    const imported=raws.map((item,index)=>normalizeImportedTape(item,index));
    for(const tape of imported){upsertLocalTape(tape);queueShared(spinnerReelAction(tape))}
    renderAll();toast(`已导入 ${imported.length} 张卡带`);
  }

  function openInstall(reelId){
    activeInstallReelId=reelId;renderInstall();el.installOverlay.hidden=false;
  }
  function renderInstall(){
    const tape=findTape(activeInstallReelId);if(!tape){el.installOverlay.hidden=true;return}
    const installs=spinnerInstallations(slots,tape.id),empty=slots.find(isEmptySlot);
    el.installTitle.textContent=tape.name;el.installMeta.textContent=`${spinnerCategory(tape)} · ${tape.entries.length} 项`;
    const rows=installs.length?`<div class="install-axis-list">${installs.map(item=>`<div class="install-axis-row"><strong>轴 ${item.ordinal}</strong><button data-eject-axis="${esc(item.axisId)}" type="button">卸载</button></div>`).join('')}</div>`:'';
    el.installBody.innerHTML=`
      <div class="install-summary">🎞 当前装载 ${installs.length} 个轴</div>
      ${rows}
      <div class="install-primary-grid">
        <button data-install-existing="${esc(tape.id)}" type="button" ${empty?'':'disabled'}>＋ 加装到已有空轴</button>
        <button data-install-new="${esc(tape.id)}" type="button" ${slots.length>=MAX_AXIS_COUNT?'disabled':''}>＋ 新建空轴并装入</button>
      </div>
      <div class="install-action-grid">
        <button data-install-action="detail" type="button">查看卡带详情</button>
        <button data-install-action="edit" type="button">编辑卡带</button>
        <button data-install-action="copy" type="button">复制卡带</button>
        <button data-install-action="export" type="button">导出卡带</button>
        <button data-install-action="ejectall" type="button" ${installs.length?'':'disabled'}>全部卸载</button>
        <button data-install-action="delete" class="danger" type="button">删除卡带</button>
      </div>`;
  }
  function installToExisting(reelId){
    const target=slots.find(isEmptySlot);if(!target){toast('没有空轴');return}
    slots=loadTapeIntoSlot(slots,target.id,reelId);renderAll();queueShared(spinnerAssignAction(target.id,reelId));renderInstall()
  }
  function installToNew(reelId){
    if(slots.length>=MAX_AXIS_COUNT){toast('已到 60 轴上限');return}
    const action=spinnerAddAxisAction();slots=addAxis(slots,action.payload.axisId);queueShared(action);
    slots=loadTapeIntoSlot(slots,action.payload.axisId,reelId);queueShared(spinnerAssignAction(action.payload.axisId,reelId));
    renderAll();renderInstall()
  }
  function ejectOne(axisId){
    slots=ejectSlot(slots,axisId);renderAll();queueShared(spinnerAssignAction(axisId,null));renderInstall()
  }
  function ejectAll(reelId){
    slots=ejectTapeEverywhere(slots,reelId);renderAll();queueShared(spinnerEjectReelAllAction(reelId));renderInstall()
  }
  function deleteTapeById(id){
    const tape=findTape(id);if(!tape)return;
    if(!confirm(`删除卡带「${tape.name}」？`))return;
    removeLocalTape(id);queueShared(spinnerDeleteReelAction(id));
    if(activeInstallReelId===id){activeInstallReelId=null;el.installOverlay.hidden=true}
    if(menuTapeId===id){menuTapeId=null;el.cardMenuOverlay.hidden=true}
    if(editorTapeId===id){editorTapeId=null;editorDraft=null;el.editorOverlay.hidden=true}
    renderAll();toast('已删除')
  }
  function copyTapeById(id){
    const tape=findTape(id);if(!tape)return;
    const copy=cloneTape(tape,'reel');copy.name=`${tape.name}（副本）`;copy.source='browser';
    upsertLocalTape(copy);queueShared(spinnerReelAction(copy));renderAll();toast('已复制卡带')
  }

  function openCardMenu(id){menuTapeId=id;const tape=findTape(id);if(!tape)return;el.cardMenuTitle.textContent=tape.name;el.cardMenuOverlay.hidden=false}
  function openDetail(id){
    const tape=findTape(id);if(!tape)return;
    el.detailTitle.textContent=tape.name;el.detailMeta.textContent=`${spinnerCategory(tape)} · ${tape.entries.length} 项 · ${normalizeRecorder(tape.recorder)}`;
    el.detailEntries.innerHTML=tape.entries.length?tape.entries.map(entry=>`<article class="detail-entry"><strong>${esc(entry.label)}</strong>${entryDetail(entry)?`<p>${esc(entryDetail(entry))}</p>`:''}</article>`).join(''):'<p class="reel-cabinet-empty">这张卡带还没有候选。</p>';
    el.detailOverlay.hidden=false
  }

  function openEditor(id,{fresh=false}={}){
    editorTapeId=fresh?null:id;
    editorDraft=fresh?blankDraft():copySpinnerTape(findTape(id));
    if(!editorDraft)return;
    el.editorTitle.textContent=fresh?'新建卡带':'编辑卡带';
    el.edName.value=editorDraft.name;el.edCategory.value=editorDraft.category;el.edIcon.value=editorDraft.icon;el.edRecorder.value=normalizeRecorder(editorDraft.recorder);
    renderCandidates();el.editorOverlay.hidden=false
  }
  function renderCandidates(){
    if(!editorDraft)return;
    el.candidateList.innerHTML=editorDraft.entries.length?editorDraft.entries.map((entry,index)=>`<article class="candidate"><div><strong>${esc(entry.label)}</strong><p>${esc(entryDetail(entry)||'无详情')}</p></div><button class="candidate-more" data-entry-index="${index}" type="button">⋯</button></article>`).join(''):'<p class="reel-cabinet-empty">还没有候选。</p>'
  }
  function syncEditorFields(){
    if(!editorDraft)return;
    editorDraft={...editorDraft,name:el.edName.value.trim()||editorDraft.name,category:el.edCategory.value.trim()||'自定义',icon:el.edIcon.value.trim()||'🎞️',recorder:normalizeRecorder(el.edRecorder.value)}
  }
  function openEntry(index){
    entryEditIndex=index;
    const entry=index<0?{label:'',detail:''}:editorDraft.entries[index];
    el.entryTitle.textContent=index<0?'新增候选':'编辑候选';el.entryLabel.value=entry.label;el.entryDetail.value=entryDetail(entry);el.deleteEntry.hidden=index<0;el.entryOverlay.hidden=false
  }
  function saveEditor(){
    syncEditorFields();
    try{
      const tape=validateTape(editorDraft);upsertLocalTape(tape);queueShared(spinnerReelAction(tape));
      editorTapeId=tape.id;editorDraft=copySpinnerTape(tape);el.editorOverlay.hidden=true;renderAll();toast('已保存')
    }catch(error){toast(error.message)}
  }

  function openBatchMenu(){
    if(!selectedTapeIds.size){toast('先选卡带');return}
    el.batchMenuCount.textContent=`已选 ${selectedTapeIds.size} 张`;el.batchMenuOverlay.hidden=false
  }
  function openBatchValue(modeName){
    batchValueMode=modeName;el.batchValueTitle.textContent=modeName==='category'?'修改分类':'修改录入方';
    el.batchValueBody.innerHTML=modeName==='category'
      ? '<label class="field"><span>分类</span><input id="batchValueInput" maxlength="100"></label>'
      : '<label class="field"><span>录入方</span><select id="batchValueInput"><option>用户</option><option>AI</option><option>共同</option><option>导入</option></select></label>';
    el.batchValueOverlay.hidden=false
  }
  function applyBatchValue(){
    const input=$('batchValueInput');if(!input)return;
    const value=String(input.value||'').trim();if(!value)return;
    for(const id of selectedTapeIds){
      const tape=findTape(id);if(!tape)continue;
      const next=copySpinnerTape({...tape,[batchValueMode]:batchValueMode==='recorder'?normalizeRecorder(value):value});
      upsertLocalTape(next);queueShared(spinnerReelAction(next))
    }
    el.batchValueOverlay.hidden=true;el.batchMenuOverlay.hidden=true;renderAll();toast('已批量修改')
  }
  function batchExport(){
    const chosen=tapes.filter(t=>selectedTapeIds.has(t.id));
    downloadJson('星叶转转机_批量卡带.json',{version:1,type:'starleaf-spinner-tape-bundle',exportedAt:new Date().toISOString(),tapes:chosen.map(t=>exportPayload(t).tape)})
  }
  function batchDelete(){
    if(!confirm(`批量删除已选 ${selectedTapeIds.size} 张卡带？`))return;
    const ids=[...selectedTapeIds];
    for(const id of ids){removeLocalTape(id);queueShared(spinnerDeleteReelAction(id))}
    selectedTapeIds.clear();el.batchMenuOverlay.hidden=true;renderAll();toast('已批量删除')
  }

  function openRandom(){
    const categories=spinnerCategories(tapes);
    el.randomCategory.innerHTML=categories.map(category=>`<option value="${esc(category)}">${esc(category)}</option>`).join('');
    el.randomCategory.value=categories.includes(reelCategory)?reelCategory:'全部';
    randomCount=5;el.randomCustom.hidden=true;el.randomCustom.value='5';el.randomAllowRepeat.checked=false;
    document.querySelector('input[name="randomMode"][value="fresh"]').checked=true;
    el.randomCounts.querySelectorAll('[data-count]').forEach(button=>button.classList.toggle('active',button.dataset.count==='5'));
    el.randomOverlay.hidden=false
  }
  function randomRequestedCount(){return Math.max(1,Math.min(MAX_AXIS_COUNT,Number(el.randomCustom.hidden?randomCount:el.randomCustom.value)||1))}
  function shuffled(array){const out=array.slice();for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
  function executeRandomInstall(){
    const category=el.randomCategory.value||'全部';
    const randomMode=document.querySelector('input[name="randomMode"]:checked')?.value||'fresh';
    const repeat=el.randomAllowRepeat.checked,wanted=randomRequestedCount();
    let pool=tapes.filter(tape=>category==='全部'||spinnerCategory(tape)===category);
    if(randomMode==='append'&&!repeat)pool=pool.filter(tape=>spinnerInstallations(slots,tape.id).length===0);
    if(!pool.length){toast('这个分类没有可装卡带');return}
    const chosen=[];
    if(repeat){for(let i=0;i<wanted;i++)chosen.push(pool[Math.floor(Math.random()*pool.length)])}
    else chosen.push(...shuffled(pool).slice(0,wanted));
    if(!chosen.length)return;
    if(randomMode==='fresh'){
      const baseIds=Array.from({length:MIN_AXIS_COUNT},()=>makeId('axis'));
      slots=clearAxes(baseIds);queueShared(spinnerClearAxesAction(baseIds));
      for(let i=0;i<chosen.length;i++){
        let axisId;
        if(i<MIN_AXIS_COUNT)axisId=slots[i].id;
        else{
          if(slots.length>=MAX_AXIS_COUNT)break;
          const action=spinnerAddAxisAction();slots=addAxis(slots,action.payload.axisId);axisId=action.payload.axisId;queueShared(action)
        }
        slots=loadTapeIntoSlot(slots,axisId,chosen[i].id);queueShared(spinnerAssignAction(axisId,chosen[i].id))
      }
    }else{
      for(const tape of chosen){
        let target=slots.find(isEmptySlot);
        if(!target){
          if(slots.length>=MAX_AXIS_COUNT)break;
          const action=spinnerAddAxisAction();slots=addAxis(slots,action.payload.axisId);target=slots.at(-1);queueShared(action)
        }
        slots=loadTapeIntoSlot(slots,target.id,tape.id);queueShared(spinnerAssignAction(target.id,tape.id))
      }
    }
    el.randomOverlay.hidden=true;el.cabinetOverlay.hidden=true;renderAll();toast(`已随机装入 ${chosen.length} 张卡带`)
  }

  function resultEntries(result){return Array.isArray(result&&result.entries)?result.entries:(result&&result.entry?[result.entry]:[])}
  function resultDetail(result){
    return resultEntries(result).filter(entry=>entryDetail(entry)).map(entry=>`${spinnerShortLabel(entry.label)}：${entryDetail(entry)}`).join('\n')
  }
  function renderSpinResult(){
    el.resultMeta.textContent=`${lastResults.length} 个轴 · 本次组合`;
    el.resultBody.innerHTML=lastResults.map((result,index)=>{
      const labels=resultEntries(result).map(entry=>spinnerShortLabel(entry.label)).join('、');
      const detail=resultDetail(result),open=expandedResults.has(index);
      return `<article class="result-row">
        <div class="result-axis">${esc(result.tapeName)}</div><div class="result-divider"></div>
        <div class="result-name">${esc(labels)}</div>
        ${detail?`<button class="result-info" data-result-info="${index}" type="button">i</button>`:'<span></span>'}
        ${detail&&open?`<div class="result-detail">${esc(detail)}</div>`:''}
      </article>`
    }).join('')
  }
  function resultText(){
    return lastResults.map(result=>`${result.tapeName}：${resultEntries(result).map(entry=>spinnerShortLabel(entry.label)).join('、')}`).join('\n')
  }
  function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
  async function playSpinAnimation(results){
    const map=new Map(results.map(result=>[result.slotId,result]));
    const nodes=[...el.slotGrid.querySelectorAll('.slot')].filter(node=>map.has(node.dataset.slotId));
    for(const node of nodes){node.classList.remove('stopped');node.classList.add('spinning');const windowNode=node.querySelector('.reel-window');if(windowNode){windowNode.classList.remove('empty');windowNode.textContent='✦'}}
    await sleep(300);
    for(const node of nodes){
      const result=map.get(node.dataset.slotId);node.classList.remove('spinning');node.classList.add('stopped');
      const windowNode=node.querySelector('.reel-window');if(windowNode)windowNode.textContent=resultEntries(result).map(entry=>spinnerShortLabel(entry.label)).join(' / ');
      await sleep(70)
    }
  }
  async function spinNow(){
    if(spinning)return;
    try{
      const results=prepareSpin(slots,tapeMap(),randInt,mode);
      if(!results.length)throw new Error('先启用至少 1 个轴');
      spinning=true;el.spin.disabled=true;
      if(el.cabinetOverlay&&!el.cabinetOverlay.hidden)el.cabinetOverlay.hidden=true;
      await playSpinAnimation(results);
      lastResults=results;expandedResults.clear();globalThis.PlayHistory?.record(spinnerHistoryText(results));renderSpinResult();el.resultOverlay.hidden=false
    }catch(error){showSpinNotice(error.message)}
    finally{spinning=false;el.spin.disabled=false}
  }
  function saveResultFile(){
    const blob=new Blob([resultText()],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='小坏蛋转转机结果.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)
  }

  function addEmptyAxis(){
    if(slots.length>=MAX_AXIS_COUNT){toast('已到 60 轴上限');return}
    const action=spinnerAddAxisAction();slots=addAxis(slots,action.payload.axisId);renderAll();queueShared(action)
  }
  function clearMachine(){
    if(!confirm('清空卡轴？卡带库和历史会保留。'))return;
    const action=spinnerClearAxesAction();slots=clearAxes(action.payload.axisIds);renderAll();queueShared(action)
  }

  el.slotGrid.addEventListener('click',event=>{
    const del=event.target.closest('[data-delete-axis]');if(del){deleteAxisFromMain(del.dataset.deleteAxis);return}
    const toggle=event.target.closest('[data-toggle]');if(toggle){const slot=slots.find(item=>item.id===toggle.dataset.toggle);if(!slot)return;if(isEmptySlot(slot)){toast('空轴不能启用');return}const enabled=!slot.enabled;slots=toggleSlot(slots,slot.id,enabled);renderSlots();queueShared(spinnerToggleAction(slot.id,enabled));return}
    const step=event.target.closest('[data-count-step]');if(step){const slot=slots.find(item=>item.id===step.dataset.axis);if(slot)setDrawCount(slot.id,Math.max(1,Math.min(20,normalizeDrawCount(slot.drawCount)+Number(step.dataset.countStep))));return}
    const installed=event.target.closest('[data-open-installed]');if(installed&&installed.dataset.openInstalled){openInstall(installed.dataset.openInstalled)}
  });
  el.slotGrid.addEventListener('change',event=>{if(event.target.matches('[data-draw-count]'))setDrawCount(event.target.dataset.drawCount,event.target.value)});
  el.addAxis.onclick=addEmptyAxis;el.clearAxes.onclick=clearMachine;el.spin.onclick=spinNow;

  el.openCabinet.onclick=()=>{renderRack();el.cabinetOverlay.hidden=false};
  el.closeCabinet.onclick=()=>{el.cabinetOverlay.hidden=true;exitBatchMode()};
  el.search.oninput=()=>{reelQuery=el.search.value;renderRack()};
  el.categoryTabs.addEventListener('click',event=>{const button=event.target.closest('[data-category]');if(button){reelCategory=button.dataset.category;renderRack()}});
  el.rack.addEventListener('click',event=>{
    const more=event.target.closest('[data-more]');if(more){event.stopPropagation();openCardMenu(more.dataset.more);return}
    const load=event.target.closest('[data-load]');if(load){event.stopPropagation();openInstall(load.dataset.load);return}
    const card=event.target.closest('[data-tape-id]');if(!card)return;
    if(batchMode)toggleSelected(card.dataset.tapeId)
  });
  el.rack.addEventListener('dblclick',event=>{if(batchMode)return;const card=event.target.closest('[data-tape-id]');if(card)openEditor(card.dataset.tapeId)});
  el.newTape.onclick=openCreate;el.batchDone.onclick=exitBatchMode;el.batchMode.onclick=enterBatchMode;
  el.librarySpin.onclick=spinNow;el.randomInstall.onclick=openRandom;
  el.selectAll.onclick=()=>{visibleTapes().forEach(tape=>selectedTapeIds.add(tape.id));renderRack()};
  el.invert.onclick=()=>{for(const tape of visibleTapes())selectedTapeIds.has(tape.id)?selectedTapeIds.delete(tape.id):selectedTapeIds.add(tape.id);renderRack()};
  el.batchActions.onclick=openBatchMenu;

  el.filterOpen.onclick=openFilter;el.recorderFilters.addEventListener('click',event=>{const button=event.target.closest('[data-recorder-filter]');if(button){draftRecorder=button.dataset.recorderFilter;renderFilterChoices()}});
  el.loadFilters.addEventListener('click',event=>{const button=event.target.closest('[data-load-filter]');if(button){draftLoad=button.dataset.loadFilter;renderFilterChoices()}});
  el.resetFilter.onclick=()=>{draftRecorder='全部';draftLoad='全部';renderFilterChoices()};
  el.applyFilter.onclick=()=>{filterRecorder=draftRecorder;filterLoad=draftLoad;el.filterOverlay.hidden=true;renderRack()};

  el.blankCreate.onclick=()=>{el.createOverlay.hidden=true;openEditor(null,{fresh:true})};
  el.importFile.addEventListener('change',async event=>{const file=event.target.files&&event.target.files[0];if(!file)return;try{await importJsonFile(file);el.createOverlay.hidden=true}catch(error){alert(`导入失败：${error.message}`)}finally{event.target.value=''}});

  el.randomCounts.addEventListener('click',event=>{const button=event.target.closest('[data-count]');if(!button)return;el.randomCounts.querySelectorAll('[data-count]').forEach(item=>item.classList.remove('active'));button.classList.add('active');if(button.dataset.count==='custom'){el.randomCustom.hidden=false;el.randomCustom.focus()}else{randomCount=Number(button.dataset.count);el.randomCustom.hidden=true;el.randomCustom.value=String(randomCount)}});
  el.randomGo.onclick=executeRandomInstall;

  el.installBody.addEventListener('click',event=>{
    const existing=event.target.closest('[data-install-existing]');if(existing){installToExisting(existing.dataset.installExisting);return}
    const fresh=event.target.closest('[data-install-new]');if(fresh){installToNew(fresh.dataset.installNew);return}
    const eject=event.target.closest('[data-eject-axis]');if(eject){ejectOne(eject.dataset.ejectAxis);return}
    const action=event.target.closest('[data-install-action]');if(!action)return;
    const id=activeInstallReelId,tape=findTape(id);if(!tape)return;
    if(action.dataset.installAction==='detail'){el.installOverlay.hidden=true;openDetail(id)}
    if(action.dataset.installAction==='edit'){el.installOverlay.hidden=true;openEditor(id)}
    if(action.dataset.installAction==='copy'){copyTapeById(id);renderInstall()}
    if(action.dataset.installAction==='export')downloadTape(tape);
    if(action.dataset.installAction==='ejectall')ejectAll(id);
    if(action.dataset.installAction==='delete')deleteTapeById(id)
  });

  el.cardMenuOverlay.addEventListener('click',event=>{
    const button=event.target.closest('[data-card-action]');if(!button)return;
    const id=menuTapeId,tape=findTape(id);if(!tape)return;el.cardMenuOverlay.hidden=true;
    if(button.dataset.cardAction==='install')openInstall(id);
    if(button.dataset.cardAction==='detail')openDetail(id);
    if(button.dataset.cardAction==='edit')openEditor(id);
    if(button.dataset.cardAction==='copy')copyTapeById(id);
    if(button.dataset.cardAction==='export')downloadTape(tape);
    if(button.dataset.cardAction==='delete')deleteTapeById(id)
  });

  el.batchMenuOverlay.addEventListener('click',event=>{
    const button=event.target.closest('[data-batch-action]');if(!button)return;
    if(button.dataset.batchAction==='category')openBatchValue('category');
    if(button.dataset.batchAction==='recorder')openBatchValue('recorder');
    if(button.dataset.batchAction==='export')batchExport();
    if(button.dataset.batchAction==='delete')batchDelete()
  });
  el.batchValueApply.onclick=applyBatchValue;

  el.candidateList.addEventListener('click',event=>{const button=event.target.closest('[data-entry-index]');if(button)openEntry(Number(button.dataset.entryIndex))});
  el.addEntry.onclick=()=>openEntry(-1);
  el.saveEntry.onclick=()=>{
    const label=el.entryLabel.value.trim();if(!label){toast('候选标题不能为空');return}
    const entry={id:entryEditIndex<0?makeId('entry'):editorDraft.entries[entryEditIndex].id,label,detail:el.entryDetail.value};
    if(entryEditIndex<0)editorDraft.entries.push(entry);else editorDraft.entries[entryEditIndex]=entry;
    el.entryOverlay.hidden=true;renderCandidates()
  };
  el.deleteEntry.onclick=()=>{if(entryEditIndex>=0)editorDraft.entries.splice(entryEditIndex,1);el.entryOverlay.hidden=true;renderCandidates()};
  el.saveTape.onclick=saveEditor;el.exportTape.onclick=()=>{syncEditorFields();downloadTape(editorDraft)};
  el.deleteTape.onclick=()=>{if(editorTapeId)deleteTapeById(editorTapeId);else{editorDraft=null;el.editorOverlay.hidden=true}};

  el.resultBody.addEventListener('click',event=>{const button=event.target.closest('[data-result-info]');if(!button)return;const index=Number(button.dataset.resultInfo);expandedResults.has(index)?expandedResults.delete(index):expandedResults.add(index);renderSpinResult()});
  el.resultClose.onclick=()=>{el.resultOverlay.hidden=true};
  el.spinAgain.onclick=spinNow;el.saveResult.onclick=saveResultFile;
  el.copyResult.onclick=async()=>{try{await navigator.clipboard.writeText(resultText());toast('已复制结果')}catch{toast('复制失败')}};

  document.addEventListener('click',event=>{
    if(event.target.closest('[data-close-filter]'))el.filterOverlay.hidden=true;
    if(event.target.closest('[data-close-create]'))el.createOverlay.hidden=true;
    if(event.target.closest('[data-close-random]'))el.randomOverlay.hidden=true;
    if(event.target.closest('[data-close-install]'))el.installOverlay.hidden=true;
    if(event.target.closest('[data-close-card-menu]'))el.cardMenuOverlay.hidden=true;
    if(event.target.closest('[data-close-batch-menu]'))el.batchMenuOverlay.hidden=true;
    if(event.target.closest('[data-close-batch-value]'))el.batchValueOverlay.hidden=true;
    if(event.target.closest('[data-close-detail]'))el.detailOverlay.hidden=true;
    if(event.target.closest('[data-close-editor]'))el.editorOverlay.hidden=true;
    if(event.target.closest('[data-close-entry]'))el.entryOverlay.hidden=true
  });
  for(const overlay of [el.filterOverlay,el.createOverlay,el.randomOverlay,el.installOverlay,el.cardMenuOverlay,el.batchMenuOverlay,el.batchValueOverlay,el.detailOverlay,el.editorOverlay,el.entryOverlay,el.resultOverlay]){
    overlay.addEventListener('click',event=>{if(event.target===overlay)overlay.hidden=true})
  }
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    for(const overlay of [el.entryOverlay,el.editorOverlay,el.batchValueOverlay,el.batchMenuOverlay,el.cardMenuOverlay,el.detailOverlay,el.installOverlay,el.randomOverlay,el.createOverlay,el.filterOverlay,el.resultOverlay,el.cabinetOverlay]){
      if(!overlay.hidden){overlay.hidden=true;break}
    }
  });

  function renderAll(){renderStorage();renderSlots();renderRack();if(activeInstallReelId&&!el.installOverlay.hidden)renderInstall();if(editorDraft&&!el.editorOverlay.hidden)renderCandidates()}
  renderAll();

  // Standalone open-source build: browser state stays local by design.
  // No SharedGameConfig bridge is started here.
}
