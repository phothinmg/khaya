import { burmeseDate } from "../../src/buemese-date/burmeseDate.js";

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
}

export default getThingyan;