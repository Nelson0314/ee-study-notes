# AGENTS.md — Study Notes 專案規則

本文件是本專案唯一的規則來源，供 AI agent（Claude Code、Codex 等）與人類協作者共用。`CLAUDE.md` 以 `@AGENTS.md` 匯入本文件；網站的「編寫規範」頁（`docs/guide.html`）也由本文件直接產生。修改規則時只改這一份。

---

## §0 專案目的

Study Notes 把**任何科目、任何形式的學習材料**整理成圖解教材網頁。輸入可以是課本章節、上課簡報、學術論文、講義、筆記或掃描檔；輸出是一個結構固定的單元頁，包含：

1. 依來源原順序、不遺漏概念的完整說明；
2. 圖解（SVG 示意圖、函數圖、流程圖、互動圖），只在能幫助理解時加入；
3. 每個小節的例題或練習（詳解預設折疊）；
4. 單元附錄：重點總表、常見誤解、自我測驗、名詞中英對照。

讀者用途是考前複習、自學與論文閱讀。目標是**不論來源是什麼，都能用同一套骨架、元件與流程產出一個單元**，新增內容不需要重新設計版面。

非目標：不做帳號、留言、搜尋後端；不引入前端框架、CDN 或建置工具鏈（只用 Python 標準函式庫 + `markdown` 套件）。

目前的內容（電子學）是第一個主題，用來示範規則；規則本身不綁定任何科目。

---

## §1 名詞與目錄結構

| 名詞 | 意義 | 範例 |
|------|------|------|
| 主題（topic） | 一組相關單元，對應 `content/<topic>/` 一個資料夾 | 一門課、一本書、一個研究方向的論文集 |
| 單元（unit） | 一個 Markdown 檔，對應網站上的一頁 | 課本一章、一份簡報、一篇論文 |
| 單元標籤 | 頁面上「第 N ○」的量詞，由主題設定 | 課本用「章」、上課簡報用「講」、論文集用「篇」 |

```
ee-study-notes/
├── AGENTS.md                 ← 本文件（規則唯一來源）
├── CLAUDE.md                 ← Claude Code 入口：匯入本文件 + Claude 專用說明
├── README.md
├── site.json                 ← 站名、副標、主題清單與顯示順序
├── content/                  ← 【唯一需要手寫的內容】
│   └── <topic>/
│       ├── course.json       ← 主題資訊 + 全部單元的登錄表（含規劃中的單元）
│       ├── lib.js            ← （選用）該主題共用的繪圖函式，例如電路元件、分子結構
│       ├── chNN-<slug>.md    ← 一個單元一個檔
│       └── figs/chNN.js      ← （選用）該單元的圖與互動元件
├── assets/css/notes.css      ← 全站唯一樣式表
├── assets/js/core.js, theme.js ← 全站共用：SVG 輔助函式、plot()、深淺色切換
├── templates/chapter.md      ← 新單元範本
├── templates/_markers.svg    ← SVG 箭頭定義，模板自動嵌入每頁
├── tools/build.py            ← 產生 docs/
├── tools/new_chapter.py      ← 由範本建立新單元
├── .claude/skills/add-unit/SKILL.md ← Claude Code 的「新增一個單元」工作流程
└── docs/                     ← 【產生物】GitHub Pages 發布目錄，不手動修改
```

資料流：`content/*.md` + `course.json` → `tools/build.py` → `docs/*.html`。

---

## §2 命名規則

| 對象 | 規則 | 範例 |
|------|------|------|
| 主題資料夾 / slug | 小寫英文 kebab-case，與 `course.json` 的 `slug` 相同 | `electronics`、`linear-algebra`、`llm-papers` |
| 單元檔 | `chNN-<slug>.md`，NN 為兩位數序號，slug 與 `course.json` 中該單元相同 | `ch03-diode-models.md`、`ch01-attention-is-all-you-need.md` |
| 單元圖檔 | `figs/chNN.js` | `figs/ch03.js` |
| 輸出頁 | `docs/<topic>/chNN.html`（由 build 產生） | `docs/electronics/ch03.html` |
| SVG 元素 id | 小寫、以 `f-`（圖）、`e`（例題圖）、`p`（練習圖）開頭；同一單元內不重複 | `f-ideal`、`e36` |

