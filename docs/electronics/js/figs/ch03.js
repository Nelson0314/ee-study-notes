/* 第 3 章圖檔：每個區塊對應 .md 中一個 <svg id> 或互動元件。 */
/* ================= figures ================= */
// symbol
(function(){const s=$('#f-sym');s.setAttribute('viewBox','0 0 320 150');
  W(s,'M40,70 H90');dio(s,90,70,230,70);W(s,'M230,70 H280');nd(s,40,70);nd(s,280,70);
  lb(s,40,100,'陽極',{'text-anchor':'middle','font-size':12,class:'mu'});lb(s,280,100,'陰極',{'text-anchor':'middle','font-size':12,class:'mu'});
  lb(s,40,52,'+',{'text-anchor':'middle','font-size':15});lb(s,280,52,'−',{'text-anchor':'middle','font-size':15});
  lb(s,160,42,'V_{D}',{'text-anchor':'middle'});
  L(s,120,118,200,118,'ln-acc','a-acc');lb(s,160,138,'I_{D}',{'text-anchor':'middle',class:'t-acc'});
})();
// ideal I/V
(function(){const P=plot($('#f-ideal'),{w:380,h:260,x:[-2,1],y:[-1,5],xlabel:'V_{D} (V)',ylabel:'I_{D} (mA)',m:{l:46}});
  P.path([[-2,0],[0,0],[0,6]],'ln-acc thick');
  P.label(-1.85,1.1,'逆偏：開路',{class:'mu'});P.label(0.08,3.5,'順偏：短路',{class:'t-acc'});
})();
// half-wave circuit generator
function hwCkt(id,withC){const s=$(id);s.setAttribute('viewBox','0 0 360 200');
  src(s,50,100,'ac');lb(s,14,104,'V_{in}',{'text-anchor':'middle'});
  W(s,'M50,82 V40 H100');dio(s,100,40,170,40);lb(s,135,24,'D',{'text-anchor':'middle'});
  W(s,'M170,40 H290');nd(s,290,40);lb(s,300,44,'V_{out}');
  if(withC){W(s,'M210,40 V70');cap(s,210,70,210,130);W(s,'M210,130 V170');lb(s,226,104,'C');nd(s,210,40);nd(s,210,170);}
  W(s,'M290,40 V65');res(s,290,65,290,145);W(s,'M290,145 V170');lb(s,306,108,'R_{L}');
  W(s,'M50,118 V170 H290');gnd(s,150,188);W(s,'M150,170 V180');}
hwCkt('#f-hw1',false);hwCkt('#f-pk',true);
// half-wave wave
(function(){const Vp=3,T0=1/60;const P=plot($('#f-hw1w'),{w:420,h:260,x:[0,2*T0*1e3],y:[-3.5,3.5],xlabel:'t (ms)',ylabel:'電壓 (V)',m:{l:46}});
  const vin=t=>Vp*Math.sin(2*Math.PI*60*t/1e3);
  P.fn(vin,'ln-mu');P.fn(t=>Math.max(0,vin(t)),'ln-e dash');P.fn(t=>Math.max(0,vin(t)-VON),'ln-acc');
  P.label(1.0,-2.8,'V_{in}',{class:'mu'});P.label(5.2,3.15,'V_{out}',{class:'t-acc'});
})();
// models
(function(){const P=plot($('#f-models'),{w:640,h:300,x:[-0.4,1.1],y:[-0.5,5],xlabel:'V_{D} (V)',ylabel:'I_{D} (mA)'});
  P.path([[-0.4,0],[0,0],[0,6]],'ln-mu');P.path([[-0.4,0],[VON,0],[VON,6]],'ln-acc');
  P.fn(v=>IS*(Math.exp(v/VT)-1)*1e3,'ln-h',-0.4,1.1,600);
  P.label(0.02,4.4,'理想',{class:'mu'});P.label(0.82,4.4,'定電壓 0.8 V',{class:'t-acc'});P.label(0.52,1.6,'指數模型',{class:'t-h'});
  [0.1,5].forEach(I=>{const v=VT*Math.log(I*1e-3/IS);P.dot(v,I,'mdot',4);});
})();
// transfer characteristic circuits
(function(){const s=$('#f-tcA');s.setAttribute('viewBox','0 0 320 200');
  src(s,40,100,'ac');lb(s,40,140,'V_{in}',{'text-anchor':'middle'});W(s,'M40,82 V40 H70');res(s,70,40,150,40);lb(s,110,24,'R',{'text-anchor':'middle'});
  W(s,'M150,40 H260');nd(s,200,40);nd(s,260,40);lb(s,268,44,'V_{out}');
  dio(s,200,40,200,100);bat(s,200,100,200,160);lb(s,214,74,'D');lb(s,214,134,'V_{B}');lb(s,186,126,'+',{'font-size':12});
  W(s,'M200,160 V175 H40 V118');gnd(s,120,193);W(s,'M120,175 V185');})();
