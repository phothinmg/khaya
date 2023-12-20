/*
Original from mmcal https://github.com/yan9a/mmcal;
*/
class DateTime {
    constructor(m_jd,m_tz,m_ct = 0,m_SG = 2361222) {
    
        if(m_tz==undefined) this.m_tz=DateTime.ltzoh();
        else this.m_tz = m_tz;
        if(m_jd==undefined) this.m_jd=DateTime.jdnow();
        else this.m_jd = m_jd;
        this.m_ct = m_ct; 
        this.m_SG = m_SG; 
    }
    static j2w(jd,ct=0,SG=2361222) {
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
    }

    static t2d(h,n,s) { return ((h-12)/24+n/1440+s/86400);}
   
    static w2j(y,m,d,h=12,n=0,s=0,ct=0,SG=2361222) {
        // 2361222-Gregorian start in British calendar (1752/Sep/14)
        var a=Math.floor((14-m)/12); y=y+4800-a; m=m+(12*a)-3;
        var jd=d+Math.floor((153*m+2)/5)+(365*y)+Math.floor(y/4);
        if (ct==1) jd=jd-Math.floor(y/100)+Math.floor(y/400)-32045;
        else if (ct==2) jd=jd-32083;
        else {
            jd=jd-Math.floor(y/100)+Math.floor(y/400)-32045;
            if(jd<SG) {
                jd=d+Math.floor((153*m+2)/5)+(365*y)+Math.floor(y/4)-32083;
                if(jd>SG) jd=SG;
            }
        }
        return jd+DateTime.t2d(h,n,s);
    }
    // convert unix timestamp to jd 
    static u2j(ut)
    {
        //number of seconds from 1970 Jan 1 00:00:00 (UTC)
        var jd=2440587.5+ut/86400.0;//converte to day(/24h/60min/60sec) and to JD
        return jd;
    }
    //-------------------------------------------------------------------------
    // julian date to unix time
    static j2u(jd)
    {
        return (jd-2440587.5)*86400.0+0.5;
    }
    //-------------------------------------------------------------------------
    // get current time in julian date
    static jdnow()
    {
        var dt=new Date();
        // the number of milliseconds since 1 January 1970 00:00:00 / 1000
        var ut=dt.getTime()/1000.0;	
        return DateTime.u2j(ut);
    }
    //-------------------------------------------------------------------------
    // get local time zone offset between local time and UTC in days
    static ltzoh()
    {
        var dt=new Date();
        // the difference, in minutes, between UTC and local time
        var tz=dt.getTimezoneOffset()/60.0;
        return -tz; // between local time and UTC
    }
    
