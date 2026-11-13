# -*- coding: utf-8 -*-
"""產生整個網站到 docs/（GitHub Pages 由 main 分支的 /docs 發布）。

用法：python tools/build.py
流程：
  1. 執行 tools/check.py 的所有規則；有 ERROR 即中止，不產生任何檔案。
  2. 清空並重建 docs/。
  3. 複製 assets/ 與各課程的 lib.js、figs/*.js。
  4. 依 content/<course>/chNN-<slug>.md 產生章節頁；依 course.json 產生課程頁；依 site.json 產生首頁。
  5. 把 AGENTS.md 轉成 docs/guide.html（站上的「編寫規範」頁）。
docs/ 內的檔案一律由本腳本產生，不得手動修改。
"""
import html, io, json, os, re, shutil, sys

import markdown

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import check  # noqa: E402

ROOT = check.ROOT
CONTENT = check.CONTENT
OUT = os.path.join(ROOT, 'docs')
MARKERS = io.open(os.path.join(ROOT, 'templates', '_markers.svg'), encoding='utf-8').read()
MD_EXT = ['tables', 'md_in_html', 'fenced_code', 'sane_lists']


def esc(s):
    return html.escape(str(s), quote=True)


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    io.open(path, 'w', encoding='utf-8', newline='\n').write(text)


# ---------------------------------------------------------------- page shell
def page(title, body, depth, site, scripts=(), description=''):
    up = '../' * depth
    js = ''.join('<script src="%s"></script>\n' % s for s in scripts)  # 相對於頁面所在資料夾
    return """<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="stylesheet" href="{up}assets/css/notes.css">
</head>
<body>
{markers}
<div class="sitebar"><div class="in">
  <a class="brand" href="{up}index.html">{site}</a>
  <a href="{up}index.html#courses">課程</a>
  <a href="{up}guide.html">編寫規範</a>
  <span class="sp"></span>
  <a href="https://github.com/{repo}">GitHub</a>
</div></div>
{body}
<script src="{up}assets/js/core.js"></script>
{js}<script src="{up}assets/js/theme.js"></script>
</body>
</html>
""".format(title=esc(title), desc=esc(description), up=up, markers=MARKERS, site=esc(site['title']),
           repo=esc(site.get('repo', '')), body=body, js=js)


def header(h1, sub, crumb=''):
    return """<header class="top">
  <div>{crumb}
    <h1>{h1}</h1>
    <p>{sub}</p>
  </div>
  <button id="themeBtn" type="button">切換深／淺色</button>
</header>""".format(crumb=('\n    <p class="crumb">%s</p>' % crumb) if crumb else '', h1=h1, sub=sub)