(function(){const s=$('#f-tcB');s.setAttribute('viewBox','0 0 320 200');
  src(s,40,100,'ac');lb(s,40,140,'V_{in}',{'text-anchor':'middle'});W(s,'M40,82 V40 H80');dio(s,80,40,160,40);lb(s,120,24,'D',{'text-anchor':'middle'});
  W(s,'M160,40 H260');nd(s,210,40);nd(s,260,40);lb(s,268,44,'V_{out}');
  W(s,'M210,40 V60');res(s,210,60,210,150);lb(s,226,110,'R');W(s,'M210,150 V175 H40 V118');gnd(s,120,193);W(s,'M120,175 V185');})();
let tcC='A',tcM='cvd';
function tcOut(vin,VB){const R=1e3;
  if(tcC==='A'){if(tcM==='ideal')return Math.min(vin,VB);if(tcM==='cvd')return Math.min(vin,VB+VON);
    return bisect(v=>IS*(Math.exp((v-VB)/VT)-1)-(vin-v)/R,Math.min(vin,VB)-1,vin+1e-9);}
  if(tcM==='ideal')return Math.max(0,vin);if(tcM==='cvd')return Math.max(0,vin-VON);
  return bisect(v=>v/R-IS*(Math.exp((vin-v)/VT)-1),-1e-9,Math.max(vin,0)+1e-9);}
function drawTC(){const VB=+$('#tcVB').value;$('#tcVBo').textContent=VB.toFixed(2)+' V';$('#tcVB').disabled=tcC!=='A';
  const P=plot($('#f-tc'),{w:640,h:320,x:[-2,4],y:[-2,4],xlabel:'V_{in} (V)',ylabel:'V_{out} (V)'});
  P.fn(v=>v,'ln-mu dash');P.fn(v=>tcOut(v,VB),'ln-acc',-2,4,300);
  const brk=tcC==='A'?(tcM==='ideal'?VB:VB+VON):(tcM==='ideal'?0:VON);
  if(tcM!=='exp'){P.dot(brk,tcOut(brk,VB));P.label(brk+0.08,tcOut(brk,VB)-0.25,'轉折點 ('+brk.toFixed(2)+', '+tcOut(brk,VB).toFixed(2)+')',{class:'t-acc'});}
  const r=[1,3].map(v=>`V<sub>in</sub> = ${v} V → V<sub>out</sub> = <b>${tcOut(v,VB).toFixed(3)} V</b>`);
  $('#tcR').innerHTML=`<span>轉折點 V<sub>in</sub> ≈ <b>${tcM==='exp'?'（平滑，無明確折點）':brk.toFixed(2)+' V'}</b></span><span>${r[0]}</span><span>${r[1]}</span>`;}
segInit('#tcC',v=>{tcC=v;drawTC();});segInit('#tcM',v=>{tcM=v;drawTC();});$('#tcVB').addEventListener('input',drawTC);drawTC();

