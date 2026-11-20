// Vintage park-poster art for the library covers (flat, WPA-style landscapes).
// Each trip JSON picks a scene with "poster": "<name>". Unknown or missing → "rockies".
// Every scene is drawn in a 200 × 170 box and anchored to the bottom when cropped.
//   sky / sun : top of the art     band : title band + spine     ink : dates text     ac : progress fill

const cactus = (x, b, h, c) =>
  `<g stroke="${c}" stroke-width="7" stroke-linecap="round" fill="none">` +
  `<path d="M${x} ${b}V${b - h}"/><path d="M${x} ${b - h * .42}H${x - 10}V${b - h * .72}"/><path d="M${x} ${b - h * .55}H${x + 10}V${b - h * .86}"/></g>`;
const pine = (x, b, h, c) => `<path d="M${x} ${b - h}L${x + h * .34} ${b}H${x - h * .34}Z" fill="${c}"/>`;

export const SCENES = {
  dunes: {
    sky: '#F6C98B', sun: '#F8E6B0', band: '#3A2C55', ink: '#3A2C55', ac: '#F6C98B',
    art: `<circle cx="146" cy="50" r="22" fill="#F8E6B0"/>
<path d="M0 112L18 94L30 102L46 70L56 86L70 60L84 90L100 82L122 98L150 86L176 100L200 92V170H0Z" fill="#8C7FB0"/>
<path d="M0 130Q40 108 82 124T160 116T200 122V170H0Z" fill="#EBDDC6"/>
<path d="M0 148Q50 126 100 142T200 136V170H0Z" fill="#FFFFFF"/>
<g stroke="#3A2C55" stroke-width="2" stroke-linecap="round"><path d="M34 156V134"/><path d="M34 134L26 126M34 134L42 126M34 134L30 122M34 134L38 122M34 134L34 120"/></g>`,
  },
  sea: {
    sky: '#F7C59F', sun: '#FCE7C2', band: '#0E3A4F', ink: '#0E3A4F', ac: '#F7C59F',
    art: `<circle cx="112" cy="100" r="28" fill="#FCE7C2"/>
<rect y="100" width="200" height="70" fill="#2B7A99"/>
<g stroke="#7FC2CF" stroke-width="2" stroke-linecap="round"><path d="M60 114H96M120 120H170M80 132H130M30 126H56"/></g>
<path d="M116 104H176L170 114H122Z" fill="#0E3A4F"/><rect x="128" y="92" width="38" height="12" fill="#F4EEE2"/>
<rect x="138" y="82" width="7" height="10" fill="#C4572E"/><rect x="150" y="82" width="7" height="10" fill="#C4572E"/>
<path d="M0 170V138Q8 146 12 126Q16 146 22 132Q26 150 34 138Q40 152 48 142Q54 154 64 146Q70 158 80 152L84 170Z" fill="#2F5D3A"/>
<path d="M30 140Q34 104 26 78" stroke="#1F3D27" stroke-width="4" fill="none"/>
<g fill="#1F3D27"><path d="M26 78Q10 72 2 84Q14 76 26 80Z"/><path d="M26 78Q42 70 52 82Q38 76 26 80Z"/><path d="M26 78Q20 62 8 60Q20 66 25 79Z"/><path d="M26 78Q34 62 46 62Q34 68 27 79Z"/></g>`,
  },
  saguaro: {
    sky: '#F4A259', sun: '#F9D78A', band: '#3E2440', ink: '#3E2440', ac: '#F9D78A',
    art: `<circle cx="60" cy="62" r="24" fill="#F9D78A"/>
<path d="M0 112L24 96L44 104L70 82L96 100L124 88L150 104L176 90L200 100V170H0Z" fill="#B5523B"/>
<path d="M0 132Q50 116 100 128T200 122V170H0Z" fill="#7A3B4F"/>
<path d="M0 150Q60 140 120 148T200 146V170H0Z" fill="#3E2440"/>
${cactus(146, 152, 62, '#2A1830')}${cactus(40, 156, 38, '#2A1830')}`,
  },
  valley: {
    sky: '#F2C6A0', sun: '#F7E2BE', band: '#3F2E4F', ink: '#3F2E4F', ac: '#F2C6A0',
    art: `<circle cx="150" cy="56" r="20" fill="#F7E2BE"/>
<path d="M0 100L30 84L52 94L82 70L110 92L138 80L170 96L200 86V170H0Z" fill="#A86B7A"/>
<path d="M0 118L28 106L58 116L90 100L124 116L158 104L200 116V170H0Z" fill="#6E4E7E"/>
<path d="M0 134Q100 124 200 134V170H0Z" fill="#F4EEE2"/>
<g stroke="#D9CFC0" stroke-width="1.5"><path d="M40 142L70 138M110 146L150 140M20 154L60 150M130 156L176 152"/></g>
<path d="M0 170V150Q30 140 64 152Q40 158 30 170Z" fill="#3F2E4F"/>`,
  },
  arch: {
    sky: '#9CC7DB', sun: '#F6E2B8', band: '#5E2418', ink: '#5E2418', ac: '#F2A65A',
    art: `<circle cx="160" cy="40" r="16" fill="#F6E2B8"/>
<path d="M0 112H30L36 100H70L76 112H120L126 96H170L176 112H200V170H0Z" fill="#D98B5F"/>
<path d="M40 170V98Q40 58 100 58Q160 58 160 98V170H136V106Q136 84 100 84Q64 84 64 106V170Z" fill="#B5462E"/>
<path d="M0 150Q60 138 100 148T200 144V170H0Z" fill="#6B2A1E"/>`,
  },
  rockies: {
    sky: '#F4D6A8', sun: '#FBE9CB', band: '#142133', ink: '#142133', ac: '#E0663F',
    art: `<circle cx="42" cy="44" r="18" fill="#FBE9CB"/>
<path d="M0 120L40 62L62 90L96 38L130 92L152 68L200 116V170H0Z" fill="#4A6290"/>
<g fill="#FFFFFF"><path d="M96 38L109 58L101 54L94 61L86 54Z"/><path d="M40 62L50 76L43 73L37 79L32 74Z"/><path d="M152 68L161 80L155 78L149 82Z"/></g>
<path d="M0 140Q50 118 100 134T200 128V170H0Z" fill="#2E4468"/>
${[12, 30, 48, 150, 168, 186].map((x, i) => pine(x, 170, 30 + (i % 3) * 8, '#142133')).join('')}`,
  },
  ridges: {
    sky: '#F3D7B6', sun: '#F8E9CF', band: '#1F3550', ink: '#1F3550', ac: '#E2603A',
    art: `<circle cx="140" cy="58" r="22" fill="#F8E9CF"/>
<path d="M0 96Q40 74 80 90T160 82T200 88V170H0Z" fill="#A9B8C9"/>
<rect y="100" width="200" height="8" fill="#FFFFFF" opacity=".35"/>
<path d="M0 116Q50 94 100 110T200 104V170H0Z" fill="#7F93AE"/>
<rect y="120" width="200" height="7" fill="#FFFFFF" opacity=".3"/>
<path d="M0 134Q40 116 90 130T200 124V170H0Z" fill="#56708F"/>
<path d="M0 154Q60 136 120 150T200 146V170H0Z" fill="#2E4A66"/>`,
  },
  skyline: {
    sky: '#F2B880', sun: '#F9DDB0', band: '#1E2B45', ink: '#1E2B45', ac: '#3C9D8F',
    art: `<circle cx="70" cy="66" r="26" fill="#F9DDB0"/>
<g fill="#2E4468"><rect x="96" y="84" width="14" height="46"/><rect x="112" y="70" width="12" height="60"/><path d="M126 130V62H130V48H132V36H134V48H136V62H140V130Z"/><rect x="142" y="78" width="14" height="52"/><rect x="158" y="90" width="12" height="40"/><rect x="172" y="74" width="10" height="56"/><rect x="184" y="96" width="16" height="34"/></g>
<rect y="128" width="200" height="42" fill="#1F5E6B"/>
<g stroke="#5FA7A8" stroke-width="2" stroke-linecap="round"><path d="M70 142H110M130 150H180M40 156H80"/></g>
<path d="M14 132H44L40 126H18Z" fill="#1E2B45"/><path d="M27 126V100" stroke="#1E2B45" stroke-width="5"/><path d="M27 100L22 86" stroke="#1E2B45" stroke-width="3" stroke-linecap="round"/><circle cx="27" cy="98" r="4" fill="#1E2B45"/>`,
  },
  volcano: {
    sky: '#F2C79A', sun: '#F9E6C4', band: '#1D2A38', ink: '#1D2A38', ac: '#E3B75A',
    art: `<circle cx="160" cy="40" r="16" fill="#F9E6C4"/>
<path d="M0 132L66 74Q100 38 134 74L200 132V170H0Z" fill="#7E93AD"/>
<path d="M66 74Q100 38 134 74L124 80L114 72L104 84L94 72L84 82L76 76Z" fill="#FFFFFF"/>
<path d="M0 134Q50 116 100 128T200 124V170H0Z" fill="#4F6E5C"/>
<path d="M0 150Q60 140 120 148T200 146V170H0Z" fill="#8DB36B"/>
<g fill="#C8423E"><circle cx="40" cy="158" r="2"/><circle cx="62" cy="162" r="2"/><circle cx="96" cy="156" r="2"/><circle cx="130" cy="161" r="2"/></g>
<g fill="#E3B75A"><circle cx="50" cy="163" r="2"/><circle cx="110" cy="162" r="2"/><circle cx="150" cy="158" r="2"/></g>
${[8, 22, 172, 188].map((x, i) => pine(x, 170, 40 + (i % 2) * 10, '#1F3A2E')).join('')}`,
  },
  mission: {
    sky: '#F3C28B', sun: '#F9E3B8', band: '#3A1F24', ink: '#3A1F24', ac: '#4FC1BC',
    art: `<circle cx="150" cy="52" r="20" fill="#F9E3B8"/>
<path d="M0 104H24L30 94H84L90 104H200V170H0Z" fill="#B86A4E"/>
<path d="M120 104L128 98H170L176 104Z" fill="#B86A4E"/>
<path d="M0 124Q60 114 120 122T200 118V170H0Z" fill="#8E4A3A"/>
<g fill="#D79A6E"><rect x="66" y="104" width="68" height="44"/><rect x="62" y="84" width="18" height="64" rx="3"/><rect x="120" y="84" width="18" height="64" rx="3"/><rect x="82" y="98" width="36" height="8" rx="3"/></g>
<g stroke="#3A1F24" stroke-width="2.5" stroke-linecap="round"><path d="M71 70V82M66 75H76M129 70V82M124 75H134"/></g>
<path d="M92 148V128Q92 118 100 118Q108 118 108 128V148Z" fill="#3A1F24"/>
<g fill="#3A1F24"><rect x="68" y="92" width="6" height="8" rx="3"/><rect x="126" y="92" width="6" height="8" rx="3"/></g>
<path d="M0 148Q70 138 130 146T200 144V170H0Z" fill="#6B3A2E"/>`,
  },
};

export const scene = t => SCENES[t.poster] || SCENES.rockies;
export const art = (t, cls) => {
  const s = scene(t);
  return `<svg class="${cls}" viewBox="0 0 200 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><rect width="200" height="170" fill="${s.sky}"/>${s.art}</svg>`;
};
