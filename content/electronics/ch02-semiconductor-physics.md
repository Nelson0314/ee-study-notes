---
chapter: 2
summary: 由原子結構、摻雜與載子傳輸推導 PN 接面的平衡、偏壓行為與二極體 I/V 方程式。
updated: 2026-11-13
---

## 0 本章導覽

電子學中的二極體、BJT、MOSFET 都是半導體元件。要理解它們的電流與電壓關係，必須先理解半導體內部「誰在導電」、「如何控制導電能力」、「電荷如何移動」。本章依以下順序由淺入深建立這些觀念，最後推導出 PN 接面（二極體）的電流方程式。

<div class="flow">
  <div class="stage"><h4>① 半導體材料（2.1）</h4><ul><li>載子：電子與電洞</li><li>本質濃度 n<sub>i</sub></li><li>摻雜：n 型、p 型</li><li>傳輸：漂移、擴散</li></ul></div>
  <div class="arr">➜</div>
  <div class="stage"><h4>② PN 接面（2.2）</h4><ul><li>平衡：空乏區、內建電位 V<sub>0</sub></li><li>逆偏：接面電容 C<sub>j</sub></li><li>順偏：少數載子注入</li><li>I/V：二極體方程式</li></ul></div>
  <div class="arr">➜</div>
  <div class="stage"><h4>③ 逆向崩潰（2.3）</h4><ul><li>齊納崩潰</li><li>雪崩崩潰</li><li>→ 第 3 章：二極體電路</li></ul></div>
</div>

<div class="goal"><b>讀完本章應能：</b>
<ul>
  <li>計算本質與摻雜半導體的電子、電洞濃度</li>
  <li>寫出漂移電流與擴散電流的表示式，並理解其正負號</li>
  <li>說明 PN 接面空乏區與內建電位的成因，並計算 V<sub>0</sub></li>
  <li>計算逆偏時的接面電容，理解變容二極體的用途</li>
  <li>推導並使用 I<sub>D</sub> = I<sub>S</sub>(e<sup>V<sub>D</sub>/V<sub>T</sub></sup> − 1)，計算 I<sub>S</sub></li>
  <li>區分齊納崩潰與雪崩崩潰</li>
</ul></div>

圖中統一使用以下符號：

<div class="legend" style="justify-content:flex-start">
  <span><i class="li-e"></i>自由電子（−q）</span>
  <span><i class="li-h"></i>電洞（+q）</span>
  <span><i class="li-p"></i>施體離子（+，固定不動）</span>
  <span><i class="li-n"></i>受體離子（−，固定不動）</span>
</div>

## 2.1.1 固體中的電荷載子

### 1　原子結構與價電子

原子由原子核與分層排列的電子組成，最外層的電子稱為<b>價電子（valence electrons）</b>。原子之間如何鍵結、材料是否導電，主要由價電子決定。

<div class="grid2">
  <figure class="fig"><svg id="f-atom" class="sm"></svg>
    <figcaption>矽原子的波耳模型：原子序 14，電子依 2、8、4 分層。最外層 4 個為價電子。</figcaption></figure>
  <figure class="fig">
    <div class="tbl"><table class="ptable">
      <tr><th style="text-align:center">III 族（3 價電子）</th><th style="text-align:center">IV 族（4 價電子）</th><th style="text-align:center">V 族（5 價電子）</th></tr>
      <tr><td>硼 B</td><td>碳 C</td><td>氮 N</td></tr>
      <tr><td>鋁 Al</td><td class="hl">矽 Si</td><td class="hl">磷 P</td></tr>
      <tr><td>鎵 Ga</td><td>鍺 Ge</td><td>砷 As</td></tr>
    </table></div>
    <figcaption>課本列出的週期表片段。矽在 IV 族；III 族（如 B）與 V 族（如 P、As）是常用的摻雜元素。</figcaption>
  </figure>
</div>

### 2　共價鍵與矽晶體

矽原子排列成規則晶格，每個矽原子與相鄰 <b>4 個</b>矽原子各共用一對電子，形成<b>共價鍵（covalent bond）</b>，使每個原子周圍等效擁有 8 個電子而穩定。

<figure class="fig"><svg id="f-lat-pure" class="sm"></svg>
  <figcaption>矽晶格的二維示意。每條鍵上的兩個點為共用的電子對。在 T = 0 K 時所有價電子都束縛在鍵中，沒有自由電子，因此矽在 0 K 時是絕緣體。</figcaption></figure>

### 3　能隙 E<sub>g</sub>：讓電子掙脫所需的能量

溫度升高時晶格振動提供熱能，部分價電子獲得足夠能量而<b>掙脫共價鍵</b>，成為可在晶體中自由移動的<b>自由電子</b>。使電子掙脫所需的最小能量稱為<b>能隙（bandgap energy）E<sub>g</sub></b>。

<div class="eq key">E<sub>g</sub>(Si) = 1.12 eV<span class="cm">1 eV = 1.6 × 10<sup>−19</sup> J</span></div>

<div class="grid2">
  <figure class="fig"><svg id="f-lat-broken" class="sm"></svg>
    <figcaption>熱能打斷一個共價鍵：產生一個自由電子，並在原處留下一個空位（電洞）。</figcaption></figure>
  <figure class="fig">
    <svg viewBox="0 0 620 290" id="f-band">
      <line x1="34" y1="255" x2="34" y2="30" class="ln-mu" marker-end="url(#a-mu)"/>
      <text transform="translate(22,150) rotate(-90)" text-anchor="middle" class="mu" font-size="13">電子能量</text>
      
      <rect x="75" y="80" width="130" height="90" class="band-c" opacity=".9"/>
      <rect x="75" y="150" width="130" height="85" class="band-v" opacity=".9"/>
      <text x="140" y="110" text-anchor="middle" font-size="13">導帶</text>
      <text x="140" y="215" text-anchor="middle" font-size="13">價帶</text>
      <text x="140" y="60" text-anchor="middle" class="mu" font-size="12">兩帶重疊，E<tspan dy="3" font-size="9">g</tspan><tspan dy="-3"> ≈ 0</tspan></text>
      <text x="140" y="268" text-anchor="middle" font-size="15" font-weight="700">導體</text>
      
      <rect x="275" y="60" width="130" height="60" class="band-c"/>
      <rect x="275" y="170" width="130" height="65" class="band-v"/>
      <text x="300" y="85" font-size="13">導帶</text>
      <text x="300" y="225" font-size="13">價帶</text>
      <circle cx="355" cy="102" r="5" class="e"/><circle cx="385" cy="96" r="5" class="e"/>
      <circle cx="355" cy="186" r="5" class="h"/><circle cx="385" cy="192" r="5" class="h"/>
      <line x1="330" y1="123" x2="330" y2="167" class="ln-fg" marker-end="url(#a-fg)" marker-start="url(#a-fg)"/>
      <text x="338" y="150" font-size="13" font-weight="700">E<tspan dy="3" font-size="10">g</tspan><tspan dy="-3"> = 1.12 eV</tspan></text>
      <text x="340" y="268" text-anchor="middle" font-size="15" font-weight="700">半導體（Si）</text>
      
      <rect x="475" y="30" width="130" height="45" class="band-c"/>
      <rect x="475" y="190" width="130" height="45" class="band-v"/>
      <text x="540" y="58" text-anchor="middle" font-size="13">導帶</text>
      <text x="540" y="218" text-anchor="middle" font-size="13">價帶</text>
      <line x1="510" y1="78" x2="510" y2="187" class="ln-fg" marker-end="url(#a-fg)" marker-start="url(#a-fg)"/>
      <text x="518" y="128" font-size="13" font-weight="700">E<tspan dy="3" font-size="10">g</tspan><tspan dy="-3"> 很大</tspan></text>
      <text x="518" y="148" font-size="12" class="mu">SiO₂ 約 9 eV</text>
      <text x="540" y="268" text-anchor="middle" font-size="15" font-weight="700">絕緣體</text>
    </svg>
    <figcaption>以能帶觀點比較三類材料（輔助理解用）。電子必須獲得至少 E<sub>g</sub> 的能量才能從價帶（被鍵結）躍遷到導帶（自由）。</figcaption>
  </figure>
</div>

### 4　電洞（hole）

電子離開共價鍵後留下的空位稱為<b>電洞</b>。相鄰鍵上的電子可以跳入此空位，使空位移到該電子原本的位置，看起來就像空位在移動。由於空位代表「少了一個電子」，<b>電洞可視為帶 +q 的載子</b>。

<figure class="fig"><svg id="f-holemove"></svg>
  <figcaption>電洞的移動：t₁→t₂→t₃ 中電子依序向左跳入空位，等效於電洞向右移動。分析時追蹤一個電洞，比追蹤一連串電子簡單得多。</figcaption></figure>

<div class="box"><span class="tag">重點</span><br>半導體中有<b>兩種載子（carrier）</b>：自由電子（−q）與電洞（+q）。兩者都能傳導電流。</div>

### 5　產生與復合

<figure class="fig"><svg id="f-genrec"></svg>
  <figcaption>左：熱能打斷鍵結，產生一個電子-電洞對（generation）。右：自由電子遇到電洞時落回鍵中，兩者同時消失（recombination）。固定溫度下兩者速率相等，載子濃度維持平衡。</figcaption></figure>

### 6　本質載子濃度 n<sub>i</sub>

未摻雜的純矽稱為<b>本質半導體（intrinsic semiconductor）</b>。由於每產生一個自由電子必同時產生一個電洞，本質半導體中 <span class="m"><i>n</i> = <i>p</i> = <i>n</i><sub>i</sub></span>。單位體積的自由電子數為：

<div class="eq key"><i>n</i><sub>i</sub> = 5.2 × 10<sup>15</sup> <i>T</i><sup>3/2</sup> exp<span class="pr">(</span>−<span class="frac"><span><i>E</i><sub>g</sub></span><span>2<i>kT</i></span></span><span class="pr">)</span> &nbsp;electrons/cm<sup>3</sup></div>

