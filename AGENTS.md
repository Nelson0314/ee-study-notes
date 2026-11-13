# AGENTS.md — EE Notes 專案規則

本文件是本專案唯一的規則來源，供 AI agent（Claude Code、Codex 等）與人類協作者共用。`CLAUDE.md` 以 `@AGENTS.md` 匯入本文件；網站的「編寫規範」頁（`docs/guide.html`）也由本文件直接產生。修改規則時只改這一份。

---

## §0 專案目的

EE Notes 是電機系課程的**圖解講義網站**。每一章講義把教材（課本章節、上課投影片）整理成：

1. 依教材原順序、不遺漏概念的完整說明；
2. 以 SVG 繪製的電路圖、特性曲線與可拖動參數的互動圖；
3. 每個小節的例題與練習（詳解預設折疊）；
4. 章末附錄：公式總表、常見陷阱、自我測驗、名詞中英對照。

讀者用途是考前複習與自學。目標是**任何一章都能用同一套骨架、元件與流程產出**，新增一章不需要重新設計版面。

非目標：不做帳號、留言、搜尋後端；不引入前端框架、CDN 或建置工具鏈（只用 Python 標準函式庫 + `markdown` 套件）。

---

## §1 目錄結構

```
ee-study-notes/
├── AGENTS.md                 ← 本文件（規則唯一來源）
├── CLAUDE.md                 ← Claude Code 入口：匯入本文件 + Claude 專用說明
├── README.md                 ← 給 GitHub 訪客的簡介
├── site.json                 ← 站名、副標、課程清單與顯示順序
├── content/                  ← 【唯一需要手寫的內容】
│   └── <course>/             ← 一門課一個資料夾，名稱 = 課程 slug
│       ├── course.json       ← 課程資訊 + 全部章節的登錄表（含規劃中章節）
│       ├── lib.js            ← （選用）該課程共用的繪圖原語，如電路元件
│       ├── chNN-<slug>.md    ← 一章一檔
│       └── figs/chNN.js      ← （選用）該章所有圖與互動元件的程式
├── assets/
│   ├── css/notes.css         ← 全站唯一樣式表
│   └── js/core.js, theme.js  ← 全站共用：SVG 輔助函式、plot()、深淺色切換
├── templates/
│   ├── chapter.md            ← 新章節範本（骨架與每種元件的寫法）
│   └── _markers.svg          ← SVG 箭頭定義，模板自動嵌入每頁
├── tools/
│   ├── check.py              ← 規則檢查器（§8 的 R1–R11）
│   ├── build.py              ← 檢查通過後產生 docs/
│   └── new_chapter.py        ← 由範本建立新章節檔
├── .claude/skills/add-chapter/SKILL.md  ← Claude Code 的「新增一章」工作流程
└── docs/                     ← 【產生物】GitHub Pages 發布目錄，禁止手動修改
```

資料流：`content/*.md` + `course.json` →（`check.py` 驗證）→ `build.py` → `docs/*.html`。

---

## §2 命名規則

| 對象 | 規則 | 範例 |
|------|------|------|
| 課程資料夾 / 課程 slug | 小寫英文 kebab-case，與 `course.json` 的 `slug` 相同 | `electronics`、`signals-systems` |
| 章節檔 | `chNN-<slug>.md`，NN 為兩位數章號，slug 與 `course.json` 中該章相同 | `ch03-diode-models.md` |
| 章節圖檔 | `figs/chNN.js`，章號與章節檔相同 | `figs/ch03.js` |
| 輸出頁 | 由 build 決定：`docs/<course>/chNN.html` | `docs/electronics/ch03.html` |
| SVG 元素 id | 小寫、以 `f-`（圖）、`e`（例題圖，如 `e31`）、`p`（練習圖，如 `p31a`）開頭；同一章內不得重複 | `f-ideal`、`e36` |
| 互動控制 id | 以該互動圖的 2–3 字母前綴開頭 | `tcVB`、`tcVBo`（輸出值） |

