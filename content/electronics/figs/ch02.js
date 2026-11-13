/* 第 2 章圖檔：每個區塊對應 .md 中一個 <svg id> 或互動元件。 */
/* ================= figures ================= */
// atom
(function(){const s=$('#f-atom');s.setAttribute('viewBox','0 0 330 240');const cx=115,cy=120;
  [34,60,88].forEach(r=>E('circle',{cx,cy,r,class:'ln-mu dash'},s));
  E('circle',{cx,cy,r:19,class:'atom'},s);T(s,cx,cy+4.5,'+14',{'text-anchor':'middle','font-size':12,'font-weight':700});
  [[34,2,0],[60,8,22.5],[88,4,45]].forEach(([r,n,off],k)=>{for(let i=0;i<n;i++){const a=(off+360*i/n)*Math.PI/180;const c=dot(s,cx+r*Math.cos(a),cy+r*Math.sin(a),k===2?7:5);if(k<2)c.setAttribute('opacity',.4);}});
  T(s,222,78,'第 1 層：2 個',{class:'mu','font-size':13});T(s,222,102,'第 2 層：8 個',{class:'mu','font-size':13});
  T(s,222,126,'第 3 層：4 個',{class:'t-e','font-size':13,'font-weight':700});T(s,222,148,'＝價電子',{class:'t-e','font-size':13,'font-weight':700});
})();

// lattice
function lattice(id,mode){
  const s=$(id);s.setAttribute('viewBox','0 0 320 320');const P=[60,160,260];const bonds=[];
  for(let i=0;i<3;i++)for(let j=0;j<3;j++){const x=P[i],y=P[j];
    bonds.push([x,y,i<2?P[i+1]:320,y,i<2]);if(i===0)bonds.push([x,y,0,y,false]);
    bonds.push([x,y,x,j<2?P[j+1]:320,j<2]);if(j===0)bonds.push([x,y,x,0,false]);}
  bonds.forEach(b=>L(s,b[0],b[1],b[2],b[3],'bond'));
  bonds.forEach(([x1,y1,x2,y2,full])=>{const len=Math.hypot(x2-x1,y2-y1),ux=(x2-x1)/len,uy=(y2-y1)/len;
    const ds=full?[42,58]:[38,52];
    ds.forEach((d,k)=>{const x=x1+ux*d,y=y1+uy*d;
      const special=(mode==='broken'||mode==='B')&&x1===160&&y1===160&&x2===260&&y2===160&&k===1;
      if(special)hole(s,x,y,6);else dot(s,x,y,4.5);});});
  for(const x of P)for(const y of P){const c=x===160&&y===160;
    const cls=c&&mode==='P'?'atom-d':c&&mode==='B'?'atom-a':'atom';
    E('circle',{cx:x,cy:y,r:24,class:cls},s);T(s,x,y+5,c&&mode==='P'?'P':c&&mode==='B'?'B':'Si',{'text-anchor':'middle','font-size':14,'font-weight':600});}
  if(mode==='broken'){dot(s,210,222,5.5);E('path',{d:'M218,168 Q226,192 213,212',class:'ln-e dash','marker-end':'url(#a-e)'},s);
    T(s,218,146,'電洞',{'text-anchor':'middle','font-size':12,class:'t-h halo','font-weight':700});T(s,207,250,'自由電子',{'text-anchor':'middle','font-size':12,class:'t-e halo','font-weight':700});}
  if(mode==='P'){dot(s,212,112,5.5);L(s,178,142,206,118,'ln-pos dash');T(s,212,95,'第 5 個電子',{'text-anchor':'middle','font-size':12,class:'t-e','font-weight':700});}
  if(mode==='B'){T(s,218,146,'電洞',{'text-anchor':'middle','font-size':12,class:'t-h','font-weight':700});}
}
lattice('#f-lat-pure','pure');lattice('#f-lat-broken','broken');lattice('#f-lat-P','P');lattice('#f-lat-B','B');

// hole movement
(function(){const s=$('#f-holemove');s.setAttribute('viewBox','0 0 620 300');const xs=[...Array(7)].map((_,k)=>110+65*k);
  const rows=[[55,2],[135,3],[215,4]];
  rows.forEach(([y,hk],r)=>{T(s,34,y+6,'t_{'+(r+1)+'}',{'font-size':16,'font-weight':600});L(s,80,y,530,y,'bond');
    xs.forEach((x,k)=>{if(k===hk)hole(s,x,y,8);else dot(s,x,y,7);});
    if(r<2){const x1=xs[hk+1],x2=xs[hk];E('path',{d:`M${x1},${y-12} Q${(x1+x2)/2},${y-40} ${x2+5},${y-14}`,class:'ln-e','marker-end':'url(#a-e)'},s);}});
  L(s,xs[2]+4,67,xs[3]-4,121,'ln-h dash','a-h');L(s,xs[3]+4,147,xs[4]-4,201,'ln-h dash','a-h');
  dot(s,120,260,6);T(s,134,265,'電子逐一向左跳入空位',{'font-size':13,class:'t-e'});
  hole(s,120,284,6);T(s,134,289,'等效於電洞向右移動（帶 +q）',{'font-size':13,class:'t-h'});
})();

// generation / recombination
(function(){const s=$('#f-genrec');s.setAttribute('viewBox','0 0 620 190');
  const panel=(ox,title)=>{T(s,ox+150,22,title,{'text-anchor':'middle','font-size':14,'font-weight':700});
    L(s,ox+60,100,ox+200,100,'bond');E('circle',{cx:ox+60,cy:100,r:20,class:'atom'},s);E('circle',{cx:ox+200,cy:100,r:20,class:'atom'},s);
    T(s,ox+60,105,'Si',{'text-anchor':'middle','font-size':12});T(s,ox+200,105,'Si',{'text-anchor':'middle','font-size':12});
    dot(s,ox+115,100,5);};
  panel(0,'產生（Generation）');hole(s,145,100,6);dot(s,235,52,6);
  E('path',{d:'M145,93 Q170,55 227,52',class:'ln-e dash','marker-end':'url(#a-e)'},s);
  E('path',{d:'M130,170 q6,-5 0,-10 q-6,-5 0,-10 q6,-5 0,-10 q-6,-5 0,-10 l0,-14',class:'ln-pos','marker-end':'url(#a-pos)'},s);
  T(s,140,165,'熱能',{'font-size':12,class:'t-pos'});T(s,250,40,'e⁻',{'font-size':12,class:'t-e'});T(s,160,124,'電洞',{'font-size':12,class:'t-h'});
  panel(320,'復合（Recombination）');hole(s,465,100,6);dot(s,560,52,6);
  E('path',{d:'M552,55 Q500,58 471,93',class:'ln-e dash','marker-end':'url(#a-e)'},s);
  E('path',{d:'M450,112 l0,10 q6,5 0,10 q-6,5 0,10 q6,5 0,10 q-6,5 0,10',class:'ln-pos','marker-end':'url(#a-pos)'},s);
  T(s,462,160,'釋放能量',{'font-size':12,class:'t-pos'});
})();