<div class="tbl"><table>
  <tr><th>符號</th><th>意義</th><th>數值／單位</th></tr>
  <tr><td><i>T</i></td><td>絕對溫度</td><td>K</td></tr>
  <tr><td><i>k</i></td><td>波茲曼常數</td><td>1.38 × 10<sup>−23</sup> J/K</td></tr>
  <tr><td><i>E</i><sub>g</sub></td><td>能隙（代入時換成焦耳）</td><td>1.12 × 1.6 × 10<sup>−19</sup> J</td></tr>
</table></div>

<figure class="fig">
  <div class="ctrl"><label>溫度 T <input type="range" id="niT" min="200" max="700" step="5" value="300"></label><output id="niTo"></output></div>
  <div class="readout" id="niR"></div>
  <svg id="f-ni"></svg>
  <figcaption>n<sub>i</sub> 隨溫度呈指數變化（縱軸為對數刻度）。拖動滑桿觀察：300 K → 600 K 時 n<sub>i</sub> 增加約十萬倍。</figcaption>
</figure>

<div class="box ex"><span class="tag">例題</span>

求 T = 300 K 與 600 K 時矽的 n<sub>i</sub>。

<ul>
  <li>300 K：<span class="m"><i>T</i><sup>3/2</sup> ≈ 5196</span>；<span class="m"><i>E</i><sub>g</sub>/(2<i>kT</i>) = (1.12 × 1.6×10<sup>−19</sup>)/(2 × 1.38×10<sup>−23</sup> × 300) ≈ 21.64</span><br>
  <span class="m"><i>n</i><sub>i</sub> = 5.2×10<sup>15</sup> × 5196 × e<sup>−21.64</sup> ≈ <b>1.08 × 10<sup>10</sup> cm<sup>−3</sup></b></span></li>
  <li>600 K：<span class="m"><i>n</i><sub>i</sub> ≈ <b>1.54 × 10<sup>15</sup> cm<sup>−3</sup></b></span></li>
</ul>

矽的原子密度約 <b>5 × 10<sup>22</sup> cm<sup>−3</sup></b>，因此室溫下約每 5 × 10<sup>12</sup> 個原子才有一個自由電子，純矽的導電性很差。n<sub>i</sub> 對溫度極為敏感，這是半導體元件特性隨溫度漂移的根源。

</div>

<div class="practice"><span class="tag">練習 2.1.1</span>
<details class="q"><summary>（計算）300 K 時本質矽的自由電子濃度為 n<sub>i</sub> ≈ 1.08 × 10<sup>10</sup> cm<sup>−3</sup>，矽原子密度約 5 × 10<sup>22</sup> cm<sup>−3</sup>。平均多少個原子才有一個自由電子？</summary>
<ol class="sol"><li>5 × 10<sup>22</sup> / 1.08 × 10<sup>10</sup> ≈ 4.6 × 10<sup>12</sup>。</li><li>約每 4.6 兆個矽原子才有一個自由電子，因此本質矽的導電性很差。</li></ol></details>
<details class="q"><summary>（是非）電洞是一種帶正電的實體粒子。</summary>
<ol class="sol"><li>✗。電洞是共價鍵中的空位；其移動是相鄰價電子依序填補空位的等效描述，因此可視為帶 +q 的載子，但不是實體粒子。</li></ol></details>
</div>

## 2.1.2 載子濃度的改變：摻雜

純矽的載子太少且受溫度影響大。刻意加入少量特定雜質稱為<b>摻雜（doping）</b>，摻雜後的半導體稱為<b>外質半導體（extrinsic semiconductor）</b>。

### 1　n 型：摻入 V 族元素（如磷 P）

<div class="grid2">
  <figure class="fig"><svg id="f-lat-P" class="sm"></svg>
    <figcaption>磷有 5 個價電子：4 個與鄰近矽原子形成共價鍵，第 5 個只被微弱束縛，室溫下即可游離成自由電子。磷失去該電子後成為固定不動的正離子 P⁺。</figcaption></figure>
  <div>
    <ul>
      <li>磷「捐出」電子，稱為<b>施體（donor）</b>，濃度記為 <b>N<sub>D</sub></b>。</li>
      <li>電子濃度遠大於電洞濃度，稱為 <b>n 型</b>。</li>
      <li><b>電子為多數載子（majority carrier）</b>，<b>電洞為少數載子（minority carrier）</b>。</li>
    </ul>
  </div>
</div>

### 2　質量作用定律

<div class="eq key"><i>n</i> · <i>p</i> = <i>n</i><sub>i</sub><sup>2</sup><span class="cm">熱平衡下恆成立，與是否摻雜無關</span></div>

電子增加時，電洞與電子復合的機率也隨之增加，因此電洞濃度必然下降，使乘積維持 n<sub>i</sub><sup>2</sup>。

<div class="box ex"><span class="tag">例題</span>

矽均勻摻磷，濃度 10<sup>16</sup> cm<sup>−3</sup>，求室溫下電子與電洞濃度。

<p>每個磷原子提供一個電子：<span class="m"><i>n</i> ≈ <i>N</i><sub>D</sub> = 10<sup>16</sup> cm<sup>−3</sup></span>（原本的 10<sup>10</sup> 可忽略）。<br>
<span class="m"><i>p</i> = <i>n</i><sub>i</sub><sup>2</sup>/<i>n</i> = (1.08×10<sup>10</sup>)<sup>2</sup>/10<sup>16</sup> ≈ <b>1.17 × 10<sup>4</sup> cm<sup>−3</sup></b></span><br>
電洞從 10<sup>10</sup> 降到 10<sup>4</sup>，減少約一百萬倍。</p>
</div>

### 3　p 型：摻入 III 族元素（如硼 B）

<div class="grid2">
  <figure class="fig"><svg id="f-lat-B" class="sm"></svg>
    <figcaption>硼只有 3 個價電子，與 4 個鄰居鍵結時缺少 1 個電子，留下一個電洞。硼接受一個電子後成為固定的負離子 B⁻。</figcaption></figure>
  <div>
    <ul>
      <li>硼「接受」電子，稱為<b>受體（acceptor）</b>，濃度記為 <b>N<sub>A</sub></b>。</li>
      <li><b>電洞為多數載子</b>，電子為少數載子，稱為 <b>p 型</b>。</li>
    </ul>
  </div>
</div>

### 4　摻雜總結

<div class="tbl"><table>
  <tr><th></th><th>n 型</th><th>p 型</th></tr>
  <tr><td>摻雜元素</td><td>V 族（P、As）— 施體</td><td>III 族（B）— 受體</td></tr>
  <tr><td>多數載子</td><td>電子：<span class="m"><i>n</i> ≈ <i>N</i><sub>D</sub></span></td><td>電洞：<span class="m"><i>p</i> ≈ <i>N</i><sub>A</sub></span></td></tr>
  <tr><td>少數載子</td><td>電洞：<span class="m"><i>p</i> = <i>n</i><sub>i</sub><sup>2</sup>/<i>N</i><sub>D</sub></span></td><td>電子：<span class="m"><i>n</i> = <i>n</i><sub>i</sub><sup>2</sup>/<i>N</i><sub>A</sub></span></td></tr>
  <tr><td>固定離子</td><td>P⁺（正）</td><td>B⁻（負）</td></tr>
</table></div>

<figure class="fig">
  <div class="ctrl">
    <span class="seg" id="dopType"><button type="button" class="on" data-t="n">n 型（N<sub>D</sub>）</button><button type="button" data-t="p">p 型（N<sub>A</sub>）</button></span>
    <label>摻雜濃度 log<sub>10</sub>N <input type="range" id="dopN" min="8" max="18" step="0.1" value="16"></label><output id="dopNo"></output>
  </div>
  <div class="readout" id="dopR"></div>
  <svg id="f-dop" class="md"></svg>
  <figcaption>摻雜計算器（縱軸對數）。多數載子隨摻雜線性增加，少數載子以同樣倍率減少，兩者乘積固定為 n<sub>i</sub><sup>2</sup>。N 遠小於 n<sub>i</sub> 時材料趨近本質半導體（此處用精確解 n = N/2 + √(N²/4 + n<sub>i</sub>²)）。</figcaption>
</figure>

<div class="box warn"><span class="tag">注意</span><br><b>n 型材料不帶負電，p 型材料也不帶正電。</b>摻雜後材料整體仍為<b>電中性</b>：每個自由電子都對應一個固定的 P⁺ 離子。這些固定離子在 PN 接面中扮演關鍵角色。</div>

<div class="practice"><span class="tag">練習 2.1.2</span>
<details class="q"><summary>（計算）矽摻磷 N<sub>D</sub> = 10<sup>16</sup> cm<sup>−3</sup>，室溫下電子與電洞濃度各為何？</summary>
<ol class="sol"><li>N<sub>D</sub> ≫ n<sub>i</sub>，故 n ≈ N<sub>D</sub> = 10<sup>16</sup> cm<sup>−3</sup>。</li><li>p = n<sub>i</sub><sup>2</sup>/n = 1.17 × 10<sup>20</sup> / 10<sup>16</sup> ≈ 1.17 × 10<sup>4</sup> cm<sup>−3</sup>。</li></ol></details>
<details class="q"><summary>（是非）n 型半導體因為電子較多，整體帶負電。</summary>
<ol class="sol"><li>✗。每個施體釋出一個電子後留下一個帶正電的離子，整體維持電中性。</li></ol></details>
</div>

## 2.1.3 載子的傳輸

電流是電荷的流動。半導體中載子的移動有兩種機制：<b>漂移（drift）</b>——由電場驅動；<b>擴散（diffusion）</b>——由濃度差驅動。

### 1　漂移：電場推動載子

在電場 E 中，載子的平均速度與電場成正比：

<div class="eq key"><i>v</i><sub>h</sub> = <i>μ</i><sub>p</sub> <i>E</i> &nbsp;&nbsp;&nbsp;&nbsp; <i>v</i><sub>e</sub> = −<i>μ</i><sub>n</sub> <i>E</i><span class="cm">電洞順電場，電子逆電場</span></div>

<b>μ 稱為遷移率（mobility）</b>，單位 cm²/(V·s)，表示載子在電場中移動的難易程度。