章號以**課本章號**為準，不以投影片編號為準；投影片編號寫在 `course.json` 的 `source`。

---

## §3 新增或修改內容的流程

### 3.1 新增一章

1. **登錄**：確認該章已列在 `content/<course>/course.json` 的 `chapters`（`no`、`slug`、`title`、`title_en`、`source`）。未列出就先加入，`no` 維持遞增。
2. **建立檔案**：`python tools/new_chapter.py <course> <no>`。腳本依 `course.json` 從 `templates/chapter.md` 產生 `chNN-<slug>.md`，並建立空白的 `figs/chNN.js`。
3. **讀教材**：PDF 一次最多讀 20 頁，連續不跳頁。記下總頁數，整理完後確認每一頁的概念都已落入某個小節。
4. **撰寫**：依 §4 骨架與 §5 元件撰寫；依 §6 寫作規範用自己的文字說明。
5. **畫圖**：在 `.md` 放 `<svg id="...">` 佔位，在 `figs/chNN.js` 中繪製（§7）。
6. **驗證與產生**：`python tools/build.py`。build 會先跑 `check.py`，任何 ERROR 都會中止；依訊息中的規則編號（R1–R11）修正後重跑。
7. **目視確認**：用瀏覽器開 `docs/<course>/chNN.html`，確認圖都有畫出、互動控制可用、深色模式可讀、手機寬度不跑版。

### 3.2 修改既有章節

- 只改 `content/` 下的檔案，然後重跑 `python tools/build.py`。
- 小節編號變動時，同步檢查頁內 `href="#sec-…"` 錨點（R10 會擋下失效連結）。
- 修改後更新 frontmatter 的 `updated`。

### 3.3 新增一門課

1. 建立 `content/<course>/course.json`（欄位見 §4.1；可複製 `electronics` 的檔案改寫）。
2. 在 `site.json` 的 `courses` 陣列加入課程 slug。
3. 該課程若需要專屬繪圖原語（例如訊號與系統的頻譜圖），寫在 `content/<course>/lib.js` 並列入 `course.json` 的 `scripts`；跨課程通用的函式才放進 `assets/js/core.js`。
4. 依 3.1 新增第一章。首頁的課程卡片與課程頁由 build 自動產生。

---

## §4 章節骨架

### 4.1 `course.json`

```json
{
  "slug": "electronics",
  "title": "電子學",
  "title_en": "Microelectronics",
  "textbook": "完整書目",
  "textbook_short": "頁首副標使用的短書名",
  "description": "課程卡片上的一句說明",
  "scripts": ["lib.js"],
  "disclaimer": "每章頁尾的來源聲明",
  "chapters": [
    {"no": 3, "slug": "diode-models", "title": "二極體模型與電路",
     "title_en": "Diode Models and Circuits", "source": "Slide 3；課本 Ch.3"}
  ]
}
```

`chapters` 同時是**進度表**：有對應 `.md` 的章節顯示為「已完成」並產生頁面，沒有的顯示為「規劃中」。

### 4.2 章節檔結構

```markdown
---
chapter: 3
summary: 一句話說明本章涵蓋的內容（顯示於課程頁與首頁）
updated: 2026-11-13
---

## 0 本章導覽
（本章與前後章的關係、.flow 學習路線、.goal 學習目標）

## 3.1 第一個大主題
### 1　子主題
…（說明、圖、例題、練習）

## 3.2 第二個大主題
…

## 附錄 公式・陷阱・測驗
### A　公式總表
### B　常見陷阱
### C　自我測驗
### D　名詞對照表
```

規則：