序號的決定方式：課本用課本章號；簡報用上課順序；論文集用加入順序。原始編號（投影片編號、論文出處）寫在 `course.json` 的 `source`。

---

## §3 新增內容的流程

### 3.1 新增一個單元

1. **選主題**：內容屬於既有主題就加入該主題；否則依 3.4 建立新主題。
2. **登錄**：在 `content/<topic>/course.json` 的 `chapters` 加入一筆（`no`、`slug`、`title`、`title_en`、`source`）。
3. **建立檔案**：`python tools/new_chapter.py <topic> <no>`，由範本產生 `chNN-<slug>.md` 與 `figs/chNN.js`。
4. **讀來源**：依 3.2 的方式讀完整份材料，記下總頁數。
5. **規劃小節**：依 3.3 選定骨架，列出每個小節涵蓋的頁碼範圍，確認每一頁都有歸屬。
6. **撰寫**：依 §4 骨架、§5 元件、§6 寫作規範撰寫。
7. **畫圖**（選用）：在 `.md` 放 `<svg id="...">`，在 `figs/chNN.js` 繪製（§7）。
8. **產生網站**：`python tools/build.py`，再以 `python -m http.server -d docs 8000` 在瀏覽器確認。
9. **自我檢查**：逐項確認 §8 清單。

### 3.2 各類來源的讀法

| 來源 | 讀法 | 整理重點 |
|------|------|----------|
| 課本章節 | 依頁碼連續閱讀 | 定義、定理、推導中使用的假設、例題、章末習題類型 |
| 上課簡報 | 逐張閱讀；簡報文字常不完整，需補上口頭說明才會出現的推理步驟 | 每張投影片的結論、圖表代表的意義、授課者標示的重點 |
| 學術論文 | 先讀摘要、引言末段（貢獻）與結論，再讀方法與實驗 | 研究問題、方法、實驗設定與結果數字、限制、與先前研究的差異 |
| 講義／筆記 | 依原順序閱讀 | 補足省略的步驟；不同來源說法衝突時並列並標注出處 |
| 掃描檔／照片 | 以圖片方式讀取，逐頁辨識文字與圖表 | 辨識不清處標注「（原文不清）」，不自行猜測數值 |

讀取方式：

- PDF：以 Read 工具的 `pages` 參數一次最多讀 20 頁、連續不跳頁。環境無法渲染 PDF 頁面時，改用 `pypdf` 擷取文字，圖表內容另行開啟原檔確認。
- `.pptx`、`.docx`：先轉成 PDF 或以對應套件擷取文字，再依上表處理。
- 多個來源組成一個單元時：以主要來源（通常是上課簡報）決定小節順序，其他來源併入對應小節，並在文中標注出處（例：「課本 §7.2」）。

### 3.3 依來源類型選擇骨架

所有單元都使用 §4 的外框（導覽 → 編號小節 → 附錄）；編號小節的切分方式依來源而定：

| 來源類型 | 小節切分建議 |
|----------|--------------|
| 課本／講義 | 依原書小節；相關概念合併，每單元 3–8 節 |
| 上課簡報 | 依簡報的主題轉換處切分，不要一張投影片一節 |
| 學術論文 | 研究背景與問題 → 方法 → 實驗設定 → 結果 → 討論與限制（必要時加「與相關研究比較」） |
| 文史、法政等非計算科目 | 依主題或時序切分；例題改為「情境分析」或「申論題擬答」 |

### 3.4 新增一個主題

