# -*- coding: utf-8 -*-
"""依 course.json 的登錄資料，由 templates/chapter.md 建立新章節。

用法：python tools/new_chapter.py <course> <no>
  例：python tools/new_chapter.py electronics 8
產生：content/<course>/chNN-<slug>.md 與 content/<course>/figs/chNN.js
該章必須先登錄在 course.json；檔案已存在時拒絕覆寫。
"""
import datetime, io, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FIG_STUB = """/* 第 {no} 章圖檔：每個區塊對應 ch{nn}-{slug}.md 中的一個 <svg id>。規則見 AGENTS.md §7。 */
// 範例圖
(function(){{const P=plot($('#f-example'),{{w:420,h:260,x:[0,1],y:[0,1],xlabel:'x',ylabel:'y'}});
  P.fn(x=>x*x,'ln-acc');P.label(0.6,0.2,'y = x^{{2}}',{{class:'t-acc'}});
}})();
"""


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    course, no = sys.argv[1], int(sys.argv[2])
    cdir = os.path.join(ROOT, 'content', course)
    cfg = json.loads(io.open(os.path.join(cdir, 'course.json'), encoding='utf-8').read())
    ch = next((c for c in cfg['chapters'] if c['no'] == no), None)
    if ch is None:
        print('第 %d 章未登錄於 content/%s/course.json；先加入 chapters 再執行。' % (no, course))
        sys.exit(1)
    md = os.path.join(cdir, 'ch%02d-%s.md' % (no, ch['slug']))
    js = os.path.join(cdir, 'figs', 'ch%02d.js' % no)
    for p in (md, js):
        if os.path.exists(p):
            print('已存在，不覆寫：%s' % os.path.relpath(p, ROOT))
            sys.exit(1)
    tpl = io.open(os.path.join(ROOT, 'templates', 'chapter.md'), encoding='utf-8').read()
    text = tpl.replace('{no}', str(no)).replace('{today}', datetime.date.today().isoformat())
    io.open(md, 'w', encoding='utf-8', newline='\n').write(text)
    os.makedirs(os.path.dirname(js), exist_ok=True)
    io.open(js, 'w', encoding='utf-8', newline='\n').write(
        FIG_STUB.format(no=no, nn='%02d' % no, slug=ch['slug']))
    print('建立：%s' % os.path.relpath(md, ROOT))
    print('建立：%s' % os.path.relpath(js, ROOT))
    print('下一步：依 AGENTS.md §4–§7 撰寫內容，完成後執行 python tools/build.py')


if __name__ == '__main__':
    main()
