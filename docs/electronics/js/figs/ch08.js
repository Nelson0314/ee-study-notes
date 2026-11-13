/* 第 8 章圖檔：每個區塊對應 ch08-op-amp.md 中的一個 <svg id>。規則見 AGENTS.md §7。 */

// op amp 符號與黑盒子模型
(function(){const s=$('#f-opsym');s.setAttribute('viewBox','0 0 540 175');
  const a=opamp(s,110,85,true);
  W(s,`M60,${a.p[1]} H110`);W(s,`M60,${a.n[1]} H110`);W(s,'M180,85 H220');nd(s,60,a.p[1]);nd(s,60,a.n[1]);nd(s,220,85);
  lb(s,56,a.p[1]-8,'V_{in1}',{'text-anchor':'end'});lb(s,56,a.n[1]-8,'V_{in2}',{'text-anchor':'end'});lb(s,226,80,'V_{out}');
  lb(s,145,150,'符號',{'text-anchor':'middle',class:'mu','font-size':12});
  // 模型：兩輸入端開路、輸出為受控電壓源
  nd(s,310,45);nd(s,310,125);lb(s,302,40,'+',{'text-anchor':'end'});lb(s,302,130,'−',{'text-anchor':'end'});
  lb(s,320,90,'開路',{class:'mu','font-size':12});L(s,310,52,310,72,'ln-mu dash');L(s,310,98,310,118,'ln-mu dash');
  E('polygon',{points:'420,55 445,85 420,115 395,85',class:'ln-fg'},s);
  lb(s,420,80,'+',{'text-anchor':'middle','font-size':12});lb(s,420,101,'−',{'text-anchor':'middle','font-size':12});
  W(s,'M420,55 V30 H490');W(s,'M420,115 V140');gnd(s,420,148);nd(s,490,30);lb(s,494,26,'V_{out}');
  lb(s,452,90,'A_{0}(V_{in1} − V_{in2})',{'font-size':12});
  lb(s,350,168,'黑盒子模型',{'text-anchor':'middle',class:'mu','font-size':12});
})();

// 反相組態電路產生器：inEl / fbEl 為 res 或 cap
function invCkt(id,inEl,fbEl,inLab,fbLab){const s=$(id);s.setAttribute('viewBox','0 0 360 190');
  const a=opamp(s,170,100,false);
  nd(s,30,80);lb(s,26,72,'V_{in}',{'text-anchor':'end'});inEl(s,30,80,130,80);lb(s,80,66,inLab,{'text-anchor':'middle'});
  W(s,'M130,80 H170');nd(s,130,80);lb(s,124,98,'X',{'text-anchor':'end',class:'mu','font-size':12});
  W(s,'M130,80 V35');fbEl(s,130,35,280,35);lb(s,205,22,fbLab,{'text-anchor':'middle'});W(s,'M280,35 V100');
  W(s,'M240,100 H330');nd(s,280,100);nd(s,330,100);lb(s,334,96,'V_{out}');
  W(s,`M170,120 H150 V140`);gnd(s,150,148);}
invCkt('#f-inv',res,res,'R_{2}','R_{1}');
invCkt('#f-intc',res,cap,'R_{1}','C_{1}');

// 非反相放大器
(function(){const s=$('#f-ninv');s.setAttribute('viewBox','0 0 360 230');
  const a=opamp(s,150,80,true);
  nd(s,40,60);lb(s,36,56,'V_{in}',{'text-anchor':'end'});W(s,'M40,60 H150');
  W(s,'M220,80 H320');nd(s,280,80);nd(s,320,80);lb(s,324,76,'V_{out}');
  W(s,'M150,100 H110 V150');nd(s,110,150);res(s,110,150,280,150);lb(s,195,138,'R_{1}',{'text-anchor':'middle'});W(s,'M280,150 V80');
  res(s,110,150,110,205);lb(s,124,182,'R_{2}');gnd(s,110,213);
})();

// 增益誤差 vs 閉迴路增益（互動）
function drawGE(){const ex=+$('#geA').value,A0=10**ex;$('#geAo').textContent=sci(A0,1);
  const err=(G,A)=>{const a=1/(1/G+1/A);return (1-a/G)*100;};
  const P=plot($('#f-gerr'),{w:560,h:300,x:[1,1000],y:[1e-4,100],xlog:true,ylog:true,xlabel:'理想閉迴路增益 G',ylabel:'相對誤差 (%)'});
  [3,4,5].forEach(e=>{P.fn(G=>err(G,10**e),'ln-mu',1,1000);P.label(700,err(700,10**e)*1.6,'10^{'+e+'}',{class:'mu'});});
  P.fn(G=>err(G,A0),'ln-acc thick',1,1000);
  const r=G=>{const a=1/(1/G+1/A0);return `G = ${G}：實際 ${a.toPrecision(5)}，誤差 ${(err(G,A0)).toPrecision(3)}%`;};
  $('#geR').textContent=r(10)+'　｜　'+r(100);}
$('#geA').addEventListener('input',drawGE);drawGE();

