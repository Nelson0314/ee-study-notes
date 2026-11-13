/* lib.js — 電子學課程共用：物理常數與電路元件繪圖原語（依賴 assets/js/core.js）。 */
/* physical constants */
const q=1.6e-19,kB=1.38e-23,VT=0.026,ni0=1.08e10,epsSi=11.7*8.85e-14;
const niT=T=>5.2e15*T**1.5*Math.exp(-1.12*q/(2*kB*T));

/* ================= circuit primitives ================= */
function W(s,d){return E('path',{d,class:'wire'},s);}
function two(s,x1,y1,x2,y2,w,draw){const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI;
  const g=E('g',{transform:`translate(${x1},${y1}) rotate(${ang})`},s);const a=(len-w)/2;
  E('path',{d:`M0,0 H${a} M${a+w},0 H${len}`,class:'wire'},g);draw(g,a);return g;}
const dio=(s,x1,y1,x2,y2)=>two(s,x1,y1,x2,y2,22,(g,a)=>{E('polygon',{points:`${a},-10 ${a},10 ${a+20},0`,class:'dio'},g);E('line',{x1:a+21,y1:-11,x2:a+21,y2:11,class:'ln-fg',style:'stroke-width:3'},g);});
const res=(s,x1,y1,x2,y2)=>two(s,x1,y1,x2,y2,36,(g,a)=>{E('path',{d:`M${a},0 l3,-7 l6,14 l6,-14 l6,14 l6,-14 l6,14 l3,-7`,class:'wire'},g);});
const cap=(s,x1,y1,x2,y2)=>two(s,x1,y1,x2,y2,8,(g,a)=>{E('line',{x1:a,y1:-13,x2:a,y2:13,class:'ln-fg',style:'stroke-width:2.5'},g);E('line',{x1:a+8,y1:-13,x2:a+8,y2:13,class:'ln-fg',style:'stroke-width:2.5'},g);});
const bat=(s,x1,y1,x2,y2)=>two(s,x1,y1,x2,y2,8,(g,a)=>{E('line',{x1:a,y1:-13,x2:a,y2:13,class:'ln-fg',style:'stroke-width:2'},g);E('line',{x1:a+8,y1:-7,x2:a+8,y2:7,class:'ln-fg',style:'stroke-width:4'},g);});
function src(s,x,y,kind){E('circle',{cx:x,cy:y,r:18,class:'ln-fg'},s);
  if(kind==='ac')E('path',{d:`M${x-10},${y} q5,-12 10,0 t10,0`,class:'ln-fg'},s);
  else{T(s,x,y-4,'+',{'text-anchor':'middle','font-size':13});T(s,x,y+13,'−',{'text-anchor':'middle','font-size':13});}}
function gnd(s,x,y){L(s,x,y-8,x,y,'wire');L(s,x-12,y,x+12,y,'ln-fg');L(s,x-8,y+5,x+8,y+5,'ln-fg');L(s,x-4,y+10,x+4,y+10,'ln-fg');}
function nd(s,x,y){E('circle',{cx:x,cy:y,r:3.2,class:'mk-fg'},s);}
function lb(s,x,y,t,a){return T(s,x,y,t,Object.assign({'font-size':13},a||{}));}
function segInit(id,cb){const el=$(id);el.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{el.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));cb(b.dataset.v);}));}

const IS=2e-16,VON=0.8;
/* solve f(x)=0 by bisection (f increasing) */
function bisect(f,a,b){for(let i=0;i<80;i++){const m=(a+b)/2;if(f(m)>0)b=m;else a=m;}return(a+b)/2;}


/* op amp 符號：左緣 x、中心 y；plusTop=true 時 + 端在上。回傳接腳座標 {p:+端, n:−端, o:輸出}。 */
function opamp(s,x,y,plusTop){E('polygon',{points:`${x},${y-40} ${x},${y+40} ${x+70},${y}`,class:'ln-fg'},s);
  T(s,x+8,y-15,plusTop?'+':'−',{'font-size':15});T(s,x+8,y+27,plusTop?'−':'+',{'font-size':15});
  return plusTop?{p:[x,y-20],n:[x,y+20],o:[x+70,y]}:{p:[x,y+20],n:[x,y-20],o:[x+70,y]};}
