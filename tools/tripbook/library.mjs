// Builds the trip-book library page: ../../travel/books/index.html — a giant wooden bookcase.
// Reads every trips/*.json. Shelves are sorted in the browser by today's date:
//   Up next  = face-out covers, trips whose "end" date hasn't passed (soonest first)
//   Someday  = rack of spine + small cover, placeholders with no "start"/"end"
//   Past     = rack of spine + small cover, trips whose "end" date has passed (newest first)
// Run on its own with `node library.mjs`; build.mjs also runs it after every book.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scene, art } from './posters.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const tripsDir = path.join(here, 'trips');
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const fmt = iso => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); };
function range(t) {
  if (!t.start) return 'Dates TBD';
  const a = fmt(t.start), b = fmt(t.end), y = t.end.slice(0, 4), y0 = t.start.slice(0, 4);
  const sameMonth = t.start.slice(0, 7) === t.end.slice(0, 7);
  if (y0 !== y) return `${a}, ${y0} – ${b}, ${y}`;
  return (sameMonth ? `${a}–${b.split(' ')[1]}` : `${a} – ${b}`) + `, ${y}`;
}

const trips = fs.readdirSync(tripsDir).filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(fs.readFileSync(path.join(tripsDir, f), 'utf8')))
  .filter(t => t.book);


// volume count on the header spine
const roman = n => [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']]
  .reduce((o, [v, r]) => { while (n >= v) { o += r; n -= v; } return o; }, '');

// small deterministic variety so the racks look hand-stocked
const hash = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const cards = trips.map(t => {
  const ps = scene(t), bg = ps.band, panel = 'rgba(255,255,255,.22)', accent = ps.ac;
  const units = t.stops.filter(x => x.kind === 'stop' && !x.stampId).reduce((n, x) => n + 1 + (x.also || []).filter(u => !u.bonus).length, 0);
  const bonus = t.stops.flatMap(x => (x.also || []).filter(u => u.bonus).map(u => u.id));
  // spine thickness = stamps on the trip (2 stamps → thin, 19 → chunky); height stays random
  const h = hash(t.slug), sh = 182 + (h % 4) * 6, sw = Math.round(Math.min(52, Math.max(24, 22 + units * 1.6)));
  const pa = art(t, 'art'), title = t.short || t.title;
  return `<a class="bk" href="${esc(t.book)}.html" data-slug="${esc(t.slug)}" data-units="${units}" data-collected="${esc((t.collected || []).filter(id => !bonus.includes(id)).join(' '))}" data-bonus="${esc(bonus.join(' '))}" data-start="${esc(t.start || '')}" data-end="${esc(t.end || '')}" aria-label="${esc(t.title)}, ${esc(range(t))}" style="--bg:${bg};--panel:${panel};--ac:${accent};--ink:${ps.ink};--sh:${sh}px;--sw:${sw}px">
  <span class="face">
    <span class="pic">${pa}<span class="when">${esc(range(t))}</span><span class="badge"></span></span>
    <span class="plate2">
      <span class="ti">${esc(title)}</span>
      <span class="chip1">${esc((t.chips || [])[0] || '')}</span>
      <span class="foot"><span class="prog"><i></i></span><span class="pn">${units} stamps</span></span>
    </span>
  </span>
  <span class="rk">
    <span class="sp"><span class="sem">${esc(t.emoji || '📖')}</span><span class="stx">${esc(t.short || t.title)}</span><span class="sct">◈ <b class="scn">${units}</b></span></span>
    <span class="mini">
      <span class="mpic">${art(t, 'art')}<span class="mw">${esc(range(t))}</span></span>
      <span class="mband"><span class="mt">${esc(title)}</span><span class="prog"><i></i></span></span>
    </span>
  </span>
</a>`;
});

// burgundy damask wallpaper tile (desktop only), half-drop repeat
const motif = `<path d="M0-24C8-15 8-6 0 0C-8-6-8-15 0-24Z"/><path d="M0 24C8 15 8 6 0 0C-8 6-8 15 0 24Z"/>` +
  `<path d="M-18 0C-11-7-4-6 0 0C-4 6-11 7-18 0Z"/><path d="M18 0C11-7 4-6 0 0C4 6 11 7 18 0Z"/>` +
  `<path d="M-6-30Q0-36 6-30Q0-33-6-30Z"/><path d="M-6 30Q0 36 6 30Q0 33-6 30Z"/>` +
  `<circle r="3.2" fill="#4E1920"/><circle cx="-11" cy="-11" r="1.6"/><circle cx="11" cy="-11" r="1.6"/><circle cx="-11" cy="11" r="1.6"/><circle cx="11" cy="11" r="1.6"/>`;
const wallSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="112" viewBox="0 0 80 112">` +
  `<rect width="80" height="112" fill="#5A1F26"/>` +
  `<path d="M20 0V112M60 0V112" stroke="#521B22" stroke-width="1"/>` +
  `<g fill="#6A2830">` + [[40, 56], [0, 0], [80, 0], [0, 112], [80, 112]].map(([x, y]) => `<g transform="translate(${x} ${y})">${motif}</g>`).join('') + `</g>` +
  `<g fill="#4E1920">` + [[40, 0], [40, 112], [0, 56], [80, 56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2"/>`).join('') + `</g>` +
  `</svg>`;
