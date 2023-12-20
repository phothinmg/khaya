
class BurmeseDate{
/* 
Julian date to Western date . 
input: (jd:julian date,ct:calendar type [Optional argument: 0=British (default), 1=Gregorian, 2=Julian]
SG: Beginning of Gregorian calendar in JDN [Optional argument: (default=2361222)]).
output: Western date (y=year, m=month, d=day, h=hour, n=minute, s=second).
*/
static j2w (ct: number,jd:number,SG: number){
  var j,jf,y,m,d,h,n,s;
      if (ct==2 || (ct==0 && (jd<SG))) {
          var b,c,f,e;
          j=Math.floor(jd+0.5); jf=jd+0.5-j;
          b=j+1524; c=Math.floor((b-122.1)/365.25); f=Math.floor(365.25*c);
          e=Math.floor((b-f)/30.6001); m=(e>13)?(e-13):(e-1);
          d=b-f-Math.floor(30.6001*e); y=m<3?(c-4715):(c-4716);
      }
      else{
          j=Math.floor(jd+0.5); jf=jd+0.5-j; j-=1721119;
          y=Math.floor((4*j-1)/146097); j=4*j-1-146097*y; d=Math.floor(j/4);
          j=Math.floor((4*d+3)/1461); d=4*d+3-1461*j;
          d=Math.floor((d+4)/4); m=Math.floor((5*d-3)/153); d=5*d-3-153*m;
          d=Math.floor((d+5)/5); y=100*y+j;
          if(m<10) {m+=3;}
          else {m-=9; y=y+1;}
      }
      jf*=24; h=Math.floor(jf); jf=(jf-h)*60; n=Math.floor(jf); s=(jf-n)*60;
      return {y:y,m:m,d:d,h:h,n:n,s:s};
};
/* 
Time to Fraction of day starting from 12 noon.
input: (h=hour, n=minute, s=second) output: (d: fraction of day)
*/

static t2d(h: number,n:number,s: number){ return ((h-12)/24+n/1440+s/86400);};
/**
 * Converts a date and time to Julian day.
 *
 * @param {number} year - The year.
 * @param {number} month - The month (1-12).
 * @param {number} day - The day of the month.
 * @param {number} [hour=12] - The hour (0-23).
 * @param {number} [minute=0] - The minute (0-59).
 * @param {number} [second=0] - The second (0-59).
 * @param {number} [calendarType=0] - The calendar type. [Optional argument: 0=British (default), 1=Gregorian, 2=Julian].
 * @param {number} [startGregorian=2361222] - The start of the Gregorian calendar [Optional argument: (default=2361222)]).
 * @returns {number} The Julian day.
 */
static w2j(
    year: number,
    month: number,
    day: number,
    hour: number = 12,
    minute: number = 0,
    second: number = 0,
    calendarType: number = 0,
    startGregorian: number = 2361222
  ): number {
    let a = Math.floor((14 - month) / 12);
    year = year + 4800 - a;
    month = month + 12 * a - 3;
    let jd = day + Math.floor((153 * month + 2) / 5) + 365 * year + Math.floor(year / 4);
    if (calendarType == 1) jd = jd - Math.floor(year / 100) + Math.floor(year / 400) - 32045;
    else if (calendarType == 2) jd = jd - 32083;
    else {
      jd = jd - Math.floor(year / 100) + Math.floor(year / 400) - 32045;
      if (jd < startGregorian) {
        jd = day + Math.floor((153 * month + 2) / 5) + 365 * year + Math.floor(year / 4) - 32083;
        if (jd > startGregorian) jd = startGregorian;
      }
    }
    var zz = BurmeseDate.t2d(hour,minute,second)
    return jd + zz
    
};
/**
 * find the length of western month.
 * @param {number} y - The year of the first date.
 * @param {number} m - The month of the first date.
 * @param {number} [ct=0] - The calendar type.[Optional argument: 0=British (default), 1=Gregorian, 2=Julian])
 * @param {number} [SG=2361222] - The start of the Gregorian calendar.
 * @returns {number} - wml = length of the month
 */
static wml(y: number, m: number, ct: number = 0, SG: number = 2361222): number {

    let m2 = m + 1;
    let y2 = y;
    if (m2 > 12) {
        y2++;
        m2 %= 12;
    }
   var  j1 = BurmeseDate.w2j(y, m, 1, 12, 0, 0, ct, SG);
   var  j2 = BurmeseDate.w2j(y2, m2, 1, 12, 0, 0, ct, SG);
    return (j2 - j1);
};


/*
Search first dimension in a 2D array, input: (k=key,A=array),output: (i=index)
*/
    static bSearch2(k : any,A : any) {
        var i=0; var l=0; var u=A.length-1;
        while(u>=l) {
            i=Math.floor((l+u)/2);
            if (A[i][0]>k)  u=i-1;
            else if (A[i][0]<k) l=i+1;
            else return i;
        } return -1;
    }
/*
Search first dimension in a 1D array, input: (k=key,A=array),output: (i=index)
*/
    static bSearch1(k: any,A: any) {
        var i=0; var l=0; var u=A.length-1;
        while(u>=l) {
            i=Math.floor((l+u)/2);
            if (A[i]>k)  u=i-1;
            else if (A[i]<k) l=i+1;
            else return i;
        } return -1;
    }
    
