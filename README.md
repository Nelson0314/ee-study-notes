# Study Notes — 圖解教材產生框架

把任何科目的學習材料（課本章節、上課簡報、學術論文、講義、掃描檔）整理成結構一致的圖解教材網頁。規則寫在 `AGENTS.md`，AI agent 依規則讀取來源、撰寫單元，`tools/build.py` 產生 GitHub Pages 網站。

- **網站**：https://nelson0314.github.io/ee-study-notes/
- **規則**：[`AGENTS.md`](AGENTS.md)（唯一規則來源）、[`CLAUDE.md`](CLAUDE.md)（Claude Code 入口，匯入 AGENTS.md）
- **新增單元的流程**：[`.claude/skills/add-unit/SKILL.md`](.claude/skills/add-unit/SKILL.md)

## 目前內容

| 主題 | 已完成單元 |
|------|-----------|
| 電子學（Razavi, *Fundamentals of Microelectronics*） | Ch.2 半導體基礎物理、Ch.3 二極體模型與電路、Ch.8 運算放大器 |

電子學是第一個示範主題；規則不綁定科目，新增主題只需建立 `content/<topic>/course.json`。

## 專案設計

```
來源（課本／簡報／論文／講義）
        │  AGENTS.md §3：讀法、骨架選擇、寫作規範
        ▼
content/<topic>/chNN-<slug>.md + figs/chNN.js + course.json
        │  tools/build.py
        ▼
docs/（GitHub Pages）
```

| 層 | 檔案 | 作用 |
|----|------|------|
| 規則 | `AGENTS.md` | 目的、名詞、目錄、命名、各類來源的讀法、單元骨架、元件、寫作規範、繪圖 API、自我檢查、AI 修改規則 |
| 範本 | `templates/chapter.md`、`tools/new_chapter.py` | 新單元從同一份骨架開始 |
| 流程 | `.claude/skills/add-unit/SKILL.md` | AI 新增單元的逐步程序 |
| 產生 | `tools/build.py` | Markdown → 單元頁、主題頁、首頁、規範頁 |

## 使用

```bash
pip install markdown
python tools/new_chapter.py electronics 8   # 建立單元檔案（需先登錄於 course.json）
python tools/build.py                       # 產生 docs/
python -m http.server -d docs 8000          # 本機預覽
```

## 來源聲明

電子學單元依 Razavi《Fundamentals of Microelectronics》章節架構與課程簡報編排，說明文字為重新撰寫，例題數值均經重新計算；不含課本或簡報原文。