// n_i widget
function drawNi(){const Tv=+$('#niT').value;$('#niTo').textContent=Tv+' K';
  const P=plot($('#f-ni'),{x:[200,700],y:[1e4,1e18],ylog:true,ystep:2,xlabel:'溫度 T (K)',ylabel:'n_{i} (cm^{-3})',h:300});
  P.fn(niT,'ln-acc');P.vline(300);P.label(305,1e17,'室溫 300 K',{class:'mu'});
  const v=niT(Tv);P.dot(Tv,v);
  $('#niR').innerHTML=`<span>n<sub>i</sub> = <b>${sci(v)}</b> cm⁻³</span><span>約每 <b>${sci(5e22/v,1)}</b> 個矽原子一個自由電子</span><span>相對 300 K：<b>${sci(v/niT(300),2)}</b> 倍</span>`;}
$('#niT').addEventListener('input',drawNi);drawNi();

// doping widget
let dopT='n';
function drawDop(){const N=10**(+$('#dopN').value);const ni2=ni0*ni0;const maj=N/2+Math.sqrt(N*N/4+ni2),min=ni2/maj;
  const n=dopT==='n'?maj:min,p=dopT==='n'?min:maj;$('#dopNo').innerHTML=sci(N,1)+' cm⁻³';
  const P=plot($('#f-dop'),{x:[0,2],y:[1,1e19],ylog:true,ystep:3,xticks:[],ylabel:'濃度 (cm^{-3})',w:460,h:300,m:{b:36}});
  const bar=(x0,v,cls)=>E('rect',{x:P.sx(x0),y:P.sy(v),width:P.sx(x0+0.5)-P.sx(x0),height:P.sy(1)-P.sy(v),class:cls},P.g);
  bar(0.25,n,'bar-e');bar(1.25,p,'bar-h');P.hline(ni0,'ln-fg dash');P.label(1.97,ni0*3,'n_{i}',{'text-anchor':'end'});
  P.label(0.5,n*3.5,sci(n,2),{'text-anchor':'middle','font-weight':700});P.label(1.5,p*3.5,sci(p,2),{'text-anchor':'middle','font-weight':700});
  T(P.top,P.sx(0.5),P.H-12,'電子 n',{'text-anchor':'middle',class:'t-e','font-weight':700});T(P.top,P.sx(1.5),P.H-12,'電洞 p',{'text-anchor':'middle',class:'t-h','font-weight':700});
  $('#dopR').innerHTML=`<span>n = <b>${sci(n)}</b></span><span>p = <b>${sci(p)}</b></span><span>n·p = <b>${sci(n*p)}</b> = n<sub>i</sub>²</span><span>多數載子：<b>${dopT==='n'?'電子':'電洞'}</b></span>`;}
document.querySelectorAll('#dopType button').forEach(b=>b.addEventListener('click',()=>{dopT=b.dataset.t;document.querySelectorAll('#dopType button').forEach(x=>x.classList.toggle('on',x===b));drawDop();}));
$('#dopN').addEventListener('input',drawDop);drawDop();

// drift
(function(){const s=$('#f-drift');s.setAttribute('viewBox','0 0 640 280');
  E('rect',{x:100,y:70,width:440,height:100,class:'nreg'},s);E('rect',{x:86,y:70,width:14,height:100,class:'metal'},s);E('rect',{x:540,y:70,width:14,height:100,class:'metal'},s);
  T(s,93,60,'+',{'text-anchor':'middle','font-size':20,'font-weight':700});T(s,547,60,'−',{'text-anchor':'middle','font-size':20,'font-weight':700});
  L(s,140,40,500,40,'ln-fg','a-fg');T(s,320,30,'電場 E',{'text-anchor':'middle','font-size':14,'font-weight':700});
  [[160,95],[265,135],[365,100],[455,140]].forEach(([x,y])=>{hole(s,x,y,7);L(s,x+11,y,x+46,y,'ln-h','a-h');});
  [[200,140],[300,95],[405,135],[495,100]].forEach(([x,y])=>{dot(s,x,y,6.5);L(s,x-10,y,x-45,y,'ln-e','a-e');});
  E('path',{d:'M93,170 V232 H306',class:'wire'},s);E('path',{d:'M334,232 H547 V170',class:'wire'},s);
  L(s,310,214,310,250,'ln-fg');L(s,330,222,330,242,'ln-fg');E('line',{x1:310,y1:214,x2:310,y2:250,class:'ln-fg thick'},s);
  T(s,300,210,'+',{'text-anchor':'middle','font-size':15});T(s,340,214,'−',{'text-anchor':'middle','font-size':15});
  L(s,240,196,400,196,'ln-acc','a-acc');T(s,320,190,'電流 I',{'text-anchor':'middle','font-size':13,class:'t-acc','font-weight':700});
  T(s,320,272,'電洞：v_{h} = μ_{p}E（順 E）　　電子：v_{e} = −μ_{n}E（逆 E）',{'text-anchor':'middle','font-size':13,class:'mu'});
})();

// J derivation
(function(){const s=$('#f-jderiv');s.setAttribute('viewBox','0 0 620 250');
  E('polygon',{points:'100,100 500,100 540,65 140,65',class:'nreg'},s);E('polygon',{points:'500,100 540,65 540,145 500,180',class:'nreg'},s);
  E('rect',{x:100,y:100,width:400,height:80,class:'nreg'},s);
  E('rect',{x:260,y:100,width:120,height:80,class:'slab'},s);E('polygon',{points:'260,100 380,100 420,65 300,65',class:'slab'},s);
  E('polygon',{points:'260,100 300,65 300,145 260,180',class:'plane'},s);E('polygon',{points:'380,100 420,65 420,145 380,180',class:'ln-acc dash thin'},s);
  [[150,130],[200,160],[230,120],[290,140],[330,118],[350,162],[420,135],[460,158],[470,115],[180,112]].forEach(([x,y])=>{dot(s,x,y,4.5);L(s,x+7,y,x+22,y,'ln-e thin','a-e');});
  L(s,260,205,380,205,'ln-fg','a-fg','a-fg');T(s,320,226,'v · (1 s)',{'text-anchor':'middle','font-size':13});
  L(s,80,102,80,178,'ln-fg','a-fg','a-fg');T(s,66,145,'h',{'text-anchor':'middle','font-size':15,'font-style':'italic'});
  L(s,92,94,130,61,'ln-fg','a-fg','a-fg');T(s,96,66,'W',{'text-anchor':'middle','font-size':15,'font-style':'italic'});
  T(s,300,50,'截面積 = W·h',{'text-anchor':'middle','font-size':13,class:'t-acc'});
  T(s,560,200,'一秒內通過截面的',{'text-anchor':'end','font-size':12,class:'mu'});T(s,560,218,'電荷 = v·W·h·n·q',{'text-anchor':'end','font-size':12,class:'mu'});
})();