// small signal
function drawSS(){const I1=1e-3*10**(+$('#ssI').value),dV=+$('#ssV').value*1e-3;
  $('#ssIo').textContent=(I1*1e3).toPrecision(3)+' mA';$('#ssVo').textContent=(dV*1e3).toFixed(0)+' mV';
  const V1=VT*Math.log(I1/IS),rd=VT/I1;const exact=I1*(Math.exp(dV/VT)-1),lin=dV/rd;
  const Imax=I1*Math.exp(0.045/VT)*1e3;
  const P=plot($('#f-ss'),{w:640,h:320,x:[V1-0.08,V1+0.05],y:[0,Imax],xlabel:'V_{D} (V)',ylabel:'I_{D} (mA)',xfmt:v=>v.toFixed(2)});
  P.fn(v=>IS*Math.exp(v/VT)*1e3,'ln-h');P.fn(v=>(I1+(v-V1)/rd)*1e3,'ln-acc dash');
  P.rect(V1,V1+dV,'fill-acc');P.dot(V1,I1*1e3);
  P.dot(V1+dV,(I1+exact)*1e3,'mdot',4);P.dot(V1+dV,(I1+lin)*1e3,'mdot',4);
  P.label(V1-0.075,I1*1e3+Imax*0.05,'工作點 ('+V1.toFixed(3)+' V, '+(I1*1e3).toPrecision(3)+' mA)',{class:'t-acc'});
  $('#ssR').innerHTML=`<span>r<sub>d</sub> = V<sub>T</sub>/I<sub>D1</sub> = <b>${rd<1000?rd.toFixed(1)+' Ω':(rd/1e3).toFixed(2)+' kΩ'}</b></span><span>ΔI（切線）= <b>${(lin*1e3).toPrecision(3)} mA</b></span><span>ΔI（精確）= <b>${(exact*1e3).toPrecision(3)} mA</b></span><span>相對誤差 = <b>${((exact-lin)/exact*100).toFixed(1)} %</b></span>`;}
['#ssI','#ssV'].forEach(i=>$(i).addEventListener('input',drawSS));drawSS();

// bridge
(function(){const s=$('#f-bridge');s.setAttribute('viewBox','0 0 420 240');
  const Tn=[200,40],Rn=[270,110],Bn=[200,180],Ln=[130,110];
  src(s,50,110,'ac');lb(s,14,114,'V_{in}',{'text-anchor':'middle'});
  W(s,'M50,92 V40 H200');W(s,'M50,128 V180 H200');
  dio(s,...Tn,...Rn);dio(s,...Bn,...Rn);dio(s,...Ln,...Tn);dio(s,...Ln,...Bn);
  [Tn,Rn,Bn,Ln].forEach(p=>nd(s,...p));
  lb(s,246,66,'D_{1}');lb(s,246,166,'D_{2}');lb(s,138,66,'D_{3}');lb(s,138,166,'D_{4}');
  W(s,'M270,110 H350 V125');res(s,350,125,350,190);W(s,'M350,190 V220 H130 V110');
  lb(s,366,162,'R_{L}');lb(s,330,100,'+',{'font-size':15});lb(s,330,214,'−',{'font-size':15});lb(s,362,100,'V_{out}');
})();
// rectifier interactive
let rcT='half';
function drawRC(){const Vin=+$('#rcV').value,C=1e-6*10**(+$('#rcC').value),RL=10**(+$('#rcRL').value),f=60,Tp=1/f;
  $('#rcVo').textContent=Vin.toFixed(1)+' V';$('#rcCo').textContent=C>=1e-3?(C*1e3).toFixed(2)+' mF':(C*1e6).toFixed(0)+' µF';
  $('#rcRLo').textContent=RL>=1e3?(RL/1e3).toFixed(2)+' kΩ':RL.toFixed(0)+' Ω';
  const full=rcT==='full',Vd=full?2*VON:VON,Vp=Vin-Vd,N=3,n=3000*N;let v=Vp;const pts=[],on=[];const tau=RL*C;
  let mn=1e9,mx=-1e9;
  for(let k=0;k<=n;k++){const t=k/n*N*Tp;let vs=Vin*Math.sin(2*Math.PI*f*t);if(full)vs=Math.abs(vs);const c=vs-Vd;
    let cond=false;if(c>=v){v=c;cond=true;}else v*=Math.exp(-(N*Tp/n)/tau);
    pts.push([t*1e3,v]);on.push(cond);if(t>=(N-1)*Tp){mn=Math.min(mn,v);mx=Math.max(mx,v);}}
  const P=plot($('#f-rc'),{w:640,h:320,x:[0,N*Tp*1e3],y:[full?0:-Vin*1.05,Vin*1.1],xlabel:'t (ms)',ylabel:'電壓 (V)'});
  let st=null;for(let k=0;k<=n;k++){if(on[k]&&st===null)st=pts[k][0];if((!on[k]||k===n)&&st!==null){P.rect(st,pts[k][0],'fill-acc');st=null;}}
  P.fn(tm=>{const x=Vin*Math.sin(2*Math.PI*f*tm/1e3);return full?Math.abs(x):x;},'ln-mu',0,N*Tp*1e3,800);
  P.path(pts.filter((_,i)=>i%3===0),'ln-e');
  const fe=full?2*f:f,VRf=Vp/(RL*C*fe),w=2*Math.PI*f,ang=Math.sqrt(2*Math.min(VRf,Vp)/Vp),Ip=C*w*Vp*ang+Vp/RL;
  const piv=full?Vin-VON:2*Vin-VON;
  $('#rcR').innerHTML=`<span>輸出峰值 V<sub>p</sub> = <b>${Vp.toFixed(2)} V</b></span><span>V<sub>R</sub>（模擬）= <b>${(mx-mn).toFixed(3)} V</b></span><span>V<sub>R</sub>（公式）= <b>${VRf.toFixed(3)} V</b></span><span>R<sub>L</sub>C / T<sub>in</sub> = <b>${(tau/Tp).toFixed(1)}</b></span><span>ωΔt ≈ <b>${ang.toFixed(3)} rad</b></span><span>I<sub>p</sub> ≈ <b>${Ip>=1?Ip.toFixed(2)+' A':(Ip*1e3).toFixed(0)+' mA'}</b></span><span>平均負載電流 ≈ <b>${((mx+mn)/2/RL*1e3).toFixed(1)} mA</b></span><span>PIV ≈ <b>${piv.toFixed(1)} V</b></span>`;}
