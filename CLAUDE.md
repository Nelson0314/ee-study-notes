# CLAUDE.md

本專案的完整規則在 AGENTS.md，所有 agent 共用同一份；以下匯入後即生效。

@AGENTS.md

---

## Claude Code 專用補充

### 工作入口

| 使用者的要求 | 做法 |
|--------------|------|
| 「新增第 N 章」「把這份講義做成網頁」 | 使用 project skill `add-chapter`（`.claude/skills/add-chapter/SKILL.md`），依其步驟執行 |
| 「修改某一章的內容／例題」 | 只改 `content/<course>/chNN-*.md` 或 `figs/chNN.js`，完成後 `python tools/build.py` |
| 「新增一門課」 | AGENTS.md §3.3 |
| 「改版面／配色」 | 只改 `assets/css/notes.css` 或 `tools/build.py` 的模板；改完後所有章節一併重建並逐頁目視確認 |
| 「新增一種元件」 | AGENTS.md §5 + `notes.css` + `check.py` 的 `ALLOWED_CLASSES` 三處同步 |

### 環境

- Windows：Python 指令是 `python`，不是 `python3`。
- `check.py`／`build.py` 已自行把 stdout 設成 UTF-8；其他臨時 Python 輸出中文時加 `PYTHONIOENCODING=utf-8`。
- 讀 PDF 用 Read 工具的 `pages` 參數，一次最多 20 頁。

### 脈絡管理

- 章節檔與圖檔通常各 300–700 行。修改時用 Grep 找到目標小節，再以 Read 的 offset／limit 只讀該段，不要整檔讀入。
- 新增章節時只需讀一份既有章節的**一個小節 + 附錄**當作格式範例，不必讀完整章。
- build 輸出只有 error/warning 與一行摘要，不需要再額外過濾。

### 完成回報格式

回報時列出：新增／修改的檔案、`check: X error(s), Y warning(s)` 結果、需要使用者在瀏覽器確認的頁面路徑。