// velocity saturation
(function(){const mu0=1350,vs=1e7;const P=plot($('#f-vsat'),{x:[0,1e5],y:[0,1.4e7],xticks:nice(0,1e5,5),xfmt:v=>fnum(v/1e4),yfmt:v=>fnum(v/1e6),xlabel:'電場 E (10^{4} V/cm)',ylabel:'速度 v (10^{6} cm/s)',h:300});
  P.fn(E0=>mu0*E0,'ln-mu dash');P.hline(vs,'ln-h dash');P.label(9.8e4,vs+4e5,'v_{sat} = 10^{7} cm/s',{'text-anchor':'end',class:'t-h'});
  P.fn(E0=>mu0*E0/(1+mu0*E0/vs),'ln-acc');P.label(1.3e4,1.3e7,'v = μ_{0}E（無飽和）',{class:'mu'});
  const Ex=5e4,vx=mu0*Ex/(1+mu0*Ex/vs);P.dot(Ex,vx);P.label(Ex+2e3,vx-8e5,'例題：E = 5×10^{4} V/cm，μ ≈ 174',{});
})();

// ink diffusion
(function(){const s=$('#f-ink');s.setAttribute('viewBox','0 0 620 230');const r=rng(3);
  const gauss=()=>{let u=0,v=0;while(!u)u=r();while(!v)v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);};
  [[6,'t = 0'],[20,'t_{1}'],[42,'t_{2} > t_{1}']].forEach(([sg,lab],k)=>{const ox=10+205*k,c=ox+95;
    E('rect',{x:ox,y:20,width:190,height:130,rx:8,class:'nreg'},s);
    for(let i=0;i<110;i++){const x=c+gauss()*sg,y=85+gauss()*Math.min(sg,26);if(x>ox+4&&x<ox+186&&y>24&&y<146)E('circle',{cx:x,cy:y,r:2.6,class:'e',opacity:.75},s);}
    const pts=[];const peak=46*6/sg;for(let x=ox;x<=ox+190;x+=2)pts.push(`${x},${(205-peak*Math.exp(-((x-c)**2)/(2*sg*sg))).toFixed(1)}`);
    L(s,ox,205,ox+190,205,'axis');E('polyline',{points:pts.join(' '),class:'ln-acc'},s);
    T(s,c,224,lab,{'text-anchor':'middle','font-size':13,'font-weight':600});
    if(k<2)L(s,ox+193,85,ox+203,85,'ln-mu','a-mu');});
  T(s,14,170,'濃度',{'font-size':11,class:'mu'});
})();

// gradient
(function(){const s=$('#f-grad');s.setAttribute('viewBox','0 0 620 270');const r=rng(11);
  T(s,70,20,'高濃度',{'text-anchor':'middle','font-size':13,'font-weight':700});T(s,550,20,'低濃度',{'text-anchor':'middle','font-size':13,'font-weight':700});
  [[30,'e'],[145,'h']].forEach(([y0,t])=>{E('rect',{x:40,y:y0,width:540,height:62,rx:6,class:t==='e'?'nreg':'preg'},s);
    for(let x=48;x<574;x+=11)for(let y=y0+8;y<y0+58;y+=11){const pr=1-(x-40)/560;if(r()<pr*0.85){const jx=x+(r()-.5)*5,jy=y+(r()-.5)*5;t==='e'?dot(s,jx,jy,3):hole(s,jx,jy,3.2);}}});
  L(s,100,112,260,112,'ln-mu','a-mu');T(s,268,116,'電子擴散方向',{'font-size':12,class:'mu'});
  L(s,560,112,420,112,'ln-e','a-e');T(s,412,116,'J_{n} 方向',{'font-size':12,class:'t-e','text-anchor':'end'});
  L(s,100,227,260,227,'ln-mu','a-mu');T(s,268,231,'電洞擴散方向',{'font-size':12,class:'mu'});
  L(s,420,227,560,227,'ln-h','a-h');T(s,412,231,'J_{p} 方向',{'font-size':12,class:'t-h','text-anchor':'end'});
  T(s,310,262,'dn/dx < 0、dp/dx < 0：J_{n} = qD_{n}dn/dx < 0，J_{p} = −qD_{p}dp/dx > 0',{'text-anchor':'middle','font-size':12.5});
})();

// profiles
(function(){let P=plot($('#f-prof-lin'),{x:[0,1],y:[0,1.25],w:320,h:240,m:{l:44,r:12,t:14,b:42},xticks:[0,0.5,1],xfmt:v=>v===0?'0':v===1?'L':'L/2',yticks:[0,0.5,1],xlabel:'x',ylabel:'相對值'});
  P.fn(x=>1-x,'ln-e');P.fn(x=>0.6,'ln-pos dash');P.label(0.05,0.94,'n(x)',{class:'t-e','font-weight':700});P.label(0.55,0.67,'|J_{n}|（定值）',{class:'t-pos','font-weight':700});
  P=plot($('#f-prof-exp'),{x:[0,4],y:[0,1.25],w:320,h:240,m:{l:44,r:12,t:14,b:42},xticks:[0,1,2,3,4],xfmt:v=>v===0?'0':v===1?'L_{d}':v+'L_{d}',yticks:[0,0.5,1],xlabel:'x',ylabel:'相對值'});
  P.fn(x=>Math.exp(-x),'ln-e');P.fn(x=>0.8*Math.exp(-x),'ln-pos dash');P.label(0.15,1.05,'n(x)',{class:'t-e','font-weight':700});P.label(1.1,0.42,'|J_{n}(x)|（衰減）',{class:'t-pos','font-weight':700});
})();

// PN structure
(function(){const s=$('#f-pn');s.setAttribute('viewBox','0 0 620 215');
  E('rect',{x:150,y:30,width:160,height:90,class:'preg'},s);E('rect',{x:310,y:30,width:160,height:90,class:'nreg'},s);
  E('rect',{x:136,y:30,width:14,height:90,class:'metal'},s);E('rect',{x:470,y:30,width:14,height:90,class:'metal'},s);
  T(s,230,82,'p',{'text-anchor':'middle','font-size':30,'font-weight':700,class:'t-h'});T(s,390,82,'n',{'text-anchor':'middle','font-size':30,'font-weight':700,class:'t-e'});
  T(s,230,108,'N_{A}',{'text-anchor':'middle','font-size':13});T(s,390,108,'N_{D}',{'text-anchor':'middle','font-size':13});
  E('path',{d:'M136,75 H62',class:'wire'},s);E('path',{d:'M484,75 H558',class:'wire'},s);
  E('circle',{cx:57,cy:75,r:5,class:'ln-fg'},s);E('circle',{cx:563,cy:75,r:5,class:'ln-fg'},s);
  T(s,57,55,'陽極',{'text-anchor':'middle','font-size':13});T(s,563,55,'陰極',{'text-anchor':'middle','font-size':13});
  T(s,57,100,'Anode',{'text-anchor':'middle','font-size':11,class:'mu'});T(s,563,100,'Cathode',{'text-anchor':'middle','font-size':11,class:'mu'});
  L(s,230,175,290,175,'wire');E('polygon',{points:'290,158 290,192 320,175',class:'ln-fg',style:'fill:var(--fg)'},s);L(s,322,158,322,192,'ln-fg thick');L(s,322,175,390,175,'wire');
  T(s,230,200,'陽極',{'text-anchor':'middle','font-size':12,class:'mu'});T(s,390,200,'陰極',{'text-anchor':'middle','font-size':12,class:'mu'});
  L(s,280,150,335,150,'ln-acc thin','a-acc');T(s,350,154,'順向電流',{'font-size':12,class:'t-acc'});
})();