<div class="eq"><i>μ</i><sub>n</sub> = 1350 cm<sup>2</sup>/(V·s) &nbsp;&nbsp;&nbsp;&nbsp; <i>μ</i><sub>p</sub> = 480 cm<sup>2</sup>/(V·s)<span class="cm">矽</span></div>

電洞的移動實際上是電子在共價鍵之間逐一跳躍，比自由電子移動困難，因此 μ<sub>p</sub> 約為 μ<sub>n</sub> 的 1/3。

<figure class="fig"><svg id="f-drift"></svg>
  <figcaption>外加電壓在半導體棒內建立電場 E（由 + 指向 −）。電洞順 E 移動，電子逆 E 移動；但兩者造成的<b>電流方向相同</b>，所以兩項電流相加。</figcaption></figure>

<h4>漂移電流的推導</h4>

<figure class="fig"><svg id="f-jderiv"></svg>
  <figcaption>截面積 W·h 的半導體棒，載子濃度 n、速度 v。一秒內通過截面的載子位於長度 v·(1 s) 的體積內，數量為 v·W·h·n。</figcaption></figure>

<div class="eq"><i>I</i> = −<i>v</i> · <i>W</i> · <i>h</i> · <i>n</i> · <i>q</i><span class="cm">電子帶 −q</span></div>

除以截面積得到電流密度 J（A/cm²）：

<div class="eq"><i>J</i><sub>n</sub> = −<i>v</i><sub>e</sub> <i>n q</i> = <i>μ</i><sub>n</sub> <i>E n q</i> &nbsp;&nbsp;&nbsp;&nbsp; <i>J</i><sub>p</sub> = <i>v</i><sub>h</sub> <i>p q</i> = <i>μ</i><sub>p</sub> <i>E p q</i></div>

<div class="eq key"><i>J</i><sub>tot</sub> = <i>q</i> (<i>μ</i><sub>n</sub> <i>n</i> + <i>μ</i><sub>p</sub> <i>p</i>) <i>E</i></div>

由 J = σE（微觀歐姆定律）可得導電率與電阻率：

<div class="eq"><i>σ</i> = <i>q</i> (<i>μ</i><sub>n</sub> <i>n</i> + <i>μ</i><sub>p</sub> <i>p</i>) &nbsp;[S/cm] &nbsp;&nbsp;&nbsp;&nbsp; <i>ρ</i> = 1/<i>σ</i> &nbsp;[Ω·cm]</div>

例：n 型 N<sub>D</sub> = 10<sup>16</sup> cm<sup>−3</sup> → σ ≈ 1.6×10<sup>−19</sup> × 1350 × 10<sup>16</sup> ≈ 2.16 S/cm，ρ ≈ 0.46 Ω·cm（電洞項可忽略）。

<div class="box ex"><span class="tag">例題</span>

欲使電子與電洞的漂移電流相等，載子濃度應如何選擇？

要求 <span class="m"><i>μ</i><sub>n</sub><i>n</i> = <i>μ</i><sub>p</sub><i>p</i></span> → <span class="m"><i>n</i>/<i>p</i> = <i>μ</i><sub>p</sub>/<i>μ</i><sub>n</sub> = 480/1350 ≈ 0.36</span>。配合 <span class="m"><i>np</i> = <i>n</i><sub>i</sub><sup>2</sup></span>：

<span class="m"><i>p</i> = <i>n</i><sub>i</sub>√(<i>μ</i><sub>n</sub>/<i>μ</i><sub>p</sub>) ≈ <b>1.68 <i>n</i><sub>i</sub></b></span>，<span class="m"><i>n</i> ≈ <b>0.596 <i>n</i><sub>i</sub></b></span>。電子遷移率較高，因此只需較少的電子即可產生相同電流。

</div>

### 2　速度飽和（Velocity Saturation）

<span class="m"><i>v</i> = <i>μE</i></span> 只在電場不大時成立。電場很強時載子與晶格頻繁碰撞，速度趨於上限，等效遷移率下降。課本模型：

<div class="eq key"><i>μ</i> = <span class="frac"><span><i>μ</i><sub>0</sub></span><span>1 + <i>bE</i></span></span> &nbsp;&nbsp;&nbsp; <i>v</i><sub>sat</sub> = <span class="frac"><span><i>μ</i><sub>0</sub></span><span><i>b</i></span></span> &nbsp;&nbsp;&nbsp; <i>v</i> = <span class="frac"><span><i>μ</i><sub>0</sub><i>E</i></span><span>1 + <i>μ</i><sub>0</sub><i>E</i>/<i>v</i><sub>sat</sub></span></span></div>

<figure class="fig"><svg id="f-vsat"></svg>
  <figcaption>載子速度與電場的關係（μ₀ = 1350 cm²/V·s，v<sub>sat</sub> = 10⁷ cm/s）。虛線為無飽和的線性關係 v = μ₀E。低電場時兩者重合；高電場時速度趨近 v<sub>sat</sub>。</figcaption></figure>

<div class="box ex"><span class="tag">例題</span>

長 0.2 μm 的均勻半導體兩端加 1 V，μ₀ = 1350 cm²/(V·s)，v<sub>sat</sub> = 10⁷ cm/s。(a) 求等效遷移率；(b) 若要求等效遷移率只比 μ₀ 低 10%，最大可加電壓為何？

<ol type="a">
  <li><span class="m"><i>E</i> = 1 V/(0.2×10<sup>−4</sup> cm) = 5×10<sup>4</sup> V/cm</span>；<span class="m"><i>b</i> = <i>μ</i><sub>0</sub>/<i>v</i><sub>sat</sub> = 1.35×10<sup>−4</sup> cm/V</span><br>
  <span class="m"><i>μ</i> = 1350/(1 + 6.75) ≈ <b>174 cm²/(V·s)</b></span>，下降近 8 倍（圖中標記點）。</li>
  <li><span class="m">1/(1 + <i>bE</i>) = 0.9 → <i>bE</i> = 0.111 → <i>E</i> ≈ 823 V/cm</span>，<span class="m"><i>V</i> = <i>E</i> × 0.2 μm ≈ <b>16.5 mV</b></span>。</li>
</ol>

元件尺寸愈小，同樣電壓產生的電場愈大，速度飽和愈顯著。

</div>

### 3　擴散：濃度差驅動載子

粒子會自然從濃度高處往濃度低處移動，例如墨水在水中散開。擴散<b>不需要電場</b>，只需要濃度梯度。帶電載子的擴散即形成擴散電流。

<figure class="fig"><svg id="f-ink"></svg>
  <figcaption>擴散示意：初始集中的粒子隨時間散開，濃度分布變寬變平，總量不變。</figcaption></figure>

擴散電流與濃度梯度成正比：

<div class="eq"><i>I</i> = <i>A q D</i><sub>n</sub> <span class="frac"><span><i>dn</i></span><span><i>dx</i></span></span><span class="cm">A：截面積</span></div>

<div class="eq key"><i>J</i><sub>n</sub> = <i>q D</i><sub>n</sub> <span class="frac"><span><i>dn</i></span><span><i>dx</i></span></span> &nbsp;&nbsp;&nbsp;&nbsp; <i>J</i><sub>p</sub> = −<i>q D</i><sub>p</sub> <span class="frac"><span><i>dp</i></span><span><i>dx</i></span></span> &nbsp;&nbsp;&nbsp;&nbsp; <i>J</i><sub>tot</sub> = <i>q</i><span class="pr">(</span><i>D</i><sub>n</sub><span class="frac"><span><i>dn</i></span><span><i>dx</i></span></span> − <i>D</i><sub>p</sub><span class="frac"><span><i>dp</i></span><span><i>dx</i></span></span><span class="pr">)</span></div>

<b>D 稱為擴散係數（diffusion constant）</b>，單位 cm²/s：

<div class="eq"><i>D</i><sub>n</sub> = 34 cm<sup>2</sup>/s &nbsp;&nbsp;&nbsp;&nbsp; <i>D</i><sub>p</sub> = 12 cm<sup>2</sup>/s<span class="cm">矽</span></div>

<figure class="fig"><svg id="f-grad"></svg>
  <figcaption>正負號的由來：濃度向右遞減（dn/dx &lt; 0）時，電子與電洞都向右擴散。電子帶負電，電流向左，J<sub>n</sub> = qD<sub>n</sub>dn/dx &lt; 0；電洞帶正電，電流向右，J<sub>p</sub> = −qD<sub>p</sub>dp/dx &gt; 0。</figcaption></figure>

<h4>兩種典型濃度分布</h4>

<div class="grid2">
  <figure class="fig"><svg id="f-prof-lin"></svg>
    <figcaption>線性分布 n(x) = N(1 − x/L)：斜率固定，<b>J<sub>n</sub> = −qD<sub>n</sub>N/L，處處相同</b>。</figcaption></figure>
  <figure class="fig"><svg id="f-prof-exp"></svg>
    <figcaption>指數分布 n(x) = N e<sup>−x/L<sub>d</sub></sup>：<b>J<sub>n</sub> = −(qD<sub>n</sub>N/L<sub>d</sub>) e<sup>−x/L<sub>d</sub></sup>，隨 x 衰減</b>。PN 接面順偏時的少數載子即呈此分布。</figcaption></figure>
</div>

### 4　愛因斯坦關係式

遷移率與擴散係數都描述載子在晶格中移動的難易程度，兩者有固定比例：

<div class="eq key"><span class="frac"><span><i>D</i></span><span><i>μ</i></span></span> = <span class="frac"><span><i>kT</i></span><span><i>q</i></span></span> = <i>V</i><sub>T</sub></div>

<b>V<sub>T</sub> = kT/q 稱為熱電壓（thermal voltage）</b>。T = 300 K 時 <span class="m"><i>V</i><sub>T</sub> = (1.38×10<sup>−23</sup> × 300)/(1.6×10<sup>−19</sup>) ≈ 25.9 mV ≈ <b>26 mV</b></span>。<br>驗算：34/1350 ≈ 0.0252 V、12/480 = 0.025 V。✔

### 5　漂移與擴散同時存在

