// import { NextResponse } from 'next/server.js';
// import type { NextRequest } from 'next/server';
// import mmdate from '../lib/mmd';
// import getThingyan from '../lib/thingyin';
// export const runtime = 'edge';

// export function GET(request: NextRequest){
//     const q = request.nextUrl.search;
//     const qs = new URLSearchParams(q);
//     const datev  = qs.get('date');
//     const langv : number = 1;
//     const dat = datev !== null ? datev : '';
//     const mmd = mmdate({
//         dat:dat,
//         lan: langv

//     });
//     const tg = getThingyan(mmd.MY);
//     const resp = {
//         mahar_thingyan :{
//             from : tg.from,
//             to: tg.to,
//             akya_time: tg.akyaTime,
//             atat_time: tg.atatTime,
//             akyo_day: tg.akyoDay,
//             akya_day: tg.akyaDay,
//             akyat_day: tg.akyatDay,
//             akyat_day_2: tg.sakd,
//             newyear_day: tg.nyDay
//         }
//     };
//     return NextResponse.json(resp,
//         {
//           status: 200,
//         },
//     );

// }