1. 建立 `content/<topic>/course.json`（欄位見 §4.1）。`unit_label` 依來源設定：課本「章」、簡報「講」、論文「篇」。
2. 在 `site.json` 的 `courses` 加入 slug。
3. 需要專用繪圖函式（例如化學結構、地圖、樂譜）時寫在 `content/<topic>/lib.js`，並列入 `course.json` 的 `scripts`。
4. 依 3.1 新增第一個單元。首頁卡片、主題頁、上下單元導覽由 build 自動產生。

### 3.5 修改既有單元

只改 `content/` 下的檔案，修改後更新 frontmatter 的 `updated`，重跑 `python tools/build.py`。

---

## §4 單元骨架

### 4.1 `course.json`

```json
{
  "slug": "llm-papers",
  "title": "大型語言模型論文選讀",
  "title_en": "Readings in Large Language Models",
  "unit_label": "篇",
  "source": "完整出處（書目、課程名稱、論文清單說明）",
  "source_short": "頁首副標使用的短名稱",
  "description": "主題卡片上的一句說明",
  "scripts": [],
  "disclaimer": "每頁頁尾的來源聲明",
  "chapters": [
    {"no": 1, "slug": "attention-is-all-you-need", "title": "Transformer 架構",
     "title_en": "Attention Is All You Need", "source": "Vaswani et al., NeurIPS 2017"}
  ]
}
```

`chapters` 同時是**進度表**：有對應 `.md` 的單元顯示為「已完成」，沒有的顯示為「規劃中」。`unit_label`、`source`、`source_short`、`scripts`、`disclaimer` 可省略。

### 4.2 單元檔結構

```markdown
---
chapter: 3
summary: 一句話說明本單元涵蓋的內容（顯示於主題頁與首頁）
updated: 2026-11-14
---

## 0 本章導覽
（與前後單元的關係、本單元要回答的核心問題、.flow 學習路線、.goal 學習目標）

## 3.1 第一個大主題
### 1　子主題
…

## 附錄 重點・誤解・測驗
### A　重點總表
### B　常見誤解
### C　自我測驗
### D　名詞對照表
```

規則：

- 不寫 h1；頁標題「第 N 章／講／篇　標題」由模板產生。
- 第一節為 `## 0 本章導覽`，含 `.goal`（學習目標），建議含 `.flow`（學習路線）。
- 中間為編號小節 `## N.x 標題`，編號以單元序號開頭、遞增；以 `###` 細分，格式為 `### <序號>　<標題>`（序號後接全形空白）。
- 最後一節為 `## 附錄 …`，包含四個子節：
  - **重點總表**：理工科為公式表；論文為「方法—結果—限制」表；文史科為人物、年代、概念對照表。
  - **常見誤解**：易混淆的概念與錯誤做法。
  - **自我測驗**：至少 5 題，題型混合。
  - **名詞對照表**：中文、English 兩欄。
- 標題 id 由 build 自動產生：`0`→`intro`、`3.1`→`sec-3-1`、`附錄`→`app`，h3 依序加 `-a`、`-b`…。頁內連結使用這組 id。

### 4.3 內容密度

- 每個編號小節至少一個例題（`.box.ex`）或練習（`.practice`）。非計算科目的「例題」可以是案例分析、原文段落解讀或申論擬答。
- 論文單元的練習以理解題為主，例如「若移除某個元件，預期哪項結果會改變」「這個實驗設定排除了哪種替代解釋」。

---

## §5 元件

單元檔是 Markdown；以下元件以 HTML 區塊撰寫（區塊前後各留一空行，區塊內部不留空行）。優先使用既有元件；需要新元件時，在本節補上說明並在 `assets/css/notes.css` 加樣式。