<div class="eq key"><i>J</i><sub>n</sub> = <i>q μ</i><sub>n</sub> <i>n E</i> + <i>q D</i><sub>n</sub><span class="frac"><span><i>dn</i></span><span><i>dx</i></span></span> &nbsp;&nbsp;&nbsp;&nbsp; <i>J</i><sub>p</sub> = <i>q μ</i><sub>p</sub> <i>p E</i> − <i>q D</i><sub>p</sub><span class="frac"><span><i>dp</i></span><span><i>dx</i></span></span></div>

這兩式是分析 PN 接面的出發點。

<div class="practice"><span class="tag">練習 2.1.3</span>
<details class="q"><summary>（計算）n 型矽中施加 E = 100 V/cm，電子的漂移速度為何？（μ<sub>n</sub> = 1350 cm²/(V·s)）</summary>
<ol class="sol"><li>|v<sub>e</sub>| = μ<sub>n</sub>E = 1350 × 100 = 1.35 × 10<sup>5</sup> cm/s。</li><li>遠低於 v<sub>sat</sub> ≈ 10<sup>7</sup> cm/s，速度飽和可忽略。</li></ol></details>
<details class="q"><summary>（計算）以愛因斯坦關係式由 μ<sub>n</sub> 估計 D<sub>n</sub>（300 K）。</summary>
<ol class="sol"><li>D<sub>n</sub> = μ<sub>n</sub>V<sub>T</sub> = 1350 × 0.026 ≈ 35 cm²/s。</li><li>與常數表的 34 cm²/s 一致（差異來自 V<sub>T</sub> 取整）。</li></ol></details>
</div>

## 2.2.1 PN 接面：平衡狀態

在<b>同一塊矽晶體</b>中，一側摻成 p 型、另一側摻成 n 型，交界即為 <b>PN 接面</b>。p 側端子稱為<b>陽極（anode）</b>，n 側稱為<b>陰極（cathode）</b>。PN 接面就是二極體，也是 BJT 與 MOSFET 的基本組成。

<figure class="fig"><svg id="f-pn"></svg>
  <figcaption>PN 接面結構與二極體電路符號（三角形指向為順向電流方向：陽極 → 陰極）。</figcaption></figure>

### 1　記號

<div class="tbl"><table>
  <tr><th>符號</th><th>意義</th><th>大小</th></tr>
  <tr><td><i>n</i><sub>n</sub></td><td>n 側的電子（多數）</td><td>≈ N<sub>D</sub></td></tr>
  <tr><td><i>p</i><sub>n</sub></td><td>n 側的電洞（少數）</td><td>= n<sub>i</sub>²/N<sub>D</sub></td></tr>
  <tr><td><i>p</i><sub>p</sub></td><td>p 側的電洞（多數）</td><td>≈ N<sub>A</sub></td></tr>
  <tr><td><i>n</i><sub>p</sub></td><td>p 側的電子（少數）</td><td>= n<sub>i</sub>²/N<sub>A</sub></td></tr>
</table></div>

規則：字母表示載子種類，下標表示所在的一側。

<div class="box ex"><span class="tag">例題</span>

N<sub>A</sub> = 10<sup>16</sup>、N<sub>D</sub> = 5×10<sup>15</sup> cm<sup>−3</sup>，求兩側載子濃度。

<p>p 側：<span class="m"><i>p</i><sub>p</sub> = 10<sup>16</sup></span>，<span class="m"><i>n</i><sub>p</sub> = 1.17×10<sup>20</sup>/10<sup>16</sup> ≈ 1.17×10<sup>4</sup> cm<sup>−3</sup></span><br>
n 側：<span class="m"><i>n</i><sub>n</sub> = 5×10<sup>15</sup></span>，<span class="m"><i>p</i><sub>n</sub> = 1.17×10<sup>20</sup>/(5×10<sup>15</sup>) ≈ 2.33×10<sup>4</sup> cm<sup>−3</sup></span><br>
多數與少數載子相差十幾個數量級（下方互動圖的最後一個面板正是此例）。</p>
</div>

### 2　擴散 → 空乏區 → 內建電場

<ol>
  <li>接面兩側濃度差極大，<b>電子由 n 側擴散到 p 側，電洞由 p 側擴散到 n 側</b>。</li>
  <li>載子離開後留下<b>固定不動的離子</b>：n 側為正的施體離子，p 側為負的受體離子。接面附近幾乎沒有自由載子，只剩離子，稱為<b>空乏區（depletion region）</b>或<b>空間電荷區（space charge region）</b>。</li>
  <li>正、負離子建立<b>由 n 指向 p 的電場</b>，此電場將電子推回 n 側、電洞推回 p 側，形成與擴散方向相反的<b>漂移電流</b>。</li>
  <li>擴散愈多 → 離子愈多 → 電場愈強 → 漂移愈大，最終兩者抵消，達到平衡。</li>
</ol>

<figure class="fig"><svg id="f-jeq"></svg>
  <figcaption>平衡狀態的 PN 接面。中性區內的離子（淡色）被多數載子中和；空乏區內只剩未被中和的離子，產生內建電場 E。</figcaption></figure>

<div class="eq key">|<i>I</i><sub>drift,p</sub>| = |<i>I</i><sub>diff,p</sub>| &nbsp;&nbsp;&nbsp;&nbsp; |<i>I</i><sub>drift,n</sub>| = |<i>I</i><sub>diff,n</sub>|</div>

平衡時不只總電流為零，<b>電子與電洞的電流也各自為零</b>。

<div class="box note"><span class="tag">補充：電荷守恆</span><br>空乏區兩側的電荷量相等：<span class="m"><i>N</i><sub>A</sub><i>x</i><sub>p</sub> = <i>N</i><sub>D</sub><i>x</i><sub>n</sub></span>（x<sub>p</sub>、x<sub>n</sub> 為空乏區伸入 p、n 側的寬度）。因此<b>摻雜較淡的一側空乏區較寬</b>。</div>

### 3　電荷、電場、電位分布（互動）

下圖由真實參數（N<sub>A</sub> = 10<sup>16</sup>、N<sub>D</sub> = 5×10<sup>15</sup> cm<sup>−3</sup>）以空乏近似計算。目前 V = 0 為平衡狀態；後兩節（逆偏、順偏）可回到此處拖動滑桿比較。

<figure class="fig"><div class="jw" data-v="0"></div>
  <figcaption>由上而下：空乏區示意、電荷密度 ρ/q、電場 E、電位 ψ（以 p 側中性區為 0）、載子濃度（對數）。ρ 為矩形、E 為三角形、ψ 為兩段拋物線；n 側電位比 p 側高 V<sub>0</sub>。載子濃度在空乏區內跨越十幾個數量級。中性區內少數載子分布的長度尺度為示意值。</figcaption></figure>

### 4　內建電位 V<sub>0</sub>

由電洞的漂移 = 擴散出發：

<div class="eq"><i>q μ</i><sub>p</sub> <i>p E</i> = <i>q D</i><sub>p</sub> <span class="frac"><span><i>dp</i></span><span><i>dx</i></span></span></div>

代入 <span class="m"><i>E</i> = −<i>dV</i>/<i>dx</i></span>：

<div class="eq">−<i>μ</i><sub>p</sub> <i>p</i> <span class="frac"><span><i>dV</i></span><span><i>dx</i></span></span> = <i>D</i><sub>p</sub> <span class="frac"><span><i>dp</i></span><span><i>dx</i></span></span> &nbsp;⟹&nbsp; −<i>μ</i><sub>p</sub> <i>dV</i> = <i>D</i><sub>p</sub> <span class="frac"><span><i>dp</i></span><span><i>p</i></span></span></div>

從 p 側邊緣（p = p<sub>p</sub>）積分到 n 側邊緣（p = p<sub>n</sub>）：

<div class="eq"><i>V</i>(n 側) − <i>V</i>(p 側) = <span class="frac"><span><i>D</i><sub>p</sub></span><span><i>μ</i><sub>p</sub></span></span> ln <span class="frac"><span><i>p</i><sub>p</sub></span><span><i>p</i><sub>n</sub></span></span></div>

以愛因斯坦關係 D<sub>p</sub>/μ<sub>p</sub> = kT/q，並代入 p<sub>p</sub> = N<sub>A</sub>、p<sub>n</sub> = n<sub>i</sub>²/N<sub>D</sub>：

<div class="eq key"><i>V</i><sub>0</sub> = <span class="frac"><span><i>kT</i></span><span><i>q</i></span></span> ln <span class="frac"><span><i>N</i><sub>A</sub> <i>N</i><sub>D</sub></span><span><i>n</i><sub>i</sub><sup>2</sup></span></span> = <i>V</i><sub>T</sub> ln <span class="frac"><span><i>N</i><sub>A</sub> <i>N</i><sub>D</sub></span><span><i>n</i><sub>i</sub><sup>2</sup></span></span></div>

<div class="box ex"><span class="tag">例題</span>

(1) N<sub>A</sub> = 2×10<sup>16</sup>、N<sub>D</sub> = 4×10<sup>16</sup> cm<sup>−3</sup>，求室溫 V<sub>0</sub>。

<span class="m"><i>V</i><sub>0</sub> = 0.026 × ln(8×10<sup>32</sup>/1.166×10<sup>20</sup>) = 0.026 × ln(6.86×10<sup>12</sup>) ≈ 0.026 × 29.56 ≈ <b>768 mV</b></span>

(2) N<sub>A</sub> 或 N<sub>D</sub> 增加 10 倍，V<sub>0</sub> 變化多少？

<span class="m">Δ<i>V</i><sub>0</sub> = <i>V</i><sub>T</sub> ln 10 ≈ <b>60 mV</b></span>。V<sub>0</sub> 與摻雜呈對數關係，因此矽 PN 接面的 V<sub>0</sub> 大多在 0.7～0.9 V。

</div>

<div class="box warn"><span class="tag">觀念題</span><br>用電壓計量測二極體兩端<b>量不到 V<sub>0</sub></b>。探針與半導體的金屬-半導體接觸也有內建電位，整個迴路的電位差總和為零。否則二極體可當電池無中生有地供電，違反能量守恆。</div>

