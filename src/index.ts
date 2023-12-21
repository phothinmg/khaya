import { DateTime,burmeseDate } from "./buemese-date/burmeseDate.js";
import data from './database/tz.js';
namespace BurmeseDate{
    type trs ={
        text: string;
        lang: number
      }
      export const translate = ({text,lang}: trs) =>{
        const language  = [
            [
                " ",
                "Myanmar Year",
                "မြန်မာနှစ်"
              ],
              [
                " ",
                "Good Friday",
                "သောကြာနေ့ကြီး"
              ],
              [
                " ",
                "New Year's",
                "နှစ်ဆန်း"
              ],
              [
                " ",
                "Independence",
                "လွတ်လပ်ရေး"
              ],
              [
                " ",
                "Union",
                "ပြည်ထောင်စု"
              ],
              [
                " ",
                "Peasants'",
                "တောင်သူလယ်သမား"
              ],
              [
                " ",
                "Resistance",
                "တော်လှန်ရေး"
              ],
              [
                " ",
                "Labour",
                "အလုပ်သမား"
              ],
              [
                " ",
                "Martyrs'",
                "အာဇာနည်"
              ],
              [
                " ",
                "Christmas",
                "ခရစ္စမတ်"
              ],
              [
                " ",
                "Buddha",
                "ဗုဒ္ဓ"
              ],
              [
                " ",
                "Start of Buddhist Lent",
                "ဓမ္မစကြာနေ့"
              ],
              [
                " ",
                "End of Buddhist Lent",
                "မီးထွန်းပွဲ"
              ],
              [
                " ",
                "Tazaungdaing",
                "တန်ဆောင်တိုင်"
              ],
              [
                " ",
                "National",
                "အမျိုးသား"
              ],
              [
                " ",
                "Karen",
                "ကရင်"
              ],
              [
                " ",
                "Pwe",
                "ပွဲ"
              ],
              [
                " ",
                "Thingyan",
                "သင်္ကြန်"
              ],
              [
                " ",
                "Akyo",
                "အကြို"
              ],
              [
                " ",
                "Akyat",
                "အကြတ်"
              ],
              [
                " ",
                "Akya",
                "အကျ"
              ],
              [
                " ",
                "Atat",
                "အတက်"
              ],
              [
                " ",
                "Amyeittasote"
              ],
              [
                " ",
                "Warameittugyi",
                "ဝါရမိတ္တုကြီး"
              ],
              [
                " ",
                "Warameittunge",
                "ဝါရမိတ္တုငယ်"
              ],
              [
                " ",
                "Thamaphyu",
                "သမားဖြူ"
              ],
              [
                " ",
                "Thamanyo",
                "သမားညို"
              ],
              [
                " ",
                "Yatpote",
                "ရက်ပုပ်"
              ],
              [
                " ",
                "Yatyotema",
                "ရက်ယုတ်မာ"
              ],
              [
                " ",
                "Mahayatkyan",
                "မဟာရက်ကြမ်း"
              ],
              [
                " ",
                "Nagapor",
                "နဂါးပေါ်"
              ],
              [
                " ",
                "Shanyat",
                "ရှမ်းရက်"
              ],
              [
                " ",
                "Mooon",
                "မွန်"
              ],
              [
                " ",
                "G. Aung San BD",
                "ဗိုလ်ချုပ်မွေးနေ့"
              ],
              [
                " ",
                "Valentines",
                "ချစ်သူများ"
              ],
              [
                " ",
                "Earth",
                "ကမ္ဘာမြေ"
              ],
              [
                " ",
                "April Fools'",
                "ဧပြီအရူး"
              ],
              [
                " ",
                "Red Cross",
                "ကြက်ခြေနီ"
              ],
              [
                " ",
                "United Nations",
                "ကုလသမ္မဂ္ဂ"
              ],
              [
                " ",
                "Halloween",
                "သရဲနေ့"
              ],
              [
                " ",
                "Shan",
                "ရှမ်း"
              ],
              [
                " ",
                "Mothers'",
                "အမေများ"
              ],
              [
                " ",
                "Fathers'",
                "အဖေများ"
              ],
              [
                " ",
                "Sasana Year",
                "သာသနာနှစ်"
              ],
              [
                " ",
                "Eid",
                "အိဒ်"
              ],
              [
                " ",
                "Diwali",
                "ဒီဝါလီ"
              ],
              [
                " ",
                "Mahathamaya"
              ],
              [
                " ",
                "Garudhamma"
              ],
              [
                " ",
                "Metta",
                "မေတ္တာ"
              ],
              [
                " ",
                "Taungpyone",
                "တောင်ပြုန်း"
              ],
              [
                " ",
                "Yadanagu",
                "ရတနာ့ဂူ"
              ],
              [
                " ",
                "Authors'",
                "စာဆိုတော်"
              ],
              [
                " ",
                "World",
                "ကမ္ဘာ့"
              ],
              [
                " ",
                "Teachers'",
                "ဆရာများ"
              ],
              [
                " ",
                "Holiday",
                "ရုံးပိတ်ရက်"
              ],
              [
                " ",
                "Chinese",
                "တရုတ်"
              ],
              [
                " ",
                "Easter",
                "ထမြောက်ရာနေ့"
              ],
              [
                " ",
                "0",
                "၀"
              ],
              [
                " ",
                "1",
                "၁"
              ],
              [
                " ",
                "2",
                "၂"
              ],
              [
                " ",
                "3",
                "၃"
              ],
              [
                " ",
                "4",
                "၄"
              ],
              [
                " ",
                "5",
                "၅"
              ],
              [
                " ",
                "6",
                "၆"
              ],
              [
                " ",
                "7",
                "၇"
              ],
              [
                " ",
                "8",
                "၈"
              ],
              [
                " ",
                "9",
                "၉"
              ],
              [
                " ",
                "Sunday",
                "တနင်္ဂနွေ"
              ],
              [
                " ",
                "Monday",
                "တနင်္လာ"
              ],
              [
                " ",
                "Tuesday",
                "အင်္ဂါ"
              ],
              [
                " ",
                "Wednesday",
                "ဗုဒ္ဓဟူး"
              ],
              [
                " ",
                "Thursday",
                "ကြာသပတေး"
              ],
              [
                " ",
                "Friday",
                "သောကြာ"
              ],
              [
                " ",
                "Saturday",
                "စနေ"
              ],
              [
                " ",
                "Sabbath Eve",
                "အဖိတ်"
              ],
              [
                " ",
                "Sabbath",
                "ဥပုသ်"
              ],
              [
                " ",
                "Yatyaza",
                "ရက်ရာဇာ"
              ],
              [
                " ",
                "Pyathada",
                "ပြဿဒါး"
              ],
              [
                " ",
                "Afternoon",
                "မွန်းလွဲ"
              ],
              [
                " ",
                "January",
                "ဇန်နဝါရီ"
              ],
              [
                " ",
                "February",
                "ဖေဖော်ဝါရီ"
              ],
              [
                " ",
                "March",
                "မတ်"
              ],
              [
                " ",
                "April",
                "ဧပြီ"
              ],
              [
                " ",
                "May",
                "မေ"
              ],
              [
                " ",
                "June",
                "ဇွန်"
              ],
              [
                " ",
                "July",
                "ဇူလိုင်"
              ],
              [
                " ",
                "August",
                "ဩဂုတ်"
              ],
              [
                " ",
                "September",
                "စက်တင်ဘာ"
              ],
              [
                " ",
                "October",
                "အောက်တိုဘာ"
              ],
              [
                " ",
                "November",
                "နိုဝင်ဘာ"
              ],
              [
                " ",
                "December",
                "ဒီဇင်ဘာ"
              ],
              [
                " ",
                "Tagu",
                "တန်ခူး"
              ],
              [
                " ",
                "Kason",
                "ကဆုန်"
              ],
              [
                " ",
                "Nayon",
                "နယုန်"
              ],
              [
                " ",
                "Waso",
                "ဝါဆို"
              ],
              [
                " ",
                "Wagaung",
                "ဝါခေါင်"
              ],
              [
                " ",
                "Tawthalin",
                "တော်သလင်း"
              ],
              [
                " ",
                "Thadingyut",
                "သီတင်းကျွတ်"
              ],
              [
                " ",
                "Tazaungmon",
                "တန်ဆောင်မုန်း"
              ],
              [
                " ",
                "Nadaw",
                "နတ်တော်"
              ],
              [
                " ",
                "Pyatho",
                "ပြာသို"
              ],
              [
                " ",
                "Tabodwe",
                "တပို့တွဲ"
              ],
              [
                " ",
                "Tabaung",
                "တပေါင်း"
              ],
              [
                " ",
                "First",
                "ပ"
              ],
              [
                " ",
                "Second",
                "ဒု"
              ],
              [
                " ",
                "Late",
                "နှောင်း"
              ],
              [
                " ",
                "Waxing",
                "လဆန်း"
              ],
              [
                " ",
                "Waning",
                "လဆုတ်"
              ],
              [
                " ",
                "Full Moon",
                "လပြည့်"
              ],
              [
                " ",
                "New Moon",
                "လကွယ်"
              ],
              [
                " ",
                "Nay",
                "နေ့"
              ],
              [
                " ",
                "Day",
                "နေ့"
              ],
              [
                " ",
                "Yat",
                "ရက်"
              ],
              [
                " ",
                "Year",
                "နှစ်"
              ],
              [
                " ",
                "Ku",
                "ခု"
              ],
              [
                " ",
                "Naga",
                "နဂါး"
              ],
              [
                " ",
                "Head",
                "ခေါင်း"
              ],
              [
                " ",
                "Facing",
                "လှည့်"
              ],
              [
                " ",
                "East",
                "အရှေ့"
              ],
              [
                " ",
                "West",
                "အနောက်"
              ],
              [
                " ",
                "South",
                "တောင်"
              ],
              [
                " ",
                "North",
                "မြောက်"
              ],
              [
                " ",
                "Mahabote",
                "မဟာဘုတ်"
              ],
              [
                " ",
                "Born",
                "ဖွား"
              ],
              [
                " ",
                "Binga",
                "ဘင်္ဂ"
              ],
              [
                " ",
                "Atun",
                "အထွန်း"
              ],
              [
                " ",
                "Yaza",
                "ရာဇ"
              ],
              [
                " ",
                "Adipati",
                "အဓိပတိ"
              ],
              [
                " ",
                "Marana",
                "မရဏ"
              ],
              [
                " ",
                "Thike",
                "သိုက်"
              ],
              [
                " ",
                "Puti",
                "ပုတိ"
              ],
              [
                " ",
                "Ogre",
                "ဘီလူး"
              ],
              [
                " ",
                "Elf",
                "နတ်"
              ],
              [
                " ",
                "Human",
                "လူ"
              ],
              [
                " ",
                "Nakhat",
                "နက္ခတ်"
              ],
              [
                " ",
                "Hpusha",
                "ပုဿ"
              ],
              [
                " ",
                "Magha",
                "မာခ"
              ],
              [
                " ",
                "Phalguni",
                "ဖ္လကိုန်"
              ],
              [
                " ",
                "Chitra",
                "စယ်"
              ],
              [
                " ",
                "Visakha",
                "ပိသျက်"
              ],
              [
                " ",
                "Jyeshtha",
                "စိဿ"
              ],
              [
                " ",
                "Ashadha",
                "အာသတ်"
              ],
              [
                " ",
                "Sravana",
                "သရဝန်"
              ],
              [
                " ",
                "Bhadrapaha",
                "ဘဒြ"
              ],
              [
                " ",
                "Asvini",
                "အာသိန်"
              ],
              [
                " ",
                "Krittika",
                "ကြတိုက်"
              ],
              [
                " ",
                "Mrigasiras",
                "မြိက္ကသိုဝ်"
              ],
              [
                " ",
                "Calculator",
                "တွက်စက်"
              ]
          
        ];
        
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
        // const mmyt = ["common","little watat","big watat"][mdt.mf]
        // const myt = translate({text:mmyt,lang:lang});
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
    
        
        return {ssy, mmy, myn, mmm, mp, mmd, yyz,ptd, dgh, sbat, hd1, hd2, mhb, nk,ast, mwd, MY, mmlen}
    
       
    
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
    
    export function getThingyan (my: number){
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