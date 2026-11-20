// Builds the trip-book library page: ../../travel/books/index.html — a giant wooden bookcase.
// Reads every trips/*.json. Shelves are sorted in the browser by today's date:
//   Up next  = face-out covers, trips whose "end" date hasn't passed (soonest first)
//   Someday  = rack of spine + small cover, placeholders with no "start"/"end"
//   Past     = rack of spine + small cover, trips whose "end" date has passed (newest first)
// Run on its own with `node library.mjs`; build.mjs also runs it after every book.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const tripsDir = path.join(here, 'trips');
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// tiny route sketch for the cover: equirectangular inside the trip's bbox
function sketch(t, accent) {
  const [[w, n], [e, s]] = t.map.bbox;
  const kx = Math.cos(((n + s) / 2) * Math.PI / 180);
  const bw = (e - w) * kx, bh = n - s;
  const W = 300, H = 150, pad = 14;
  const k = Math.min((W - 2 * pad) / bw, (H - 2 * pad) / bh);
  const ox = (W - bw * k) / 2, oy = (H - bh * k) / 2;
  const P = key => { const [lon, lat] = t.map.points[key]; return [ox + (lon - w) * kx * k, oy + (n - lat) * k].map(v => Math.round(v * 10) / 10); };
  const pts = t.route.filter(key => t.map.points[key]).map(P);
  const stops = t.stops.filter(x => x.kind === 'stop' && !x.stampId && t.map.points[x.k]).map(x => P(x.k));
  const ends = (t.airports || []).filter(a => t.map.points[a[0]]).map(a => P(a[0]));
  return `<svg class="sk" viewBox="0 0 ${W} ${H}" aria-hidden="true">` +
    `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>` +
    stops.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="#FFFFFF" stroke="${accent}" stroke-width="2"/>`).join('') +
    ends.map(([x, y]) => `<rect x="${x - 5}" y="${y - 5}" width="10" height="10" rx="2" fill="#FFFFFF"/>`).join('') +
    `</svg>`;
}

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


// small deterministic variety so the racks look hand-stocked
const hash = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const cards = trips.map(t => {
  const bg = (t.theme && (t.theme['#1E1D33'] || t.theme['#1e1d33'])) || '#1E1D33';
  const panel = (t.theme && t.theme['#322F51']) || '#322F51';
  const accent = (t.days[1] && t.days[1].color) || '#E2603A';
  const units = t.stops.filter(x => x.kind === 'stop' && !x.stampId).reduce((n, x) => n + 1 + (x.also || []).length, 0);
  const h = hash(t.slug), sh = 182 + (h % 4) * 6, sw = 28 + (h >> 3) % 4 * 3;
  const sk = sketch(t, accent);
  return `<a class="bk" href="${esc(t.book)}.html" data-slug="${esc(t.slug)}" data-units="${units}" data-collected="${esc((t.collected || []).join(' '))}" data-start="${esc(t.start || '')}" data-end="${esc(t.end || '')}" aria-label="${esc(t.title)}, ${esc(range(t))}" style="--bg:${bg};--panel:${panel};--ac:${accent};--sh:${sh}px;--sw:${sw}px">
  <span class="face">
    <span class="fsp"></span>
    <span class="top"><span class="em">${esc(t.emoji || '📖')}</span><span class="when">${esc(range(t))}</span></span>
    <span class="ti">${esc(t.title)}</span>
    <span class="badge"></span>
    ${sk}
    <span class="chips">${(t.chips || []).slice(0, 2).map(c => `<span>${esc(c)}</span>`).join('')}</span>
    <span class="foot"><span class="prog"><i></i></span><span class="pn">${units} stamps</span></span>
  </span>
  <span class="rk">
    <span class="sp"><span class="sem">${esc(t.emoji || '📖')}</span><span class="stx">${esc(t.short || t.title)}</span><span class="sct">◈ <b class="scn">${units}</b></span></span>
    <span class="mini">
      <span class="mw">${esc(range(t))}</span>
      <span class="mt">${esc(t.short || t.title)}</span>
      ${sk}
      <span class="prog"><i></i></span>
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
  .plate { display:inline-block; background:#2A1A10; border:2px solid #9C7350; border-radius:6px; padding:8px 20px 9px; }
  .plate .k { font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:#D9B48C; }
  .plate h1 { margin:2px 0 0; font-size:30px; line-height:1.1; color:#FFF4E6; font-weight:700; }
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

  .bk { text-decoration:none; color:#EDEAF9; display:block; justify-self:center; width:100%; }
  .bk:focus-visible { outline:3px solid #F6EBD9; outline-offset:3px; }

  /* face-out cover (Up next) */
  .face { position:relative; display:flex; flex-direction:column; gap:6px; max-width:230px; margin:0 auto; height:282px;
    background:var(--bg); border-radius:3px 12px 12px 3px; padding:11px 9px 10px 17px; overflow:hidden;
    box-shadow:0 8px 14px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.07); }
  .fsp { position:absolute; left:0; top:0; bottom:0; width:9px; background:var(--ac); box-shadow:2px 0 4px rgba(0,0,0,.3); }
  .face .top { display:flex; align-items:center; justify-content:space-between; gap:6px; }
  .face .em { font-size:19px; line-height:1; }
  .face .when { font-size:10.5px; font-weight:700; color:#D6D2EE; text-align:right; }
  .face .ti { font-family:"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; font-size:17px; font-weight:700; line-height:1.15; color:#FFFFFF;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .face .sk { width:100%; height:auto; background:var(--panel); border-radius:8px; margin-top:auto; }
  .face .chips { display:flex; flex-wrap:wrap; gap:4px; max-height:46px; overflow:hidden; }
  .face .chips span { font-size:11px; font-weight:700; padding:2px 7px; border-radius:99px; background:var(--panel); color:#EDEAF9; }
  .face .foot { display:flex; align-items:center; gap:8px; }
  .prog { display:block; flex:1; height:5px; border-radius:99px; background:var(--panel); overflow:hidden; }
  .prog i { display:block; height:100%; width:0; background:var(--ac); }
  .face .pn { font-size:11.5px; font-weight:700; color:#D6D2EE; white-space:nowrap; font-variant-numeric:tabular-nums; }
  .badge { align-self:flex-start; background:var(--ac); color:#FFFFFF; font-size:10px; font-weight:800; letter-spacing:.1em;
    text-transform:uppercase; padding:2px 8px; border-radius:99px; display:none; }
  .bk.next .badge, .bk.on .badge { display:block; }
  .bk.next .face, .bk.on .face { box-shadow:0 0 0 2px var(--ac), 0 8px 14px rgba(0,0,0,.55); }

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
  .mini { width:104px; height:calc(var(--sh) - 12px); background:var(--bg); border-radius:0 8px 8px 0; padding:8px 8px 8px 9px;
    display:flex; flex-direction:column; gap:4px; transform:perspective(500px) rotateY(-14deg); transform-origin:left center;
    box-shadow:4px 6px 10px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.07); }
  .mini .mw { font-size:10px; font-weight:700; color:#D6D2EE; }
  .mini .mt { font-family:"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; font-size:13px; font-weight:700; line-height:1.15; color:#FFFFFF;
    display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
  .mini .prog { flex:none; height:4px; }
  .mini .sk { width:100%; height:auto; background:var(--panel); border-radius:5px; margin-top:auto; }
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
    .plate h1 { font-size:36px; }
  }
</style>
</head>
<body>
<div class="case back">
  <header class="crown">
    <div class="plate"><div class="k">Travel library</div><h1 class="serif">Trip Books</h1></div>
    <p>Flip-book guides for every trip, stop by stop. Tap a book to open it.</p>
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
    var u = +b.dataset.units, n = Math.min(u, Object.keys(got).filter(function (k) { return got[k]; }).length);
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
