# EE Notes — 電機課程圖解講義

以一套固定規則持續產出課程講義網頁的專案。每一章是一個 Markdown 檔，`tools/build.py` 先依規則檢查，再產生 GitHub Pages 網站。

- **網站**：見 repository 右側 About 的連結（GitHub Pages，`docs/`）
- **規則**：[`AGENTS.md`](AGENTS.md)（唯一規則來源）、[`CLAUDE.md`](CLAUDE.md)（Claude Code 入口，匯入 AGENTS.md）
- **新增一章的工作流程**：[`.claude/skills/add-chapter/SKILL.md`](.claude/skills/add-chapter/SKILL.md)

## 目前內容

| 課程 | 已完成章節 |
|------|-----------|
| 電子學（Razavi, *Fundamentals of Microelectronics*） | Ch.2 半導體基礎物理、Ch.3 二極體模型與電路 |

其餘章節已登錄在 `content/electronics/course.json`，在課程頁顯示為「規劃中」。

## 專案設計

```
content/<course>/chNN-<slug>.md ─┐
content/<course>/course.json ────┼─▶ tools/check.py（R1–R11 規則）─▶ tools/build.py ─▶ docs/
content/<course>/figs/chNN.js ───┘
```

| 規則層 | 檔案 | 作用 |
|--------|------|------|
| 文件 | `AGENTS.md` | 專案目的、目錄結構、命名、章節骨架、元件規格、寫作規範、AI 修改規則 |
| 範本 | `templates/chapter.md`、`tools/new_chapter.py` | 新章節從同一份骨架開始 |
| 檢查 | `tools/check.py` | 把可機械驗證的規則（R1–R11）變成 build 的前置條件 |
| 流程 | `.claude/skills/add-chapter/SKILL.md` | AI 新增一章時的逐步程序 |

## 使用

```bash
pip install markdown
python tools/new_chapter.py electronics 8   # 建立第 8 章檔案（需先登錄於 course.json）
python tools/build.py                       # 檢查 + 產生 docs/
python -m http.server -d docs 8000          # 本機預覽
```

## 授權與來源

講義依 Razavi《Fundamentals of Microelectronics》章節架構編排，說明文字為重新撰寫，例題數值均經重新計算；不含課本或投影片原文。