| 元件 | 用途 | 寫法 |
|------|------|------|
| `.flow` / `.stage` / `.arr` | 導覽的學習路線（2–4 階段） | `<div class="flow"><div class="stage"><h4>① 背景（1.1）</h4><ul>…</ul></div><div class="arr">➜</div>…</div>` |
| `.goal` | 學習目標 | `<div class="goal"><b>讀完本章應能：</b><ul>…</ul></div>` |
| `.box` | 一般重點框，`.tag` 為框標題 | `<div class="box"><span class="tag">分析程序</span>…</div>` |
| `.box.ex` | 例題、案例（綠色） | `<div class="box ex"><span class="tag">例題 3.1</span><br>…</div>` |
| `.box.note` | 觀念說明、補充（灰色） | `<div class="box note"><span class="tag">觀念說明：…</span>…</div>` |
| `.box.warn` | 考點、常見誤解（橘色） | `<div class="box warn"><span class="tag">易錯處</span><ol>…</ol></div>` |
| `.practice` + `details.q` + `ol.sol` | 練習題組，詳解可折疊 | 見下方 |
| `figure.fig` + `figcaption` | 圖；圖號自動編為「圖 N-k」 | `<figure class="fig"><svg id="f-x"></svg><figcaption>…</figcaption></figure>` |
| `.grid2` | 兩張圖並排 | `<div class="grid2"><figure>…</figure><figure>…</figure></div>` |
| `.ctrl` / `.seg` / `.readout` | 互動圖的控制列、分段按鈕、即時數值 | 參考 `content/electronics/ch08-op-amp.md` |
| `.eq`、`.eq.key` | 獨立一行的公式；`.key` 為核心公式（加框） | `<div class="eq key">…</div>` |
| `.frac`、`.m` | 分數、行內公式 | `<span class="frac"><span>分子</span><span>分母</span></span>` |
| `.tbl` | 表格外框（Markdown 表格自動加上） | `<div class="tbl"><table>…</table></div>` |
| Markdown 引用 `>` | 引用原文（論文、文本）短句 | `> 原文…（出處）` |

練習題組：

```html
<div class="practice"><span class="tag">練習 3.1</span>
<details class="q"><summary>（計算）題目敘述……</summary>
<ol class="sol"><li>第一步……</li><li>第二步……，答案 ……。</li></ol></details>
</div>
```

公式記法：不用 LaTeX。變數用 `<i>`，上下標用 `<sub>`／`<sup>`，負號用 `−`，乘號用 `×`，約等於用 `≈`。

---

## §6 寫作規範

1. **語言**：繁體中文。專有名詞首次出現寫成「中文（English）」，之後只用中文，並列入名詞對照表。來源本身是英文時，保留英文原名於括號內。
2. **語氣**：客觀、精確，接近教科書。不用誇飾詞、口語語尾、延伸的生活化比喻、教練式人稱。
3. **完整、照原序**：依來源順序撰寫，每個定義、結論、例題、圖表都要落入某個小節。推導或論證不必逐行重抄，但其中使用的假設、近似條件與前提要寫出。
4. **著作權**：說明文字自行重寫，不逐字抄錄來源；需要引用原文時只引短句並標出處。來源檔案（PDF、簡報）不放入 repository。
5. **數值與事實**：例題數值重新計算並寫出步驟；論文的實驗數字照原文引用並標明表格／圖號；不確定的內容標「（待確認）」，不自行補造。
6. **延伸內容**：來源以外、為輔助理解而加入的內容，`.tag` 以「補充」開頭。
7. **題型**：計算題附逐步解；是非題以「○／✗。理由」開頭；填空題以「___」表示空格；申論或理解題附擬答要點。

---

## §7 圖與互動

- 圖只在能幫助理解時加入：結構示意、函數或資料曲線、流程、可調參數的互動實驗。純文字能說清楚的內容不加圖。
- `.md` 只放佔位 `<svg id="…"></svg>`，繪圖程式寫在 `figs/chNN.js`；單元檔不放 `<script>`、`<style>`。
- 載入順序：`core.js` → 主題 `lib.js` → `figs/chNN.js` → `theme.js`。共用全域範圍，`figs/chNN.js` 的程式包在 IIFE `(function(){ … })();` 內。
- 顏色只用對應 CSS 變數的 class（`ln-fg`、`ln-e`、`ln-acc`、`ln-mu`、`t-acc`、`mu`…），深色模式才會正確。
- `core.js`（全主題共用）：