const wallpaper = `url("data:image/svg+xml,${encodeURIComponent(wallSvg)}")`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light only">
<title>Trip Books · Library</title>
<style>
  html, body { margin:0 !important; padding:0 !important; background:#140C07 !important; color:#F3E6D6 !important; }
  * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
  body { font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:1.45; }
  .serif { font-family:"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; }

  /* the bookcase */
  .case { max-width:1120px; margin:0 auto; min-height:100vh;
    padding:max(10px, env(safe-area-inset-top)) 0 max(18px, env(safe-area-inset-bottom));
    background:#2A1A10; border-left:12px solid #5A3A24; border-right:12px solid #5A3A24;
    box-shadow:inset 12px 0 18px -10px rgba(0,0,0,.6), inset -12px 0 18px -10px rgba(0,0,0,.6); }
  .back { background:repeating-linear-gradient(90deg, #2A1A10 0 118px, #2E1D12 118px 120px); }
  .crown { margin:0 -12px; background:#6B4630; border-bottom:6px solid #4A2F1D; padding:18px 22px 16px; text-align:center;
    box-shadow:0 6px 10px rgba(0,0,0,.45); }
  /* header: a giant gilt leather spine lying on its side */
  .spine { position:relative; display:flex; align-items:center; justify-content:space-between; gap:10px; max-width:620px; margin:0 auto;
    background:linear-gradient(180deg, #5A171A 0%, #7E2629 18%, #8A2B2E 50%, #74222A 82%, #4E1518 100%);
    border-radius:8px 8px 6px 6px; padding:14px 16px 13px;
    box-shadow:0 8px 14px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.12), inset 0 0 0 1px rgba(0,0,0,.35); }
  .spine::before, .spine::after { content:""; position:absolute; left:10px; right:10px; height:1px; background:#C9A35B; opacity:.75; }
  .spine::before { top:6px; box-shadow:0 2px 0 rgba(201,163,91,.45); }
  .spine::after { bottom:6px; box-shadow:0 -2px 0 rgba(201,163,91,.45); }
  .bands { display:flex; gap:6px; flex:none; }
  .bands i { display:block; width:7px; height:52px; border-radius:4px;
    background:linear-gradient(90deg, #8E6A2C, #F2D79A 45%, #C9A35B 70%, #7A5A22); box-shadow:0 1px 2px rgba(0,0,0,.5); }
  .gilt { flex:1; min-width:0; text-align:center; }
  .gilt .vol { font-family:"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; font-size:12px; letter-spacing:.3em; color:#E8C98A; }
  .gilt h1 { margin:2px 0 0; font-size:32px; line-height:1.08; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#F2D79A;
    text-shadow:0 1px 0 #4E1518, 0 -1px 0 rgba(255,236,190,.25); white-space:nowrap; }
  .gilt .rule { height:2px; margin:5px 18% 0; background:linear-gradient(90deg, transparent, #C9A35B 15%, #F2D79A 50%, #C9A35B 85%, transparent); }
  .crown p { margin:10px auto 0; max-width:46ch; color:#F0DCC4; font-size:13.5px; }
  .note { margin:14px 14px 0; background:#F6EBD9; color:#3A2618; border-radius:3px; padding:9px 12px; font-size:14px;
    transform:rotate(-.6deg); box-shadow:0 3px 8px rgba(0,0,0,.4); display:none; }
  .note b { color:#1F130B; }

  .bay { padding:18px 14px 0; }
  .sign { display:inline-block; margin:0 0 10px 4px; background:#4A2F1D; border:1px solid #9C7350; color:#E8C9A4; border-radius:4px;
    font-size:11.5px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; padding:4px 10px; }

  /* shelves: fixed row heights, a wooden ledge painted under every row */
  .shelf { display:grid; column-gap:12px; row-gap:0; align-items:end; padding:0 4px; margin:0 -14px; padding-left:18px; padding-right:18px;
    background-image:repeating-linear-gradient(to bottom, transparent 0 calc(var(--row) - 16px), #8E6243 calc(var(--row) - 16px) calc(var(--row) - 13px), #7A5134 calc(var(--row) - 13px) calc(var(--row) - 4px), #3E2615 calc(var(--row) - 4px) var(--row));
    grid-auto-rows:var(--row); }
  .shelf > .bk { margin-bottom:16px; }
  .up { --row:318px; grid-template-columns:repeat(auto-fill, minmax(146px, 1fr)); }
  .shelf.none { --row:96px; }
  .rack { --row:232px; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); }
  .empty { grid-column:1 / -1; align-self:center; justify-self:center; color:#B79574; font-size:13.5px; font-style:italic; margin-bottom:16px; }

  .bk { text-decoration:none; color:#F7EBD3; display:block; justify-self:center; width:100%; }
  .bk:focus-visible { outline:3px solid #F6EBD9; outline-offset:3px; }

  /* face-out cover (Up next): vintage park poster on cream paper */
  .face { position:relative; display:flex; flex-direction:column; max-width:230px; margin:0 auto; height:282px;
    background:#F2E3C6; border-radius:3px 10px 10px 3px; padding:7px; overflow:hidden;
    box-shadow:0 8px 14px rgba(0,0,0,.55), inset 3px 0 0 rgba(0,0,0,.12); }
  .pic { position:relative; flex:1; min-height:0; display:block; overflow:hidden; border-radius:2px 6px 0 0; }
  .art { display:block; width:100%; height:100%; }
  .pic .when { position:absolute; left:9px; top:7px; right:9px; font-size:10px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; color:var(--ink); }
  .plate2 { display:flex; flex-direction:column; gap:4px; background:var(--bg); padding:9px 10px 9px; border-radius:0 0 6px 0; }
  .face .ti { font-family:"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; font-size:15px; font-weight:700; line-height:1.12; color:#F7EBD3;
    text-transform:uppercase; letter-spacing:.03em; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .chip1 { font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--ac); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .chip1:empty { display:none; }
  .face .foot { display:flex; align-items:center; gap:8px; margin-top:2px; }
  .prog { display:block; flex:1; height:5px; border-radius:99px; background:var(--panel); overflow:hidden; }
  .prog i { display:block; height:100%; width:0; background:var(--ac); }
  .face .pn { font-size:11px; font-weight:700; color:#EADCC2; white-space:nowrap; font-variant-numeric:tabular-nums; }
  .badge { position:absolute; right:7px; top:24px; background:var(--bg); color:#F7EBD3; font-size:10px; font-weight:800; letter-spacing:.1em;
    text-transform:uppercase; padding:2px 8px; border-radius:99px; display:none; }
  .bk.next .badge, .bk.on .badge { display:block; }
  .bk.next .face, .bk.on .face { box-shadow:0 0 0 3px #F6EBD9, 0 8px 14px rgba(0,0,0,.55); }

  /* spine + small cover (racks) */
  .rk { display:none; align-items:flex-end; justify-content:center; }
  .sp { width:var(--sw); height:var(--sh); background:var(--ac); border-radius:3px 2px 2px 3px; position:relative; flex:none;
    display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:7px 0 6px;
    box-shadow:inset -3px 0 4px rgba(0,0,0,.25), inset 3px 0 3px rgba(255,255,255,.12), 2px 4px 8px rgba(0,0,0,.5); }
  .sp::before, .sp::after { content:""; position:absolute; left:3px; right:3px; height:2px; background:rgba(255,255,255,.35); }
  .sp::before { top:26px; } .sp::after { bottom:26px; }
  .sem { font-size:13px; line-height:1; }
  .stx { writing-mode:vertical-rl; transform:rotate(180deg); font-family:"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
    font-size:12px; font-weight:700; color:#FFFFFF; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-height:calc(var(--sh) - 62px);
    text-shadow:0 1px 1px rgba(0,0,0,.35); }
  .sct { font-size:10px; font-weight:800; color:#FFFFFF; opacity:.9; }
  .sct b { font-weight:800; }
  .mini { width:104px; height:calc(var(--sh) - 12px); background:#F2E3C6; border-radius:0 8px 8px 0; padding:5px;
    display:flex; flex-direction:column; transform:perspective(500px) rotateY(-14deg); transform-origin:left center;
    box-shadow:4px 6px 10px rgba(0,0,0,.5); }
  .mpic { position:relative; flex:1; min-height:0; display:block; overflow:hidden; border-radius:0 4px 0 0; }
  .mini .mw { position:absolute; left:6px; top:5px; right:4px; font-size:9px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; color:var(--ink); line-height:1.2; }
  .mband { display:flex; flex-direction:column; gap:5px; background:var(--bg); padding:6px 7px 7px; border-radius:0 0 4px 0; }
  .mini .mt { font-family:"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; font-size:10.5px; font-weight:700; line-height:1.12; color:#F7EBD3;
    text-transform:uppercase; letter-spacing:.02em; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .mini .prog { flex:none; height:4px; }
  .rack .bk .face { display:none; }
  .rack .bk .rk { display:flex; }
  .bk.done .sct { color:#FFFFFF; }
  .bk.past .mini, .bk.past .sp { filter:saturate(.8); }

  /* the room around the bookcase, only seen on wide screens */
  @media (min-width:1150px) {
    html { background-color:#5A1F26 !important; }
    body { background:transparent !important; }
    html { background-image:radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(20,6,8,.55) 100%), ${wallpaper} !important;
      background-size:100% 100%, 80px 112px !important; background-attachment:fixed, scroll; }
    .case { margin-top:28px; margin-bottom:40px; min-height:auto; border-top:12px solid #5A3A24; border-bottom:22px solid #4A2F1D; border-radius:4px 4px 2px 2px; box-shadow:0 18px 40px rgba(20,14,10,.55), inset 12px 0 18px -10px rgba(0,0,0,.6), inset -12px 0 18px -10px rgba(0,0,0,.6); }
    .crown { margin-top:-10px; }
  }
  .foot2 { text-align:center; padding:20px 14px 6px; }
  .foot2 a { color:#E8C9A4; font-weight:700; font-size:14px; }

  .bookend { display:none; }
  @media (min-width:700px) {
    .rack { grid-template-columns:repeat(auto-fill, 140px); justify-content:start; column-gap:4px; }
    .rack .bk { width:140px; }
    .rack .rk { justify-content:flex-start; }
    .bookend { display:block; align-self:end; justify-self:start; width:46px; height:118px; margin-bottom:16px; position:relative; }
    .bookend::before { content:""; position:absolute; left:0; bottom:0; width:8px; height:118px; background:#2B2F36; border-radius:2px 2px 0 0;
      box-shadow:inset -2px 0 0 #444A54, 3px 3px 6px rgba(0,0,0,.5); }
    .bookend::after { content:""; position:absolute; left:0; bottom:0; width:46px; height:6px; background:#2B2F36; border-radius:0 2px 0 0; }
    .note { max-width:380px; margin-left:26px; }
    .bay { padding:22px 26px 0; }
    .shelf { margin:0 -26px; padding-left:30px; padding-right:30px; column-gap:18px; }
    .up { --row:356px; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); }
    .face { height:318px; }
    .gilt h1 { font-size:40px; }
    .bands i { height:60px; }
    .spine { padding:16px 22px 15px; }
  }
</style>
</head>
<body>
<div class="case back">
  <header class="crown">
    <div class="spine">
      <span class="bands" aria-hidden="true"><i></i><i></i></span>
      <div class="gilt"><div class="vol">Vol. I – ${roman(trips.length)}</div><h1 class="serif">Trip Books</h1><div class="rule"></div></div>
      <span class="bands" aria-hidden="true"><i></i><i></i></span>
    </div>
  </header>
  <div class="note" id="note"></div>

  <section class="bay"><div class="sign">Up next</div>
    <div class="shelf up" id="next"></div></section>
  <section class="bay"><div class="sign">Someday</div>
    <div class="shelf rack" id="some"></div></section>
  <section class="bay"><div class="sign">Past trips</div>
    <div class="shelf rack" id="past"></div></section>

  <div class="foot2"><a href="../">← Back to My Travel Bucket List</a></div>
</div>
<template id="books">
${cards.join('\n')}
</template>
<script>
(function () {
  var books = Array.prototype.slice.call(document.getElementById('books').content.querySelectorAll('.bk'));
  var t = new Date(), today = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
  var next = [], some = [], past = [];
  books.forEach(function (b) {
    var e = b.dataset.end;
    if (!e) some.push(b); else if (e < today) past.push(b); else next.push(b);
    var got = {};
    try { got = JSON.parse(localStorage.getItem(b.dataset.slug + '-book-stamps') || '{}') || {}; } catch (x) {}
    (b.dataset.collected ? b.dataset.collected.split(' ') : []).forEach(function (id) { if (!(id in got)) got[id] = true; });
    var bon = b.dataset.bonus ? b.dataset.bonus.split(' ') : [];
    var u = +b.dataset.units, n = Math.min(u, Object.keys(got).filter(function (k) { return got[k] && bon.indexOf(k) < 0; }).length);
    b.querySelectorAll('.prog i').forEach(function (i) { i.style.width = (u ? 100 * n / u : 0) + '%'; });
    b.querySelector('.pn').textContent = n ? n + ' / ' + u + ' stamped' : u + ' stamps';
    b.querySelector('.scn').textContent = n ? n + '/' + u : u;
    if (u && n === u) b.classList.add('done');
  });
  next.sort(function (a, b) { return a.dataset.start < b.dataset.start ? -1 : 1; });
  past.sort(function (a, b) { return a.dataset.end > b.dataset.end ? -1 : 1; });
  some.sort(function (a, b) { return a.getAttribute('aria-label') < b.getAttribute('aria-label') ? -1 : 1; });
  if (next.length) {
    var first = next[0];
    var days = Math.round((new Date(first.dataset.start + 'T00:00:00') - new Date(today + 'T00:00:00')) / 86400000);
    var name = first.querySelector('.ti').textContent, note = document.getElementById('note');
    if (days <= 0) { first.classList.add('on'); first.querySelector('.badge').textContent = 'On the road'; note.innerHTML = '🧭 <b>' + name + '</b> is happening now. Tap its cover to pick up where you left off.'; }
    else { first.classList.add('next'); first.querySelector('.badge').textContent = 'Next up'; note.innerHTML = '🧳 Next trip: <b>' + name + '</b> in ' + days + (days === 1 ? ' day.' : ' days.'); }
    note.style.display = 'block';
  }
  past.forEach(function (b) { b.classList.add('past'); });
  [['next', next, 'No trips booked yet.'], ['some', some, 'No placeholder trips right now.'], ['past', past, 'No returned books yet. Finished trips land here.']].forEach(function (p) {
    var el = document.getElementById(p[0]);
    if (!p[1].length) { var m = document.createElement('div'); m.className = 'empty'; m.textContent = p[2]; el.appendChild(m); el.classList.add('none'); return; }
    p[1].forEach(function (b) { el.appendChild(b); });
    if (el.classList.contains('rack')) { var be = document.createElement('div'); be.className = 'bookend'; be.setAttribute('aria-hidden', 'true'); el.appendChild(be); }
  });
})();
</script>
</body>
</html>
`;

const out = path.join(here, '../../travel/books/index.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log('wrote', path.relative(process.cwd(), out), `(${cards.length} books)`);
