# Trip book template

Builds a phone-friendly flip book for a trip: a cover map of the whole route, a Day 0 travel page,
then for each day an overview page, one page per stop (drive in, leg map, stamp box, navigate,
notes, about), an overnight page, and a final page with the stamp checklist.

Output goes to `travel/books/<book>.html` (set `book` in the trip JSON, e.g. `"el-paso"`). The build also writes a redirect at the old `travel/<slug>-book.html` address and rebuilds the library at `travel/books/index.html`. Link the book from the trip's itinerary page as `books/<book>.html`.

## Build

```sh
cd tools/tripbook
npm install          # once
node build.mjs trips/<slug>.json
```

## Making a new trip

Copy `trips/indiana-carolinas-stamp-sprint.json` and edit it.

| Field | What it is |
| --- | --- |
| `slug` | Keys the saved stamps/page in the browser; never change it once a book is in use. |
| `book` | Short file name: the book is `travel/books/<book>.html`. |
| `start`, `end` | ISO dates (`2027-01-15`). The library shelves the book under Up next until `end` passes, then Past trips. Leave both out for a placeholder (Someday shelf). |
| `emoji` | Shown on the book's spine in the library. |
| `poster` | Library cover art, a vintage park-poster scene: `dunes`, `sea`, `saguaro`, `valley`, `arch`, `rockies`, `ridges` or `skyline` (see `posters.mjs`; add new scenes there). Defaults to `rockies`. |
| `title`, `short`, `subtitle`, `placeholder`, `chips` | Cover text. `short` is the top-bar title. Leave `placeholder` empty once the trip is dated. The first chip is highlighted. |
| `itinerary` | Relative link back to the trip's itinerary page. |
| `map.bbox` | `[[west, north], [east, south]]` in lon/lat. The cover map fits this box. |
| `map.states` / `map.highlight` | States drawn / states shaded white (the ones you visit). |
| `map.stateLabels`, `map.cities` | `[label, lon, lat]`. Keep labels inside the bbox. |
| `map.points` | `key: [lon, lat]` for every stop, overnight, and airport. |
| `airports` | `[[key, "IND"], …]` drawn as dark tags. |
| `route` | Keys in driving order, start airport to end airport, including overnights. |
| `days` | Index 0 is the travel day (`title`, `dow`, `dowLong`, `color`, `meta`, `html`). Days 1+ have `title`, `sub`, `color`, `drive`, `stamps`, `start`, `end` (route keys), `tzline`, `cut`, `gmaps`. |
| `stops` | In order. `kind` is `stop`, `night`, or `home` (last leg). Every entry has `d`, `k`, `from`, `drive`, `arrive`, `z`; the first of each day also has `leave`. Optional `tz` shows a time-zone chip. |

Stop fields: `name`, `type`, `state`, `place`, `addr` (used for the Navigate link), `where` and `hrs`
(stamp box), and optional `warn`, `acc` (accessibility), `ok`, `about`.
Night fields: `name`, `note`. Home fields: `title`, `note`, `navTo`, `navLabel`.

### Other options

- `days[i].kind: "cruise"` makes a single free-form page for that day (`title`, `sub`, `color`, `html`); no map or stops.
- `days[i].label` (e.g. `"Day 8"`, `"Days 5–7"`), `date` (e.g. `"Nov 24"`), and `kicker` (full override of the band's top line).
- `days[i].cutLabel` renames the "Hard cutoffs" box (e.g. `"Backup plan"`).
- `stops[i].unit` names the main stamp when a stop has more than one; `also: [{id, name, where, hrs}]` adds extra cancellations at the same stop, each with its own toggle.
- `stops[i].via` adds a route note under the drive card; `arriveLabel` replaces "Arrive" (e.g. `"Flight"`); night/home stops accept `addr` and `html`.
- `theme` swaps template colors: `{ "#templateHex": "#newHex" }`. See `trips/nov2026-destiny-everglades.json` for a full ocean palette.
- `stops[i].color` colors that stop's pin, number and stamp box (use the itinerary's per-stamp key colors).
- `stops[i].stampId` marks a second visit to a stop already in the book (e.g. Guadalupe on Sat or Sun): same number, same stamp toggle, counted once. `optional` adds a short note above the stamp box.
- `kind: "point"` is a non-stamp stop (lunch, a viewpoint, a gas stop): drive card, map, `note`/`warn`/`acc`/`ok`, and an optional `bonus: {title, where, hrs}` box for extra cancellations that don't count toward the total.
- `legMinW` sets how far the per-stop maps zoom in (smaller = closer; default 400).

Use a different day palette for each trip. Drive times come from Google Maps, not estimates.

## Screen sizes

On narrow phones (430px wide or less, e.g. a folded Galaxy Z Fold cover screen) gutters tighten and stop pages show the stamp box and Navigate before the leg map.

### Wide screens

On screens at least 700px wide and roughly square or wider (an unfolded Galaxy Z Fold, a tablet), the book widens to 1120px and each page goes two-column: the map floats left and the details sit beside it. Phones in portrait keep the single-column layout.