<div class="practice"><span class="tag">練習 2.2.1</span>
<details class="q"><summary>（計算）N<sub>A</sub> = 10<sup>18</sup> cm<sup>−3</sup>、N<sub>D</sub> = 10<sup>15</sup> cm<sup>−3</sup>，求內建電位 V<sub>0</sub>。</summary>
<ol class="sol"><li>N<sub>A</sub>N<sub>D</sub>/n<sub>i</sub><sup>2</sup> = 10<sup>33</sup> / 1.17 × 10<sup>20</sup> ≈ 8.55 × 10<sup>12</sup>。</li><li>ln(8.55 × 10<sup>12</sup>) ≈ 29.78，V<sub>0</sub> ≈ 0.026 × 29.78 ≈ 0.774 V。</li></ol></details>
<details class="q"><summary>（是非）以電壓計跨接未加偏壓的 PN 接面兩端，可量到 V<sub>0</sub>。</summary>
<ol class="sol"><li>✗。金屬與半導體的接觸也會產生接觸電位，整個迴路的接觸電位總和抵消 V<sub>0</sub>，量測值為零。</li></ol></details>
</div>

## 2.2.2 逆向偏壓與接面電容

### 1　逆偏時發生什麼事

<b>逆偏（reverse bias）</b>：n 側接較高電壓。外加電場與內建電場<b>同向</b>，總電場增強，更多多數載子被拉離接面，<b>空乏區變寬</b>，位障升高為 V<sub>0</sub> + V<sub>R</sub>，多數載子更難擴散過去，<b>幾乎沒有電流</b>（只剩極小的 −I<sub>S</sub>，見 2.2.4）。

<figure class="fig"><svg id="f-jrev"></svg>
  <figcaption>逆偏的 PN 接面：空乏區變寬，裸露的離子增加，電場增強。</figcaption></figure>

### 2　接面電容

空乏區一側為正電荷、另一側為負電荷，中間沒有自由載子，等效於一個<b>平行板電容</b>。逆偏愈大，空乏區愈寬，相當於極板距離增加，<b>電容愈小</b>。

<figure class="fig"><svg id="f-cap" class="md"></svg>
  <figcaption>平行板電容類比：C = ε<sub>si</sub>A/W。空乏區寬度 W 隨逆偏電壓增加。</figcaption></figure>

<div class="eq key"><i>C</i><sub>j</sub> = <span class="frac"><span><i>C</i><sub>j0</sub></span><span>√<span class="rad">1 + <i>V</i><sub>R</sub>/<i>V</i><sub>0</sub></span></span></span> &nbsp;&nbsp;&nbsp;&nbsp; <i>C</i><sub>j0</sub> = √<span class="rad"><span class="frac"><span><i>ε</i><sub>si</sub> <i>q</i></span><span>2</span></span> · <span class="frac"><span><i>N</i><sub>A</sub> <i>N</i><sub>D</sub></span><span><i>N</i><sub>A</sub> + <i>N</i><sub>D</sub></span></span> · <span class="frac"><span>1</span><span><i>V</i><sub>0</sub></span></span></span></div>

<div class="tbl"><table>
  <tr><th>符號</th><th>意義</th><th>數值／單位</th></tr>
  <tr><td><i>C</i><sub>j</sub></td><td>單位面積接面電容</td><td>F/cm²</td></tr>
  <tr><td><i>C</i><sub>j0</sub></td><td>零偏壓時的電容</td><td>F/cm²</td></tr>
  <tr><td><i>V</i><sub>R</sub></td><td>逆偏電壓大小</td><td>V</td></tr>
  <tr><td><i>ε</i><sub>si</sub></td><td>矽的介電常數</td><td>11.7 × 8.85×10<sup>−14</sup> ≈ 1.04×10<sup>−12</sup> F/cm</td></tr>
</table></div>

<div class="box warn"><span class="tag">正負號</span><br>部分版本寫成 <span class="m"><i>C</i><sub>j</sub> = <i>C</i><sub>j0</sub>/√(1 − <i>V</i><sub>R</sub>/<i>V</i><sub>0</sub>)</span>，此時 V<sub>R</sub> 指接面電壓，<b>逆偏時為負值</b>。兩種寫法等價，作答時依題目定義：逆偏愈大，電容愈小。</div>

<div class="box note"><span class="tag">補充推導</span><br>空乏區寬度 <span class="m"><i>W</i> = √[(2<i>ε</i><sub>si</sub>/<i>q</i>)(1/<i>N</i><sub>A</sub> + 1/<i>N</i><sub>D</sub>)(<i>V</i><sub>0</sub> + <i>V</i><sub>R</sub>)]</span>，代入 <span class="m"><i>C</i><sub>j</sub> = <i>ε</i><sub>si</sub>/<i>W</i></span> 即得上式。</div>

<figure class="fig"><svg id="f-cj"></svg>
  <figcaption>C<sub>j</sub> 與逆偏電壓的關係（N<sub>A</sub> = 2×10<sup>16</sup>、N<sub>D</sub> = 9×10<sup>15</sup> cm<sup>−3</sup>）。標記點為下方例題的兩個答案。</figcaption></figure>

<div class="box ex"><span class="tag">例題</span>

N<sub>A</sub> = 2×10<sup>16</sup>、N<sub>D</sub> = 9×10<sup>15</sup> cm<sup>−3</sup>，求 V<sub>R</sub> = 0 與 1 V 時的接面電容。

<ul>
  <li><span class="m"><i>V</i><sub>0</sub> = 0.026 × ln(1.8×10<sup>32</sup>/1.166×10<sup>20</sup>) ≈ 0.73 V</span></li>
  <li><span class="m"><i>C</i><sub>j0</sub> = √[(1.04×10<sup>−12</sup> × 1.6×10<sup>−19</sup>/2) × (1.8×10<sup>32</sup>/2.9×10<sup>16</sup>) × (1/0.73)] ≈ 2.65×10<sup>−8</sup> F/cm² = <b>0.265 fF/μm²</b></span>（1 cm² = 10<sup>8</sup> μm²）</li>
  <li>V<sub>R</sub> = 1 V：<span class="m"><i>C</i><sub>j</sub> = 0.265/√(1 + 1/0.73) ≈ <b>0.172 fF/μm²</b></span></li>
</ul>
</div>

### 3　應用：變容二極體（Varactor）

以電壓控制電容的元件，常用於<b>壓控振盪器（VCO）</b>，例如手機以電壓調整振盪頻率。

<div class="grid2">
  <figure class="fig"><svg id="f-lc" class="sm"></svg>
    <figcaption>LC 共振槽：f = 1/(2π√(LC))。控制電壓使接面逆偏，改變 C<sub>j</sub>，即可調整頻率。</figcaption></figure>
  <figure class="fig"><svg id="f-fvr"></svg>
    <figcaption>振盪頻率與逆偏電壓的關係（下方例題）。</figcaption></figure>
</div>

<div class="box ex"><span class="tag">例題</span>

手機中的 2 GHz 振盪器頻率由 LC 共振決定。電容採用上一例題的接面，面積 2000 μm²。V<sub>R</sub> = 0 時頻率為 2 GHz，求 V<sub>R</sub> 由 0 變到 2 V 時的頻率。

<ul>
  <li>V<sub>R</sub> = 0：<span class="m"><i>C</i> = 0.265 × 2000 = 530 fF</span> → <span class="m"><i>L</i> = 1/[(2π·2×10<sup>9</sup>)<sup>2</sup> × 530×10<sup>−15</sup>] ≈ 11.9 nH</span></li>
  <li>V<sub>R</sub> = 2 V：<span class="m"><i>C</i><sub>j</sub> = 0.265/√(1 + 2/0.73) ≈ 0.137 fF/μm²</span> → <span class="m"><i>C</i> ≈ 274 fF</span></li>
  <li><span class="m"><i>f</i> = 2 GHz × √(530/274) ≈ <b>2.78 GHz</b></span></li>
</ul>

僅改變 2 V 控制電壓，頻率可調將近 800 MHz。

</div>

### 4　互動：逆偏下的空乏區

<figure class="fig"><div class="jw" data-v="-3"></div>
  <figcaption>V = −3 V。與平衡時相比：空乏區變寬、峰值電場增大、電位差變為 V<sub>0</sub> + V<sub>R</sub>；接面邊緣的少數載子被抽空（濃度低於平衡值）。</figcaption></figure>

<div class="practice"><span class="tag">練習 2.2.2</span>
<details class="q"><summary>（計算）V<sub>0</sub> = 0.8 V，逆偏 V<sub>R</sub> = 1.6 V 時，C<sub>j</sub> 為 C<sub>j0</sub> 的幾倍？</summary>
<ol class="sol"><li>C<sub>j</sub>/C<sub>j0</sub> = 1/√(1 + 1.6/0.8) = 1/√3 ≈ 0.577。</li></ol></details>
<details class="q"><summary>（是非）逆偏電壓增加時空乏區變窄，接面電容變大。</summary>
<ol class="sol"><li>✗。逆偏增加使空乏區變寬，等效平行板間距增大，電容變小。</li></ol></details>
</div>

## 2.2.3 順向偏壓

### 1　位障降低

<b>順偏（forward bias）</b>：p 側接較高電壓。外加電場與內建電場<b>反向</b>，位障由 V<sub>0</sub> 降為 <b>V<sub>0</sub> − V<sub>F</sub></b>，多數載子較易越過接面，擴散勝過漂移，產生淨電流。

<figure class="fig"><svg id="f-barrier"></svg>
  <figcaption>電洞由 p 側往 n 側所見的位能障。逆偏使位障升高、幾乎無載子越過；順偏使位障降低，越過的載子數隨 V<sub>F</sub> 指數增加。</figcaption></figure>

<figure class="fig"><svg id="f-jfwd"></svg>
  <figcaption>順偏的 PN 接面：空乏區變窄，大量多數載子越過接面，成為對側的<b>少數載子</b>（稱為<b>注入</b>），並在中性區中邊擴散邊復合。</figcaption></figure>

### 2　接面邊緣的少數載子濃度