# ---------------------------------------------------------------- chapter
def render_chapter(course, ch, md_path, prev, nxt, site):
    fm, body = check.parse_frontmatter(io.open(md_path, encoding='utf-8').read())
    n = ch['no']
    h = markdown.markdown(body, extensions=MD_EXT)

    toc, state = [], {'h2': None, 'k': 0}

    def heading(mo):
        level, inner = mo.group(1), mo.group(2).strip()
        if level == '2':
            no, _, title = inner.partition(' ')
            hid = check.section_id(no)
            state['h2'], state['k'] = hid, 0
            toc.append([hid, '%s　%s' % (no, title), []])
            return '<h2 id="%s"><span class="no">%s</span>%s</h2>' % (hid, no, title)
        hid = '%s-%s' % (state['h2'], chr(97 + state['k']))
        state['k'] += 1
        label = re.sub(r'^[0-9A-Z]+　', '', inner)
        toc[-1][2].append((hid, label))
        return '<h3 id="%s">%s</h3>' % (hid, inner)

    h = re.sub(r'<h([23])>(.*?)</h\1>', heading, h, flags=re.S)
    # Markdown 表格（如名詞對照表）輸出為裸 <table>，套上與手寫表格相同的 .tbl 外框；手寫表格已有外框，不重複包。
    h = re.sub(r'(?<!<div class="tbl">)<table>(.*?)</table>', r'<div class="tbl"><table>\1</table></div>', h, flags=re.S)

    def toc_item(hid, label, kids):
        sub = ''
        if kids:
            sub = '\n        <ol>' + ''.join('<li><a href="#%s">%s</a></li>' % k for k in kids) + '</ol>\n      '
        return '      <li><a href="#%s">%s</a>%s</li>' % (hid, label, sub)
    toc_html = '\n'.join(toc_item(*t) for t in toc)

    def pager_link(c, cls, label):
        if not c:
            return '<span></span>'
        return '<a class="%s" href="ch%02d.html"><small>%s</small>第 %d 章　%s</a>' % (cls, c['no'], label, c['no'], esc(c['title']))

    crumb = '<a href="../index.html">%s</a> / <a href="index.html">%s</a> / 第 %d 章' % (esc(site['title']), esc(course['title']), n)
    sub = '%s Chapter %d — %s　·　圖解教材' % (esc(course['textbook_short']), n, esc(ch['title_en']))
    body_html = """{header}

<div class="layout">
<nav class="toc" id="toc">
  <details open>
    <summary>目錄</summary>
    <ol>
{toc}
    </ol>
  </details>
</nav>

<main style="--chap:&quot;{n}-&quot;">
{content}
<nav class="pager">{prev}{next}</nav>
<p style="color:var(--muted);font-size:14px;margin-top:40px">{disc}<br>來源：{src}　·　最後更新：{upd}</p>
</main>
</div>""".format(header=header('第 %d 章　%s' % (n, esc(ch['title'])), sub, crumb), toc=toc_html, n=n, content=h,
                 prev=pager_link(prev, 'pv', '← 上一章'), next=pager_link(nxt, 'nx', '下一章 →'),
                 disc=esc(course.get('disclaimer', '')), src=esc(ch['source']), upd=esc(fm['updated']))

    scripts = ['js/%s' % s for s in course.get('scripts', [])]
    if os.path.exists(os.path.join(CONTENT, course['slug'], 'figs', 'ch%02d.js' % n)):
        scripts.append('js/figs/ch%02d.js' % n)
    return page('第 %d 章　%s｜%s' % (n, ch['title'], course['title']), body_html, 1, site, scripts, fm['summary'])


# ---------------------------------------------------------------- course & home
def chapter_status(course):
    files = {}
    for f in check.chapter_files(course['slug']):
        m = re.match(r'^ch(\d{2})-', f)
        if m:
            files[int(m.group(1))] = os.path.join(CONTENT, course['slug'], f)
    return files


def render_course(course, files, site):
    rows = []
    for ch in course['chapters']:
        n = ch['no']
        if n in files:
            fm, _ = check.parse_frontmatter(io.open(files[n], encoding='utf-8').read())
            name = '<a href="ch%02d.html">%s</a><span class="en">%s</span><span class="en">%s</span>' % (
                n, esc(ch['title']), esc(ch['title_en']), esc(fm['summary']))
            st = '<span class="st done">已完成 · %s</span>' % esc(fm['updated'])
        else:
            name = '%s<span class="en">%s · 來源：%s</span>' % (esc(ch['title']), esc(ch['title_en']), esc(ch['source']))
            st = '<span class="st planned">規劃中</span>'
        rows.append('<li><span class="n">Ch.%d</span><span>%s</span>%s</li>' % (n, name, st))
    crumb = '<a href="../index.html">%s</a> / %s' % (esc(site['title']), esc(course['title']))
    body = """{header}
<div class="page">
<p>課本：{tb}</p>
<p>{desc}</p>
<h2>章節</h2>
<ol class="chlist">
{rows}
</ol>
</div>""".format(header=header('%s　%s' % (esc(course['title']), esc(course['title_en'])),
                               '已完成 %d / %d 章' % (len(files), len(course['chapters'])), crumb),
                 tb=esc(course['textbook']), desc=esc(course['description']), rows='\n'.join(rows))
    return page('%s｜%s' % (course['title'], site['title']), body, 1, site, (), course['description'])


