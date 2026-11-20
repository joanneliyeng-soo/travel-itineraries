# Trip book template

Builds a phone-friendly flip book for a trip: a cover map of the whole route, a Day 0 travel page,
then for each day an overview page, one page per stop (drive in, leg map, stamp box, navigate,
notes, about), an overnight page, and a final page with the stamp checklist.

Output goes to `travel/<slug>-book.html`. Link it from the trip's itinerary page.

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
| `slug` | File name stem. Output is `travel/<slug>-book.html`; also keys the saved stamps/page in the browser. |
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

Use a different day palette for each trip. Drive times come from Google Maps, not estimates.
