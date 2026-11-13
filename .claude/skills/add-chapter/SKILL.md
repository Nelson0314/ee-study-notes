---
name: add-chapter
description: 在 EE Notes 專案中新增或重寫一章圖解講義。觸發情境：使用者要求「新增第 N 章」「把這份投影片／課本章節做成講義頁」「整理成網頁筆記」。產出 content/<course>/chNN-<slug>.md、figs/chNN.js，並以 tools/build.py 驗證與產生網站。
---

# add-chapter：新增一章講義

本 skill 是 AGENTS.md §3.1 的可執行版本。規則以 AGENTS.md 為準；兩者衝突時以 AGENTS.md 為準並回報差異。

## 輸入

- 課程 slug（如 `electronics`）與章號 N。
- 教材來源：PDF 路徑（課本章節、投影片），可多份。

## 步驟

1. **確認登錄**：讀 `content/<course>/course.json`，確認第 N 章存在；不存在則新增一筆（`no`、`slug`、`title`、`title_en`、`source`），維持章號遞增。
2. **建立檔案**：`python tools/new_chapter.py <course> N`。
3. **讀格式範例**：從 `content/electronics/ch03-diode-models.md` 讀一個編號小節與附錄（用 Grep 定位 `^## `，再以 offset 讀取），確認元件寫法。
4. **掃描教材**：
   - 先查總頁數 P。
   - 以 Read 的 `pages` 參數每次最多 20 頁、連續讀完。
   - 每批記下：小節標題、定義、公式、例題、圖，以及推導中使用的假設與近似條件。
   - 主教材（投影片）決定小節順序；課本內容併入對應小節。兩者說法不同時兩種都寫並標明來源。
5. **規劃小節**：以教材大主題切成 3–8 個 `## N.x` 小節；把規劃（小節標題 + 每節涵蓋的頁碼範圍）先列出，確認 p.1–P 全部有歸屬。
6. **撰寫**：依 AGENTS.md §4（骨架）、§5（元件）、§6（寫作規範）逐節填寫範本。重點：
   - 自行重寫說明文字，不逐字抄錄；例題數值重新計算並寫出步驟。
   - 每節至少一個例題或練習；附錄自我測驗 ≥ 5 題。
   - 術語首次出現寫「中文（English）」並收入名詞對照表。
7. **畫圖**：每張圖在 `.md` 放 `<figure class="fig"><svg id="f-…"></svg><figcaption>…</figcaption></figure>`，在 `figs/chNN.js` 以 IIFE 繪製，使用 `core.js`／`lib.js` 的函式（AGENTS.md §7）。刪除範本留下的 `f-example`。
8. **建置**：`python tools/build.py`。有 ERROR 時依規則編號修正內容，不放寬規則。
9. **目視檢查**：`python -m http.server -d docs 8000` 後開啟該章，確認所有 SVG 都有內容、互動控制可用、console 無錯誤、深色模式可讀。
10. **回報**：新增／修改的檔案、check 結果、涵蓋頁碼（p.1–P）、尚待使用者確認的事項。

## 完成條件

- `python tools/build.py` 顯示 `check: 0 error(s)`。
- 教材每一頁都能對應到某個小節。
- AGENTS.md §8 的人工檢查項目全部確認。