| 函式 | 說明 |
|------|------|
| `$(sel)` | `document.querySelector` |
| `E(tag, attrs, parent)` | 建立 SVG 元素 |
| `T(p, x, y, text, attrs)` | 文字；`x_{i}`、`10^{3}` 轉成下標／上標 |
| `L(p, x1, y1, x2, y2, cls, markerEnd, markerStart)` | 線段；箭頭 marker 用 `a-fg`、`a-acc` 等 |
| `plot(svg, {w,h,x:[min,max],y:[min,max],xlabel,ylabel,xlog,ylog,m})` | 座標圖，回傳 `P`：`P.fn(f,cls)`、`P.path(pts,cls)`、`P.poly(pts,cls)`、`P.rect(x0,x1,cls)`、`P.dot(x,y)`、`P.label(x,y,text,attrs)`、`P.hline(y)`、`P.vline(x)`、`P.sx()`／`P.sy()` |
| `sci(x)`、`fnum(v)`、`nice()`、`decades()` | 數值格式化與刻度 |

- 主題專用函式放在 `content/<topic>/lib.js`。範例：電子學的 `lib.js` 提供 `W` 導線、`res/cap/dio/bat` 兩端元件、`src` 電源、`opamp` 運算放大器、`gnd`、`nd`、`lb`、`segInit`、`bisect` 與物理常數。
- 共用函式只新增、不改既有參數與行為，因為所有單元都依賴它們。

---

## §8 完成前自我檢查

撰寫者（人或 AI）在回報完成前逐項確認：

- [ ] `course.json` 已登錄本單元，檔名、序號、slug 一致
- [ ] frontmatter 有 `chapter`、`summary`、`updated`
- [ ] 骨架為「0 本章導覽（含 `.goal`）→ 編號小節 → 附錄」
- [ ] 每個編號小節至少一個例題或練習；附錄自我測驗至少 5 題
- [ ] 附錄有重點總表、常見誤解、自我測驗、名詞對照表
- [ ] 來源每一頁的內容都已落入某個小節
- [ ] 說明為自行重寫；數值已重新計算或已標明原文出處
- [ ] 範本的佔位文字已全部替換
- [ ] `python tools/build.py` 成功；瀏覽器中所有圖都有畫出、console 無錯誤
- [ ] 深色模式與手機寬度下可正常閱讀

---

## §9 AI 修改時的規則

**必須：**

- 開始前讀本文件與 `templates/chapter.md`；新增單元時讀一個既有單元的一個小節與附錄作為格式範例。
- 修改內容後執行 `python tools/build.py`，並在瀏覽器確認受影響的頁面。
- 規則未涵蓋的情況（新的來源類型、新的元件），先補充本文件，再實作。

**禁止：**

- 手動修改 `docs/`（下次 build 會被覆蓋）。
- 為了湊滿格式而加入空洞內容；來源沒有的資訊不自行編造。
- 在單元檔加入 `<script>`／`<style>`、外部 CDN、追蹤碼或前端框架。
- 更改 `core.js`、各主題 `lib.js` 既有函式的參數或行為。
- 把來源原文整段複製或把來源檔案放進 repository。

---

## §10 常用指令

```bash
pip install markdown                          # 唯一的外部相依套件
python tools/new_chapter.py electronics 8     # 依 course.json 建立單元檔案
python tools/build.py                         # 產生 docs/
python -m http.server -d docs 8000            # 本機預覽 http://localhost:8000
```

發布：`docs/` 隨 `main` 分支推上 GitHub，GitHub Pages 設定為 *Deploy from a branch → main → /docs*。
