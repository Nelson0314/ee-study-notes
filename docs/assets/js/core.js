/* core.js — 全站共用的 SVG 繪圖輔助函式、座標圖 plot()、深淺色切換與目錄高亮。各課程與各章圖檔皆可直接呼叫。 */
/* ================= helpers ================= */
const NS='http://www.w3.org/2000/svg';
const $=s=>document.querySelector(s);
function E(tag,a,p){const e=document.createElementNS(NS,tag);if(a)for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e;}
function rich(t,s){
  const fs=parseFloat(t.getAttribute('font-size'))||13;let shift=0,last=0,m;const re=/([_^])\{([^}]*)\}/g;
  const add=(str,d,small)=>{const ts=E('tspan',{},t);const dy=d-shift;if(dy)ts.setAttribute('dy',dy.toFixed(2));shift=d;if(small)ts.setAttribute('font-size',(fs*0.72).toFixed(1));ts.textContent=str;};
  while((m=re.exec(s))){if(m.index>last)add(s.slice(last,m.index),0);add(m[2],m[1]==='_'?fs*0.3:-fs*0.42,true);last=re.lastIndex;}
  if(last<s.length)add(s.slice(last),0);
}
function T(p,x,y,s,a){const t=E('text',Object.assign({x,y},a||{}),p);rich(t,String(s));return t;}
function L(p,x1,y1,x2,y2,cls,mk,mks){const l=E('line',{x1,y1,x2,y2,class:cls},p);if(mk)l.setAttribute('marker-end',`url(#${mk})`);if(mks)l.setAttribute('marker-start',`url(#${mks})`);return l;}
function dot(p,x,y,r){return E('circle',{cx:x,cy:y,r:r||4.5,class:'e'},p);}
function hole(p,x,y,r){return E('circle',{cx:x,cy:y,r:r||5,class:'h'},p);}
function ion(p,x,y,sign,faint){const g=E('g',faint?{opacity:.3}:{},p);E('circle',{cx:x,cy:y,r:7,class:sign>0?'ion-p':'ion-n'},g);
  T(g,x,y+4.3,sign>0?'+':'−',{class:sign>0?'t-pos':'t-neg','text-anchor':'middle','font-size':12,'font-weight':700});return g;}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const SUP={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
const sup=s=>String(s).split('').map(c=>SUP[c]||c).join('');
function sci(x,d=2){if(x===0)return'0';const neg=x<0;x=Math.abs(x);let e=Math.floor(Math.log10(x));let m=x/10**e;let ms=m.toFixed(d);if(parseFloat(ms)>=10){e++;ms=(x/10**e).toFixed(d);}
  if(e>=-2&&e<=3){const v=x.toPrecision(d+1);return(neg?'−':'')+(+v).toString();}
  return(neg?'−':'')+ms+'×10'+sup(e);}
function fnum(v){let s=(+v.toFixed(6)).toString();return s.replace('-','−');}
function nice(a,b,n){const st0=(b-a)/n;const p=10**Math.floor(Math.log10(st0));const r=st0/p;const st=(r<1.5?1:r<3?2:r<7?5:10)*p;const o=[];for(let v=Math.ceil(a/st-1e-9)*st;v<=b+st*1e-9;v+=st)o.push(+v.toFixed(10));return o;}
function decades(r,step){step=step||1;const o=[];for(let k=Math.ceil(Math.log10(r[0])-1e-9);k<=Math.floor(Math.log10(r[1])+1e-9);k+=step)o.push(10**k);return o;}
let UID=0;
function plot(svg,o){
  while(svg.firstChild)svg.removeChild(svg.firstChild);
  const W=o.w||600,H=o.h||300,m=Object.assign({l:64,r:20,t:16,b:46},o.m||{});
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const fx=o.xlog?Math.log10:v=>v,fy=o.ylog?Math.log10:v=>v;
  const X0=fx(o.x[0]),X1=fx(o.x[1]),Y0=fy(o.y[0]),Y1=fy(o.y[1]);
  const pw=W-m.l-m.r,ph=H-m.t-m.b;
  const sx=v=>m.l+(fx(v)-X0)/(X1-X0)*pw, sy=v=>m.t+ph-(fy(v)-Y0)/(Y1-Y0)*ph;
  const xt=o.xticks||(o.xlog?decades(o.x):nice(o.x[0],o.x[1],o.nx||6));
  const yt=o.yticks||(o.ylog?decades(o.y,o.ystep):nice(o.y[0],o.y[1],o.ny||5));
  const xf=o.xfmt||fnum, yf=o.yfmt||(o.ylog?(v=>'10^{'+Math.round(Math.log10(v))+'}'):fnum);
  const g0=E('g',{},svg);
  for(const v of xt){const X=sx(v);L(g0,X,m.t,X,m.t+ph,'grid');if(!o.noxlab)T(g0,X,m.t+ph+17,xf(v).replace('-','−'),{'text-anchor':'middle',class:'mu','font-size':12});}
  for(const v of yt){const Y=sy(v);L(g0,m.l,Y,m.l+pw,Y,'grid');T(g0,m.l-7,Y+4,typeof yf(v)==='string'?yf(v).replace(/^-/,'−'):yf(v),{'text-anchor':'end',class:'mu','font-size':12});}
  if(!o.ylog&&o.y[0]<0&&o.y[1]>0)L(g0,m.l,sy(0),m.l+pw,sy(0),'axis');
  if(!o.xlog&&o.x[0]<0&&o.x[1]>0&&o.xzero!==false)L(g0,sx(0),m.t,sx(0),m.t+ph,'axis');
  E('rect',{x:m.l,y:m.t,width:pw,height:ph,class:'axis'},g0);
  if(o.xlabel)T(g0,m.l+pw/2,H-8,o.xlabel,{'text-anchor':'middle','font-size':13});
  if(o.ylabel)T(g0,0,0,o.ylabel,{'text-anchor':'middle','font-size':13,transform:`translate(15,${m.t+ph/2}) rotate(-90)`});
  const id='cl'+(++UID);const defs=E('defs',{},svg);const cp=E('clipPath',{id},defs);E('rect',{x:m.l,y:m.t,width:pw,height:ph},cp);
  const g=E('g',{'clip-path':`url(#${id})`},svg);const top=E('g',{},svg);
  const P={svg,g,top,sx,sy,m,W,H,pw,ph,
    path(pts,cls,par){let d='',pen=false;for(const[x,y]of pts){if(!isFinite(y)||(o.ylog&&y<=0)){pen=false;continue;}const Y=Math.max(-5e3,Math.min(5e3,sy(y)));d+=(pen?'L':'M')+sx(x).toFixed(2)+','+Y.toFixed(2);pen=true;}return E('path',{d,class:cls},par||g);},
    fn(f,cls,a,b,n,par){a=a??o.x[0];b=b??o.x[1];n=n||400;const pts=[];for(let i=0;i<=n;i++){const x=a+(b-a)*i/n;pts.push([x,f(x)]);}return this.path(pts,cls,par);},
    poly(pts,cls){return E('polygon',{points:pts.map(([x,y])=>sx(x).toFixed(2)+','+Math.max(-5e3,Math.min(5e3,sy(y))).toFixed(2)).join(' '),class:cls},g);},
    rect(x0,x1,cls){return E('rect',{x:sx(x0),y:m.t,width:Math.max(0,sx(x1)-sx(x0)),height:ph,class:cls},g);},
    dot(x,y,cls,r){return E('circle',{cx:sx(x),cy:sy(y),r:r||5,class:cls||'mdot'},top);},
    label(x,y,s,a){return T(top,sx(x),sy(y),s,Object.assign({'font-size':12},a||{}));},
    vline(x,cls){return L(g,sx(x),m.t,sx(x),m.t+ph,cls||'ln-mu dash');},
    hline(y,cls){return L(g,m.l,sy(y),m.l+pw,sy(y),cls||'ln-mu dash');}
  };
  return P;
}
