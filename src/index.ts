import { DateTime,burmeseDate } from "./buemese-date/burmeseDate.js";
import language from "./buemese-date/language.js";

    type trs ={
        text: string;
        lang: number
      }
    const translate = ({text,lang}: trs) =>{
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

      export function GetBurmeseDate(date:string,lang:number){
        const y = parseInt(date.split('-')[0]);
        const m = parseInt(date.split('-')[1]);
        const d = parseInt(date.split('-')[2]);
        const julianDayNumber = DateTime.w2j(y,m,d);
        const mdt = new burmeseDate(julianDayNumber, 6.5);
        const sasanaYear = translate({text : mdt.ToMString('&YYYY'), lang: lang});
        const burmeseYear = translate({text:mdt.ToMString('&yyyy'),lang:lang});
        const burmeseMonth = translate({text:mdt.ToMString('&M'),lang:lang});
        const burmeseDay = translate({text:mdt.ToMString('&f'),lang:lang});
        const burmeseWeekDay = translate({text:mdt.ToString('%W '),lang:lang});
        const lunarPhase = translate({text:mdt.ToMString('&P'),lang:lang});
        const yatyarzar = translate({text:mdt.yatyaza,lang:lang});
        const pyatthadar = translate({text:mdt.pyathada,lang:lang});
        const dragonHead = translate({text:mdt.nagahle,lang:lang});
        const sabbath = translate({text:mdt.sabbath,lang:lang});
        const lengthOfBurmeseMonth = translate({text:mdt.mmlen.toString(), lang:lang});
        const BURMESE_YEAR_IN_NUMBER = burmeseDate.j2m(julianDayNumber).my;
        const mmyt = ["common","little watat","big watat"][mdt.myt];
        const warHtutType = translate({text:mmyt,lang:lang});
        const h = mdt.holidays;
        let publicHolidays: string;
        if(h.length === 0){
          publicHolidays = ''
        } else {
          publicHolidays = h.reduce(function(acc: string, currentValue: string) {
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
        const nameOfBurmeseYear = translate({text:mdt.my_name,lang: lang});
        const maharbote = translate({text:mdt.mahabote,lang: lang});
        const nakhat = translate({text:mdt.nakhat,lang: lang});
        let astroDays: string[] = [];
        mdt.astro.forEach((item:string)=>{
            const a: string = translate({text: item, lang: lang});
            astroDays.push(a);
        });
    
        
        return {
          julianDayNumber, astroDays, publicHolidays, sasanaYear, burmeseYear,
          burmeseMonth, burmeseDay, burmeseWeekDay, lunarPhase, yatyarzar,
          pyatthadar, dragonHead, sabbath, lengthOfBurmeseMonth, BURMESE_YEAR_IN_NUMBER,
          warHtutType, nameOfBurmeseYear, maharbote, nakhat 
        }
    
       
    
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
    
    export function MaharThingyan (my: number){
        const 
        YearTo = my + 1,
        YearFrom = my,
        emName=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        ppp = thingyanTime(YearTo),
        att = burmeseDate.j2w(ppp.ja),
        AtatTime = att.y + '-' + emName[att.m-1] + '-' + att.d + ' ' + att.h + ':' + att.n + ':' + Math.floor(att.s),
        akt = burmeseDate.j2w(ppp.jk),
        AkyaTime = `${akt.y}-${emName[akt.m-1]}-${akt.d} ${akt.h}:${akt.n}:${Math.floor(akt.s)}`,
        akd = burmeseDate.j2w(ppp.dk),
        akyod = burmeseDate.j2w(ppp.dk - 1),
        AkyoDay = `${akyod.y}-${emName[akyod.m-1]}-${akyod.d}`,
        AkyaDay = `${akd.y}-${emName[akd.m-1]}-${akd.d}`,
        akyatd = burmeseDate.j2w(ppp.dk +1),
        AkyatDay = `${akyatd.y}-${emName[akyatd.m-1]}-${akyatd.d}`,
        atd = burmeseDate.j2w(ppp.da),
        AtatDay = `${atd.y}-${emName[atd.m-1]}-${atd.d}`,
        nyd = burmeseDate.j2w(ppp.da + 1),
        NewYearDay = `${nyd.y}-${emName[nyd.m-1]}-${nyd.d}`;
        let AkyatDay2 : string;
        if(ppp.da-ppp.dk>2){
            const sakdd = burmeseDate.j2w(ppp.da -1);
            AkyatDay2 = `${sakdd.y}-${emName[sakdd.m-1]}-${sakdd.d}`;
        }else{
            AkyatDay2 = ''
        }
        return {
          YearTo,
          YearFrom,
          AtatTime,
          AkyaTime,
          AkyoDay,
          AkyaDay,
          AkyatDay,
          AkyatDay2,
          AtatDay,
          NewYearDay
        }
    };
    