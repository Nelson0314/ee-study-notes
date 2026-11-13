# -*- coding: utf-8 -*-
"""規則檢查器：把 AGENTS.md 中可機械驗證的規則逐條轉成檢查。

用法：python tools/check.py            # 檢查全部課程
      python tools/check.py electronics  # 只檢查一門課
有任何 ERROR 時以 exit code 1 結束；build.py 會先呼叫本檢查，失敗就不產生網站。
規則編號（R1…）與 AGENTS.md「§8 驗收清單」一一對應。
"""
import io, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, 'content')

# R8：章節 Markdown 中允許出現的 class（元件白名單）。新增元件時必須同步更新 AGENTS.md §5 與 assets/css/notes.css。
ALLOWED_CLASSES = {
    # 版面與區塊元件
    'flow', 'stage', 'arr', 'goal', 'box', 'ex', 'note', 'warn', 'tag', 'practice', 'q', 'sol',
    'grid2', 'fig', 'sm', 'md', 'tbl', 'eq', 'key', 'frac', 'm', 'it', 'legend', 'ptable', 'hl',
    # 互動元件（由 figs/chNN.js 綁定）
    'ctrl', 'readout', 'seg', 'on', 'jw', 'cm', 'pr', 'rad',
    # 圖例色塊與 SVG 內文字色
    'li-e', 'li-h', 'li-p', 'li-n', 'e', 'h', 'mu', 'ln-mu', 'ln-fg', 'band-c', 'band-v',
}
FM_KEYS = ('chapter', 'summary', 'updated')
# R11：templates/chapter.md 中的佔位文字；出現任何一個代表該章尚未寫完。
TEMPLATE_PLACEHOLDERS = ('（一句話說明本章涵蓋的內容）', 'f-example', '第一個大主題', '第二個大主題', '第三個大主題',
                         '題目敘述', '可檢驗的能力', '| 術語 | term |')
SLUG_RE = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
NO_RE = re.compile(r'^\d+(?:\.\d+)*$')


class Report:
    def __init__(self):
        self.errors, self.warnings = [], []

    def err(self, where, rule, msg):
        self.errors.append('ERROR %s [%s] %s' % (where, rule, msg))

    def warn(self, where, rule, msg):
        self.warnings.append('WARN  %s [%s] %s' % (where, rule, msg))


def read(path):
    return io.open(path, encoding='utf-8').read()


def parse_frontmatter(text):
    """極簡 YAML：只支援 `key: value` 單行，避免額外相依套件。"""
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m:
        return None, text
    fm = {}
    for line in m.group(1).split('\n'):
        if ':' in line:
            k, v = line.split(':', 1)
            fm[k.strip()] = v.strip()
    return fm, text[m.end():]


def split_sections(body):
    """回傳 [(h2 標題文字, 該節內容)]；h2 之前的內容不允許存在。"""
    parts = re.split(r'(?m)^## (.+)$', body)
    return parts[0], [(parts[i].strip(), parts[i + 1]) for i in range(1, len(parts), 2)]


def heading_no(title):
    return title.split(' ', 1)[0]


def load_course(slug, rep):
    path = os.path.join(CONTENT, slug, 'course.json')
    if not os.path.exists(path):
        rep.err(slug, 'R1', '缺少 course.json')
        return None
    c = json.loads(read(path))
    for k in ('slug', 'title', 'title_en', 'textbook_short', 'description', 'chapters'):
        if k not in c:
            rep.err(path, 'R1', 'course.json 缺少欄位 %s' % k)
    if c.get('slug') != slug:
        rep.err(path, 'R1', 'slug 必須等於資料夾名稱 %s' % slug)
    nos = [ch['no'] for ch in c.get('chapters', [])]
    if nos != sorted(set(nos)):
        rep.err(path, 'R1', 'chapters 的 no 必須遞增且不重複')
    for ch in c.get('chapters', []):
        for k in ('no', 'slug', 'title', 'title_en', 'source'):
            if k not in ch:
                rep.err(path, 'R1', '第 %s 章缺少欄位 %s' % (ch.get('no'), k))
        if not SLUG_RE.match(ch.get('slug', '')):
            rep.err(path, 'R2', '第 %s 章 slug 必須為小寫 kebab-case' % ch.get('no'))
    return c