- 不寫 `#`（h1）。頁標題「第 N 章　標題」與副標由模板依 `course.json` 產生。
- 第一節固定為 `## 0 本章導覽`，必須含 `.goal`；建議含 `.flow`。
- 中間為**編號小節** `## N.x 標題`（或 `N.x.y`），編號必須以本章章號開頭且遞增，數量 3–8 節。以教材的大主題切分，相關概念併入同一節，以 `###` 細分。
- `###` 子標題格式為 `### <序號>　<標題>`（序號後接全形空白），序號用 `1 2 3`；附錄用 `A B C D`。目錄顯示時會去掉序號。
- 最後一節固定為 `## 附錄 …`，必須包含標題含「公式」「陷阱」「自我測驗」「名詞對照」的四個 `###` 子節。
- 標題 id 由 build 自動產生：`0`→`intro`、`3.1`→`sec-3-1`、`附錄`→`app`，h3 依序加 `-a`、`-b`…（如 `sec-3-1-a`）。頁內連結一律使用這組 id。

### 4.3 內容密度要求

- 每個編號小節至少一個 `.box.ex`（例題）或 `.practice`（練習）（R6）。建議每節都有可折疊詳解的 `details.q`。
- 附錄自我測驗至少 5 題（R7），題型涵蓋計算、是非、觀念解釋。
- 名詞對照表收錄本章所有首次出現時標註英文的術語。

---

## §5 元件規格

章節檔是 Markdown；以下元件以 **HTML 區塊**撰寫（區塊前後各留一空行，區塊內部不留空行）。只能使用此處列出的 class（R8 白名單）；需要新元件時，先在本節定義、在 `assets/css/notes.css` 加樣式、在 `tools/check.py` 的 `ALLOWED_CLASSES` 登錄，三處同步。

| 元件 | 用途 | 寫法 |
|------|------|------|
| `.flow` / `.stage` / `.arr` | 本章導覽的學習路線（2–4 階段） | `<div class="flow"><div class="stage"><h4>① 模型（3.1–3.2）</h4><ul>…</ul></div><div class="arr">➜</div>…</div>` |
| `.goal` | 學習目標（「讀完本章應能：」+ 條列） | `<div class="goal"><b>讀完本章應能：</b><ul>…</ul></div>` |
| `.box` | 一般重點框，`.tag` 為框標題 | `<div class="box"><span class="tag">分析程序</span>…</div>` |
| `.box.ex` | 例題（綠色）：題目 + 完整解題 | `<div class="box ex"><span class="tag">例題 3.1</span><br>…</div>` |
| `.box.note` | 觀念說明 / 補充（灰色） | `<div class="box note"><span class="tag">觀念說明：…</span>…</div>` |
| `.box.warn` | 考點 / 易錯處（橘色） | `<div class="box warn"><span class="tag">易錯處</span><ol>…</ol></div>` |
| `.practice` | 練習題組（紫色），內含一或多個 `details.q` | 見下方 |
| `details.q` + `ol.sol` | 可折疊詳解；`summary` 放題目，`ol.sol` 逐步解 | 見下方 |
| `figure.fig` + `figcaption` | 圖；圖號由 CSS 自動編為「圖 N-k」 | `<figure class="fig"><svg id="f-ideal"></svg><figcaption>…</figcaption></figure>` |
| `.grid2` | 兩張圖並排（手機寬度自動改單欄） | `<div class="grid2"><figure …>…</figure><figure …>…</figure></div>` |
| `svg.sm` / `svg.md` | 縮小的 SVG（符號、小電路） | `<svg id="f-sym" class="sm"></svg>` |
| `.ctrl` / `.seg` / `.readout` | 互動圖的控制列、分段按鈕、即時數值 | 見 `ch03` 的轉移特性圖 |
| `.eq`、`.eq.key` | 獨立一行的公式；`.key` 為本章核心公式（加框） | `<div class="eq key"><i>r</i><sub>d</sub> = <i>V</i><sub>T</sub>/<i>I</i><sub>D</sub></div>` |
| `.frac` | 公式中的分數 | `<span class="frac"><span>分子</span><span>分母</span></span>` |
| `.m` | 行內公式（斜體變數） | `<span class="m"><i>V</i><sub>in</sub></span>` |
| `.tbl` | 表格外框（Markdown 表格由 build 自動加上） | `<div class="tbl"><table>…</table></div>` |

