import { j2w } from "../a.js";

function ThingyanTime(my) {
	var SY=1577917828/4320000; //solar year (365.2587565)
	var LM=1577917828/53433336; //lunar month (29.53058795)
	var MO=1954168.050623; //beginning of 0 ME
	var SE3=1312; //beginning of 3rd Era
	var ja=SY*my+MO; 
    let jk
    if (my >= SE3){
        jk=ja-2.169918982;
    } else{jk=ja-2.1675;} 
	return {ja:ja,jk:jk,da:Math.round(ja),dk:Math.round(jk)};
};

function getThingyan (my){
    const 
    to = my + 1,
    from = my,
    emName=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    ppp = ThingyanTime(to),
    att = j2w(ppp.ja),
    atatTime = att.year + '-' + emName[att.month-1] + '-' + att.d + ' ' + att.h + ':' + att.n + ':' + Math.floor(att.s),
    akt = j2w(ppp.jk),
    akyaTime = `${akt.year}-${emName[akt.month-1]}-${akt.d} ${akt.h}:${akt.n}:${Math.floor(akt.s)}`,
    akd = j2w(ppp.dk),
    akyod = j2w(ppp.dk - 1),
    akyoDay = `${akyod.year}-${emName[akyod.month-1]}-${akyod.d}`,
    akyaDay = `${akd.year}-${emName[akd.month-1]}-${akd.d}`,
    akyatd = j2w(ppp.dk +1),
    akyatDay = `${akyatd.year}-${emName[akyatd.month-1]}-${akyatd.d}`,
    atd = j2w(ppp.da),
    atatDay = `${atd.year}-${emName[atd.month-1]}-${atd.d}`,
    nyd = j2w(ppp.da + 1),
    nyDay = `${nyd.year}-${emName[nyd.month-1]}-${nyd.d}`;
    let sakd;
    if(ppp.da-ppp.dk>2){
        const sakdd = j2w(ppp.da -1);
        sakd = `${sakdd.year}-${emName[sakdd.month-1]}-${sakdd.d}`;
    }else{
        sakd = ''
    }

    return {from, to, atatTime, akyaTime, akyoDay, akyaDay, akyatDay, sakd, atatDay, nyDay}
}

export default getThingyan;