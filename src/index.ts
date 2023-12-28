import { data } from "./worldtime/tz.js";
import { DateTime,burmeseDate } from "./burmese/burmeseDate.js";
import language from "./burmese/language.js";
import { getTimeZones, rawTimeZones, timeZonesNames} from "@vvo/tzdb";

namespace Khaya {

  function time2D(hour: number,minutes: number,seconds: number){
      return ((hour-12)/24+minutes/1440+seconds/86400);
 };

  export function G2J (year: number,month: number,date : number,hour=12,minutes=0,seconds=0,ct=0,SG=2361222){
      var
         z = time2D(hour, minutes, seconds),
         a=Math.floor((14-month)/12);
         year=year+4800-a; month=month+(12*a)-3;
      var jd =date+Math.floor((153*month+2)/5)+(365*year)+Math.floor(year/4);
      if(ct === 1){
          jd=jd-Math.floor(year/100)+Math.floor(year/400)-32045;
      } else if (ct === 2){
          jd=jd-32083;
      } else {
          jd=jd-Math.floor(year/100)+Math.floor(year/400)-32045;
          if(jd<SG) {
              jd=date+Math.floor((153*month+2)/5)+(365*year)+Math.floor(year/4)-32083;
              if(jd>SG) jd=SG;
          }
      }

      return jd+z
  };
  export function lengthOfMonth(year: number, month: number, ct=0,SG=2361222){
      var month2 = month+1;
      var year2 = year;
      if(month2>12){
          year2++; 
          month2%=12;
      }
      var j1= G2J(year,month,1,12,0,0,ct,SG);
    var j2= G2J(year2,month2,1,12,0,0,ct,SG);
      return (j2-j1)

  };
  // Julian to Gregorian by julianDayNumber
  export function J2G(jd: number,ct=0, tz=0, SG=2361222){
      let 
      j : number,
      jf : number,
      month: number,
      date: number,
      year: number,
      hour: number,
      minutes: number,
      seconds: number;
      if (ct==2 || (ct==0 && (jd<SG))){
          j = Math.floor(jd+0.5); 
          jf = jd+0.5-j; 
          var 
          b=j+1524,
          c=Math.floor((b-122.1)/365.25),
          f=Math.floor(365.25*c),
          e=Math.floor((b-f)/30.6001);
          month =(e>13)?(e-13):(e-1);
          date =b-f-Math.floor(30.6001*e);
          year = month<3?(c-4715):(c-4716);
      }
      else {
          j=Math.floor(jd+0.5); 
          jf=jd+0.5-j; 
          j-=1721119;
          year = Math.floor((4*j-1)/146097);
          j=4*j-1-146097*year;
          date=Math.floor(j/4);
          j=Math.floor((4*date+3)/1461);
          date=4*date+3-1461*j;
          date=Math.floor((date+4)/4); 
          month=Math.floor((5*date-3)/153); 
          date=5*date-3-153*month;
          date=Math.floor((date+5)/5); 
          year=100*year+j;
          if(month<10){
              month+=3;
          }
          else {
              month-=9; 
              year=year+1;
          }
      }
      // Get hour minutes seconds 
      jf*=24;
      hour=Math.floor(jf); 
      jf=(jf-hour)*60; 
      minutes= Math.floor(jf); 
      seconds = (jf-minutes)*60;
      // Week day string and Month in string
      var MONTH = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      var WEEK = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
      jd+=tz/24.0;
      var jdd = Math.floor(jd+0.5);
      var wd = (jdd+2)%7;
      var wdstr = WEEK[wd];
      var mostr = MONTH[month-1];// -1 for array
      // length of mont
      var lom = lengthOfMonth(year,month);

      return({
          year: year,
          month: month,
          date: date,
          hour: hour,
          minutes: minutes,
          seconds: seconds,
          weekday_num: wd,
          weekday_str: wdstr,
          month_str: mostr,
          length_of_month: lom,
      })

  };
    const dayOfYear = (date: any)=> {
      return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    };
    export function WorldTime(timeZoneName : string){
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
    
    // TO DO - time different between time zones and DST

   
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
    // ===================================
   export  function DivisibleBy(a:number, b: number){
        return ((a%b) == 0);
    };

    export function IsLeapYear(year : number){
        var itIsLeapYear;
      
        if(DivisibleBy(year, 4)){
          if(DivisibleBy(year, 100)){
            if(DivisibleBy(year, 400)){
              itIsLeapYear = true;
            }else{
              itIsLeapYear = false;
            }
          }else{
            itIsLeapYear = true;
          }
        }else{
          itIsLeapYear = false;
        }
      
        return itIsLeapYear;
    };
   export function DaysInYears(years : number){
        var days;
        var i;
        var nrOfDays;
      
        days = 0;
        for(i = 1752; i < years; i = i + 1){
          if(IsLeapYear(i)){
            nrOfDays = 366;
          }else{
            nrOfDays = 365;
          }
          days = days + nrOfDays;
        }
      
        return days;
    };
    export function GetDaysInMonth(year : number){
        var daysInMonth;
      
        daysInMonth = [];
        daysInMonth.length = 1 + 12;
      
        daysInMonth[0] = 0;
        daysInMonth[1] = 31;
      
        if(IsLeapYear(year)){
          daysInMonth[2] = 29;
        }else{
          daysInMonth[2] = 28;
        }
        daysInMonth[3] = 31;
        daysInMonth[4] = 30;
        daysInMonth[5] = 31;
        daysInMonth[6] = 30;
        daysInMonth[7] = 31;
        daysInMonth[8] = 31;
        daysInMonth[9] = 30;
        daysInMonth[10] = 31;
        daysInMonth[11] = 30;
        daysInMonth[12] = 31;
      
        return daysInMonth;
    };

    export function DaysInMonths(month: number, year: number){
        var daysInMonth;
        var days;
        var i;
      
        daysInMonth = GetDaysInMonth(year);
      
        days = 0;
        for(i = 1; i < month; i = i + 1){
          days = days + daysInMonth[i];
        }
      
        return days;
    };
    export const GetDay = (year:number,month:number,date:number)=>{
        var days;
        
          /* Day 1752-01-01 */
          days =  -79623;
        
          days = days + DaysInYears(year);
          days = days + DaysInMonths(month, year);
          days = days + date - 1;
        
          return days;
    };

    export function DaysBetweenDates(dateFrom: string, dateTo: string){
        const y1 = parseInt(dateFrom.split('-')[0]);
        const m1= parseInt(dateFrom.split('-')[1]);
        const d1 = parseInt(dateFrom.split('-')[2]);
        const y2 = parseInt(dateTo.split('-')[0]);
        const m2= parseInt(dateTo.split('-')[1]);
        const d2 = parseInt(dateTo.split('-')[2]);
        var daysA, daysB, daysBetween;
      
        daysA = GetDay(y1,m1,d1);
        daysB = GetDay(y2,m2,d2);
      
        daysBetween = daysB - daysA;
      
        return daysBetween;
    };
  


  
};

export default Khaya;
export {
    burmeseDate,
    DateTime,
    getTimeZones,
    rawTimeZones, 
    timeZonesNames
    
}