練習題組的標準寫法：

```html
<div class="practice"><span class="tag">練習 3.1</span>
<details class="q"><summary>（計算）題目敘述……</summary>
<ol class="sol"><li>第一步……</li><li>第二步……，答案 ……。</li></ol></details>
</div>
```

公式記法：不用 LaTeX。變數用 `<i>`，上下標用 `<sub>`／`<sup>`，負號用 `−`（U+2212），乘號用 `×`，約等於用 `≈`。

---

## §6 寫作規範

1. **語言**：繁體中文。專有名詞**首次出現**寫成「中文（English）」，之後只用中文；所有這類術語列入附錄名詞對照表。
2. **語氣**：客觀、精確，接近教科書。不用誇飾詞、口語語尾、生活化比喻的延伸、教練式人稱（「我們一起」「別怕」）。
3. **不遺漏、照原序**：依教材的小節順序撰寫；每個定義、結論、例題、圖表都要落入某個小節。推導過程不必逐行抄寫，但推導中用到的假設與近似條件要寫出（這類內容常以是非題出現）。
4. **著作權**：說明文字一律自行重寫，不逐字抄錄課本或投影片；例題保留題意但數值需重新計算。課本、投影片 PDF **不得**放入 repository。
5. **數值**：所有例題與練習的數值都要實際計算並寫出中間步驟；有效位數 2–3 位。常數使用該課程附錄常數表的值（例如電子學 n<sub>i</sub> = 1.08 × 10<sup>10</sup> cm<sup>−3</sup>）。
6. **延伸內容**：教材以外、為輔助理解而加入的內容，`.tag` 以「補充」開頭。
7. **練習題型**：計算題附逐步解；是非題答案以「○／✗。理由」開頭；填空題以「___」表示空格。

---

## §7 圖與互動

- `.md` 只放佔位 `<svg id="…"></svg>`，繪圖程式全部寫在 `figs/chNN.js`。章節檔中不得出現 `<script>`／`<style>`（R4）。
- 每個 `<svg id>` 都必須在 `figs/chNN.js` 中被引用（R9），例如 `$('#f-ideal')`。
- 載入順序（模板固定）：`core.js` → 課程 `lib.js` → `figs/chNN.js` → `theme.js`。各檔以一般 `<script>` 載入、共用全域範圍，因此 `figs/chNN.js` 的頂層程式一律包在 IIFE `(function(){ … })();` 內，避免名稱衝突。
- 顏色只用 CSS 變數對應的 class（`ln-fg`、`ln-e`、`ln-h`、`ln-acc`、`ln-mu`、`t-acc`、`mu`…），不得寫死色碼，深色模式才會正確。
- `core.js` 提供的介面：

| 函式 | 說明 |
|------|------|
| `$(sel)` | `document.querySelector` |
| `E(tag, attrs, parent)` | 建立 SVG 元素 |
| `T(p, x, y, text, attrs)` | 文字；`V_{D}`、`10^{3}` 會轉成下標／上標 |
| `L(p, x1, y1, x2, y2, cls, markerEnd, markerStart)` | 線段；marker 用 `a-fg`、`a-acc` 等（定義於 `templates/_markers.svg`） |
| `plot(svg, {w,h,x:[min,max],y:[min,max],xlabel,ylabel,xlog,ylog,m})` | 建立座標圖，回傳物件 `P`：`P.fn(f,cls)` 函數曲線、`P.path(pts,cls)` 折線、`P.poly(pts,cls)` 填色區、`P.rect(x0,x1,cls)` 垂直帶、`P.dot(x,y)`、`P.label(x,y,text,attrs)`、`P.hline(y)`／`P.vline(x)` 參考線、`P.sx()`／`P.sy()`（資料座標→像素） |
| `sci(x)`、`fnum(v)`、`nice()`、`decades()` | 數值格式化與刻度 |