由 V<sub>0</sub> = V<sub>T</sub> ln(p<sub>p</sub>/p<sub>n</sub>)，<b>平衡時</b>（下標 e）：

<div class="eq"><i>p</i><sub>n,e</sub> = <span class="frac"><span><i>p</i><sub>p,e</sub></span><span>exp(<i>V</i><sub>0</sub>/<i>V</i><sub>T</sub>)</span></span></div>

<b>順偏時</b>（下標 f），位障變為 V<sub>0</sub> − V<sub>F</sub>：

<div class="eq"><i>p</i><sub>n,f</sub> = <span class="frac"><span><i>p</i><sub>p,f</sub></span><span>exp[(<i>V</i><sub>0</sub> − <i>V</i><sub>F</sub>)/<i>V</i><sub>T</sub>]</span></span></div>

假設多數載子濃度幾乎不變（p<sub>p,f</sub> ≈ p<sub>p,e</sub> ≈ N<sub>A</sub>），n 側邊緣的電洞增加量為：

<div class="eq key">Δ<i>p</i><sub>n</sub> ≈ <span class="frac"><span><i>N</i><sub>A</sub></span><span>exp(<i>V</i><sub>0</sub>/<i>V</i><sub>T</sub>)</span></span><span class="pr">(</span>exp <span class="frac"><span><i>V</i><sub>F</sub></span><span><i>V</i><sub>T</sub></span></span> − 1<span class="pr">)</span> &nbsp;&nbsp;&nbsp;&nbsp; Δ<i>n</i><sub>p</sub> ≈ <span class="frac"><span><i>N</i><sub>D</sub></span><span>exp(<i>V</i><sub>0</sub>/<i>V</i><sub>T</sub>)</span></span><span class="pr">(</span>exp <span class="frac"><span><i>V</i><sub>F</sub></span><span><i>V</i><sub>T</sub></span></span> − 1<span class="pr">)</span></div>

注意 <span class="m"><i>N</i><sub>A</sub>/exp(<i>V</i><sub>0</sub>/<i>V</i><sub>T</sub>) = <i>n</i><sub>i</sub><sup>2</sup>/<i>N</i><sub>D</sub> = <i>p</i><sub>n,e</sub></span>，即邊緣少數載子濃度變為平衡值的 e<sup>V<sub>F</sub>/V<sub>T</sub></sup> 倍。

### 3　注入載子的分布與電流組成

<div class="grid2">
  <figure class="fig"><svg id="f-minprof"></svg>
    <figcaption>超量少數載子分布：在中性區中因復合而指數衰減，特徵長度為擴散長度 L<sub>n</sub>、L<sub>p</sub>。此處 N<sub>A</sub> &gt; N<sub>D</sub>，故 Δp<sub>n</sub> &gt; Δn<sub>p</sub>。</figcaption></figure>
  <figure class="fig"><svg id="f-curcomp"></svg>
    <figcaption>電流組成（示意）：靠近接面以少數載子擴散為主；遠離接面時少數載子已復合，改由多數載子漂移承擔。<b>總電流處處相同</b>。</figcaption></figure>
</div>

<div class="box note"><span class="tag">補充</span><br>擴散長度 <span class="m"><i>L</i> = √(<i>Dτ</i>)</span>，τ 為少數載子平均壽命。</div>

### 4　順偏電流與 I<sub>S</sub>

擴散電流 ∝ D × (邊緣超量濃度) / L，將兩側相加：

<div class="eq key"><i>I</i><sub>tot</sub> = <i>I</i><sub>S</sub> <span class="pr">(</span>exp <span class="frac"><span><i>V</i><sub>F</sub></span><span><i>V</i><sub>T</sub></span></span> − 1<span class="pr">)</span> &nbsp;&nbsp;&nbsp;&nbsp; <i>I</i><sub>S</sub> = <i>A q n</i><sub>i</sub><sup>2</sup> <span class="pr">(</span><span class="frac"><span><i>D</i><sub>n</sub></span><span><i>N</i><sub>A</sub> <i>L</i><sub>n</sub></span></span> + <span class="frac"><span><i>D</i><sub>p</sub></span><span><i>N</i><sub>D</sub> <i>L</i><sub>p</sub></span></span><span class="pr">)</span></div>

<ul>
  <li><b>I<sub>S</sub>：逆向飽和電流（reverse saturation current）</b></li>
  <li>A 為接面截面積，<b>I<sub>S</sub> ∝ A</b></li>
  <li>I<sub>S</sub> 含 n<sub>i</sub><sup>2</sup>，<b>對溫度極為敏感</b></li>
  <li>摻雜較淡的一側貢獻較大（分母含 N）</li>
</ul>

<div class="box ex"><span class="tag">例題</span>

N<sub>A</sub> = 2×10<sup>16</sup>、N<sub>D</sub> = 4×10<sup>16</sup> cm<sup>−3</sup>，A = 100 μm²，L<sub>n</sub> = 20 μm，L<sub>p</sub> = 30 μm，求 300 K 的 I<sub>S</sub>。

<ul>
  <li>A = 10<sup>−6</sup> cm²；L<sub>n</sub> = 20×10<sup>−4</sup> cm；L<sub>p</sub> = 30×10<sup>−4</sup> cm</li>
  <li><span class="m"><i>q n</i><sub>i</sub><sup>2</sup> = 1.6×10<sup>−19</sup> × 1.166×10<sup>20</sup> ≈ 18.66</span></li>
  <li><span class="m"><i>D</i><sub>n</sub>/(<i>N</i><sub>A</sub><i>L</i><sub>n</sub>) = 34/(2×10<sup>16</sup> × 20×10<sup>−4</sup>) = 8.5×10<sup>−13</sup></span></li>
  <li><span class="m"><i>D</i><sub>p</sub>/(<i>N</i><sub>D</sub><i>L</i><sub>p</sub>) = 12/(4×10<sup>16</sup> × 30×10<sup>−4</sup>) = 1.0×10<sup>−13</sup></span></li>
  <li><span class="m"><i>I</i><sub>S</sub> = 10<sup>−6</sup> × 18.66 × 9.5×10<sup>−13</sup> ≈ <b>1.77 × 10<sup>−17</sup> A</b></span></li>
</ul>

延伸：流 1 mA 所需電壓 <span class="m"><i>V</i><sub>F</sub> = <i>V</i><sub>T</sub> ln(<i>I</i>/<i>I</i><sub>S</sub>) = 0.026 × ln(10<sup>−3</sup>/1.77×10<sup>−17</sup>) ≈ <b>0.82 V</b></span>。這就是二極體「導通電壓約 0.7～0.8 V」的由來。

</div>

### 5　互動：順偏下的空乏區

<figure class="fig"><div class="jw" data-v="0.55"></div>
  <figcaption>V = +0.55 V。空乏區變窄、電場變弱、電位差變為 V<sub>0</sub> − V<sub>F</sub>；接面邊緣的少數載子增加為平衡值的 e<sup>V/V<sub>T</sub></sup> 倍，並在中性區中指數衰減。</figcaption></figure>

<div class="practice"><span class="tag">練習 2.2.3</span>
<details class="q"><summary>（計算）順偏電壓 V<sub>F</sub> 增加 60 mV，接面邊緣注入的少數載子濃度約變為幾倍？（設 e<sup>V<sub>F</sub>/V<sub>T</sub></sup> ≫ 1）</summary>
<ol class="sol"><li>Δp<sub>n</sub> ∝ e<sup>V<sub>F</sub>/V<sub>T</sub></sup>。</li><li>e<sup>0.06/0.026</sup> ≈ e<sup>2.31</sup> ≈ 10，約變為 10 倍。</li></ol></details>
</div>

## 2.2.4 I/V 特性

### 1　二極體方程式

順偏與逆偏可合併成同一式：

<div class="eq key"><i>I</i><sub>D</sub> = <i>I</i><sub>S</sub> <span class="pr">(</span>exp <span class="frac"><span><i>V</i><sub>D</sub></span><span><i>V</i><sub>T</sub></span></span> − 1<span class="pr">)</span> &nbsp;&nbsp;&nbsp;&nbsp; <i>V</i><sub>D</sub> = <i>V</i><sub>T</sub> ln <span class="frac"><span><i>I</i><sub>D</sub></span><span><i>I</i><sub>S</sub></span></span><span class="cm">後式適用於順偏 I<sub>D</sub> ≫ I<sub>S</sub></span></div>

<ul>
  <li><b>順偏</b>（V<sub>D</sub> 為數倍 V<sub>T</sub>以上）：<span class="m"><i>I</i><sub>D</sub> ≈ <i>I</i><sub>S</sub> exp(<i>V</i><sub>D</sub>/<i>V</i><sub>T</sub>)</span>，電流指數上升。</li>
  <li><b>逆偏</b>（V<sub>D</sub> &lt; 0）：<span class="m"><i>I</i><sub>D</sub> ≈ −<i>I</i><sub>S</sub></span>，極小，故 I<sub>S</sub> 稱為逆向飽和電流。</li>
</ul>

<figure class="fig">
  <div class="ctrl"><label>log<sub>10</sub> I<sub>S</sub> <input type="range" id="isS" min="-18" max="-12" step="0.05" value="-16.75"></label><output id="isSo"></output></div>
  <div class="readout" id="isR"></div>
  <div class="grid2"><svg id="f-iv-lin"></svg><svg id="f-iv-log"></svg></div>
  <figcaption>左：線性刻度，看起來像有一個「導通電壓」。右：對數刻度，順偏區為直線，斜率為每 60 mV 電流變 10 倍。改變 I<sub>S</sub>（例如改變面積）只會使曲線左右平移。</figcaption>
</figure>

### 2　重要經驗法則

<div class="eq key">電流 × 10 &nbsp;⟺&nbsp; Δ<i>V</i><sub>D</sub> = <i>V</i><sub>T</sub> ln 10 ≈ 60 mV</div>

