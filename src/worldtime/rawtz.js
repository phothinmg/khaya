import { getTimeZones, rawTimeZones, timeZonesNames, abbreviations } from "@vvo/tzdb";
import fs from 'fs';

const rt = rawTimeZones;
const raw = JSON.stringify(rt, null, 2);
const da = `

export const data = ${raw}

`
fs.writeFileSync('./src/worldtime/tz.ts', da);