- 電子學 `lib.js` 另提供電路原語：`W(svg,pathD)` 導線、`dio/res/cap/bat(svg,x1,y1,x2,y2)` 兩端元件、`src(svg,x,y,'ac'|'dc')` 電源、`opamp(svg,x,y,plusTop)` 運算放大器（回傳 `{p,n,o}` 接腳座標）、`gnd`、`nd` 節點、`lb` 標籤、`segInit(id,cb)` 分段按鈕、`bisect(f,a,b)` 非線性求解，以及常數 `q, kB, VT, ni0, epsSi, IS, VON`。
- 互動圖：控制項（`input[type=range]`、`.seg` 按鈕）放在 `<figure>` 內的 `.ctrl`；數值輸出用 `<output id="…o">`；更新函式命名 `drawXxx()`，在 `input` 事件與初次載入時各呼叫一次。

---

## §8 驗收清單（`tools/check.py` 自動檢查）

| 編號 | 規則 |
|------|------|
| R1 | `course.json` 欄位齊全；`slug` 等於資料夾名；章號遞增不重複 |
| R2 | 章節檔名為 `chNN-<slug>.md`，且章號、slug 與 `course.json` 一致 |
| R3 | frontmatter 含 `chapter`（與檔名一致）、`summary`、`updated`（YYYY-MM-DD） |
| R4 | 章節檔不含 `<script>`、`<style>`、h1 |
| R5 | 骨架：`0 本章導覽`（含 `.goal`）→ 3–8 個遞增編號小節 → `附錄` |
| R6 | 每個編號小節至少一個 `.box.ex` 或 `.practice` |
| R7 | 附錄含公式、陷阱、自我測驗（≥ 5 題）、名詞對照（`| 中文 | English |` 表格） |
| R8 | 只使用 §5 白名單內的 class |
| R9 | 每個 `<svg id>` 都在 `figs/chNN.js` 中被繪製；圖檔必須對應已存在的章節 |
| R10 | 頁內錨點 `href="#…"` 都指向存在的 id |
| R11 | 不得殘留 `templates/chapter.md` 的佔位文字（如「第一個大主題」「題目敘述」「f-example」） |

無法自動檢查、需人工（或 AI 自我）確認的項目：

- [ ] 教材每一頁的概念都已涵蓋（§6-3）
- [ ] 說明為自行重寫、數值已重新計算（§6-4、§6-5）
- [ ] 瀏覽器中所有圖都有畫出，console 無錯誤
- [ ] 深色模式與 360 px 寬度下可正常閱讀

---

## §9 AI 修改時的規則

**必須：**

- 開始前讀本文件與 `templates/chapter.md`；新增章節時至少再讀一份既有章節（如 `content/electronics/ch03-diode-models.md`）作為範例。
- 每次修改內容後執行 `python tools/build.py`，並在回報中附上 check 結果（error/warning 數）。
- 遇到規則未涵蓋的情況，先擴充本文件（§5 元件、§8 規則）再實作，使規則與網站保持一致。

**禁止：**

- 手動修改 `docs/` 下任何檔案（下次 build 會被覆蓋）。
- 為了通過 `check.py` 而刪除內容、放寬規則或加入空殼元件；檢查失敗時修正內容本身。
- 在章節檔加入內嵌 `<script>`／`<style>`、外部 CDN、追蹤碼或前端框架。
- 更改 `core.js`、`lib.js` 既有函式的參數順序或行為（所有章節共用；只能新增函式）。
- 把課本或投影片原文、PDF 放進 repository。

---

## §10 常用指令

```bash
pip install markdown                        # 唯一的外部相依套件
python tools/new_chapter.py electronics 8   # 依 course.json 建立第 8 章檔案
python tools/check.py                       # 只做規則檢查
python tools/build.py                       # 檢查 + 產生 docs/
python -m http.server -d docs 8000          # 本機預覽 http://localhost:8000
```

發布：`docs/` 隨 `main` 分支推上 GitHub，GitHub Pages 設定為 *Deploy from a branch → main → /docs*。
