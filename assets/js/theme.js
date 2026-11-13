/* theme.js — 深淺色切換與目錄捲動高亮；由模板最後載入。首頁與課程頁沒有 nav.toc，只啟用深淺色切換。 */
document.querySelector('#themeBtn').addEventListener('click',()=>{const r=document.documentElement;const dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.dataset.theme=dark?'light':'dark';});
(function(){const toc=document.querySelector('nav.toc');if(!toc)return;
  const links=[...toc.querySelectorAll('a')];const map=links.map(a=>[a,document.querySelector(a.getAttribute('href'))]).filter(x=>x[1]);
  const on=()=>{let cur=map[0][0];for(const[a,el]of map){if(el.getBoundingClientRect().top<120)cur=a;}links.forEach(a=>a.classList.toggle('active',a===cur));};
  addEventListener('scroll',on,{passive:true});on();
  if(matchMedia('(max-width:960px)').matches)toc.querySelector('details').open=false;})();
