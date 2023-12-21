import { DateTime,burmeseDate } from "./buemese-date/burmeseDate.js";
import language from "./database/language.js";
import data from './database/tz.json';
namespace BurmeseDate{
    type trs ={
        text: string;
        lang: number
      }
      export const translate = ({text,lang}: trs) =>{
        let  fstr: string,rstr:string,re:any;
        let fromLn = 1;
        let toLn = lang;
        let l = language.length
        for(let i=0;i<l;i++){
              fstr = language[i][fromLn];  re = new RegExp(fstr, 'g');
              rstr = language[i][toLn]; text = text.replace(re,rstr);
          }
        return text
      
      };
      export function mmdate(date:string,lang:number){
        const y = parseInt(date.split('-')[0]);
        const m = parseInt(date.split('-')[1]);
        const d = parseInt(date.split('-')[2]);
        const jdn = DateTime.w2j(y,m,d);
        const mdt = new burmeseDate(jdn, 6.5);
        const ssy = translate({text : mdt.ToMString('&YYYY'), lang: lang});
        const mmy = translate({text:mdt.ToMString('&yyyy'),lang:lang});
        const mmm = translate({text:mdt.ToMString('&M'),lang:lang});
        const mmd = translate({text:mdt.ToMString('&f'),lang:lang});
        const mwd = translate({text:mdt.ToString('%W '),lang:lang});
        const mp = translate({text:mdt.ToMString('&P'),lang:lang});
        const yyz = translate({text:mdt.yatyaza,lang:lang});
        const ptd = translate({text:mdt.pyathada,lang:lang});
        const dgh = translate({text:mdt.nagahle,lang:lang});
        const sbat = translate({text:mdt.sabbath,lang:lang});
        const mmlen = translate({text:mdt.mmlen.toString(), lang:lang});
        const MY = burmeseDate.j2m(jdn).my;
        const mmyt = ["common","little watat","big watat"][mdt.mf]
        const myt = translate({text:mmyt,lang:lang});
        const h = mdt.holidays;
        let hd1: string;
        if(h.length === 0){
            hd1 = ''
        } else {
            hd1 = h.reduce(function(acc: string, currentValue: string) {
                return translate({text:acc,lang:lang}) + ',' + translate({text:currentValue,lang:lang});
            });
        }
        const h2 = mdt.holidays2;
        let hd2 : string;
        if(h2.length === 0){
            hd2 = ''
        } else {
            hd2 = h2.reduce(function(acc : string, currentValue: string) {
                return translate({text:acc,lang:lang}) + ',' + translate({text:currentValue,lang:lang});
           });
        }
        const myn = translate({text:mdt.my_name,lang: lang});
        const mhb = translate({text:mdt.mahabote,lang: lang});
        const nk = translate({text:mdt.nakhat,lang: lang});
        let ast: string[] = [];
        mdt.astro.forEach((item:string)=>{
            const a: string = translate({text: item, lang: lang});
            ast.push(a);
        });
    
        
        return {ssy, mmy, myn, mmm, mp, mmd, yyz,ptd, dgh, sbat, hd1, hd2, mhb, nk,ast, mwd, MY, mmlen, myt}
    
       
    
    };
    function thingyanTime(my: number) {
        var SY=1577917828/4320000; //solar y (365.2587565)
        var LM=1577917828/53433336; //lunar m (29.53058795)
        var MO=1954168.050623; //beginning of 0 ME
        var SE3=1312; //beginning of 3rd Era
        var ja=SY*my+MO; 
        let jk
        if (my >= SE3){
            jk=ja-2.169918982;
        } else{jk=ja-2.1675;} 
        return {ja:ja,jk:jk,da:Math.round(ja),dk:Math.round(jk)};
    };
    
    function getThingyan (my: number){
        const 
        to = my + 1,
        from = my,
        emName=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        ppp = thingyanTime(to),
        att = burmeseDate.j2w(ppp.ja),
        atatTime = att.y + '-' + emName[att.m-1] + '-' + att.d + ' ' + att.h + ':' + att.n + ':' + Math.floor(att.s),
        akt = burmeseDate.j2w(ppp.jk),
        akyaTime = `${akt.y}-${emName[akt.m-1]}-${akt.d} ${akt.h}:${akt.n}:${Math.floor(akt.s)}`,
        akd = burmeseDate.j2w(ppp.dk),
        akyod = burmeseDate.j2w(ppp.dk - 1),
        akyoDay = `${akyod.y}-${emName[akyod.m-1]}-${akyod.d}`,
        akyaDay = `${akd.y}-${emName[akd.m-1]}-${akd.d}`,
        akyatd = burmeseDate.j2w(ppp.dk +1),
        akyatDay = `${akyatd.y}-${emName[akyatd.m-1]}-${akyatd.d}`,
        atd = burmeseDate.j2w(ppp.da),
        atatDay = `${atd.y}-${emName[atd.m-1]}-${atd.d}`,
        nyd = burmeseDate.j2w(ppp.da + 1),
        nyDay = `${nyd.y}-${emName[nyd.m-1]}-${nyd.d}`;
        let sakd : string;
        if(ppp.da-ppp.dk>2){
            const sakdd = burmeseDate.j2w(ppp.da -1);
            sakd = `${sakdd.y}-${emName[sakdd.m-1]}-${sakdd.d}`;
        }else{
            sakd = ''
        }
    
        return {from, to, atatTime, akyaTime, akyoDay, akyaDay, akyatDay, sakd, atatDay, nyDay}
    };
    const dayOfYear = (date: any)=> {
        return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    };
    export function worldTime(timeZoneName : string){
        const continent= timeZoneName.split('/')[0];
        const dataTofind: any = data.find(item => item.group.includes(timeZoneName) && item.name === timeZoneName);//
        const rawOffset = - (dataTofind.rawOffsetInMinutes); // Time zone offset in minutes
        const rawOffsetInMinutes = dataTofind.rawOffsetInMinutes;
        const rawOffsetInSeconds = - (rawOffset * 60 * 1000);// raw offset in seconds
        const timestampInUtc = Date.now(); // Get the current timestamp in UTC
        const timestampLocal = timestampInUtc - rawOffset * 60 * 1000; // Adjust the timestamp with the offset
        const localDateTime = new Date(timestampLocal);// ******
        const dayNumberOfYear = dayOfYear(localDateTime); // day number of year
        const weekOfYear = Math.round(dayNumberOfYear/7); // week of year
        const utcOffsetString = dataTofind.rawFormat.split(' ')[0];// utc offset string
        const localDateTimeString = localDateTime.toUTCString().split(' ').slice(0,-1).join(' ') + ' ' + dataTofind.alternativeName;//
        const utcDateTimeString = new Date(timestampInUtc).toUTCString();
        const timeZonesByContinent = data.filter(obj => obj.name.split('/')[0] === continent).map(obj => obj.name);
        return {
            rawOffsetInMinutes,
            rawOffsetInSeconds,
            timestampInUtc,
            timestampLocal,
            localDateTime,
            dayNumberOfYear,
            weekOfYear,
            utcOffsetString,
            localDateTimeString,
            utcDateTimeString,
            timeZonesByContinent
        }
    
    };    
    
      
}

export default BurmeseDate;