segInit('#rcT',v=>{rcT=v;drawRC();});['#rcV','#rcC','#rcRL'].forEach(i=>$(i).addEventListener('input',drawRC));drawRC();

// regulator
(function(){const s=$('#f-reg');s.setAttribute('viewBox','0 0 320 260');
  src(s,50,130,'dc');lb(s,14,134,'V_{in}',{'text-anchor':'middle'});W(s,'M50,112 V40 H80');res(s,80,40,170,40);lb(s,125,24,'R',{'text-anchor':'middle'});
  W(s,'M170,40 H270');nd(s,200,40);nd(s,270,40);lb(s,276,44,'V_{out}');W(s,'M200,40 V55');
  dio(s,200,55,200,105);dio(s,200,105,200,155);dio(s,200,155,200,205);lb(s,216,84,'D_{1}');lb(s,216,134,'D_{2}');lb(s,216,184,'D_{3}');
  W(s,'M200,205 V225 H50 V148');gnd(s,120,243);W(s,'M120,225 V235');})();
(function(){const s=$('#f-regss');s.setAttribute('viewBox','0 0 320 260');
  src(s,50,130,'ac');lb(s,14,134,'Δv_{in}',{'text-anchor':'middle'});W(s,'M50,112 V40 H80');res(s,80,40,170,40);lb(s,125,24,'R',{'text-anchor':'middle'});
  W(s,'M170,40 H270');nd(s,200,40);nd(s,270,40);lb(s,276,44,'Δv_{out}');W(s,'M200,40 V55');
  res(s,200,55,200,105);res(s,200,105,200,155);res(s,200,155,200,205);lb(s,216,84,'r_{d}');lb(s,216,134,'r_{d}');lb(s,216,184,'r_{d}');
  W(s,'M200,205 V225 H50 V148');gnd(s,120,243);W(s,'M120,225 V235');})();