// junction cartoon
function jcart(id,mode){const s=$(id);const H=mode==='eq'?280:350;s.setAttribute('viewBox',`0 0 640 ${H}`);
  const cx=320,half={eq:50,rev:100,fwd:20}[mode],Lx=40,Rx=600,top=72,bot=200;const r=rng(5);
  E('rect',{x:Lx,y:top,width:cx-Lx,height:bot-top,class:'preg'},s);E('rect',{x:cx,y:top,width:Rx-cx,height:bot-top,class:'nreg'},s);
  E('rect',{x:cx-half,y:top,width:2*half,height:bot-top,class:'dep'},s);L(s,cx,top,cx,bot,'junc');
  E('rect',{x:Lx-12,y:top,width:12,height:bot-top,class:'metal'},s);E('rect',{x:Rx,y:top,width:12,height:bot-top,class:'metal'},s);
  for(let y=top+16;y<bot-6;y+=26)for(let x=Lx+14;x<Rx-6;x+=26){
    if(x<cx-half-6){ion(s,x,y,-1,true);hole(s,x+7+(r()-.5)*5,y-7+(r()-.5)*4,4.5);}
    else if(x>cx+half+6){ion(s,x,y,1,true);dot(s,x+7+(r()-.5)*5,y-7+(r()-.5)*4,4);}
    else if(x<cx)ion(s,x,y,-1);else ion(s,x,y,1);}
  // minority / injected
  const inj=mode==='fwd'?16:mode==='eq'?2:0;
  for(let i=0;i<inj;i++){const d=-38*Math.log(1-r()*0.97);const y=top+12+r()*(bot-top-24);
    if(cx-half-8-d>Lx+6)dot(s,cx-half-8-d,y,4);const d2=-38*Math.log(1-r()*0.97);const y2=top+12+r()*(bot-top-24);if(cx+half+8+d2<Rx-6)hole(s,cx+half+8+d2,y2,4.5);}
  T(s,Lx+8,top-10,'p 型',{'font-size':14,'font-weight':700,class:'t-h'});T(s,Rx-8,top-10,'n 型',{'font-size':14,'font-weight':700,class:'t-e','text-anchor':'end'});
  // depletion width bracket
  L(s,cx-half,top-6,cx+half,top-6,'ln-mu thin','a-mu','a-mu');T(s,cx,top-14,mode==='rev'?'空乏區變寬':mode==='fwd'?'變窄':'空乏區',{'text-anchor':'middle','font-size':12,class:'mu'});
  // field arrow
  const fw=mode==='rev'?'ln-fg thick':mode==='fwd'?'ln-fg thin':'ln-fg';
  L(s,cx+half-4,bot+18,cx-half+4,bot+18,fw,'a-fg');T(s,cx+half+8,bot+22,mode==='rev'?'E 增強':mode==='fwd'?'E 減弱':'E（n → p）',{'font-size':12,'font-weight':700});
  if(mode==='eq'){
    L(s,440,bot+40,360,bot+40,'ln-e','a-e');T(s,448,bot+44,'電子擴散（n→p）',{'font-size':12,class:'t-e'});
    L(s,200,bot+40,280,bot+40,'ln-h','a-h');T(s,192,bot+44,'電洞擴散（p→n）',{'font-size':12,class:'t-h','text-anchor':'end'});
    T(s,cx,bot+70,'內建電場造成的漂移與擴散抵消 → 淨電流為零',{'font-size':12,'text-anchor':'middle',class:'mu'});
  }
  if(mode==='fwd'){
    L(s,470,bot+42,250,bot+42,'ln-e thick','a-e');T(s,478,bot+46,'大量電子注入 p 側',{'font-size':12,class:'t-e'});
    L(s,170,bot+62,390,bot+62,'ln-h thick','a-h');T(s,162,bot+66,'大量電洞注入 n 側',{'font-size':12,class:'t-h','text-anchor':'end'});
  }
  if(mode==='rev'){T(s,cx,bot+50,'多數載子無法越過位障 → 只剩極小漏電流',{'font-size':12,'text-anchor':'middle',class:'mu'});}
  if(mode!=='eq'){const y=H-34;E('path',{d:`M${Lx-6},${bot} V${y} H${cx-14}`,class:'wire'},s);E('path',{d:`M${cx+14},${y} H${Rx+6} V${bot}`,class:'wire'},s);
    const leftPos=mode==='fwd';const xl=cx-8,xs=cx+8;
    E('line',{x1:leftPos?xl:xs,y1:y-15,x2:leftPos?xl:xs,y2:y+15,class:'ln-fg thick'},s);E('line',{x1:leftPos?xs:xl,y1:y-9,x2:leftPos?xs:xl,y2:y+9,class:'ln-fg thick'},s);
    T(s,leftPos?xl-10:xs+10,y-14,'+',{'text-anchor':'middle','font-size':15,'font-weight':700});
    T(s,cx,H-3,mode==='fwd'?'V_{F}（p 端接 +）':'V_{R}（n 端接 +）',{'text-anchor':'middle','font-size':13,'font-weight':700});}
}
jcart('#f-jeq','eq');jcart('#f-jrev','rev');jcart('#f-jfwd','fwd');

// junction widget
const JP={NA:1e16,ND:5e15,L:0.5};
function jcalc(V){const V0=VT*Math.log(JP.NA*JP.ND/ni0**2);const Vb=V0-V;const W=Math.sqrt(2*epsSi/q*(1/JP.NA+1/JP.ND)*Vb);
  return{V0,Vb,W,xp:W*JP.ND/(JP.NA+JP.ND),xn:W*JP.NA/(JP.NA+JP.ND)};}
