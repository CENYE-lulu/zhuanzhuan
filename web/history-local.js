(function(){
  const KEY='zhuanzhuan:spinner:history:v1';
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}}
  function write(items){try{localStorage.setItem(KEY,JSON.stringify(items.slice(0,200)))}catch{}}
  function record(summary){
    const items=read();
    items.unshift({id:crypto.randomUUID(),at:new Date().toISOString(),summary:String(summary||'')});
    write(items);
  }
  function list(limit=50){return read().slice(0,Math.max(1,Math.min(200,Number(limit)||50)))}
  function clear(){try{localStorage.removeItem(KEY)}catch{}}
  window.PlayHistory=Object.freeze({record,list,clear});
})();