def check_chapter(course, ch, path, rep):
    where = os.path.relpath(path, ROOT).replace('\\', '/')
    text = read(path)
    n = ch['no']

    # R3 frontmatter
    fm, body = parse_frontmatter(text)
    if fm is None:
        rep.err(where, 'R3', '缺少 frontmatter（--- ... ---）')
        return
    for k in FM_KEYS:
        if not fm.get(k):
            rep.err(where, 'R3', 'frontmatter 缺少 %s' % k)
    if fm.get('chapter') and fm['chapter'] != str(n):
        rep.err(where, 'R3', 'frontmatter chapter=%s 與檔名/course.json 的 %d 不符' % (fm['chapter'], n))
    if fm.get('updated') and not re.match(r'^\d{4}-\d{2}-\d{2}$', fm['updated']):
        rep.err(where, 'R3', 'updated 必須為 YYYY-MM-DD')

    # R4 禁止內嵌 script/style、禁止 h1
    if re.search(r'<script|<style', body, re.I):
        rep.err(where, 'R4', '章節檔不得含 <script> 或 <style>；圖的程式放 figs/ch%02d.js' % n)
    if re.search(r'(?m)^# ', body) or '<h1' in body:
        rep.err(where, 'R4', '章節檔不得含 h1；頁標題由模板依 course.json 產生')

    # R5 章節骨架
    pre, secs = split_sections(body)
    if pre.strip():
        rep.err(where, 'R5', '第一個 ## 之前不得有內容')
    if not secs:
        rep.err(where, 'R5', '沒有任何 ## 小節')
        return
    if secs[0][0] != '0 本章導覽':
        rep.err(where, 'R5', '第一節必須是「## 0 本章導覽」')
    elif 'class="goal"' not in secs[0][1]:
        rep.err(where, 'R5', '本章導覽必須含 <div class="goal">（學習目標）')
    if not secs[-1][0].startswith('附錄 '):
        rep.err(where, 'R5', '最後一節必須是「## 附錄 …」')
    numbered = [(t, c) for t, c in secs[1:-1]]
    if not 3 <= len(numbered) <= 8:
        rep.err(where, 'R5', '編號小節應為 3–8 節（目前 %d 節）' % len(numbered))
    prev = None
    for t, c in numbered:
        no = heading_no(t)
        if not NO_RE.match(no) or not no.startswith('%d.' % n):
            rep.err(where, 'R5', '小節「%s」編號必須以 %d. 開頭' % (t, n))
            continue
        key = [int(x) for x in no.split('.')]
        if prev and key <= prev:
            rep.err(where, 'R5', '小節「%s」編號未遞增' % t)
        prev = key
        # R6 每節至少一題可自我檢查的內容
        if 'class="practice"' not in c and 'class="box ex"' not in c:
            rep.err(where, 'R6', '小節「%s」至少需要一個例題（box ex）或練習（practice）' % t)
        if 'details class="q"' not in c:
            rep.warn(where, 'R6', '小節「%s」沒有可折疊的詳解（details.q）' % t)

    # R7 附錄必備子節
    app = secs[-1][1]
    h3s = re.findall(r'(?m)^### (.+)$', app)
    for need in ('公式', '陷阱', '自我測驗', '名詞對照'):
        if not any(need in h for h in h3s):
            rep.err(where, 'R7', '附錄缺少「%s」子節' % need)
    quiz = re.split(r'(?m)^### .*自我測驗.*$', app)
    if len(quiz) > 1:
        q_part = re.split(r'(?m)^### ', quiz[1])[0]
        if q_part.count('<details class="q">') < 5:
            rep.err(where, 'R7', '附錄自我測驗至少 5 題 details.q')
    if not re.search(r'\| *中文 *\| *English *\|', app):
        rep.err(where, 'R7', '名詞對照表必須是「| 中文 | English |」表格')

    # R8 元件白名單
    for cls in re.findall(r'class="([^"]+)"', body):
        for c in cls.split():
            if c not in ALLOWED_CLASSES:
                rep.err(where, 'R8', 'class "%s" 不在元件白名單；先在 AGENTS.md §5 與 notes.css 定義' % c)

    # R9 圖：每個 <svg id> 都要在 figs/chNN.js 被引用
    svg_ids = re.findall(r'<svg id="([^"]+)"', body)
    dyn_ids = re.findall(r'<div class="(?:jw|cm|seg)[^"]*" id="([^"]+)"', body)
    fig_js = os.path.join(CONTENT, course['slug'], 'figs', 'ch%02d.js' % n)
    if svg_ids or dyn_ids:
        if not os.path.exists(fig_js):
            rep.err(where, 'R9', '含 <svg id> 但缺少 figs/ch%02d.js' % n)
        else:
            js = read(fig_js)
            for i in svg_ids:
                if not re.search(r'#%s\b' % re.escape(i), js) and not re.search(r"['\"]%s['\"]" % re.escape(i), js):
                    rep.err(where, 'R9', '<svg id="%s"> 沒有在 figs/ch%02d.js 中被繪製' % (i, n))

    # R11 範本佔位文字必須全部替換
    for ph in TEMPLATE_PLACEHOLDERS:
        if ph in text:
            rep.err(where, 'R11', '仍含範本佔位文字「%s」' % ph)

    # R10 站內錨點必須存在
    ids = set(re.findall(r'id="([^"]+)"', body)) | heading_ids(n, secs)
    for href in re.findall(r'href="#([^"]+)"', body):
        if href not in ids:
            rep.err(where, 'R10', '錨點 #%s 不存在' % href)