function makeJW(root){const V0d=+root.dataset.v;
  root.innerHTML=`<div class="ctrl"><label>外加電壓 V（p 端相對 n 端）<input type="range" min="-5" max="0.65" step="0.01" value="${V0d}"></label><output></output></div><div class="readout"></div><svg></svg><svg></svg><svg></svg><svg></svg><svg></svg>`;
  const inp=root.querySelector('input'),out=root.querySelector('output'),ro=root.querySelector('.readout'),sv=root.querySelectorAll('svg');
  const draw=()=>{const V=+inp.value;const c=jcalc(V);const xp=c.xp*1e4,xn=c.xn*1e4;
    out.textContent=(V>0?'+':'')+V.toFixed(2)+' V　'+(V>0.004?'順偏':V<-0.004?'逆偏':'平衡');
    const xr=[-2,2],m={l:72,r:16,t:8,b:8};const common={x:xr,w:640,m,noxlab:true,xzero:false};
    // cartoon
    let P=plot(sv[0],Object.assign({},common,{y:[0,1],h:76,yticks:[],m:{l:72,r:16,t:6,b:6}}));
    P.poly([[-2,0],[0,0],[0,1],[-2,1]],'fill-h');P.poly([[0,0],[2,0],[2,1],[0,1]],'fill-e');
    sv[0].querySelectorAll('polygon').forEach(p=>p.style.opacity=.12);
    P.rect(-xp,xn,'fill-dep');
    const dx=0.09;const np=Math.max(1,Math.floor(xp/dx)),nn=Math.max(1,Math.floor(xn/dx));
    for(let i=0;i<np;i++)for(const yy of[0.25,0.5,0.75])ion(P.g,P.sx(-xp+(i+0.5)*xp/np),P.sy(yy),-1);
    for(let i=0;i<nn;i++)for(const yy of[0.25,0.5,0.75])ion(P.g,P.sx((i+0.5)*xn/nn),P.sy(yy),1);
    T(P.top,P.sx(-1.5),P.sy(0.5)+5,'p',{'text-anchor':'middle','font-size':16,'font-weight':700,class:'t-h'});
    T(P.top,P.sx(1.5),P.sy(0.5)+5,'n',{'text-anchor':'middle','font-size':16,'font-weight':700,class:'t-e'});
    T(P.top,8,P.sy(0.5)+4,'結構',{'font-size':12});
    // rho
    P=plot(sv[1],Object.assign({},common,{y:[-12,8],yticks:[-10,0,5],h:110,ylabel:'ρ/q',m:{l:72,r:16,t:8,b:8}}));
    P.poly([[-xp,0],[-xp,-10],[0,-10],[0,0]],'fill-h');P.poly([[0,0],[0,5],[xn,5],[xn,0]],'fill-e');
    P.path([[-2,0],[-xp,0],[-xp,-10],[0,-10],[0,5],[xn,5],[xn,0],[2,0]],'ln-fg');
    P.label(-xp-0.05,-8,'−qN_{A}',{'text-anchor':'end',class:'t-neg'});P.label(xn+0.05,4,'+qN_{D}',{class:'t-pos'});
    T(P.top,P.W-18,P.m.t+14,'×10^{15} cm^{-3}',{'text-anchor':'end','font-size':11,class:'mu'});
    // E
    const Ef=x=>{const xc=x*1e-4;if(x<-xp||x>xn)return 0;if(x<0)return -q*JP.NA/epsSi*(xc+c.xp)/1e3;return -q*JP.ND/epsSi*(c.xn-xc)/1e3;};
    P=plot(sv[2],Object.assign({},common,{y:[-80,8],yticks:[-80,-40,0],h:110,ylabel:'E',m:{l:72,r:16,t:8,b:8}}));
    P.poly([[-xp,0],[0,Ef(0)],[xn,0]],'fill-acc');P.fn(Ef,'ln-acc',-2,2,800);
    T(P.top,P.W-22,P.H-P.m.b-8,'kV/cm（負號：指向 −x，即 n→p）',{'text-anchor':'end','font-size':11,class:'mu'});
    // psi
    const psi=x=>{const xc=x*1e-4;if(x<=-xp)return 0;if(x<=0)return q*JP.NA/(2*epsSi)*(xc+c.xp)**2;if(x<xn)return c.Vb-q*JP.ND/(2*epsSi)*(c.xn-xc)**2;return c.Vb;};
    P=plot(sv[3],Object.assign({},common,{y:[-0.3,6],yticks:[0,2,4,6],h:110,ylabel:'ψ (V)',m:{l:72,r:16,t:8,b:8}}));
    P.fn(psi,'ln-fg',-2,2,800);P.hline(c.Vb,'ln-mu dash');P.label(1.95,c.Vb+0.35,'V_{0} − V = '+c.Vb.toFixed(3)+' V',{'text-anchor':'end','font-weight':700});
    // carriers
    const Lm=JP.L,np0=ni0**2/JP.NA,pn0=ni0**2/JP.ND,ex=Math.exp(V/VT);
    const nf=x=>{if(x<-xp)return np0+np0*(ex-1)*Math.exp((x+xp)/Lm);if(x>xn)return JP.ND;return JP.ND*Math.exp(-(c.Vb-psi(x))/VT);};
    const pf=x=>{if(x>xn)return pn0+pn0*(ex-1)*Math.exp(-(x-xn)/Lm);if(x<-xp)return JP.NA;return JP.NA*Math.exp(-psi(x)/VT);};
    P=plot(sv[4],Object.assign({},common,{y:[1,1e18],ylog:true,ystep:3,h:170,ylabel:'濃度 (cm^{-3})',noxlab:false,xlabel:'位置 x (μm)',m:{l:72,r:16,t:8,b:40}}));
    P.rect(-xp,xn,'fill-dep');P.fn(nf,'ln-e',-2,2,900);P.fn(pf,'ln-h',-2,2,900);
    P.hline(ni0,'ln-mu dash');P.label(-1.97,ni0*4,'n_{i}',{class:'mu'});
    P.label(-1.9,JP.NA/30,'p_{p} ≈ N_{A}',{class:'t-h','font-weight':700});P.label(1.9,JP.ND/30,'n_{n} ≈ N_{D}',{class:'t-e','font-weight':700,'text-anchor':'end'});
    P.label(-1.9,np0*5,'n_{p}',{class:'t-e','font-weight':700});P.label(1.9,pn0*5,'p_{n}',{class:'t-h','font-weight':700,'text-anchor':'end'});
    const Cj=epsSi/c.W*1e7;const Emax=q*JP.NA*c.xp/epsSi/1e3;
    ro.innerHTML=`<span>V<sub>0</sub> = <b>${c.V0.toFixed(3)} V</b></span><span>位障 V<sub>0</sub>−V = <b>${c.Vb.toFixed(3)} V</b></span><span>W = <b>${(c.W*1e4).toFixed(3)} μm</b></span><span>x<sub>p</sub> / x<sub>n</sub> = <b>${xp.toFixed(3)} / ${xn.toFixed(3)}</b> μm</span><span>|E|<sub>max</sub> = <b>${Emax.toFixed(1)} kV/cm</b></span><span>C<sub>j</sub> = <b>${Cj.toFixed(3)} fF/μm²</b></span><span>I/I<sub>S</sub> = e<sup>V/V<sub>T</sub></sup>−1 = <b>${sci(ex-1,2)}</b></span>`;
  };
  inp.addEventListener('input',draw);draw();}
document.querySelectorAll('.jw').forEach(makeJW);

// capacitor analogy
(function(){const s=$('#f-cap');s.setAttribute('viewBox','0 0 420 200');
  const cap=(x1,x2,lab1,lab2)=>{L(s,x1,40,x1,140,'ln-neg thick');L(s,x2,40,x2,140,'ln-pos thick');
    for(let y=52;y<135;y+=20){T(s,x1-12,y+5,'−',{'text-anchor':'middle',class:'t-neg','font-size':14,'font-weight':700});T(s,x2+12,y+5,'+',{'text-anchor':'middle',class:'t-pos','font-size':14,'font-weight':700});}
    L(s,x1,158,x2,158,'ln-mu thin','a-mu','a-mu');T(s,(x1+x2)/2,175,'W',{'text-anchor':'middle','font-size':13,'font-style':'italic'});
    T(s,(x1+x2)/2,22,lab1,{'text-anchor':'middle','font-size':13,'font-weight':700});T(s,(x1+x2)/2,195,lab2,{'text-anchor':'middle','font-size':12,class:'mu'});
    for(let y=60;y<130;y+=22)L(s,x2-4,y,x1+6,y,'ln-fg thin','a-fg');};
  cap(70,120,'V_{R} 小','W 小 → C_{j} 大');cap(230,360,'V_{R} 大','W 大 → C_{j} 小');
})();