<ul>
  <li><b>面積加倍</b>（或兩個相同二極體並聯）：I<sub>S</sub> 加倍，流相同電流時 V<sub>D</sub> 降低 <span class="m"><i>V</i><sub>T</sub> ln 2 ≈ 18 mV</span>。</li>
  <li>兩相同接面並聯、總電流 I<sub>T</sub>：<span class="m"><i>V</i> = <i>V</i><sub>T</sub> ln[<i>I</i><sub>T</sub>/(2<i>I</i><sub>S</sub>)]</span>，等效於面積加倍的單一二極體。</li>
</ul>

### 3　定電壓模型（Constant-Voltage Model）

指數方程式不易手算。由於電流變 10 倍電壓才增加 60 mV，在一般電流範圍內 V<sub>D</sub> 大致固定，因此可簡化為：

<div class="grid2">
  <figure class="fig"><svg id="f-cvm"></svg>
    <figcaption>實際指數特性（細線）與定電壓模型（粗線，V<sub>D,on</sub> = 0.8 V）。</figcaption></figure>
  <figure class="fig"><svg id="f-cvm-ckt" class="sm"></svg>
    <figcaption>定電壓模型的等效電路：截止時為開路；導通時為電壓源 V<sub>D,on</sub>（約 0.7～0.8 V，Razavi 常用 800 mV）。</figcaption></figure>
</div>

### 4　例題：迭代法求解二極體電路

電路：電壓源 V<sub>X</sub> 串聯 R = 1 kΩ 與二極體，I<sub>S</sub> = 2×10<sup>−16</sup> A。困難處在於 <span class="m"><i>I</i> = (<i>V</i><sub>X</sub> − <i>V</i><sub>D</sub>)/<i>R</i></span> 與 <span class="m"><i>V</i><sub>D</sub> = <i>V</i><sub>T</sub> ln(<i>I</i>/<i>I</i><sub>S</sub>)</span> 互相依賴。

<ol>
  <li>先假設 V<sub>D</sub> = 0.8 V</li>
  <li>計算 I = (V<sub>X</sub> − V<sub>D</sub>)/R</li>
  <li>以 V<sub>D</sub> = V<sub>T</sub> ln(I/I<sub>S</sub>) 更新 V<sub>D</sub></li>
  <li>重複 2～3 直到收斂</li>
</ol>

<figure class="fig">
  <div class="ctrl"><label>V<sub>X</sub> <input type="range" id="itV" min="0.85" max="5" step="0.05" value="3"></label><output id="itVo"></output>
    <span class="seg" id="itPre"><button type="button" data-v="3">3 V</button><button type="button" data-v="1">1 V</button></span></div>
  <div class="grid2">
    <div><svg id="f-itckt" class="sm" style="display:block;width:100%;max-width:300px;margin:0 auto"></svg>
      <div class="tbl"><table class="it" id="itTbl"></table></div></div>
    <svg id="f-itload"></svg>
  </div>
  <figcaption>右圖為負載線法：二極體特性曲線與電阻線 I = (V<sub>X</sub> − V)/R 的交點即為解。V<sub>X</sub> = 3 V 時 I ≈ 2.22 mA、V<sub>D</sub> ≈ 0.781 V，假設 0.8 V 的誤差很小；V<sub>X</sub> = 1 V 時 I ≈ 0.274 mA、V<sub>D</sub> ≈ 0.727 V，若直接用 0.8 V 會得到 0.2 mA，誤差約 27%。</figcaption>
</figure>

<div class="box"><span class="tag">重點</span><br>電源電壓遠大於 V<sub>D</sub> 時，定電壓模型足夠準確；兩者接近時必須用指數模型或迭代。</div>

<div class="practice"><span class="tag">練習 2.2.4</span>
<details class="q"><summary>（計算）I<sub>S</sub> = 10<sup>−16</sup> A，要流 1 mA 需多少 V<sub>D</sub>？</summary>
<ol class="sol"><li>V<sub>D</sub> = V<sub>T</sub> ln(I<sub>D</sub>/I<sub>S</sub>) = 0.026 × ln(10<sup>13</sup>)。</li><li>ln(10<sup>13</sup>) ≈ 29.93，V<sub>D</sub> ≈ 0.778 V。</li></ol></details>
<details class="q"><summary>（計算）兩顆相同二極體並聯，總電流維持 1 mA，每顆的 V<sub>D</sub> 改變多少？</summary>
<ol class="sol"><li>並聯等效於面積加倍，I<sub>S</sub> 加倍。</li><li>ΔV<sub>D</sub> = −V<sub>T</sub> ln 2 ≈ −18 mV。</li></ol></details>
</div>

## 2.3 逆向崩潰

逆偏電壓增加到某一值時電流突然急遽增加，此電壓稱為<b>崩潰電壓 V<sub>BD</sub></b>。<b>崩潰本身不一定損壞元件</b>：只要外部電路限制電流，使功耗 V×I 不致過熱，就能安全操作。<b>齊納二極體（Zener diode）</b>即專門工作於崩潰區，作為穩壓或參考電壓（第 3 章）。

<figure class="fig"><svg id="f-bd"></svg>
  <figcaption>含崩潰區的完整 I/V 特性（示意，V<sub>BD</sub> = 6 V）。</figcaption></figure>

### 1　齊納崩潰（Zener Breakdown）

<figure class="fig"><svg id="f-zener"></svg>
  <figcaption>兩側重摻雜 → 空乏區很窄 → 即使電壓不大，電場也極強（約 10<sup>6</sup> V/cm），足以<b>直接把電子從共價鍵中拉出</b>，產生大量電子-電洞對。</figcaption></figure>

<ul>
  <li>發生於重摻雜接面，V<sub>BD</sub> 較低（約 5 V 以下）</li>
  <li><b>溫度係數為負</b>：溫度升高，V<sub>BD</sub> 下降</li>
</ul>

### 2　雪崩崩潰（Avalanche Breakdown）

<figure class="fig"><svg id="f-aval"></svg>
  <figcaption>摻雜較淡 → 空乏區較寬。載子在寬空乏區中被加速，獲得足夠動能後撞擊晶格，撞出新的電子-電洞對（<b>碰撞游離 impact ionization</b>）。新載子再被加速、再撞擊，數量如雪崩般倍增。</figcaption></figure>

<ul>
  <li>發生於低摻雜接面，V<sub>BD</sub> 較高（約 7 V 以上，可達數十至數百伏）</li>
  <li><b>溫度係數為正</b>：溫度升高，晶格振動加劇，載子不易累積動能，V<sub>BD</sub> 上升</li>
</ul>

<div class="tbl"><table>
  <tr><th></th><th>齊納崩潰</th><th>雪崩崩潰</th></tr>
  <tr><td>摻雜</td><td>兩側重摻雜</td><td>較淡</td></tr>
  <tr><td>空乏區</td><td>窄</td><td>寬</td></tr>
  <tr><td>機制</td><td>強電場直接拉出鍵結電子</td><td>載子加速撞擊，連鎖倍增</td></tr>
  <tr><td>V<sub>BD</sub></td><td>低（約 &lt; 5 V）</td><td>高（約 &gt; 7 V）</td></tr>
  <tr><td>溫度係數</td><td>負</td><td>正</td></tr>
</table></div>

V<sub>BD</sub> 約 5～7 V 時兩種機制並存，溫度係數部分抵消，因此約 6 V 的齊納二極體溫度穩定性最佳。

<div class="practice"><span class="tag">練習 2.3</span>
<details class="q"><summary>（是非）二極體一旦進入逆向崩潰區就會損壞。</summary>
<ol class="sol"><li>✗。崩潰本身是可逆的；只要以外部電阻限制電流、使功率不超過額定值，即可安全操作（齊納二極體即利用此特性）。</li></ol></details>
<details class="q"><summary>（填空）兩側皆重摻雜、空乏區很窄的接面，崩潰機制主要為 ___ 崩潰。</summary>
<ol class="sol"><li>齊納崩潰。窄空乏區內電場極強，可直接把價電子拉出共價鍵。</li></ol></details>
</div>

## 附錄 常數・公式・陷阱・測驗

### A　常數表

<div class="tbl"><table>
  <tr><th>物理量</th><th>數值</th></tr>
  <tr><td>電子電荷 q</td><td>1.6 × 10<sup>−19</sup> C</td></tr>
  <tr><td>波茲曼常數 k</td><td>1.38 × 10<sup>−23</sup> J/K</td></tr>
  <tr><td>1 eV</td><td>1.6 × 10<sup>−19</sup> J</td></tr>
  <tr><td>矽能隙 E<sub>g</sub></td><td>1.12 eV</td></tr>
  <tr><td>矽原子密度</td><td>5 × 10<sup>22</sup> cm<sup>−3</sup></td></tr>
  <tr><td>n<sub>i</sub>（300 K）</td><td>1.08 × 10<sup>10</sup> cm<sup>−3</sup></td></tr>
  <tr><td>n<sub>i</sub><sup>2</sup>（300 K）</td><td>≈ 1.17 × 10<sup>20</sup> cm<sup>−6</sup></td></tr>
  <tr><td>μ<sub>n</sub> / μ<sub>p</sub></td><td>1350 / 480 cm²/(V·s)</td></tr>
  <tr><td>D<sub>n</sub> / D<sub>p</sub></td><td>34 / 12 cm²/s</td></tr>
  <tr><td>V<sub>T</sub> = kT/q（300 K）</td><td>≈ 26 mV</td></tr>
  <tr><td>ε<sub>0</sub></td><td>8.85 × 10<sup>−14</sup> F/cm</td></tr>
  <tr><td>ε<sub>si</sub></td><td>11.7 ε<sub>0</sub> ≈ 1.04 × 10<sup>−12</sup> F/cm</td></tr>
  <tr><td>v<sub>sat</sub>（例題）</td><td>≈ 10<sup>7</sup> cm/s</td></tr>
  <tr><td>V<sub>T</sub> ln 10</td><td>≈ 60 mV</td></tr>
</table></div>

單位換算：1 μm = 10<sup>−4</sup> cm；1 μm² = 10<sup>−8</sup> cm²；1 fF/μm² = 10<sup>−7</sup> F/cm²。課本公式一律以 cm 為長度單位。

### B　公式總表

