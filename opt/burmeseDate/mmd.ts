import {DateTime,burmeseDate} from '../../src/buemese-date/burmeseDate.js';
import translate from './translate.js';
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
    let hd2;
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
