import { data } from "./worldtime/tz.js";


namespace Khaya {

  let mSG : number = 2361222;
  let mct : number = 0;
  let mtz : number ;
  let mjd : number ;

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

    // Starting Burmese Calendar Calculation

    
  
  


  
};

export default Khaya;