  static GetMyConst(my: number){
	var EI : number,WO: number,NM: number,EW: number=0,i :number; var fme: any,wte : any ;
	// The third era (the era after Independence 1312 ME and after)
	if(my >= 1312){ 
		EI = 3; WO=-0.5; NM=8;				
		fme = [[1377,1]]; 		
		wte = [1344,1345];
	}
	// The second era (the era under British colony: 1217 ME - 1311 ME)
	else if(my >= 1217){
		EI = 2; WO=-1; NM=4;
		fme = [[1234,1],[1261,-1]];
		wte = [1263,1264];
	}
	// The first era (the era of Myanmar kings: ME1216 and before)
	// Thandeikta (ME 1100 - 1216)
	else if(my >= 1100){
		EI = 1.3; WO=-0.85; NM=-1;
		fme = [[1120,1],[1126,-1],[1150,1],[1172,-1],[1207,1]]; 
		wte = [1201,1202];
	}
	// Makaranta system 2 (ME 798 - 1099)
	else if(my >= 798){
		EI = 1.2; WO=-1.1; NM=-1;
		fme = [[813,-1],[849,-1],[851,-1],[854,-1],[927,-1],[933,-1],[936,-1],
		[938,-1],[949,-1],[952,-1],[963,-1],[968,-1],[1039,-1]];	
		wte=[];	
	}
	// Makaranta system 1 (ME 0 - 797)
	else {
		EI = 1.1; WO=-1.1; NM=-1;
		fme = [[205,1],[246,1],[471,1],[572,-1],[651,1],[653,2],[656,1],[672,1],
		[729,1], [767,-1]];		
		wte=[];
	}
	i=BurmeseDate.bSearch2(my,fme); if(i >= 0) WO+=fme[i][1]; // full moon day offset exceptions
	i=BurmeseDate.bSearch1(my,wte); if(i >= 0) EW = 1; //correct watat exceptions

	return {EI:EI,WO:WO,NM:NM,EW:EW};
  }
  /*
  Check watat (intercalary month)
  input: (my = myanmar year)
  output:  ( watat = intercalary month [1=watat, 0=common]
  fm = full moon day of 2nd Waso in jdn_mm (jdn+6.5 for MMT) [only valid when watat=1])
  dependency: GetMyConst(my)
*/
  static cal_watat(my: number) {//get data for respective era	
	var SY=1577917828.0/4320000.0; //solar year (365.2587565)
	var LM=1577917828.0/53433336.0; //lunar month (29.53058795)
	var MO=1954168.050623; //beginning of 0 ME for MMT
	var c=BurmeseDate.GetMyConst(my); // get constants for the corresponding calendar era
	var TA=(SY/12-LM)*(12-c.NM); //threshold to adjust
	var ed=(SY*(my+3739))%LM; // excess day
	if(ed < TA) ed+=LM;//adjust excess days
	var fm=Math.round(SY*my+MO-ed+4.5*LM+c.WO);//full moon day of 2nd Waso
	var TW=0,watat=0;//find watat
	if (c.EI >= 2) {//if 2nd era or later find watat based on excess days
		TW=LM-(SY/12-LM)*c.NM;
		if(ed >= TW) watat=1;
	}
	else {//if 1st era,find watat by 19 years metonic cycle
	//Myanmar year is divided by 19 and there is intercalary month
	//if the remainder is 2,5,7,10,13,15,18
	//https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
		watat=(my*7+2)%19; if (watat < 0) watat+=19;
		watat=Math.floor(watat/12);
	}
	watat^=c.EW;//correct watat exceptions	
	return {fm:fm,watat:watat};
  }
  /*
    Check Myanmar Year
    input: (my -myanmar year)
    output:  (myt =year type [0=common, 1=little watat, 2=big watat],
    tg1 = the 1st day of Tagu as jdn_mm (Julian Day Number for MMT)
    fm = full moon day of [2nd] Waso as Julain Day Number
    werr= watat discrepancy [0=ok, 1= error] )
    dependency: cal_watat(my) 
*/
static cal_my(my: number) {
	var yd=0,y1,nd=0,werr=0,fm=0;
	var y2=BurmeseDate.cal_watat(my); var myt=y2.watat;
	do{ yd++; y1=BurmeseDate.cal_watat(my-yd);}while(y1.watat==0 && yd < 3);
	if(myt) { nd=(y2.fm-y1.fm)%354; myt=Math.floor(nd/31)+1;
		fm=y2.fm; if(nd!=30 && nd!=31) {werr=1;} }
	else fm=y1.fm+354*yd;
	var tg1=y1.fm+354*yd-102;
	return {myt:myt,tg1:tg1,fm:fm,werr:werr};
  }
/*Julian day number to Myanmar date
input: (jdn -julian day number)
output:  (
  myt =year type [0=common, 1=little watat, 2=big watat],
  my = year,
  mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
    Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11, 
    Tabaung=12, Late Tagu=13, Late Kason=14 ],
  md = day of the month [1 to 30])
dependency: cal_my(my)
*/
static j2m(jdn: number) {
	jdn=Math.round(jdn);//convert jdn to integer
	var SY=1577917828.0/4320000.0; //solar year (365.2587565)
	var MO=1954168.050623; //beginning of 0 ME
	var my : number,yo,dd,myl,mmt,a,b,c,e,f,mm,md;
	my=Math.floor((jdn-0.5-MO)/SY);//Myanmar year
	yo=BurmeseDate.cal_my(my);//check year
	dd=jdn-yo.tg1+1;//day count
	b=Math.floor(yo.myt/2); c=Math.floor(1/(yo.myt+1)); //big wa and common yr
	myl=354+(1-c)*30+b;//year length
	mmt=Math.floor((dd-1)/myl);//month type: late =1 or early = 0
	dd-=mmt*myl; a=Math.floor((dd+423)/512); //adjust day count and threshold
	mm=Math.floor((dd-b*a+c*a*30+29.26)/29.544);//month
	e=Math.floor((mm+12)/16); f=Math.floor((mm+11)/16);
    md=dd-Math.floor(29.544*mm-29.26)-b*e+c*f*30;//day
    mm+=f*3-e*4+12*mmt; // adjust month numbers for late months
	return {myt:yo.myt,my:my,mm:mm,md:md};
  }
  /*
   Get length of month from month, and year type.
  input: (
    mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
          Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
          Tabaung=12, Late Tagu=13, Late Kason=14 ], 
    myt = year type [0=common, 1=little watat, 2=big watat])
  output: (mml = length of the month [29 or 30 days])
  */
  static cal_mml(mm: number,myt: number) {
    var mml=30-mm%2;//month length
    if(mm==3) mml+=Math.floor(myt/2);//adjust if Nayon in big watat
    return mml;
  }
  /*
   Get moon phase from day of the month, month, and year type.
  input: (
     md= day of the month [1-30], 
     mm = month [Tagu=1, Kason=2, Nayon=3, 1st Waso=0, (2nd) Waso=4, Wagaung=5, 
          Tawthalin=6, Thadingyut=7, Tazaungmon=8, Nadaw=9, Pyatho=10, Tabodwe=11,  
          Tabaung=12, Late Tagu=13, Late Kason=14 ], 
     myt = year type [0=common, 1=little watat, 2=big watat])
  output: (mp =moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon])
  */
  static cal_mp(md : number,mm: number,myt: number) {
    var mml=BurmeseDate.cal_mml(mm,myt);
    return (Math.floor((md+1)/16)+Math.floor(md/16)+Math.floor(md/mml));
  }
  /*
  Get the apparent length of the year from year type.
  input: ( myt = year type [0=common, 1=little watat, 2=big watat])
  output: ( myl= year length [354, 384, or 385 days])
  */
  static cal_myl(myt : number) {
    return (354+(1-Math.floor(1/(myt+1)))*30+Math.floor(myt/2));
  }
  /* Get fortnight day from month day
  // input: ( md= day of the month [1-30])
  // output: (mf= fortnight day [1 to 15])
  */
  static cal_mf(md : number) {
    return (md-15*Math.floor(md/16));
  }
}

export{BurmeseDate}