
import data from '../api/data/raw-time-zones.json';


const dayOfYear = (date)=> {
    return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
};

export function worldData(){
   const a = new Date();
   const dofy = dayOfYear(a);
   const wofy = Math.round(dofy/7);
   const utcos = -(a.getTimezoneOffset());
   const wtdata = data.find(item => item.rawOffsetInMinutes === utcos);
   const tzstr = wtdata?.name;
   const lcdt = a.toUTCString();
    return {dofy, wofy, utcos, tzstr, lcdt}
}