<div class="tbl"><table>
  <tr><th>主題</th><th>公式</th></tr>
  <tr><td>本質濃度</td><td class="m"><i>n</i><sub>i</sub> = 5.2×10<sup>15</sup> <i>T</i><sup>3/2</sup> exp(−<i>E</i><sub>g</sub>/2<i>kT</i>)</td></tr>
  <tr><td>質量作用</td><td class="m"><i>np</i> = <i>n</i><sub>i</sub><sup>2</sup></td></tr>
  <tr><td>n 型 / p 型</td><td class="m"><i>n</i> ≈ <i>N</i><sub>D</sub>, <i>p</i> = <i>n</i><sub>i</sub><sup>2</sup>/<i>N</i><sub>D</sub> ／ <i>p</i> ≈ <i>N</i><sub>A</sub>, <i>n</i> = <i>n</i><sub>i</sub><sup>2</sup>/<i>N</i><sub>A</sub></td></tr>
  <tr><td>漂移速度</td><td class="m"><i>v</i><sub>h</sub> = <i>μ</i><sub>p</sub><i>E</i>, <i>v</i><sub>e</sub> = −<i>μ</i><sub>n</sub><i>E</i></td></tr>
  <tr><td>漂移電流</td><td class="m"><i>J</i> = <i>q</i>(<i>μ</i><sub>n</sub><i>n</i> + <i>μ</i><sub>p</sub><i>p</i>)<i>E</i></td></tr>
  <tr><td>導電率</td><td class="m"><i>σ</i> = <i>q</i>(<i>μ</i><sub>n</sub><i>n</i> + <i>μ</i><sub>p</sub><i>p</i>), <i>ρ</i> = 1/<i>σ</i></td></tr>
  <tr><td>速度飽和</td><td class="m"><i>μ</i> = <i>μ</i><sub>0</sub>/(1 + <i>bE</i>), <i>v</i><sub>sat</sub> = <i>μ</i><sub>0</sub>/<i>b</i>, <i>v</i> = <i>μ</i><sub>0</sub><i>E</i>/(1 + <i>μ</i><sub>0</sub><i>E</i>/<i>v</i><sub>sat</sub>)</td></tr>
  <tr><td>擴散電流</td><td class="m"><i>J</i><sub>n</sub> = <i>qD</i><sub>n</sub> <i>dn</i>/<i>dx</i>, <i>J</i><sub>p</sub> = −<i>qD</i><sub>p</sub> <i>dp</i>/<i>dx</i></td></tr>
  <tr><td>愛因斯坦</td><td class="m"><i>D</i>/<i>μ</i> = <i>kT</i>/<i>q</i> = <i>V</i><sub>T</sub></td></tr>
  <tr><td>內建電位</td><td class="m"><i>V</i><sub>0</sub> = <i>V</i><sub>T</sub> ln(<i>N</i><sub>A</sub><i>N</i><sub>D</sub>/<i>n</i><sub>i</sub><sup>2</sup>)</td></tr>
  <tr><td>接面電容</td><td class="m"><i>C</i><sub>j</sub> = <i>C</i><sub>j0</sub>/√(1 + <i>V</i><sub>R</sub>/<i>V</i><sub>0</sub>), <i>C</i><sub>j0</sub> = √[(<i>ε</i><sub>si</sub><i>q</i>/2)(<i>N</i><sub>A</sub><i>N</i><sub>D</sub>/(<i>N</i><sub>A</sub>+<i>N</i><sub>D</sub>))(1/<i>V</i><sub>0</sub>)]</td></tr>
  <tr><td>少數載子</td><td class="m"><i>p</i><sub>n</sub> = <i>p</i><sub>p</sub> exp(−<i>V</i><sub>0</sub>/<i>V</i><sub>T</sub>)</td></tr>
  <tr><td>順偏注入</td><td class="m">Δ<i>p</i><sub>n</sub> ≈ (<i>N</i><sub>A</sub>/e<sup><i>V</i><sub>0</sub>/<i>V</i><sub>T</sub></sup>)(e<sup><i>V</i><sub>F</sub>/<i>V</i><sub>T</sub></sup> − 1)</td></tr>
  <tr><td>飽和電流</td><td class="m"><i>I</i><sub>S</sub> = <i>Aqn</i><sub>i</sub><sup>2</sup>[<i>D</i><sub>n</sub>/(<i>N</i><sub>A</sub><i>L</i><sub>n</sub>) + <i>D</i><sub>p</sub>/(<i>N</i><sub>D</sub><i>L</i><sub>p</sub>)]</td></tr>
  <tr><td>二極體</td><td class="m"><i>I</i><sub>D</sub> = <i>I</i><sub>S</sub>(e<sup><i>V</i><sub>D</sub>/<i>V</i><sub>T</sub></sup> − 1), <i>V</i><sub>D</sub> = <i>V</i><sub>T</sub> ln(<i>I</i><sub>D</sub>/<i>I</i><sub>S</sub>)</td></tr>
  <tr><td>經驗法則</td><td>電流 ×10 ⟺ 電壓 +60 mV；面積 ×2 ⟺ 電壓 −18 mV</td></tr>
</table></div>

### C　常見陷阱

<ol>
  <li>n 型不帶負電，整體電中性；帶電的是空乏區內固定的離子。</li>
  <li>電子往左移等於電流往右；電子與電洞的漂移電流方向相同，要相加。</li>
  <li>擴散電流正負號：電子 +qD<sub>n</sub>dn/dx，電洞 −qD<sub>p</sub>dp/dx。</li>
  <li>n<sub>i</sub> 用 1.08×10<sup>10</sup> cm<sup>−3</sup>（Razavi 的值）；其他教材用 1.5×10<sup>10</sup> 會得到不同答案。</li>
  <li>V<sub>0</sub> 無法用電壓計量測。</li>
  <li>逆偏 → 空乏區變寬 → 電容變小；注意 V<sub>R</sub> 正負號定義。</li>
  <li>I<sub>S</sub> 與面積成正比，且對溫度極敏感。</li>
  <li>電源電壓接近 V<sub>D</sub> 時，定電壓模型誤差大。</li>
  <li>崩潰不等於燒毀，限制電流即可安全操作。</li>
  <li>長度一律換成 cm 再代入公式。</li>
</ol>

### D　自我測驗

<details class="q"><summary>1. 矽摻硼 N<sub>A</sub> = 10<sup>17</sup> cm<sup>−3</sup>，室溫下電子濃度為何？</summary>n = n<sub>i</sub>²/N<sub>A</sub> = 1.17×10<sup>20</sup>/10<sup>17</sup> ≈ 1.17×10<sup>3</sup> cm<sup>−3</sup></details>

<details class="q"><summary>2. 為什麼 μ<sub>n</sub> &gt; μ<sub>p</sub>？</summary>電洞的移動是電子在共價鍵之間逐一跳躍，比自由電子在晶格中移動困難。</details>

<details class="q"><summary>3. N<sub>A</sub> = N<sub>D</sub> = 10<sup>16</sup> cm<sup>−3</sup>，求 V<sub>0</sub>。</summary>V<sub>0</sub> = 0.026 × ln(10<sup>32</sup>/1.17×10<sup>20</sup>) ≈ 0.026 × 27.5 ≈ 0.715 V</details>

<details class="q"><summary>4. 二極體在 V<sub>D</sub> = 0.7 V 時流 1 mA，流 10 mA 需要多少 V<sub>D</sub>？</summary>約 0.76 V（+60 mV）</details>

<details class="q"><summary>5. 二極體面積加倍，流相同電流時 V<sub>D</sub> 如何變化？</summary>降低 V<sub>T</sub> ln 2 ≈ 18 mV</details>

<details class="q"><summary>6. 逆偏電壓由 0 增加到 3V<sub>0</sub>，接面電容變為原來的幾倍？</summary>1/√(1 + 3) = 1/2，變為一半</details>

<details class="q"><summary>7. 一 n 型樣品 N<sub>D</sub> = 10<sup>15</sup> cm<sup>−3</sup>，求電阻率。</summary>σ = qμ<sub>n</sub>N<sub>D</sub> = 1.6×10<sup>−19</sup> × 1350 × 10<sup>15</sup> = 0.216 S/cm，ρ ≈ 4.63 Ω·cm</details>

<details class="q"><summary>8. 若 I<sub>S</sub> 中電子項遠大於電洞項，代表哪一側摻雜較淡？</summary>電子項 D<sub>n</sub>/(N<sub>A</sub>L<sub>n</sub>) 較大代表 N<sub>A</sub> 較小，即 p 側摻雜較淡；電流主要由注入 p 側的電子承擔。</details>

<details class="q"><summary>9. 齊納崩潰與雪崩崩潰的溫度係數各為正或負？</summary>齊納為負，雪崩為正。</details>

### E　名詞對照表

| 中文 | English |
|------|---------|
| 價電子 | valence electron |
| 共價鍵 | covalent bond |
| 能隙 | bandgap energy |
| 電洞 | hole |
| 載子 | carrier |
| 產生 | generation |
| 復合 | recombination |
| 本質半導體 | intrinsic semiconductor |
| 摻雜 | doping |
| 外質半導體 | extrinsic semiconductor |
| 施體 | donor |
| 受體 | acceptor |
| 多數載子 | majority carrier |
| 少數載子 | minority carrier |
| 漂移 | drift |
| 遷移率 | mobility |
| 速度飽和 | velocity saturation |
| 擴散 | diffusion |
| 擴散係數 | diffusion constant |
| 熱電壓 | thermal voltage |
| 陽極 | anode |
| 陰極 | cathode |
| 空乏區 | depletion region |
| 空間電荷區 | space charge region |
| 內建電位 | built-in potential |
| 逆向偏壓 | reverse bias |
| 接面電容 | junction capacitance |
| 變容二極體 | varactor |
| 壓控振盪器 | voltage-controlled oscillator, VCO |
| 順向偏壓 | forward bias |
| 逆向飽和電流 | reverse saturation current |
| 定電壓模型 | constant-voltage model |
| 齊納崩潰 | Zener breakdown |
| 雪崩崩潰 | avalanche breakdown |
| 齊納二極體 | Zener diode |