def heading_ids(n, secs):
    """與 build.py 相同的 id 規則：0→intro、附錄→app、x.y→sec-x-y；h3 依序加 -a、-b…"""
    out = set()
    for t, c in secs:
        hid = section_id(heading_no(t))
        out.add(hid)
        for k, _ in enumerate(re.findall(r'(?m)^### (.+)$', c)):
            out.add('%s-%s' % (hid, chr(97 + k)))
    return out


def section_id(no):
    if no == '0':
        return 'intro'
    if no == '附錄':
        return 'app'
    return 'sec-' + no.replace('.', '-')


def chapter_files(slug):
    d = os.path.join(CONTENT, slug)
    return sorted(f for f in os.listdir(d) if f.endswith('.md'))


def run(slugs=None):
    rep = Report()
    site = json.loads(read(os.path.join(ROOT, 'site.json')))
    for slug in slugs or site['courses']:
        course = load_course(slug, rep)
        if not course:
            continue
        by_no = {ch['no']: ch for ch in course['chapters']}
        for f in chapter_files(slug):
            m = re.match(r'^ch(\d{2})-([a-z0-9-]+)\.md$', f)
            where = '%s/%s' % (slug, f)
            if not m:
                rep.err(where, 'R2', '檔名必須為 chNN-<slug>.md（NN 兩位數）')
                continue
            n, s = int(m.group(1)), m.group(2)
            if n not in by_no:
                rep.err(where, 'R2', '第 %d 章未登錄於 course.json' % n)
                continue
            if by_no[n]['slug'] != s:
                rep.err(where, 'R2', '檔名 slug「%s」與 course.json 的「%s」不符' % (s, by_no[n]['slug']))
            check_chapter(course, by_no[n], os.path.join(CONTENT, slug, f), rep)
        figs = os.path.join(CONTENT, slug, 'figs')
        if os.path.isdir(figs):
            done = {int(f[2:4]) for f in chapter_files(slug) if re.match(r'^ch\d{2}-', f)}
            for f in os.listdir(figs):
                m = re.match(r'^ch(\d{2})\.js$', f)
                if not m or int(m.group(1)) not in done:
                    rep.err('%s/figs/%s' % (slug, f), 'R9', '圖檔必須命名為 chNN.js 且對應一個已存在的章節檔')
    return rep


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    r = run(sys.argv[1:] or None)
    for line in r.warnings + r.errors:
        print(line)
    print('check: %d error(s), %d warning(s)' % (len(r.errors), len(r.warnings)))
    sys.exit(1 if r.errors else 0)
