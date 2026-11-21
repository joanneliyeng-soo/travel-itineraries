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
  painted: {
    sky: '#F4D3A6', sun: '#FBEBCD', band: '#4A2430', ink: '#4A2430', ac: '#E8A0A8',
    art: `<circle cx="150" cy="46" r="20" fill="#FBEBCD"/>
<path d="M0 104L18 96H52L60 88H104L112 98H150L158 90H200V170H0Z" fill="#C9857A"/>
<path d="M0 112L18 106H52L60 100H104L112 108H150L158 102H200V118H0Z" fill="#E9C9B0"/>
<path d="M0 118H200V126H0Z" fill="#9B6B8E"/>
<path d="M0 126H200V132H0Z" fill="#E7B4A0"/>
<path d="M0 132Q60 126 110 132T200 130V170H0Z" fill="#B0626A"/>
<path d="M0 150Q70 142 130 150T200 148V170H0Z" fill="#7A3E4A"/>
<g transform="rotate(-6 70 154)"><rect x="34" y="148" width="74" height="12" rx="6" fill="#D99A5B"/><g stroke="#8E5A2E" stroke-width="1.5"><path d="M50 148V160M66 148V160M84 148V160"/></g><ellipse cx="108" cy="154" rx="4" ry="6" fill="#B8733A"/></g>`,
  },
  hoodoo: {
    sky: '#F6C98B', sun: '#FBE9C6', band: '#4A2418', ink: '#4A2418', ac: '#F2A65A',
    art: `<circle cx="40" cy="40" r="18" fill="#FBE9C6"/>
<path d="M0 96H40L48 88H120L126 94H200V170H0Z" fill="#E9A36C"/>
<g fill="#D9683A"><path d="M17 140V96Q17 88 24 88Q31 88 31 96V140Z"/><path d="M36 140V82Q36 74 44 74Q52 74 52 82V140Z"/><path d="M58 140V102Q58 94 64 94Q70 94 70 102V140Z"/><path d="M75 140V76Q75 68 84 68Q93 68 93 76V140Z"/><path d="M97 140V94Q97 86 104 86Q111 86 111 94V140Z"/><path d="M115 140V68Q115 60 124 60Q133 60 133 68V140Z"/><path d="M137 140V90Q137 82 144 82Q151 82 151 90V140Z"/><path d="M156 140V78Q156 70 164 70Q172 70 172 78V140Z"/><path d="M177 140V98Q177 90 184 90Q191 90 191 98V140Z"/></g>
<g fill="#F3DCC0"><ellipse cx="24" cy="90" rx="10" ry="4"/><ellipse cx="44" cy="76" rx="11" ry="4"/><ellipse cx="84" cy="70" rx="12" ry="4"/><ellipse cx="124" cy="62" rx="12" ry="4"/><ellipse cx="164" cy="72" rx="11" ry="4"/></g>
<path d="M0 136Q60 128 110 136T200 134V170H0Z" fill="#B24A2A"/>
<path d="M0 154Q70 146 130 154T200 152V170H0Z" fill="#6E2E1E"/>
<g fill="#2F4A2E">${[10, 30, 176, 192].map((x, i) => pine(x, 170, 22 + (i % 2) * 6, '#2F4A2E')).join('')}</g>`,
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
  geyser: {
    sky: '#F1C9A5', sun: '#F8E4C8', band: '#23324A', ink: '#23324A', ac: '#7FB8C9',
    art: `<circle cx="158" cy="42" r="16" fill="#F8E4C8"/>
<path d="M0 104L30 90L60 98L96 84L130 96L164 86L200 96V170H0Z" fill="#6F7FA0"/>
<path d="M94 128Q90 96 98 70Q92 56 100 44Q108 56 102 70Q110 96 106 128Z" fill="#FFFFFF" opacity=".95"/>
<g fill="#FFFFFF" opacity=".75"><circle cx="90" cy="48" r="10"/><circle cx="110" cy="40" r="12"/><circle cx="100" cy="30" r="9"/><circle cx="118" cy="54" r="7"/></g>
<path d="M0 130Q50 120 100 126T200 124V170H0Z" fill="#D7C6A8"/>
<ellipse cx="100" cy="132" rx="38" ry="6" fill="#E9DFC9"/>
<ellipse cx="150" cy="146" rx="26" ry="5" fill="#4FA3B8"/><ellipse cx="150" cy="146" rx="14" ry="2.5" fill="#E9B84A"/>
<path d="M0 154Q60 144 120 152T200 150V170H0Z" fill="#3E4E3A"/>
<path d="M30 150Q30 140 40 140H50Q58 140 58 148V152H54V147H36V152H30Z" fill="#3A2A22"/><path d="M28 146Q24 140 30 138" stroke="#3A2A22" stroke-width="3" fill="none"/>
${[8, 22, 176, 190].map((x, i) => pine(x, 170, 34 + (i % 2) * 10, '#23324A')).join('')}`,
  },
  teton: {
    sky: '#F5CDA7', sun: '#FBE7CC', band: '#2C2340', ink: '#2C2340', ac: '#E98A5C',
    art: `<circle cx="40" cy="40" r="16" fill="#FBE7CC"/>
<path d="M0 118L36 86L58 96L80 60L96 74L110 30L124 64L140 52L162 88L200 104V170H0Z" fill="#6C6488"/>
<g fill="#FFFFFF"><path d="M110 30L118 52L111 47L104 56L102 48Z"/><path d="M80 60L87 72L81 70L76 75Z"/><path d="M140 52L148 66L141 63L136 68Z"/></g>
<rect y="116" width="200" height="22" fill="#5E8FB0"/>
<path d="M0 116L36 128L58 122L80 134L110 140L140 134L162 126L200 120V138H0Z" fill="#7FA9C4" opacity=".55"/>
<g stroke="#BFD8E6" stroke-width="2" stroke-linecap="round"><path d="M30 124H60M120 130H160"/></g>
<path d="M0 140Q60 132 120 140T200 138V170H0Z" fill="#3E5A3C"/>
${[10, 26, 42, 160, 176, 192].map((x, i) => pine(x, 170, 34 + (i % 3) * 8, '#2C2340')).join('')}`,
  },
  canyon: {
    sky: '#EFB98C', sun: '#F8DDB4', band: '#2E1C2B', ink: '#2E1C2B', ac: '#E07A4F',
    art: `<circle cx="150" cy="44" r="18" fill="#F8DDB4"/>
<path d="M0 92H200V170H0Z" fill="#8A5A6E"/>
<path d="M0 92H70L78 112L84 170H0Z" fill="#5A3A52"/><path d="M200 92H124L118 116L112 170H200Z" fill="#4A2E44"/>
<g stroke="#C9A3B4" stroke-width="2" fill="none" opacity=".7"><path d="M10 120L40 110L60 124"/><path d="M190 128L160 118L140 134"/><path d="M128 102L136 150"/></g>
<path d="M84 170L90 140Q98 130 104 140L112 170Z" fill="#2F6E86"/>
<path d="M0 92H70L66 86H8Z" fill="#B78A6E"/><path d="M124 92H200V86H130Z" fill="#B78A6E"/>
<g fill="#2E1C2B"><path d="M14 86Q16 74 22 86Z"/><path d="M28 86Q31 70 36 86Z"/><path d="M168 86Q171 72 176 86Z"/><path d="M184 86Q186 76 190 86Z"/></g>`,
  },
  tundra: {
    sky: '#CFE0E6', sun: '#F7EFD8', band: '#1E3040', ink: '#1E3040', ac: '#E2A63A',
    art: `<circle cx="150" cy="40" r="16" fill="#F7EFD8"/>
<path d="M0 100L34 70L60 84L92 50L120 78L150 62L200 96V170H0Z" fill="#7C8FA6"/>
<g fill="#FFFFFF"><path d="M92 50L104 66L97 63L90 70L84 64Z"/><path d="M34 70L42 80L36 78L31 82Z"/><path d="M150 62L158 72L152 70L147 74Z"/></g>
<path d="M0 118Q50 100 100 112T200 106V170H0Z" fill="#A9A15E"/>
<path d="M0 136Q60 120 120 132T200 128V170H0Z" fill="#6E7A44"/>
<path d="M0 132Q40 140 70 136Q110 130 150 140Q180 146 200 142" stroke="#3A3A3A" stroke-width="5" fill="none" opacity=".55"/>
<g fill="#5A3A26"><path d="M128 152Q128 144 138 144H150Q156 144 156 150V154H153V150H134V154H128Z"/><path d="M152 144L156 134M156 134L152 128M156 134L162 130" stroke="#5A3A26" stroke-width="2" fill="none"/><path d="M150 144L148 134M148 134L144 128M148 134L152 128" stroke="#5A3A26" stroke-width="2" fill="none"/></g>
${[8, 22, 40, 178, 192].map((x, i) => pine(x, 170, 28 + (i % 3) * 8, '#1E3040')).join('')}`,
  },
  lava: {
    sky: '#F3B07E', sun: '#FBDDB0', band: '#26181F', ink: '#26181F', ac: '#F06C3C',
    art: `<circle cx="44" cy="44" r="18" fill="#FBDDB0"/>
<path d="M0 104Q60 60 100 64Q140 60 200 100V170H0Z" fill="#5C4A58"/>
<path d="M90 64Q100 58 112 64" stroke="#F06C3C" stroke-width="4" fill="none"/>
<g fill="#E9D8D2" opacity=".75"><circle cx="102" cy="52" r="8"/><circle cx="114" cy="42" r="10"/><circle cx="128" cy="34" r="7"/></g>
<path d="M104 66Q110 90 96 110Q86 126 98 146L108 146Q96 126 106 112Q120 92 112 66Z" fill="#F06C3C"/>
<path d="M104 70Q108 90 100 106" stroke="#FFC46B" stroke-width="2" fill="none"/>
<rect y="132" width="200" height="38" fill="#2B6F8A"/>
<g stroke="#7FC0CF" stroke-width="2" stroke-linecap="round"><path d="M130 146H170M20 152H60M90 160H130"/></g>
<path d="M96 146Q100 136 108 146Z" fill="#FFFFFF" opacity=".8"/>
<path d="M150 170V160Q162 154 178 156Q190 158 200 150V170Z" fill="#26181F"/>
<path d="M176 156Q178 120 168 94" stroke="#26181F" stroke-width="4" fill="none"/>
<g fill="#26181F"><path d="M168 94Q152 88 144 100Q156 92 168 96Z"/><path d="M168 94Q184 86 194 98Q180 92 168 96Z"/><path d="M168 94Q162 78 150 76Q162 82 167 95Z"/><path d="M168 94Q176 78 188 78Q176 84 169 95Z"/></g>`,
  },
  lakeshore: {
    sky: '#F4C79E', sun: '#FBE6C6', band: '#20203A', ink: '#20203A', ac: '#7FC4E8',
    art: `<circle cx="150" cy="50" r="18" fill="#FBE6C6"/>
<g fill="#4A4F78"><rect x="10" y="84" width="10" height="26"/><rect x="22" y="70" width="9" height="40"/><path d="M33 110V58H36V48H40V58H43V110Z"/><rect x="45" y="76" width="10" height="34"/><rect x="57" y="66" width="8" height="44"/><rect x="67" y="88" width="10" height="22"/></g>
<rect y="108" width="200" height="30" fill="#3D86B0"/>
<g stroke="#9FD0EA" stroke-width="2" stroke-linecap="round"><path d="M20 118H60M100 124H150M60 130H96"/></g>
<path d="M0 140Q30 122 70 132Q110 118 150 130Q180 124 200 130V170H0Z" fill="#EBD6AE"/>
<path d="M0 156Q60 140 120 152T200 148V170H0Z" fill="#D6B47E"/>
<g stroke="#5E7A3A" stroke-width="2" stroke-linecap="round"><path d="M150 140L146 128M150 140L152 126M150 140L156 130M30 150L26 140M30 150L33 138M170 152L168 142M170 152L174 143"/></g>`,
  },
  fort: {
    sky: '#F6B99A', sun: '#FCE3C4', band: '#1A2A4A', ink: '#1A2A4A', ac: '#7FD1B9',
    art: `<circle cx="60" cy="56" r="20" fill="#FCE3C4"/>
<rect y="104" width="200" height="66" fill="#2E7FA0"/>
<g stroke="#8FD0DE" stroke-width="2" stroke-linecap="round"><path d="M10 116H40M150 120H190"/></g>
<path d="M146 104H186L182 98H152Z" fill="#1A2A4A"/><rect x="156" y="92" width="22" height="6" fill="#F4EEE2"/><rect x="164" y="86" width="5" height="6" fill="#C4572E"/>
<path d="M30 150L52 112H148L170 150Z" fill="#D9C7A4"/>
<path d="M52 112L44 104H68L62 112ZM138 112L132 104H156L148 112Z" fill="#C8B38C"/>
<rect x="56" y="100" width="88" height="14" fill="#E6D6B4"/>
<g fill="#C8B38C"><rect x="58" y="94" width="8" height="6"/><rect x="74" y="94" width="8" height="6"/><rect x="90" y="94" width="8" height="6"/><rect x="106" y="94" width="8" height="6"/><rect x="122" y="94" width="8" height="6"/><rect x="134" y="94" width="8" height="6"/></g>
<path d="M96 100V80" stroke="#1A2A4A" stroke-width="2"/><path d="M96 80H110L106 85L110 90H96Z" fill="#F0705A"/>
<path d="M0 170V150Q60 140 120 150T200 146V170Z" fill="#6E8F5A"/>
<path d="M18 152Q22 118 14 96" stroke="#1A2A4A" stroke-width="4" fill="none"/>
<g fill="#1A2A4A"><path d="M14 96Q0 90 -6 102Q4 94 14 98Z"/><path d="M14 96Q28 88 38 100Q26 94 14 98Z"/><path d="M14 96Q10 80 0 78Q10 84 13 97Z"/><path d="M14 96Q20 80 32 80Q22 86 15 97Z"/></g>`,
  }
};

export const scene = t => SCENES[t.poster] || SCENES.rockies;
export const art = (t, cls) => {
  const s = scene(t);
  return `<svg class="${cls}" viewBox="0 0 200 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><rect width="200" height="170" fill="${s.sky}"/>${s.art}</svg>`;
};