// Cj plot
(function(){const NA=2e16,ND=9e15;const V0=VT*Math.log(NA*ND/ni0**2);const Cj0=Math.sqrt(epsSi*q/2*NA*ND/(NA+ND)/V0)*1e7;
  const P=plot($('#f-cj'),{x:[0,5],y:[0,0.3],xlabel:'逆偏電壓 V_{R} (V)',ylabel:'C_{j} (fF/μm²)',h:280});
  P.fn(V=>Cj0/Math.sqrt(1+V/V0),'ln-acc');P.dot(0,Cj0);P.label(0.12,Cj0-0.012,'C_{j0} = '+Cj0.toFixed(3),{'font-weight':700});
  const c1=Cj0/Math.sqrt(1+1/V0);P.dot(1,c1);P.label(1.1,c1+0.012,'V_{R} = 1 V：'+c1.toFixed(3),{'font-weight':700});
  P.label(4.9,0.27,'V_{0} = '+V0.toFixed(2)+' V',{'text-anchor':'end',class:'mu'});
})();

// LC circuit
(function(){const s=$('#f-lc');s.setAttribute('viewBox','0 0 320 230');
  E('path',{d:'M60,40 H220',class:'wire'},s);E('path',{d:'M60,190 H220',class:'wire'},s);
  E('path',{d:'M60,40 V70 a10,10 0 0 1 0,20 a10,10 0 0 1 0,20 a10,10 0 0 1 0,20 a10,10 0 0 1 0,20 V190',class:'wire'},s);
  T(s,34,120,'L',{'font-size':16,'font-style':'italic','text-anchor':'middle'});
  E('path',{d:'M220,40 V96',class:'wire'},s);E('path',{d:'M220,128 V190',class:'wire'},s);
  E('polygon',{points:'204,128 236,128 220,102',style:'fill:none;stroke:var(--fg);stroke-width:1.6'},s);
  L(s,204,102,236,102,'ln-fg thick');L(s,204,95,236,95,'ln-fg thick');
  T(s,246,118,'C_{j}(V_{R})',{'font-size':13});
  E('path',{d:'M220,40 H240 l4,-7 l8,14 l8,-14 l8,14 l8,-14 l4,7 H296',class:'wire'},s);E('circle',{cx:300,cy:40,r:4,class:'ln-fg'},s);
  T(s,300,24,'V_{cont}',{'text-anchor':'middle','font-size':13});
  L(s,140,190,140,204,'wire');L(s,126,204,154,204,'ln-fg');L(s,131,209,149,209,'ln-fg');L(s,136,214,144,214,'ln-fg');
})();

// f vs VR
(function(){const V0=VT*Math.log(2e16*9e15/ni0**2);const f=V=>2*Math.pow(1+V/V0,0.25);
  const P=plot($('#f-fvr'),{x:[0,2],y:[1.9,2.9],xlabel:'V_{R} (V)',ylabel:'f (GHz)',w:360,h:260,m:{l:52}});
  P.fn(f,'ln-acc');P.dot(0,2);P.dot(2,f(2));P.label(0.1,1.97,'2.00 GHz',{'font-weight':700});P.label(1.9,f(2)+0.04,f(2).toFixed(2)+' GHz',{'text-anchor':'end','font-weight':700});
})();

// barrier
(function(){const s=$('#f-barrier');s.setAttribute('viewBox','0 0 680 230');
  [['平衡',70,'qV_{0}',3],['逆偏',115,'q(V_{0}+V_{R})',0],['順偏',28,'q(V_{0}−V_{F})',9]].forEach(([t,h,lab,n],k)=>{const ox=10+210*k,b=165;
    E('path',{d:`M${ox+10},${b} L${ox+70},${b} C${ox+95},${b} ${ox+95},${b-h} ${ox+120},${b-h} L${ox+195},${b-h}`,class:'ln-fg'},s);
    E('path',{d:`M${ox+10},${b} L${ox+70},${b} C${ox+95},${b} ${ox+95},${b-h} ${ox+120},${b-h} L${ox+195},${b-h} L${ox+195},${b+20} L${ox+10},${b+20}z`,class:'fill-dep'},s);
    for(let i=0;i<6;i++)hole(s,ox+20+i*9,b-7-(i%2)*9,4.5);
    for(let i=0;i<n;i++)hole(s,ox+132+(i%5)*12,b-h-8-Math.floor(i/5)*10,4);
    if(n>0)E('path',{d:`M${ox+60},${b-22} Q${ox+92},${b-h-30} ${ox+128},${b-h-12}`,class:'ln-h'+(n>5?' thick':''),'marker-end':'url(#a-h)'},s);
    else{E('path',{d:`M${ox+60},${b-22} Q${ox+78},${b-60} ${ox+86},${b-38}`,class:'ln-h dash','marker-end':'url(#a-h)'},s);T(s,ox+60,b-70,'越不過',{'font-size':12,class:'t-h'});}
    L(s,ox+160,b,ox+160,b-h,'ln-mu thin','a-mu','a-mu');T(s,ox+165,b-h/2+4,lab,{'font-size':12});
    T(s,ox+100,215,t,{'text-anchor':'middle','font-size':14,'font-weight':700});
    T(s,ox+15,b+15,'p',{'font-size':12,class:'t-h'});T(s,ox+188,b+15,'n',{'font-size':12,class:'t-e','text-anchor':'end'});});
  T(s,8,16,'電洞位能',{'font-size':12,class:'mu'});
})();

// minority profiles (linear)
(function(){const P=plot($('#f-minprof'),{x:[-3,3],y:[0,2.3],xticks:[-3,-2,-1,0,1,2,3],yticks:[0,1,2],xlabel:'位置 x（任意單位）',ylabel:'超量少數載子（相對）',w:340,h:260,m:{l:50,r:12}});
  P.rect(-0.15,0.15,'fill-dep');
  P.fn(x=>x< -0.15?Math.exp((x+0.15)/0.8):NaN,'ln-e',-3,-0.15);P.fn(x=>x>0.15?2*Math.exp(-(x-0.15)/1.0):NaN,'ln-h',0.15,3);
  P.label(-2.9,1.15,'Δn_{p}(x)',{class:'t-e','font-weight':700});P.label(0.4,2.1,'Δp_{n}(x)',{class:'t-h','font-weight':700});
  P.label(-0.95,0.15,'← L_{n}',{class:'mu'});P.label(1.25,0.85,'L_{p} →',{class:'mu'});
  P.label(-2.9,2.1,'p 側',{class:'t-h'});P.label(2.9,1.6,'n 側',{class:'t-e','text-anchor':'end'});
})();