def render_home(courses, site):
    cards = []
    for c, files in courses:
        cards.append("""<a class="card" href="{slug}/index.html">
  <h3>{t}　<small style="color:var(--muted);font-weight:400">{en}</small></h3>
  <p>{d}</p>
  <div class="meta">已完成 {done} / {total} 章 · {tb}</div>
</a>""".format(slug=c['slug'], t=esc(c['title']), en=esc(c['title_en']), d=esc(c['description']),
               done=len(files), total=len(c['chapters']), tb=esc(c['textbook_short'])))
    latest = []
    for c, files in courses:
        for ch in c['chapters']:
            if ch['no'] in files:
                fm, _ = check.parse_frontmatter(io.open(files[ch['no']], encoding='utf-8').read())
                latest.append((fm['updated'], c, ch, fm))
    latest.sort(key=lambda x: (x[0], x[2]['no']), reverse=True)
    items = '\n'.join(
        '<li><span class="n">%s</span><span><a href="%s/ch%02d.html">%s 第 %d 章　%s</a><span class="en">%s</span></span></li>' % (
            esc(u), c['slug'], ch['no'], esc(c['title']), ch['no'], esc(ch['title']), esc(fm['summary']))
        for u, c, ch, fm in latest[:6])
    body = """{header}
<div class="page">
<div class="goal"><b>本站的頁面怎麼產生：</b>
<ul>
  <li>每一章是一個 Markdown 檔（<code>content/&lt;課程&gt;/chNN-&lt;slug&gt;.md</code>），使用固定的章節骨架與元件。</li>
  <li><code>tools/check.py</code> 依 <a href="guide.html">編寫規範</a> 驗證結構，<code>tools/build.py</code> 產生全部頁面。</li>
  <li>新增一章只需：在 <code>course.json</code> 登錄 → 依範本撰寫 Markdown → 執行 build。</li>
</ul></div>
<h2 id="courses">課程</h2>
<div class="cards">
{cards}
</div>
<h2>最近更新</h2>
<ol class="chlist">
{items}
</ol>
</div>""".format(header=header(esc(site['title']), esc(site['subtitle'])), cards='\n'.join(cards), items=items)
    return page(site['title'], body, 0, site, (), site['subtitle'])


def render_guide(site):
    text = io.open(os.path.join(ROOT, 'AGENTS.md'), encoding='utf-8').read()
    h = markdown.markdown(text, extensions=MD_EXT + ['toc'])
    h = re.sub(r'<h1[^>]*>.*?</h1>', '', h, count=1, flags=re.S)
    body = """{header}
<div class="page doc">
{h}
</div>""".format(header=header('編寫規範', '本頁由 repository 根目錄的 AGENTS.md 直接轉換；AI 與人類協作者共用同一份規則。'), h=h)
    return page('編寫規範｜%s' % site['title'], body, 0, site, (), '本站的專案規則（AGENTS.md）')


# ---------------------------------------------------------------- main
def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    rep = check.run()
    for line in rep.warnings + rep.errors:
        print(line)
    if rep.errors:
        print('build aborted: %d error(s). 修正後再執行。' % len(rep.errors))
        sys.exit(1)

    site = json.loads(io.open(os.path.join(ROOT, 'site.json'), encoding='utf-8').read())
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    shutil.copytree(os.path.join(ROOT, 'assets'), os.path.join(OUT, 'assets'))
    write(os.path.join(OUT, '.nojekyll'), '')

    courses, count = [], 0
    for slug in site['courses']:
        course = json.loads(io.open(os.path.join(CONTENT, slug, 'course.json'), encoding='utf-8').read())
        files = chapter_status(course)
        for s in course.get('scripts', []):
            dst = os.path.join(OUT, slug, 'js', s)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy(os.path.join(CONTENT, slug, s), dst)
        if os.path.isdir(os.path.join(CONTENT, slug, 'figs')):
            shutil.copytree(os.path.join(CONTENT, slug, 'figs'), os.path.join(OUT, slug, 'js', 'figs'))
        done = [ch for ch in course['chapters'] if ch['no'] in files]
        for i, ch in enumerate(done):
            prev = done[i - 1] if i > 0 else None
            nxt = done[i + 1] if i + 1 < len(done) else None
            write(os.path.join(OUT, slug, 'ch%02d.html' % ch['no']), render_chapter(course, ch, files[ch['no']], prev, nxt, site))
            count += 1
        write(os.path.join(OUT, slug, 'index.html'), render_course(course, files, site))
        courses.append((course, files))

    write(os.path.join(OUT, 'index.html'), render_home(courses, site))
    write(os.path.join(OUT, 'guide.html'), render_guide(site))
    print('build: %d chapter page(s), %d course(s) -> docs/' % (count, len(courses)))


if __name__ == '__main__':
    main()