// 積分器脈波響應
(function(){const P=plot($('#f-int'),{w:420,h:260,x:[0,100],y:[-0.6,0.2],xlabel:'t (µs)',ylabel:'電壓 (V)',m:{l:52}});
  P.path([[0,0],[0,0.1],[50,0.1],[50,0],[100,0]],'ln-mu');
  P.fn(t=>-0.01*Math.min(t,50),'ln-acc thick');
  P.label(8,0.13,'V_{in}',{class:'mu'});P.label(55,-0.45,'V_{out} = −0.5 V',{class:'t-acc'});
  P.label(14,-0.3,'斜率 −V_{1}/(R_{1}C_{1})',{class:'t-acc'});
})();

// 差動放大器
(function(){const s=$('#f-diff');s.setAttribute('viewBox','0 0 380 240');
  const a=opamp(s,180,100,false);
  nd(s,30,80);lb(s,26,76,'V_{1}',{'text-anchor':'end'});res(s,30,80,140,80);lb(s,85,66,'R_{1}',{'text-anchor':'middle'});
  W(s,'M140,80 H180');nd(s,140,80);W(s,'M140,80 V35');res(s,140,35,290,35);lb(s,215,22,'R_{2}',{'text-anchor':'middle'});W(s,'M290,35 V100');
  W(s,'M250,100 H350');nd(s,290,100);nd(s,350,100);lb(s,354,96,'V_{out}');
  nd(s,30,150);lb(s,26,146,'V_{2}',{'text-anchor':'end'});res(s,30,150,140,150);lb(s,85,136,'R_{3}',{'text-anchor':'middle'});
  W(s,'M140,150 V120 H180');nd(s,140,150);res(s,140,150,140,210);lb(s,154,186,'R_{4}');gnd(s,140,218);
})();

// 精密整流 vs 一般整流
(function(){const P=plot($('#f-prect'),{w:560,h:260,x:[0,2],y:[-1.1,1.1],xlabel:'時間（週期）',ylabel:'電壓 (V)',m:{l:52}});
  const v=t=>Math.sin(2*Math.PI*t);
  P.fn(v,'ln-mu');P.fn(t=>Math.max(0,v(t)-0.7),'ln-mu dash');P.fn(t=>Math.max(0,v(t)),'ln-acc thick');
  P.label(0.52,-0.9,'V_{in}',{class:'mu'});P.label(1.27,0.95,'精密整流',{class:'t-acc'});P.label(0.2,0.42,'一般整流',{class:'mu'});
})();

// 開迴路與閉迴路波德圖（互動）
function drawBW(){const G=10**(+$('#bwG').value),A0=1e5,f1=10;$('#bwGo').textContent=G.toPrecision(3);
  const mag=(re,im)=>Math.hypot(re,im);
  const Aol=f=>{const d=1+(f/f1)**2;return [A0/d,-A0*(f/f1)/d];};
  const Acl=f=>{const [ar,ai]=Aol(f);const dr=1+ar/G,di=ai/G;const d=dr*dr+di*di;return mag((ar*dr+ai*di)/d,(ai*dr-ar*di)/d);};
  const P=plot($('#f-bode'),{w:560,h:300,x:[1,1e7],y:[-20,110],xlog:true,xlabel:'f (Hz)',ylabel:'|增益| (dB)',m:{l:52,r:40}});
  P.fn(f=>20*Math.log10(mag(...Aol(f))),'ln-mu',1,1e7);P.fn(f=>20*Math.log10(Acl(f)),'ln-acc thick',1,1e7);
  const fp=f1*(1+A0/G);P.vline(fp);P.label(fp*1.3,20*Math.log10(G)+10,'f_{p} ≈ '+sci(fp,2)+' Hz',{class:'t-acc'});
  $('#bwR').textContent=`閉迴路增益 ${G.toPrecision(3)}（${(20*Math.log10(G)).toFixed(1)} dB），頻寬 ≈ ${sci(fp,3)} Hz，增益 × 頻寬 ≈ ${sci(G*fp,3)} Hz`;}
$('#bwG').addEventListener('input',drawBW);drawBW();

// 迴轉率限制（互動）
function drawSR(){const fk=+$('#srF').value,f=fk*1e3,V0=10,SR=0.5e6;$('#srFo').textContent=fk+' kHz';
  const T=1/f,n=4000,dt=3*T/n;let y=0;const pts=[];
  for(let i=0;i<=n;i++){const t=i*dt,tgt=V0*Math.sin(2*Math.PI*f*t);const d=Math.max(-SR*dt,Math.min(SR*dt,tgt-y));y+=d;if(t>=T)pts.push([(t-T)*1e6,y,tgt]);}
  const P=plot($('#f-slew'),{w:560,h:280,x:[0,2*T*1e6],y:[-11,11],xlabel:'t (µs)',ylabel:'V_{out} (V)',m:{l:52}});
  P.path(pts.map(p=>[p[0],p[2]]),'ln-mu dash');P.path(pts.map(p=>[p[0],p[1]]),'ln-acc thick');
  const need=2*Math.PI*f*V0/1e6,amp=Math.max(...pts.map(p=>p[1]));
  $('#srR').textContent=`理想輸出最大斜率 ${need.toFixed(2)} V/µs　${need>0.5?'＞':'≤'} SR = 0.5 V/µs　→　${need>0.5?'迴轉，輸出峰值 '+amp.toFixed(2)+' V':'無迴轉'}`;}
$('#srF').addEventListener('input',drawSR);drawSR();