// current composition
(function(){const In0=0.6,Ip0=0.4,Ln=20,Lp=30,d=2;
  const Ip=x=>x>d?Ip0*Math.exp(-(x-d)/Lp):x<-d?1-In0*Math.exp((x+d)/Ln):Ip0;
  const P=plot($('#f-curcomp'),{x:[-80,80],y:[0,1.15],yticks:[0,0.5,1],xlabel:'位置 x (μm)',ylabel:'電流（相對 I_{tot}）',w:340,h:260,m:{l:50,r:12}});
  const pts=[];for(let i=0;i<=320;i++){const x=-80+i/2;pts.push([x,Ip(x)]);}
  P.poly([[-80,0],...pts,[80,0]],'fill-h');P.poly([[-80,1],...pts,[80,1]],'fill-e');P.path(pts,'ln-fg');P.hline(1,'ln-fg');P.rect(-d,d,'fill-dep');
  P.label(-77,0.5,'電洞（多數）',{class:'t-h','font-weight':700});P.label(-77,0.42,'漂移',{class:'t-h'});
  P.label(77,0.62,'電子（多數）',{class:'t-e','font-weight':700,'text-anchor':'end'});P.label(77,0.54,'漂移',{class:'t-e','text-anchor':'end'});
  P.label(-30,0.9,'電子擴散',{class:'t-e','text-anchor':'middle'});P.label(26,0.1,'電洞擴散',{class:'t-h','text-anchor':'middle'});
  P.label(0,1.08,'I_{tot}（處處相同）',{'text-anchor':'middle','font-weight':700});
})();

// IV widget
function drawIV(){const ls=+$('#isS').value,Is=10**ls;$('#isSo').innerHTML=sci(Is,2)+' A';
  const V1=VT*Math.log(1e-3/Is),V10=VT*Math.log(1e-2/Is);
  let P=plot($('#f-iv-lin'),{x:[-0.4,1.0],y:[-1,10],xticks:[-0.4,0,0.4,0.8],xlabel:'V_{D} (V)',ylabel:'I_{D} (mA)',w:340,h:280,m:{l:50,r:12}});
  P.fn(V=>Is*(Math.exp(V/VT)-1)*1e3,'ln-acc',-0.4,1.0,600);P.dot(V1,1);P.label(V1-0.03,1.6,'1 mA @ '+V1.toFixed(3)+' V',{'text-anchor':'end'});
  P.label(0.02,0.7,'逆偏：I_{D} ≈ −I_{S} ≈ 0',{class:'mu'});
  P=plot($('#f-iv-log'),{x:[0,1.0],y:[1e-18,1],ylog:true,ystep:3,xticks:[0,0.2,0.4,0.6,0.8,1],xlabel:'V_{D} (V)',ylabel:'I_{D} (A)',w:340,h:280,m:{l:56,r:12}});
  P.fn(V=>Is*(Math.exp(V/VT)-1),'ln-acc',0.001,1.0,600);P.hline(Is,'ln-mu dash');P.label(0.98,Is*8,'I_{S}',{'text-anchor':'end',class:'mu'});
  P.dot(V1,1e-3);P.dot(V10,1e-2);P.label(V1-0.02,2e-2,'×10 ⟺ +60 mV',{'text-anchor':'end','font-weight':700});
  $('#isR').innerHTML=`<span>I<sub>D</sub> = 1 mA 時 V<sub>D</sub> = <b>${V1.toFixed(3)} V</b></span><span>I<sub>D</sub> = 10 mA 時 V<sub>D</sub> = <b>${V10.toFixed(3)} V</b></span><span>差 = <b>${((V10-V1)*1e3).toFixed(1)} mV</b></span>`;}
$('#isS').addEventListener('input',drawIV);drawIV();

// CVM
(function(){const Is=2e-16;const P=plot($('#f-cvm'),{x:[0,1.0],y:[-0.3,5],xlabel:'V_{D} (V)',ylabel:'I_{D} (mA)',w:340,h:260,m:{l:46,r:12}});
  P.fn(V=>Is*(Math.exp(V/VT)-1)*1e3,'ln-mu',0,1,500);P.path([[0,0],[0.8,0],[0.8,5]],'ln-acc thick');
  P.label(0.79,4.5,'V_{D,on} = 0.8 V',{'text-anchor':'end','font-weight':700});P.label(0.05,0.35,'截止：I = 0',{class:'t-acc'});
})();
(function(){const s=$('#f-cvm-ckt');s.setAttribute('viewBox','0 0 320 220');
  T(s,80,22,'V_{D} < V_{D,on}',{'text-anchor':'middle','font-size':13,'font-weight':700});
  L(s,80,40,80,95,'wire');L(s,80,125,80,180,'wire');E('circle',{cx:80,cy:40,r:4,class:'ln-fg'},s);E('circle',{cx:80,cy:180,r:4,class:'ln-fg'},s);
  T(s,92,115,'開路',{'font-size':13,class:'t-acc'});T(s,80,205,'截止',{'text-anchor':'middle','font-size':12,class:'mu'});
  T(s,240,22,'導通',{'text-anchor':'middle','font-size':13,'font-weight':700});
  L(s,240,40,240,100,'wire');L(s,240,116,240,180,'wire');E('circle',{cx:240,cy:40,r:4,class:'ln-fg'},s);E('circle',{cx:240,cy:180,r:4,class:'ln-fg'},s);
  E('line',{x1:222,y1:100,x2:258,y2:100,class:'ln-fg thick'},s);E('line',{x1:230,y1:116,x2:250,y2:116,class:'ln-fg thick'},s);
  T(s,214,96,'+',{'font-size':14,'text-anchor':'middle'});T(s,266,112,'V_{D,on}',{'font-size':13});
  T(s,240,205,'固定壓降',{'text-anchor':'middle','font-size':12,class:'mu'});
  T(s,28,44,'陽極',{'font-size':11,class:'mu','text-anchor':'middle'});T(s,28,184,'陰極',{'font-size':11,class:'mu','text-anchor':'middle'});
})();

