/* Field kit strip — the ticket cards from the bottom of travel/index.html, shared by the other kit pages.
   Usage: <div id="fieldkit" data-here="parks|units|books|cruises" data-theme="auto|dark">fallback links</div>
          <script src="../fieldkit.js" defer></script>   (path relative to the page)
   The cards are copied live from index.html, so they stay in step with it; the current page's card
   is dropped and a "My Travel Hub" card leads back home. Counts and art are refreshed from
   nationalparks.html, npsunits.html and books/. If anything fails, the fallback links stay. */
(function(){
  var mount=document.getElementById('fieldkit');
  var me=document.currentScript||document.querySelector('script[src$="fieldkit.js"]');
  if(!mount||!me||!window.fetch||!window.DOMParser)return;
  var BASE=me.src.replace(/[^\/]*$/,'');              /* .../travel/ */
  var here=mount.getAttribute('data-here')||'';
  var HREF={parks:'nationalparks.html',units:'npsunits.html',books:'books/',cruises:'cruises.html'};
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function get(u){return fetch(BASE+u).then(function(r){return r.ok?r.text():Promise.reject()}).then(function(h){return new DOMParser().parseFromString(h,'text/html')})}

  var LIGHT='--ground:#E9E3F5;--paper:#FFFDF8;--paper-2:#F6F1E6;--ink:#24203A;--ink-2:#5E5873;--ink-3:#8E87A3;--perf:#CFC6E0;--nps:#1C8C84;--dis:#6B4BA6;--cruise:#C2456A;--booked:#E07A2E;--hot:#F2B632;--home:#B0452E';
  var DARK='--ground:#17142A;--paper:#2A2542;--paper-2:#332D4E;--ink:#F3EEFF;--ink-2:#BDB4D6;--ink-3:#8A82A6;--perf:#4A4366;--nps:#4FC9BE;--dis:#A88BE6;--cruise:#F07FA0;--booked:#F59A52;--hot:#F2C14E;--home:#F08A70';
  var css=
  '.fk{'+LIGHT+';--display:"Bebas Neue","Arial Narrow",Impact,sans-serif;--body:"Work Sans","Helvetica Neue",Arial,sans-serif;'+
   'background:var(--ground);color:var(--ink);font:15px/1.45 var(--body);border-radius:16px;padding:18px 18px 22px;margin:40px auto 8px;max-width:1000px;text-align:left;box-sizing:border-box}'+
  '.fk[data-mode="dark"]{'+DARK+'}'+
  '@media (prefers-color-scheme:dark){html:not([data-theme="light"]) .fk[data-mode="auto"]{'+DARK+'}}'+
  'html[data-theme="dark"] .fk[data-mode="auto"]{'+DARK+'}'+
  '.fk *{box-sizing:border-box}.fk a{color:inherit;text-decoration:none}'+
  '.fk-h{display:flex;align-items:center;gap:12px;margin:0 0 14px;font:400 1.6rem/1 var(--display);letter-spacing:.04em;color:var(--ink)}'+
  '.fk-h small{font:500 .78rem var(--body);letter-spacing:0;color:var(--ink-2);margin-left:auto}'+
  '.fk .kit{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}'+
  '@media (max-width:820px){.fk .kit{grid-template-columns:repeat(2,minmax(0,1fr))}}'+
  '.fk .tix{position:relative;background:var(--paper);border-radius:10px;display:grid;min-width:0}'+
  '.fk .tix .perf{position:relative}'+
  '.fk .tix .perf::before,.fk .tix .perf::after{content:"";position:absolute;width:20px;height:20px;border-radius:50%;background:var(--ground)}'+
  '.fk .kitcard{grid-template-rows:auto 1fr;border-top:6px solid var(--c);transition:transform .15s,box-shadow .15s}'+
  '.fk .kitcard:hover,.fk .kitcard:focus-visible{transform:translateY(-2px);box-shadow:0 0 0 3px var(--hot);outline:none}'+
  '.fk .kitcard .pic{display:flex;align-items:center;justify-content:center;height:112px;padding:12px 14px;background:var(--paper-2)}'+
  '.fk .kitcard .art{width:100%;height:100%;max-width:190px}'+
  '.fk .kitcard .perf{border-top:2px dashed var(--perf);padding:12px 14px 14px;display:flex;flex-direction:column;gap:3px}'+
  '.fk .kitcard .perf::before{top:-11px;left:-10px}.fk .kitcard .perf::after{top:-11px;right:-10px}'+
  '.fk .kind{font:700 .66rem var(--body);letter-spacing:.16em;text-transform:uppercase;color:var(--c)}'+
  '.fk .kitcard b{font:400 1.45rem/1 var(--display);letter-spacing:.02em;color:var(--ink)}'+
  '.fk .kitcard .meta{font-size:.76rem;color:var(--ink-2)}'+
  '.fk .kitcard .meta em{font-style:normal;font-weight:700;color:var(--c)}'+
  '@media (max-width:440px){.fk .kitcard .pic{height:92px}.fk .kitcard b{font-size:1.25rem}.fk{padding:16px 12px 18px}}'+
  '@media (prefers-reduced-motion:reduce){.fk .kitcard{transition:none}.fk .kitcard:hover{transform:none}}';

  var HOME='<a class="tix kitcard" href="'+BASE+'index.html" style="--c:var(--home)"><div class="pic"><svg viewBox="0 0 150 70" class="art" aria-hidden="true">'+
   '<g transform="rotate(-6 75 35)"><rect x="14" y="14" width="112" height="44" rx="5" fill="var(--paper)" stroke="var(--perf)" stroke-width="1.2"/>'+
   '<rect x="94" y="14" width="32" height="44" rx="5" fill="var(--home)"/><path d="M94 16 L94 56" stroke="var(--paper)" stroke-width="1.6" stroke-dasharray="3 3"/>'+
   '<rect x="24" y="24" width="52" height="5" rx="2" fill="var(--ink-3)"/><rect x="24" y="34" width="38" height="4" rx="2" fill="var(--perf)"/><rect x="24" y="43" width="44" height="4" rx="2" fill="var(--perf)"/>'+
   '<rect x="100" y="27" width="20" height="4" rx="2" fill="var(--paper)" opacity=".85"/><rect x="103" y="36" width="14" height="9" rx="2" fill="var(--paper)" opacity=".85"/></g>'+
   '</svg></div><div class="perf"><span class="kind">Home base</span><b>My Travel Hub</b><span class="meta">Upcoming trips, ideas and goals</span></div></a>';

  get('index.html').then(function(doc){
    var nav=doc.querySelector('nav.kit');if(!nav)return Promise.reject();
    var cards=[].slice.call(nav.querySelectorAll('a.kitcard')).map(function(a){
      var h=a.getAttribute('href')||'';
      if(here&&h===HREF[here])return '';
      if(!/^https?:/.test(h))a.setAttribute('href',BASE+h);
      return a.outerHTML}).filter(Boolean);
    if(cards.length>3)cards=cards.slice(0,3);
    cards.unshift(HOME);
    if(!document.getElementById('fk-style')){var st=document.createElement('style');st.id='fk-style';st.textContent=css;document.head.appendChild(st)}
    if(!document.querySelector('link[href*="Bebas+Neue"]')){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Work+Sans:wght@400;500;600;700&display=swap';document.head.appendChild(l)}
    var mode=mount.getAttribute('data-theme')==='dark'?'dark':'auto';
    mount.innerHTML='<section class="fk" data-mode="'+mode+'" aria-labelledby="fk-h"><h2 class="fk-h" id="fk-h">Field kit <small>guides, trackers and maps</small></h2><nav class="kit" aria-label="More travel pages">'+cards.join('')+'</nav></section>';
    refresh();
  }).catch(function(){});

  function setT(id,v){var e=mount.querySelector('#'+id);if(e&&v!=null&&!isNaN(v))e.textContent=v}
  function refresh(){
    /* 64 parks: visited count and dot grid (booked dots keep index's count) */
    get('nationalparks.html').then(function(d){
      var pv=d.querySelectorAll('article.park.visited').length,pbEl=mount.querySelector('#kit-pb'),pb=pbEl?parseInt(pbEl.textContent,10)||0:0,pic=mount.querySelector('#kit-parks');
      if(!pv)return;setT('kit-pv',pv);if(!pic)return;var s='';
      for(var i=0;i<64;i++){var x=6+(i%16)*11,y=6+Math.floor(i/16)*11;
        s+=i<pv?'<circle cx="'+x+'" cy="'+y+'" r="4.2" fill="var(--nps)"/>':i<pv+pb?'<circle cx="'+x+'" cy="'+y+'" r="3.6" fill="none" stroke="var(--nps)" stroke-width="1.4" stroke-dasharray="2 1.6"/>':'<circle cx="'+x+'" cy="'+y+'" r="3.6" fill="none" stroke="var(--perf)" stroke-width="1.2"/>'}
      pic.innerHTML='<svg viewBox="0 0 178 46" class="art" aria-hidden="true">'+s+'</svg>'}).catch(function(){});
    /* NPS units: mini state map in passport-region colors */
    get('npsunits.html').then(function(d){
      var pic=mount.querySelector('#kit-states'),out='';if(!pic)return;
      d.querySelectorAll('.map a.tile').forEach(function(a){
        var st=a.getAttribute('style')||'',m=function(re){var k=st.match(re);return k?k[1]:''};
        var r=+m(/grid-row:\s*(\d+)/),c=+m(/grid-column:\s*(\d+)/),p=parseFloat(m(/--p:\s*([\d.]+)%/))||0,ink=m(/--ink:\s*(#[0-9A-Fa-f]+)/)||'#888',t=esc(a.getAttribute('title')||'');
        if(!r||!c)return;var x=(c-1)*11,y=(r-1)*11;
        if(a.classList.contains('done'))out+='<rect x="'+x+'" y="'+y+'" width="9.5" height="9.5" rx="1.5" fill="'+ink+'"><title>'+t+'</title></rect>';
        else if(a.classList.contains('some')){var hh=Math.max(1.5,9.5*p/100);out+='<g><title>'+t+'</title><rect x="'+(x+.6)+'" y="'+(y+.6)+'" width="8.3" height="8.3" rx="1.2" fill="none" stroke="'+ink+'" stroke-width="1.2"/><rect x="'+x+'" y="'+(y+9.5-hh).toFixed(1)+'" width="9.5" height="'+hh.toFixed(1)+'" rx="1.2" fill="'+ink+'"/></g>'}
        else if(a.classList.contains('none'))out+='<rect x="'+(x+.6)+'" y="'+(y+.6)+'" width="8.3" height="8.3" rx="1.2" fill="none" stroke="'+ink+'" stroke-opacity=".7" stroke-width="1"><title>'+t+'</title></rect>'});
      if(out)pic.innerHTML='<svg viewBox="-1 -1 133 89" class="art" aria-hidden="true">'+out+'</svg>'}).catch(function(){});
    /* Trip books: count of books in the library */
    get('books/').then(function(d){
      var seen={},as=[].slice.call(d.querySelectorAll('a[href$=".html"]'));
      d.querySelectorAll('template').forEach(function(t){as=as.concat([].slice.call(t.content.querySelectorAll('a[href$=".html"]')))});
      as.forEach(function(a){var h=a.getAttribute('href'),f=h.split('/').pop();if(f&&f!=='index.html'&&!/^https?:/.test(h))seen[f]=1});
      var k=Object.keys(seen).length;if(k)setT('kit-bk',k)}).catch(function(){});
  }
})();
