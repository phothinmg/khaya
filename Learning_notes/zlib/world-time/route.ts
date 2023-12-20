import { NextResponse } from 'next/server.js';
import type { NextRequest } from 'next/server';
export const runtime = 'edge';
import data from '../../app/data/raw-time-zones.json';
const dayOfYear = (date: Date): number => {
    return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
};
export function GET(request: NextRequest){
    const header = request.headers;
    const tzstr = header.get('x-vercel-ip-timezone');
    const cip = header.get('x-real-ip');
    let tz : string;
    if(tzstr !== null){tz = tzstr}else{throw new Error(' Error : Can not get Timezone info');}
    const tzdata = data.find(item => item.name === tz);
    const resp = {
        client_ip : cip,
        timezone : tzstr,
        timezone_name: tzdata?.alternativeName,
        timezone_group: tzdata?.group,
        utc_offset: tzdata?.rawFormat.split(' ')[0],
        raw_offset: tzdata?.rawOffsetInMinutes,
        day_of_year: dayOfYear(new Date()),
        week_of_year: Math.round(dayOfYear(new Date())/7),
        date_time: new Date().toLocaleString('en-US'),
    }
    return NextResponse.json(resp,
        {
          status: 200,
        },
    );

}