// limiter circuit
(function(){const s=$('#f-lim');s.setAttribute('viewBox','0 0 400 230');
  src(s,50,110,'ac');lb(s,14,114,'V_{in}',{'text-anchor':'middle'});W(s,'M50,92 V40 H80');res(s,80,40,150,40);lb(s,115,24,'R',{'text-anchor':'middle'});
  W(s,'M150,40 H340');nd(s,200,40);nd(s,270,40);nd(s,340,40);lb(s,346,44,'V_{out}');
  dio(s,200,40,200,105);bat(s,200,105,200,165);W(s,'M200,165 V195');lb(s,172,78,'D_{1}');lb(s,160,140,'V_{B1}');lb(s,210,128,'+',{'font-size':12});
  dio(s,270,105,270,40);bat(s,270,165,270,105);W(s,'M270,165 V195');lb(s,282,78,'D_{2}');lb(s,284,140,'V_{B2}');lb(s,256,152,'+',{'font-size':12});
  W(s,'M50,128 V195 H340');gnd(s,120,213);W(s,'M120,195 V205');})();
function drawLim(){const A=+$('#lmA').value,B1=+$('#lmB1').value,B2=+$('#lmB2').value;
  $('#lmAo').textContent=A.toFixed(1)+' V';$('#lmB1o').textContent=B1.toFixed(2)+' V';$('#lmB2o').textContent=B2.toFixed(2)+' V';
  const hi=B1+VON,lo=-(B2+VON),cl=v=>Math.max(lo,Math.min(hi,v));
  const P=plot($('#f-limtc'),{w:340,h:300,x:[-5,5],y:[-5,5],xlabel:'V_{in} (V)',ylabel:'V_{out} (V)',m:{l:44}});
  P.fn(v=>v,'ln-mu dash');P.fn(cl,'ln-acc');P.rect(-A,A,'fill-acc');P.dot(hi,hi);P.dot(lo,lo);
  P.label(hi+0.2,hi+0.5,hi.toFixed(2)+' V',{class:'t-acc'});P.label(lo+0.2,lo-0.4,lo.toFixed(2)+' V',{class:'t-acc'});
  const Q=plot($('#f-limw'),{w:340,h:300,x:[0,2],y:[-5,5],xlabel:'t / T',ylabel:'電壓 (V)',m:{l:44}});
  const vin=t=>A*Math.sin(2*Math.PI*t);Q.fn(vin,'ln-mu');Q.fn(t=>cl(vin(t)),'ln-e thick');Q.hline(hi);Q.hline(lo);
  const clipped=A>hi||A>-lo;
  $('#lmR').innerHTML=`<span>上限 V<sub>B1</sub> + V<sub>D,on</sub> = <b>${hi.toFixed(2)} V</b></span><span>下限 −(V<sub>B2</sub> + V<sub>D,on</sub>) = <b>${lo.toFixed(2)} V</b></span><span>輸出峰對峰 = <b>${(cl(A)-cl(-A)).toFixed(2)} V</b></span><span>狀態：<b>${clipped?'發生限幅':'未限幅（V<sub>out</sub> = V<sub>in</sub>）'}</b></span>`;}
['#lmA','#lmB1','#lmB2'].forEach(i=>$(i).addEventListener('input',drawLim));drawLim();

// doubler
(function(){const s=$('#f-dbl');s.setAttribute('viewBox','0 0 400 210');
  src(s,50,105,'ac');lb(s,14,109,'V_{in}',{'text-anchor':'middle'});W(s,'M50,87 V40 H85');cap(s,85,40,145,40);lb(s,115,22,'C_{1}',{'text-anchor':'middle'});
  W(s,'M145,40 H240');nd(s,190,40);lb(s,182,30,'X',{'text-anchor':'end'});
  dio(s,190,170,190,40);lb(s,200,110,'D_{1}');
  dio(s,240,40,300,40);lb(s,270,22,'D_{2}',{'text-anchor':'middle'});
  W(s,'M300,40 H360');nd(s,330,40);nd(s,360,40);lb(s,366,44,'V_{out}');W(s,'M330,40 V75');cap(s,330,75,330,145);lb(s,346,114,'C_{2}');W(s,'M330,145 V170');
  W(s,'M50,123 V170 H330');gnd(s,120,188);W(s,'M120,170 V180');})();
