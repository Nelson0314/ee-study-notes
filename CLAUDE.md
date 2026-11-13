# CLAUDE.md

本專案的完整規則在 AGENTS.md，所有 agent 共用同一份；以下匯入後即生效。

@AGENTS.md

---

## Claude Code 專用補充

### 工作入口

| 使用者的要求 | 做法 |
|--------------|------|
| 「把這份 PDF／簡報／論文／講義做成教材」「新增一章」 | 使用 project skill `add-unit`（`.claude/skills/add-unit/SKILL.md`） |
| 「修改某個單元的內容或例題」 | 只改 `content/<topic>/chNN-*.md` 或 `figs/chNN.js`，完成後 `python tools/build.py` |
| 「新增一個科目／主題」 | AGENTS.md §3.4 |
| 「改版面／配色」 | 只改 `assets/css/notes.css` 或 `tools/build.py` 的模板；改完後重建並檢視每個主題至少一頁 |
| 「新增一種元件」 | 在 AGENTS.md §5 補說明，在 `notes.css` 加樣式 |

### 環境

- Windows：Python 指令是 `python`，不是 `python3`。
- 臨時 Python 腳本輸出中文時加 `PYTHONIOENCODING=utf-8`。
- Read 工具無法渲染 PDF 頁面時（缺 poppler），改用 `pypdf` 擷取文字。

### 脈絡管理

- 單元檔與圖檔通常各 300–700 行。修改時用 Grep 找到目標小節，再以 Read 的 offset／limit 只讀該段。
- 新增單元時只讀一個既有單元的一個小節與附錄當格式範例。
- 長篇來源（超過 60 頁）先列出小節規劃與頁碼對應，再分段撰寫。

### 完成回報格式

列出新增／修改的檔案、來源涵蓋頁碼、AGENTS.md §8 的確認結果，以及需要使用者在瀏覽器確認的頁面路徑。
