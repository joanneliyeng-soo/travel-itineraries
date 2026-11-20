// Build a flip-book trip page from a trip JSON file.
// Usage: node build.mjs trips/<slug>.json   → writes ../../travel/<slug>-book.html
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const tripFile = process.argv[2];
if (!tripFile) { console.error('Usage: node build.mjs trips/<slug>.json'); process.exit(1); }
const trip = JSON.parse(fs.readFileSync(tripFile, 'utf8'));
const M = trip.map;

const topo = JSON.parse(fs.readFileSync(path.join(here, 'node_modules/us-atlas/states-10m.json'), 'utf8'));
const states = feature(topo, topo.objects.states);

const W = 1000, H = 1000;
const proj = geoMercator().fitExtent([[30, 30], [W - 30, H - 30]], { type: 'MultiPoint', coordinates: M.bbox });
proj.clipExtent([[-500, -500], [W + 500, H + 500]]);
const geo = geoPath(proj).digits(1);
const r1 = v => Math.round(v * 10) / 10;

const keep = new Set(M.states), hi = new Set(M.highlight || []);
const parts = [];
for (const f of states.features) {
  if (!keep.has(f.properties.name)) continue;
  const d = geo(f);
  if (d) parts.push(`<path class="st${hi.has(f.properties.name) ? ' on' : ''}" d="${d}"/>`);
}
for (const [t, lon, lat] of M.stateLabels || []) {
  const [x, y] = proj([lon, lat]);
  parts.push(`<text class="sl" x="${r1(x)}" y="${r1(y)}">${t}</text>`);
}
for (const [t, lon, lat] of M.cities || []) {
  const [x, y] = proj([lon, lat]);
  parts.push(`<circle class="cd" cx="${r1(x)}" cy="${r1(y)}" r="3"/><text class="cl" x="${r1(x)}" y="${r1(y)}">${t}</text>`);
}
const pts = {};
for (const [k, [lon, lat]] of Object.entries(M.points)) pts[k] = proj([lon, lat]).map(r1);

// sanity checks
const missing = [...trip.route, ...trip.stops.map(s => s.k), ...trip.airports.map(a => a[0])].filter(k => !pts[k]);
if (missing.length) { console.error('Missing map points:', [...new Set(missing)].join(', ')); process.exit(1); }

const { map, ...client } = trip; // the page doesn't need raw coordinates
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
let html = fs.readFileSync(path.join(here, 'template.html'), 'utf8')
  .replace('__TITLE__', esc(trip.title))
  .replace('__SHORT__', esc(trip.short || trip.title))
  .replace('__BASEMAP__', parts.join(''))
  .replace('__PTS__', JSON.stringify(pts))
  .replace('__TRIP__', JSON.stringify(client).replace(/<\//g, '<\\/'));

// optional per-trip palette: { "#templateHex": "#newHex", ... }
for (const [from, to] of Object.entries(trip.theme || {})) html = html.split(from).join(to);

const out = path.join(here, '../../travel', `${trip.slug}-book.html`);
fs.writeFileSync(out, html);
console.log('wrote', path.relative(process.cwd(), out), html.length, 'bytes');