(function(){const Vp=1,N=6,n=6000;let vc1=0,vo=0;const pin=[],px=[],po=[];
  for(let k=0;k<=n;k++){const t=k/n*N,vin=Vp*Math.sin(2*Math.PI*t);let vx=vin-vc1;
    if(vx<0){vc1=vin;vx=0;}
    if(vx>vo){const d=(vx-vo)/2;vc1+=d;vo+=d;vx=vo;}
    if(k%4===0){pin.push([t,vin]);px.push([t,vx]);po.push([t,vo]);}}
  const P=plot($('#f-dblw'),{w:420,h:280,x:[0,N],y:[-1.2,2.3],xlabel:'t / T',ylabel:'電壓（以 V_{p} 為單位）',m:{l:50},yticks:[-1,0,1,2]});
  P.hline(2);P.path(pin,'ln-mu');P.path(px,'ln-pos');P.path(po,'ln-acc');
  P.label(0.1,-1.1,'V_{in}',{class:'mu'});P.label(4.3,0.15,'V_{X}',{class:'t-pos'});P.label(4.3,1.75,'V_{out}',{class:'t-acc'});
})();

/* ================= example / practice circuits ================= */
// generic: source → series element → shunt branches → output node
function shunt(id,o){const s=$(id);const xs=o.br.map((_,i)=>210+i*115);const xe=xs[xs.length-1]+(o.out?50:0);
  s.setAttribute('viewBox',`-95 0 ${xe+(o.out?95:130)+95} 250`);
  if(o.src==='dcac'){src(s,50,95,'ac');src(s,50,150,'dc');W(s,'M50,113 V132');W(s,'M50,77 V40 H80');W(s,'M50,168 V210');
    lb(s,22,99,o.vac||'Δv',{'text-anchor':'end'});lb(s,22,154,o.vin,{'text-anchor':'end'});}
  else{src(s,50,125,o.src||'ac');W(s,'M50,107 V40 H80');W(s,'M50,143 V210');lb(s,24,129,o.vin,{'text-anchor':'end'});}
  const [st,sl]=o.ser||['w',''];
  if(st==='r')res(s,80,40,150,40);else if(st==='d')dio(s,80,40,150,40);else if(st==='dr')dio(s,150,40,80,40);else W(s,'M80,40 H150');
  if(sl)lb(s,115,24,sl,{'text-anchor':'middle'});
  W(s,`M150,40 H${xe}`);W(s,`M50,210 H${xs[xs.length-1]}`);
  o.br.forEach((b,i)=>{const x=xs[i],n=b.length,h=150/n;W(s,`M${x},40 V50`);W(s,`M${x},200 V210`);if(i<xs.length-1||o.out)nd(s,x,40);
    b.forEach(([t,l],k)=>{const y0=50+k*h,y1=y0+h,yc=(y0+y1)/2;
      if(t==='r')res(s,x,y0,x,y1);else if(t==='d')dio(s,x,y0,x,y1);else if(t==='du')dio(s,x,y1,x,y0);
      else if(t==='b+'){bat(s,x,y0,x,y1);lb(s,x-14,yc-5,'+',{'font-size':12,'text-anchor':'middle'});}
      else if(t==='b-'){bat(s,x,y1,x,y0);lb(s,x-14,yc+15,'+',{'font-size':12,'text-anchor':'middle'});}
      if(l)lb(s,x+15,yc+5,l,{'font-size':12.5});});});
  if(o.out){nd(s,xe,40);lb(s,xe+8,44,o.out);}
  W(s,'M130,210 V220');gnd(s,130,228);
  if(o.cur){L(s,90,58,140,58,'ln-acc thin','a-acc');lb(s,115,74,o.cur,{'text-anchor':'middle','font-size':12,class:'t-acc'});}}