    static j2s(jd,fs="%Www %y-%mm-%dd %HH:%nn:%ss %zz",tz=0,ct=0,SG=2361222)
    {	
        jd+=tz/24.0;
        var dt=DateTime.j2w(jd,ct,SG);	
        var s=Math.floor(dt.s);//shold not take round to make sure s<60
        var l=Math.floor((dt.s-s)*1000); // not rounding
        var jdn=Math.floor(jd+0.5);
        var wd=(jdn+2)%7;//week day [0=sat, 1=sun, ..., 6=fri]
        var h = dt.h % 12;
        if (h == 0) h = 12;
        var W = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
        var M = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
        // replace format string with values
        var fm=fs; var fstr,rstr,re;
        //--------------------------------------------------------
        fstr = "%yyyy"; re = new RegExp(fstr, 'g');
        rstr = "0000" + dt.y.toString(); rstr = rstr.substr(rstr.length - 4); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%yy"; var y = dt.y % 100;  re = new RegExp(fstr, 'g');
        rstr = "00" + y.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%y"; re = new RegExp(fstr, 'g');
        rstr = dt.y.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%MMM";  re = new RegExp(fstr, 'g');
        rstr = M[dt.m-1]; rstr = rstr.substr(0,3); rstr=rstr.toUpperCase(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%Mmm";  re = new RegExp(fstr, 'g');
        rstr = M[dt.m-1]; rstr = rstr.substr(0,3); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%mm";  re = new RegExp(fstr, 'g');
        rstr = "00" + dt.m.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%M";  re = new RegExp(fstr, 'g');
        rstr = M[dt.m-1]; fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%m";  re = new RegExp(fstr, 'g');
        rstr = dt.m.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%dd";  re = new RegExp(fstr, 'g');
        rstr = "00" + dt.d.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%d";  re = new RegExp(fstr, 'g');
        rstr = dt.d.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%HH";  re = new RegExp(fstr, 'g');
        rstr = "00" + dt.h.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%H";  re = new RegExp(fstr, 'g');
        rstr = dt.h.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%hh";  re = new RegExp(fstr, 'g');
        rstr = "00" + h.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%h";  re = new RegExp(fstr, 'g');
        rstr = h.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%AA";  re = new RegExp(fstr, 'g');
        rstr = dt.h<12?"AM":"PM"; fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%aa";  re = new RegExp(fstr, 'g');
        rstr = dt.h<12 ? "am" : "pm"; fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%nn"; re = new RegExp(fstr, 'g'); 
        rstr = "00" + dt.n.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%n"; re = new RegExp(fstr, 'g');
        rstr = dt.n.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%ss"; re = new RegExp(fstr, 'g'); 
        rstr = "00" + s.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%s"; re = new RegExp(fstr, 'g');
        rstr = s.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%lll"; re = new RegExp(fstr, 'g'); 
        rstr = "000" + l.toString(); rstr = rstr.substr(rstr.length - 3); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%l"; re = new RegExp(fstr, 'g');
        rstr = l.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%WWW"; re = new RegExp(fstr, 'g');
        rstr = W[wd]; rstr = rstr.substr(0,3); rstr=rstr.toUpperCase(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%Www"; re = new RegExp(fstr, 'g');
        rstr = W[wd]; rstr = rstr.substr(0,3); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%W"; re = new RegExp(fstr, 'g');
        rstr = W[wd]; fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%w"; re = new RegExp(fstr, 'g');
        rstr = wd.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "%zz"; re = new RegExp(fstr, 'g');
        var tzs = tz < 0 ? "-" : "+";
        var tzi = Math.floor(tz);
        var tzh = "00" + tzi.toString();
        tzh = tzh.substr(tzh.length - 2);
        rstr = tzs+tzh;
        var tzf = tz - tzi;
        if (tzf > 0) {
            tzh = "00" + Math.floor(tzf*60.0+0.5).toString();
            tzh = tzh.substr(tzh.length - 2);
            rstr += ":"+tzh;
        }
        fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        return fm;
    }
    static s2j(tstr,tz=0,ct=0,SG=2361222)
    {
        var str,pstr;
        var y=0,m=0,d=0,h=12,n=0,s=0,ls=0;
        var jd=-1;
        str=DateTime.GetDigits(tstr);
        if(str.length==8 || str.length==14 || str.length==17){        
            pstr=str.substr(0,4); y=parseInt(pstr); //get year
            pstr=str.substr(4,2); m=parseInt(pstr); //get month
            pstr=str.substr(6,2); d=parseInt(pstr); //get day
            if(str.length==14 || str.length==17){
                pstr=str.substr(8,2); h=parseInt(pstr); //get hour
                pstr=str.substr(10,2); n=parseInt(pstr); //get minute
                pstr=str.substr(12,2); s=parseInt(pstr); //get second
                if(str.length==17){ 
                    pstr=str.substr(14,3); ls=parseInt(pstr); 
                    s+=ls/1000.0; 
                }
            }
            jd=DateTime.w2j(y,m,d,h,n,s,ct,SG)-tz/24.0;  // convert to UTC      
        }
        return jd;
    }
    //-------------------------------------------------------------------------
    // set time zone in hours for this instance
    SetTimezone(tz)//set time zone
    {
        if(tz==undefined){ this.m_tz=DateTime.ltzoh(); }
        else if(tz<=14 || tz>=(-12)){ this.m_tz=tz; }
    }
    //-------------------------------------------------------------------------
    // set time to now
    Set2Now()
    {
        this.m_jd = DateTime.jdnow();
    }
    //-------------------------------------------------------------------------
    // set time in jd
    SetJD(jd)
    {
        this.m_jd=jd;
    }
    //-------------------------------------------------------------------------
    // set in unix time
    SetUnixTime(ut)
    {
        this.m_jd=DateTime.u2j(ut);
    }
    SetDateTime(year,month,day,hour=12,minute=0,second=0,tz=0,ct=0,SG=2361222)
    {
        this.m_jd=DateTime.w2j(year,month,day,hour,minute,second,ct,SG)-tz/24.0;
    }
    SetDateTimeString(tstr,tz=0,ct=0,SG=2361222)
    {
        var jd=DateTime.s2j(tstr,tz,ct,SG);
        if(jd>=0) this.m_jd=jd;
    }
    //-------------------------------------------------------------------------
    // set calendar type [0=British (default), 1=Gregorian, 2=Julian]
    SetCT(ct)
    {
        ct=Math.round(ct%3);
        this.m_ct=ct;
    }
    //-------------------------------------------------------------------------
    // set Beginning of Gregorian calendar in JDN [default=2361222]
    SetSG(sg)
    {
        sg=Math.round(sg);
        this.m_SG=sg;
    }
   
    ToString(fs="%Www %y-%mm-%dd %HH:%nn:%ss %zz")
    {
        return DateTime.j2s(this.m_jd, fs, this.m_tz, this.m_ct, this.m_SG);
    }
    //-------------------------------------------------------------------------
    // filter input string to get digits only
    static GetDigits(str)
    {
        var ostr=""; var len=str.length; var i=0;
        if(len>0){ for(i=0;i<len;i++) if(str[i]>='0' && str[i]<='9') ostr += str[i]; }
        return ostr;
    }
    //-------------------------------------------------------------------------
    // get properties
    get jd() { return this.m_jd;} // julian date
    get jdl() { return (this.m_jd+this.m_tz/24.0);} // julian date for this time zone
    get jdn(){ return Math.round(this.m_jd);} // julian date number
    get jdnl(){ return Math.round(this.m_jd+this.m_tz/24.0);} // julian date number for this time zone
    get y(){ 
        var dt = DateTime.j2w(this.jdl,this.m_ct,this.m_SG);
        return dt.y;
    } // year
    
    get m(){ 
        var dt = DateTime.j2w(this.jdl,this.m_ct,this.m_SG);
        return dt.m;
    } // month
    
    get d(){ 
        var dt = DateTime.j2w(this.jdl,this.m_ct,this.m_SG);
        return dt.d;
    } // day
    
    get h(){ 
        var dt = DateTime.j2w(this.jdl,this.m_ct,this.m_SG);
        return dt.h;
    } // hour [0-23]
    
    get n(){ 
        var dt = DateTime.j2w(this.jdl,this.m_ct,this.m_SG);
        return dt.n;
    } // minute
    
    get s(){ 
        var dt = DateTime.j2w(this.jdl,this.m_ct,this.m_SG);
        var s=Math.floor(dt.s);//shold not take round to make sure s<60
        return s;
    } // second
    
    get l(){ 
        var dt = DateTime.j2w(this.jdl,this.m_ct,this.m_SG);
        var s=Math.floor(dt.s);//shold not take round to make sure s<60
        var l=Math.floor((dt.s-s)*1000); // not rounding
        return l;
    } // millisecond
    
    get w(){ return (this.jdnl+2)%7;} // weekday [0=sat, 1=sun, ..., 6=fri]
    get ut(){ return DateTime.j2u(this.m_jd);} // unix time
    get tz(){ return this.m_tz;} // time zone 
    get ct(){ return this.m_ct;} // calendar type
    get SG(){ return this.m_SG;} // Beginning of Gregorian calendar in JDN [default=2361222]
    get mlen(){ return DateTime.wml(this.y,this.m,this.m_ct,this.m_SG);} // length of this month
    //----------------------------------------------------------------------------
    static wml(y,m,ct=0,SG=2361222) {
        var j1,j2; var m2=m+1; var y2=y;
        if(m2>12){y2++; m2%=12;}
        j1=DateTime.w2j(y,m,1,12,0,0,ct,SG);
        j2=DateTime.w2j(y2,m2,1,12,0,0,ct,SG);
        return (j2-j1);
    }
    //-------------------------------------------------------------------------
    } //DateTime
    
    class burmeseDate extends DateTime {
    //-------------------------------------------------------------------------
    constructor(m_jd,m_tz,m_ct = 0,m_SG = 2361222) {
        super(m_jd,m_tz,m_ct,m_SG);
    }
    //-------------------------------------------------------------------------
    static GetMyConst(my)
    {
        var EI,WO,NM,EW=0,i; var fme,wte;
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
    //----------------------------------------------------------------------------
    static bSearch2(k,A) {
        var i=0; var l=0; var u=A.length-1;
        while(u>=l) {
            i=Math.floor((l+u)/2);
            if (A[i][0]>k)  u=i-1;
            else if (A[i][0]<k) l=i+1;
            else return i;
        } return -1;
    }
    //-----------------------------------------------------------------------------
    // Search a 1D array
    // input: (k=key,A=array)
    // output: (i=index)
    static bSearch1(k,A) {
        var i=0; var l=0; var u=A.length-1;
        while(u>=l) {
            i=Math.floor((l+u)/2);
            if (A[i]>k)  u=i-1;
            else if (A[i]<k) l=i+1;
            else return i;
        } return -1;
    }
    //-------------------------------------------------------------------------
    static cal_watat(my) {//get data for respective era	
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
    //-------------------------------------------------------------------------
    static cal_my(my) {
        var yd=0,y1,nd=0,werr=0,fm=0;
        var y2=BurmeseDate.cal_watat(my); var myt=y2.watat;
        do{ yd++; y1=BurmeseDate.cal_watat(my-yd);}while(y1.watat==0 && yd < 3);
        if(myt) { nd=(y2.fm-y1.fm)%354; myt=Math.floor(nd/31)+1;
            fm=y2.fm; if(nd!=30 && nd!=31) {werr=1;} }
        else fm=y1.fm+354*yd;
        var tg1=y1.fm+354*yd-102;
        return {myt:myt,tg1:tg1,fm:fm,werr:werr};
    }
    //-------------------------------------------------------------------------
    static j2m(jdn) {
        jdn=Math.round(jdn);//convert jdn to integer
        var SY=1577917828.0/4320000.0; //solar year (365.2587565)
        var MO=1954168.050623; //beginning of 0 ME
        var my,yo,dd,myl,mmt,a,b,c,e,f,mm,md;
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
    //-------------------------------------------------------------------------
    static cal_mp(md,mm,myt) {
        var mml=BurmeseDate.cal_mml(mm,myt);
        return (Math.floor((md+1)/16)+Math.floor(md/16)+Math.floor(md/mml));
    }
    //-------------------------------------------------------------------------
    static cal_mml(mm,myt) {
        var mml=30-mm%2;//month length
        if(mm==3) mml+=Math.floor(myt/2);//adjust if Nayon in big watat
        return mml;
    }
    //-------------------------------------------------------------------------
    static cal_myl(myt) {
        return (354+(1-Math.floor(1/(myt+1)))*30+Math.floor(myt/2));
    }
    //-------------------------------------------------------------------------
    static cal_mf(md) {
        return (md-15*Math.floor(md/16));
    }
    //-------------------------------------------------------------------------
    static cal_md(mf,mp,mm,myt) {
        var mml=BurmeseDate.cal_mml(mm,myt);
        var m1=mp%2; var m2=Math.floor(mp/2);
        return (m1*(15+m2*(mml-15))+(1-m1)*(mf+15*m2));
    }
    //-------------------------------------------------------------------------
    static m2j(my,mm,md) {
        var b,c,dd,myl,mmt;
        var yo=BurmeseDate.cal_my(my);//check year
        mmt=Math.floor(mm/13); mm=mm%13+mmt; // to 1-12 with month type
        b=Math.floor(yo.myt/2); c=1-Math.floor((yo.myt+1)/2); //if big watat and common year	 
        mm+=4-Math.floor((mm+15)/16)*4+Math.floor((mm+12)/16);//adjust month
        dd=md+Math.floor(29.544*mm-29.26)-c*Math.floor((mm+11)/16)*30
            +b*Math.floor((mm+12)/16);	
        myl=354+(1-c)*30+b; dd+=mmt*myl;//adjust day count with year length
        return (dd+yo.tg1-1);
    }
    //-------------------------------------------------------------------------
    SetMDateTime(my, mm, md, hour = 12, minute = 0, second = 0, tz = 0) {
        this.m_jd = BurmeseDate.m2j(my, mm, md)+DateTime.t2d(hour, minute, second) - tz / 24.0;
    }
    //-------------------------------------------------------------------------
    static cal_sabbath(md,mm,myt){
        var mml=BurmeseDate.cal_mml(mm,myt);
        var s=0; if((md==8)||(md==15)||(md==23)||(md==mml)) s=1;
        if((md==7)||(md==14)||(md==22)||(md==(mml-1))) s=2;
        return s;
    }
    //-------------------------------------------------------------------------
    static cal_yatyaza(mm,wd){
        //first waso is considered waso
        var m1=mm%4; var yatyaza=0; var wd1=Math.floor(m1/2)+4;
        var wd2=((1-Math.floor(m1/2))+m1%2)*(1+2*(m1%2));
        if((wd==wd1)||(wd==wd2)) yatyaza=1;
        return yatyaza;
    }
    //-------------------------------------------------------------------------
    static cal_pyathada(mm,wd){
        //first waso is considered waso
        var m1=mm%4; var pyathada=0; var wda=[1,3,3,0,2,1,2]; 	
        if((m1==0)&&(wd==4)) pyathada=2;//afternoon pyathada
        if(m1==wda[wd]) pyathada=1;
        return pyathada;
    }
    //-------------------------------------------------------------------------
    static cal_nagahle(mm) {
        if (mm<=0) mm=4;//first waso is considered waso
        return Math.floor((mm%12)/3);
    }
    //-------------------------------------------------------------------------
    static cal_mahabote(my,wd) {return (my-wd)%7;}
    //-------------------------------------------------------------------------
    // nakhat 
    // input: ( my = year )
    // output: ( [0=Ogre, 1=Elf, 2=Human] )
    static cal_nakhat(my) {return my%3;}
    //-------------------------------------------------------------------------
    static cal_thamanyo(mm,wd) {
        var mmt=Math.floor(mm/13); mm=mm%13+mmt; // to 1-12 with month type
        if (mm<=0) mm=4;//first waso is considered waso (looks no need here)
        var thamanyo=0; 
        var m1=mm-1-Math.floor(mm/9); 
        var wd1=(m1*2-Math.floor(m1/8))%7;
        var wd2=(wd+7-wd1)%7; 
        if(wd2<=1) thamanyo=1;
        return thamanyo;
    }
    //-------------------------------------------------------------------------
    static cal_amyeittasote(md,wd) {
        var mf=md-15*Math.floor(md/16);//get fortnight day [0-15]
        var amyeittasote=0; var wda=[5,8,3,7,2,4,1]; 
        if(mf==wda[wd]) amyeittasote=1;
        return amyeittasote;
    }
    //-------------------------------------------------------------------------

    static cal_warameittugyi(md,wd) {
        var mf=md-15*Math.floor(md/16);//get fortnight day [0-15]
        var warameittugyi=0; var wda=[7,1,4,8,9,6,3]; 
        if(mf==wda[wd]) warameittugyi=1;
        return warameittugyi;
    }
    //-------------------------------------------------------------------------
    static cal_warameittunge(md,wd) {
        var mf=md-15*Math.floor(md/16);//get fortnight day [0-15]
        var warameittunge=0; var wn=(wd+6)%7; 
        if((12-mf)==wn) warameittunge=1;
        return warameittunge;
    }
    //-------------------------------------------------------------------------
    static cal_yatpote(md,wd) {
        var mf=md-15*Math.floor(md/16);//get fortnight day [0-15]
        var yatpote=0; var wda=[8,1,4,6,9,8,7]; 
        if(mf==wda[wd]) yatpote=1;
        return yatpote;
    }
    //-------------------------------------------------------------------------
    static cal_thamaphyu(md,wd) {
        var mf=md-15*Math.floor(md/16);//get fortnight day [0-15]
        var thamaphyu=0; var wda=[1,2,6,6,5,6,7];  
        if(mf==wda[wd]) thamaphyu=1;
        var wdb=[0,1,0,0,0,3,3]; if(mf==wdb[wd]) thamaphyu=1;
        if((mf==4) && (wd==5)) thamaphyu=1;
        return thamaphyu;
    }
    //-------------------------------------------------------------------------
    static cal_nagapor(md,wd) {
        var nagapor=0; var wda=[26,21,2,10,18,2,21];  
        if(md==wda[wd]) nagapor=1;
        var wdb=[17,19,1,0,9,0,0]; if(md==wdb[wd]) nagapor=1;
        if(((md==2)&&(wd==1))||(((md==12)||(md==4)||(md==18))&&(wd==2)))nagapor=1;
        return nagapor;
    }
    //-------------------------------------------------------------------------
    static cal_yatyotema(mm,md) {
        var mmt=Math.floor(mm/13); mm=mm%13+mmt; // to 1-12 with month type
        if (mm<=0) mm=4;//first waso is considered waso
        var mf=md-15*Math.floor(md/16);//get fortnight day [0-15]
        var yatyotema=0; var m1=(mm%2)?mm:((mm+9)%12); 
        m1=(m1+4)%12+1; if(mf==m1)yatyotema=1;
        return yatyotema;
    }
    //-------------------------------------------------------------------------
    static cal_mahayatkyan(mm,md) {
        if (mm<=0) mm=4;//first waso is considered waso
        var mf=md-15*Math.floor(md/16);//get fortnight day [0-15]
        var mahayatkyan=0; var m1=(Math.floor((mm%12)/2)+4)%6+1; 
        if(mf==m1) mahayatkyan=1;
        return mahayatkyan;
    }
    //-------------------------------------------------------------------------
    static cal_shanyat(mm,md) {
        var mmt=Math.floor(mm/13); mm=mm%13+mmt; // to 1-12 with month type
        if (mm<=0) mm=4;//first waso is considered waso
        var mf=md-15*Math.floor(md/16);//get fortnight day [0-15]
        var shanyat=0; var sya=[8,8,2,2,9,3,3,5,1,4,7,4]; 
        if(mf==sya[mm-1]) shanyat=1;
        return shanyat;
    }
    //-------------------------------------------------------------------------
    static cal_astro(jdn) {
        jdn=Math.round(jdn);
        var myt,my,mm,md; var hs=[]; 
        var yo=BurmeseDate.j2m(jdn);
        myt=yo.myt; my=yo.my; mm = yo.mm; md=yo.md;
        var wd=(jdn+2)%7;//week day [0=sat, 1=sun, ..., 6=fri]
        if(BurmeseDate.cal_thamanyo(mm,wd)) {hs.push("Thamanyo");}
        if(BurmeseDate.cal_amyeittasote(md,wd)) {hs.push("Amyeittasote");}
        if(BurmeseDate.cal_warameittugyi(md,wd)) {hs.push("Warameittugyi");}
        if(BurmeseDate.cal_warameittunge(md,wd)) {hs.push("Warameittunge");}
        if(BurmeseDate.cal_yatpote(md,wd)) {hs.push("Yatpote");}
        if(BurmeseDate.cal_thamaphyu(md,wd)) {hs.push("Thamaphyu");}
        if(BurmeseDate.cal_nagapor(md,wd)) {hs.push("Nagapor");}
        if(BurmeseDate.cal_yatyotema(mm,md)) {hs.push("Yatyotema");}
        if(BurmeseDate.cal_mahayatkyan(mm,md)) {hs.push("Mahayatkyan");}
        if(BurmeseDate.cal_shanyat(mm,md)) {hs.push("Shanyat");}
        return hs;
    }
    static cal_holiday(jdn) {
        jdn=Math.round(jdn);
        var myt,my,mm,md,mp,mmt,gy,gm,gd;
        var yo=BurmeseDate.j2m(jdn);
        myt=yo.myt; my=yo.my; mm = yo.mm; md=yo.md;
        mp=BurmeseDate.cal_mp(md,mm,myt);
        mmt=Math.floor(mm/13); var hs=[];
        var go=DateTime.j2w(jdn);
        gy=go.y; gm=go.m; gd=go.d;
        //---------------------------------
        // Thingyan
        var SY=1577917828.0/4320000.0; //solar year (365.2587565)
        var MO=1954168.050623; //beginning of 0 ME
        var BGNTG=1100, SE3=1312;//start of Thingyan and third era
        var akn,atn,ja,jk;
        ja=SY*(my+mmt)+MO; // atat time
        if (my >= SE3) jk=ja-2.169918982; // akya time
        else jk=ja-2.1675;
        akn=Math.round(jk); atn=Math.round(ja);
        if(jdn==(atn+1)) {hs.push("Myanmar New Year's Day");}
        if ((my+mmt)>=BGNTG) {
            if(jdn==atn) {hs.push("Thingyan Atat");}
            else if((jdn>akn)&&(jdn<atn)) {hs.push("Thingyan Akyat");}
            else if(jdn==akn) {hs.push("Thingyan Akya");}
            else if(jdn==(akn-1)) {hs.push("Thingyan Akyo");}
            else if(((my+mmt)>=1369)&&((my+mmt)<1379)&&((jdn==(akn-2))||
                ((jdn>=(atn+2))&&(jdn<=(akn+7))))) {hs.push("Holiday");}
        }
        //---------------------------------
        // holidays on gregorian calendar	
        if((gy>=2018) && (gm==1) && (gd==1)) {hs.push("New Year's Day");}
        else if((gy>=1948) && (gm==1) && (gd==4)) {hs.push("Independence Day");}
        else if((gy>=1947) && (gm==2) && (gd==12)) {hs.push("Union Day");}
        else if((gy>=1958) && (gm==3) && (gd==2)) {hs.push("Peasants' Day");}
        else if((gy>=1945) && (gm==3) && (gd==27)) {hs.push("Resistance Day");}
        else if((gy>=1923) && (gm==5) && (gd==1)) {hs.push("Labour Day");}
        else if((gy>=1947) && (gm==7) && (gd==19)) {hs.push("Martyrs' Day");}
        else if((gy>=1752) && (gm==12) && (gd==25)) {hs.push("Christmas Day");}
        else if((gy==2017) && (gm==12) && (gd==30)) {hs.push("Holiday");}
        else if((gy>=2017) && (gm==12) && (gd==31)) {hs.push("Holiday");}
        //---------------------------------
        // holidays on myanmar calendar
        if((mm==2) && (mp==1)) {hs.push("Buddha Day");}//Vesak day
        else if((mm==4)&& (mp==1)) {hs.push("Start of Buddhist Lent");}//Warso day
        else if((mm==7) && (mp==1)) {hs.push("End of Buddhist Lent");}
        else if((my>=1379) && (mm==7) && (md==14||md==16)) {hs.push("Holiday");}
        else if((mm==8) && (mp==1)) {hs.push("Tazaungdaing");}
        else if((my>=1379) && (mm==8) && (md==14)) {hs.push("Holiday");}
        else if((my>=1282) && (mm==8) && (md==25)) {hs.push("National Day");}
        else if((mm==10) && (md==1)) {hs.push("Karen New Year's Day");}
        else if((mm==12) && (mp==1)) {hs.push("Tabaung Pwe");}
        //---------------------------------
        return hs;
    }
    //----------------------------------------------------------------------------
    static DoE(y) {
        var a,b,c,d,e,f,g,h,i,k,l,m,p,q,n;
        a=y%19;
        b=Math.floor(y/100); c=y%100;
        d=Math.floor(b/4); e=b%4;
        f=Math.floor((b+8)/25);
        g=Math.floor((b-f+1)/3);
        h=(19*a+b-d-g+15)%30;
        i=Math.floor(c/4); k=c%4;
        l=(32+2*e+2*i-h-k)%7;
        m=Math.floor((a+11*h+22*l)/451);
        q=h+l-7*m+114; p=(q%31)+1; n=Math.floor(q/31);
        return Math.round(DateTime.w2j(y,n,p,12,0,0,1));// this is for Gregorian
    }
    //----------------------------------------------------------------------------
    static cal_holiday2(jdn) {
        jdn=Math.round(jdn);
        var myt,my,mm,md,mp,mmt,gy,gm,gd;
        var yo=BurmeseDate.j2m(jdn);
        myt=yo.myt; my=yo.my; mm = yo.mm; md=yo.md;
        mp=BurmeseDate.cal_mp(md,mm,myt);
        mmt=Math.floor(mm/13); var hs=[];
        var go=DateTime.j2w(jdn);
        gy=go.y; gm=go.m; gd=go.d;
        //---------------------------------
        // holidays on gregorian calendar	
        var doe=BurmeseDate.DoE(gy);
        if((gy<=2017) && (gm==1) && (gd==1)) {hs.push("New Year's Day");}
        else if((gy>=1915) && (gm==2) && (gd==13)) {hs.push("G. Aung San BD");}
        else if((gy>=1969) && (gm==2) && (gd==14)) {hs.push("Valentines Day");}
        else if((gy>=1970) && (gm==4) && (gd==22)) {hs.push("Earth Day");}
        else if((gy>=1392) && (gm==4) && (gd==1)) {hs.push("April Fools' Day");}
        else if((gy>=1948) && (gm==5) && (gd==8)) {hs.push("Red Cross Day");}
        else if((gy>=1994) && (gm==10) && (gd==5)) {hs.push("World Teachers' Day");}
        else if((gy>=1947) && (gm==10) && (gd==24)) {hs.push("United Nations Day");}
        else if((gy>=1753) && (gm==10) && (gd==31)) {hs.push("Halloween");}
        if((gy>=1876) && (jdn==doe)) {hs.push("Easter");}
        else if((gy>=1876) && (jdn==(doe-2))) {hs.push("Good Friday");}
        //---------------------------------
        // holidays on myanmar calendar
        if((my>=1309) && (mm==11) && (md==16))
            {hs.push("Mon National Day");}//the ancient founding of Hanthawady
        else if((mm==9) && (md==1)) {
            hs.push("Shan New Year's Day");
            if(my>=1306) {hs.push("Authors' Day");}
        }//Nadaw waxing moon 1
        else if((mm==3) && (mp==1)) {hs.push("Mahathamaya Day");}//Nayon full moon
        else if((mm==6)&&(mp==1)){hs.push("Garudhamma Day");}//Tawthalin full moon
        else if((my>=1356) && (mm==10) && (mp==1))
            {hs.push("Mothers' Day");}//Pyatho full moon
        else if((my>=1370) && (mm==12) && (mp==1))
            {hs.push("Fathers' Day");}//Tabaung full moon
        else if((mm==5) && (mp==1)) {hs.push("Metta Day");}//Waguang full moon
        else if((mm==5) && (md==10)) {hs.push("Taungpyone Pwe");}//Taung Pyone Pwe
        else if((mm==5) && (md==23)) {hs.push("Yadanagu Pwe");}//Yadanagu Pwe
        //----------------------------------------------------------------------------
        return hs;
    }
    
    //-----------------------------------------------------------------------------
    static j2ms(jd,fs="&y &M &P &ff",tz=0)
    {	
        jd+=tz/24.0;
        var jdn=Math.round(jd);
        var myt,my,mm,md,mp,mf; 
        var yo=BurmeseDate.j2m(jdn);
        myt=yo.myt; my=yo.my; mm = yo.mm; md=yo.md;
        mp=BurmeseDate.cal_mp(md,mm,myt);
        mf=BurmeseDate.cal_mf(md);
        var mma=["First Waso","Tagu","Kason","Nayon","Waso","Wagaung","Tawthalin",
        "Thadingyut","Tazaungmon","Nadaw","Pyatho","Tabodwe","Tabaung","Late Tagu","Late Kason"];
        var mpa=["Waxing","Full Moon","Waning","New Moon"];
        // replace format string with values
        var fm=fs; var fstr,rstr,re;
        //--------------------------------------------------------
        fstr = "&yyyy"; re = new RegExp(fstr, 'g');
        rstr = "0000" + my.toString(); rstr = rstr.substr(rstr.length - 4); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        var sy=my+1182; //Sasana year
        fstr = "&YYYY"; re = new RegExp(fstr, 'g');
        rstr = "0000" + sy.toString(); rstr = rstr.substr(rstr.length - 4); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "&y";  re = new RegExp(fstr, 'g');
        rstr = my.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "&mm";  re = new RegExp(fstr, 'g');
        rstr = "00" + mm.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "&M";  re = new RegExp(fstr, 'g');
        rstr = mma[mm]; if(mm==4 && myt>0){rstr="Second "+rstr;} fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "&m";  re = new RegExp(fstr, 'g');
        rstr = mm.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "&P";  re = new RegExp(fstr, 'g');
        rstr = mpa[mp]; fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "&dd";  re = new RegExp(fstr, 'g');
        rstr = "00" + md.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "&d";  re = new RegExp(fstr, 'g');
        rstr = md.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "&ff";  re = new RegExp(fstr, 'g');
        rstr = "00" + mf.toString(); rstr = rstr.substr(rstr.length - 2); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        fstr = "&f";  re = new RegExp(fstr, 'g');
        rstr = mf.toString(); fm = fm.replace(re,rstr);
        //--------------------------------------------------------
        return fm;
    }
    //-------------------------------------------------------------------------
    // get properties
    
    // Myanmar year type
    get myt(){ 
        var yo=BurmeseDate.j2m(this.jdnl);
        return yo.myt;
    } 
    
    // Myanmar year
    get my(){ 
        var yo=BurmeseDate.j2m(this.jdnl);
        return yo.my;
    } 
    
    // Sasana year
    get sy(){ 
        return (this.my+1182);
    } 
    
    // Myanmar year name
    get my_name(){ 
        var yna=["Hpusha","Magha","Phalguni","Chitra",
            "Visakha","Jyeshtha","Ashadha","Sravana",
            "Bhadrapaha","Asvini","Krittika","Mrigasiras"];
        return yna[this.my%12];
    } 
    
    get mm(){ 
        var yo=BurmeseDate.j2m(this.jdnl);
        return yo.mm;
    } 
    
    // Myanmar day of the month [1-30]
    get md(){ 
        var yo=BurmeseDate.j2m(this.jdnl);
        return yo.md;
    } 
    
    // Moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon]
    get mp(){ 
        var yo=BurmeseDate.j2m(this.jdnl);
        return BurmeseDate.cal_mp(yo.md,yo.mm,yo.myt);
    } 
    
    // Fortnight day [1-15]
    get mf() {
        return BurmeseDate.cal_mf(this.md);
    }
    
    // Length of this Myanmar month
    get mmlen() {
        return BurmeseDate.cal_mml(this.mm,this.myt);
    }
    
    // get sabbath string
    get sabbath() {
        var yo=BurmeseDate.j2m(this.jdnl);
        var sb=BurmeseDate.cal_sabbath(yo.md,yo.mm,yo.myt);
        var str="";
        if(sb==1) str="Sabbath";
        else if(sb==2) str="Sabbath Eve";
        return str;
    }
    
    // get yatyaza string
    get yatyaza() {
        var v=BurmeseDate.cal_yatyaza(this.mm,this.w);
        return (v?"Yatyaza":"");
    }
    
    // get pyathada string
    get pyathada() {
        var v=BurmeseDate.cal_pyathada(this.mm,this.w);
        var pa=["","Pyathada","Afternoon Pyathada"];
        return pa[v%3];
    }
    
    // get nagahle direction
    get nagahle() {
        var v=BurmeseDate.cal_nagahle(this.mm);
        var pa=["West","North","East","South"];
        return pa[v%4];
    }
    
    // get mahabote
    get mahabote() {
        var v=BurmeseDate.cal_mahabote(this.my,this.w);
        var pa=["Binga","Atun","Yaza","Adipati","Marana","Thike","Puti"];
        return pa[v%7];
        }
    
    // get nakhat
    get nakhat() {
        var v = BurmeseDate.cal_nakhat(this.my);
        var pa = ["Ogre", "Elf", "Human"];
        return pa[v%3];
    }
    
    // get the array of astrological days
    get astro() {
        return BurmeseDate.cal_astro(this.jdnl);
    }
    
    // get the array of public holidays
    get holidays() {
        return BurmeseDate.cal_holiday(this.jdnl);
    }
    
    // get the array of other holidays
    get holidays2() {
        return BurmeseDate.cal_holiday2(this.jdnl);
    }
    
    ToMString(fs="&yyyy &M &P &ff") {
        return BurmeseDate.j2ms(this.jd,fs,this.tz);
    }
    
    } 

export {DateTime,burmeseDate}