// iteration
(function(){const s=$('#f-itckt');s.setAttribute('viewBox','0 0 340 200');
  E('circle',{cx:50,cy:100,r:22,class:'ln-fg'},s);T(s,50,96,'+',{'text-anchor':'middle','font-size':14});T(s,50,114,'−',{'text-anchor':'middle','font-size':14});
  T(s,14,104,'V_{X}',{'text-anchor':'middle','font-size':13});
  E('path',{d:'M50,78 V30 H110 l5,-8 l10,16 l10,-16 l10,16 l10,-16 l5,8 H230 V78',class:'wire'},s);T(s,140,58,'R = 1 kΩ',{'text-anchor':'middle','font-size':12});
  E('polygon',{points:'214,78 246,78 230,104',style:'fill:var(--fg);stroke:var(--fg)'},s);L(s,214,106,246,106,'ln-fg thick');
  E('path',{d:'M230,106 V170 H50 V122',class:'wire'},s);T(s,254,96,'D',{'font-size':13});T(s,254,114,'I_{S} = 2×10^{-16} A',{'font-size':11,class:'mu'});
  L(s,80,30,100,30,'ln-acc thin','a-acc');T(s,90,22,'I',{'text-anchor':'middle','font-size':12,class:'t-acc'});
})();
function drawIt(){const Vx=+$('#itV').value,R=1e3,Is=2e-16;$('#itVo').textContent=Vx.toFixed(2)+' V';
  let VD=0.8;const rows=[];for(let k=0;k<7;k++){const I=(Vx-VD)/R;const VDn=VT*Math.log(I/Is);rows.push([k+1,VD,I,VDn]);const done=Math.abs(VDn-VD)<5e-5;VD=VDn;if(done)break;}
  const If=(Vx-VD)/R;
  $('#itTbl').innerHTML='<tr><th>#</th><th>假設 V<sub>D</sub></th><th>I (mA)</th><th>新 V<sub>D</sub></th></tr>'+rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1].toFixed(4)}</td><td>${(r[2]*1e3).toFixed(4)}</td><td>${r[3].toFixed(4)}</td></tr>`).join('')+
    `<tr><td colspan="4">收斂：I ≈ <b>${(If*1e3).toFixed(3)} mA</b>，V<sub>D</sub> ≈ <b>${VD.toFixed(3)} V</b>；定電壓模型：${((Vx-0.8)/R*1e3).toFixed(3)} mA（誤差 ${(((Vx-0.8)/R/If-1)*100).toFixed(1)}%）</td></tr>`;
  const ymax=Vx/R*1e3*1.1;const P=plot($('#f-itload'),{x:[0,Math.min(Vx,1.2)*1.0+0.0001],y:[0,ymax],xlabel:'V_{D} (V)',ylabel:'I (mA)',w:340,h:280,m:{l:50,r:12}});
  P.fn(V=>Is*(Math.exp(V/VT)-1)*1e3,'ln-acc',0,Math.min(Vx,1.2),500);P.fn(V=>(Vx-V)/R*1e3,'ln-fg dash',0,Math.min(Vx,1.2),10);
  P.dot(VD,If*1e3);P.label(VD-0.03,If*1e3-ymax*0.07,'('+VD.toFixed(3)+' V, '+(If*1e3).toFixed(3)+' mA)',{'text-anchor':'end','font-weight':700,class:'halo'});
  P.label(0.03,ymax*0.3,'- - 電阻線 I = (V_{X} − V)/R',{});P.label(0.03,ymax*0.22,'— 二極體特性',{class:'t-acc'});}
$('#itV').addEventListener('input',drawIt);
document.querySelectorAll('#itPre button').forEach(b=>b.addEventListener('click',()=>{$('#itV').value=b.dataset.v;drawIt();}));drawIt();

// breakdown
(function(){const Is=1e-14,VBD=6;const I=V=>(Is*(Math.exp(V/VT)-1)-1e-6*Math.exp((-VBD-V)/0.1))*1e3;
  const P=plot($('#f-bd'),{x:[-8,1.2],y:[-10,10],xticks:[-8,-6,-4,-2,0,1],xlabel:'V_{D} (V)',ylabel:'I_{D} (mA)',h:280});
  P.fn(I,'ln-acc',-8,1.2,1500);P.vline(-VBD);
  P.label(-VBD+0.15,-8.5,'−V_{BD}',{'font-weight':700});P.label(-5.8,-5,'← 崩潰區：電流急增',{class:'t-warn','font-weight':700});
  P.label(-4.5,1.2,'逆偏：I ≈ −I_{S}',{class:'mu'});P.label(0.6,8,'順偏導通',{'text-anchor':'end','font-weight':700});
})();

// zener
(function(){const s=$('#f-zener');s.setAttribute('viewBox','0 0 620 230');const cx=310,half=40,top=40,bot=200;
  E('rect',{x:60,y:top,width:cx-60,height:bot-top,class:'preg'},s);E('rect',{x:cx,y:top,width:560-cx,height:bot-top,class:'nreg'},s);
  E('rect',{x:cx-half,y:top,width:2*half,height:bot-top,class:'dep'},s);
  for(let y=top+14;y<bot;y+=18){ion(s,cx-28,y,-1);ion(s,cx-10,y,-1);ion(s,cx+10,y,1);ion(s,cx+28,y,1);}
  L(s,cx+70,26,cx-70,26,'ln-fg thick','a-fg');T(s,cx+78,31,'E 極強（約 10^{6} V/cm）',{'font-size':13,'font-weight':700});
  T(s,120,top+24,'p⁺（重摻雜）',{'font-size':13,class:'t-h','font-weight':700});T(s,500,top+24,'n⁺（重摻雜）',{'font-size':13,class:'t-e','font-weight':700,'text-anchor':'end'});
  // zoomed bond callout
  E('circle',{cx:185,cy:130,r:52,class:'ln-mu dash'},s);L(s,236,124,cx-half,120,'ln-mu thin');
  L(s,160,130,210,130,'bond');E('circle',{cx:160,cy:130,r:15,class:'atom'},s);E('circle',{cx:210,cy:130,r:15,class:'atom'},s);
  T(s,160,134,'Si',{'text-anchor':'middle','font-size':11});T(s,210,134,'Si',{'text-anchor':'middle','font-size':11});
  hole(s,185,130,5);dot(s,226,100,5);E('path',{d:'M188,124 Q205,100 220,100',class:'ln-e','marker-end':'url(#a-e)'},s);
  L(s,180,140,150,165,'ln-h thin','a-h');
  T(s,175,198,'局部放大：鍵結電子被電場拉出',{'text-anchor':'middle','font-size':12,class:'mu'});
  T(s,440,140,'電子 → n 側',{'font-size':12,class:'t-e'});L(s,380,136,432,136,'ln-e','a-e');
  T(s,440,165,'空乏區很窄',{'font-size':12,class:'mu'});
})();

// avalanche
(function(){const s=$('#f-aval');s.setAttribute('viewBox','0 0 640 250');
  E('rect',{x:20,y:20,width:600,height:200,class:'fill-dep'},s);
  L(s,170,34,40,34,'ln-fg','a-fg');T(s,178,39,'E（電子逆電場加速）',{'font-size':13,'font-weight':700});
  const burst=(x,y)=>{const pts=[];for(let i=0;i<16;i++){const r=i%2?5:11,a=i*Math.PI/8;pts.push((x+r*Math.cos(a)).toFixed(1)+','+(y+r*Math.sin(a)).toFixed(1));}E('polygon',{points:pts.join(' '),class:'burst'},s);};
  const levels=[[40,128]];let cur=levels;const xs=[40,175,315,455,595];
  for(let lv=0;lv<4;lv++){const nxt=[];const spread=[46,23,11,0][lv];
    cur.forEach(([x,y])=>{const xc=xs[lv+1]-14;dot(s,x,y,5);L(s,x+7,y,xc-12,y,'ln-e','a-e');
      if(lv<3){burst(xc,y);hole(s,xc-8,y+16,4);L(s,xc-14,y+20,xc-34,y+28,'ln-h thin','a-h');
        nxt.push([xc+8,y-spread]);nxt.push([xc+8,y+spread]);
        L(s,xc+4,y-3,xc+8,y-spread+4,'ln-e thin');L(s,xc+4,y+3,xc+8,y+spread-4,'ln-e thin');}
      else{dot(s,xc+6,y,5);}});
    cur=nxt;if(lv===2)break;}
  cur.forEach(([x,y])=>{dot(s,x,y,4.5);L(s,x+7,y,x+60,y,'ln-e thin','a-e');});
  T(s,100,112,'加速',{'font-size':12,'text-anchor':'middle',class:'mu'});T(s,161,160,'碰撞游離',{'font-size':12,'text-anchor':'middle',class:'t-pos'});
  T(s,320,240,'1 → 2 → 4 → 8 …　載子數量倍增（每次碰撞也產生一個電洞，向反方向漂移）',{'font-size':12.5,'text-anchor':'middle'});
})();