shunt('#e31',{vin:'V_{in}',ser:['d','D（理想）'],br:[[['r','R = 1 kΩ']]],cur:'I'});
shunt('#e32',{vin:'V_{in}',ser:['r','R_{1} = 1 kΩ'],br:[[['r','R_{2} = 1 kΩ']],[['d','D']]],out:'V_{X}'});
shunt('#e33',{vin:'V_{in}',ser:['r','R_{1}'],br:[[['r','R_{2}']],[['d','D'],['b+','V_{B}']]],out:'V_{out}'});
shunt('#e34',{src:'dcac',vin:'V_{D1}',vac:'ΔV_{D}',br:[[['d','D']]],cur:'I_{D1} + ΔI_{D}'});
shunt('#e36',{src:'dc',vin:'5 V ± 0.1 V',ser:['r','R = 1 kΩ'],br:[[['d','D_{1}'],['d','D_{2}'],['d','D_{3}']]],out:'V_{out}'});
shunt('#p31a',{vin:'V_{in}',ser:['dr','D（反接）'],br:[[['r','R = 2 kΩ']]],cur:'I'});
shunt('#p31b',{src:'dc',vin:'5 V',ser:['r','R = 1 kΩ'],br:[[['d','D_{1}']],[['d','D_{2}'],['b+','2 V']]],out:'V_{X}'});
shunt('#p32a',{src:'dc',vin:'2 V',ser:['r','R = 1 kΩ'],br:[[['d','D']]],cur:'I'});
shunt('#p32c',{src:'dc',vin:'3 V',ser:['r','R_{1} = 2 kΩ'],br:[[['r','R_{2} = 1 kΩ']],[['d','D']]],out:'V_{X}'});
shunt('#p33c',{vin:'V_{in}',ser:['r','R_{1} = 1 kΩ'],br:[[['r','R_{2} = 1 kΩ']],[['d','D'],['b+','0.2 V']]],out:'V_{out}'});
shunt('#p34c',{src:'dcac',vin:'1 V',vac:'±20 mV',ser:['r','R = 1 kΩ'],br:[[['d','D']]],out:'V_{D}'});
shunt('#p5b',{src:'dc',vin:'3 V ± 0.2 V',ser:['r','R = 500 Ω'],br:[[['d','D_{1}'],['d','D_{2}']]],out:'V_{out}'});
shunt('#p5c',{vin:'V_{in}',ser:['r','R'],br:[[['d','D_{1}'],['b+','V_{B1} = ?']],[['du','D_{2}'],['b-','V_{B2} = ?']]],out:'V_{out}'});

// example 3.5: annotated ripple waveform (ripple exaggerated for legibility)
(function(){const s=$('#e35');const Tn=1,tau=4.2;const n=3000,N=2.2;let v=1;const pts=[],on=[];
  for(let k=0;k<=n;k++){const t=k/n*N;const vi=Math.sin(2*Math.PI*(t+0.75)/Tn);const vin=vi;let c=false;if(vin>=v){v=vin;c=true;}else v*=Math.exp(-(N/n)/tau);pts.push([t,v,vin]);on.push(c);}
  const P=plot(s,{w:620,h:300,x:[0,N],y:[0,1.12],xlabel:'t（以 T_{in} 為單位）',ylabel:'V_{out}',yticks:[0,1],yfmt:v=>v?'V_{p}':'0',xticks:[0,1,2],m:{l:56}});
  let st=null;for(let k=0;k<=n;k++){if(on[k]&&st===null)st=pts[k][0];if((!on[k]||k===n)&&st!==null){if(pts[k][0]-st>0.01)P.rect(st,pts[k][0],'fill-acc');st=null;}}
  P.path(pts.map(p=>[p[0],p[2]]),'ln-mu dash');P.path(pts.map(p=>[p[0],p[1]]),'ln-e');
  const vmin=Math.min(...pts.filter(p=>p[0]>0.3&&p[0]<1.0).map(p=>p[1]));
  P.hline(1);P.hline(vmin);
  L(P.top,P.sx(0.55),P.sy(1),P.sx(0.55),P.sy(vmin),'ln-acc','a-acc','a-acc');P.label(0.57,(1+vmin)/2-0.02,'V_{R}',{class:'t-acc','font-size':13});
  L(P.top,P.sx(0),P.sy(0.12),P.sx(1),P.sy(0.12),'ln-mu','a-mu','a-mu');P.label(0.45,0.16,'T_{in}',{class:'mu','font-size':13});
  P.label(1.03,0.62,'Δt：D 導通',{class:'t-acc','font-size':12});
  P.label(1.22,0.35,'虛線：V_{in} − V_{D,on}（負半週未畫出）',{class:'mu','font-size':12});
})();

