// opt/burmeseDate/burmeseDate.js
var DateTime = class _DateTime {
    constructor(m_jd, m_tz, m_ct = 0, m_SG = 2361222) {
        if (m_tz == void 0)
            this.m_tz = _DateTime.ltzoh();
        else
            this.m_tz = m_tz;
        if (m_jd == void 0)
            this.m_jd = _DateTime.jdnow();
        else
            this.m_jd = m_jd;
        this.m_ct = m_ct;
        this.m_SG = m_SG;
    }
    static j2w(jd, ct = 0, SG = 2361222) {
        var j, jf, y, m, d, h, n, s;
        if (ct == 2 || ct == 0 && jd < SG) {
            var b, c, f, e;
            j = Math.floor(jd + 0.5);
            jf = jd + 0.5 - j;
            b = j + 1524;
            c = Math.floor((b - 122.1) / 365.25);
            f = Math.floor(365.25 * c);
            e = Math.floor((b - f) / 30.6001);
            m = e > 13 ? e - 13 : e - 1;
            d = b - f - Math.floor(30.6001 * e);
            y = m < 3 ? c - 4715 : c - 4716;
        }
        else {
            j = Math.floor(jd + 0.5);
            jf = jd + 0.5 - j;
            j -= 1721119;
            y = Math.floor((4 * j - 1) / 146097);
            j = 4 * j - 1 - 146097 * y;
            d = Math.floor(j / 4);
            j = Math.floor((4 * d + 3) / 1461);
            d = 4 * d + 3 - 1461 * j;
            d = Math.floor((d + 4) / 4);
            m = Math.floor((5 * d - 3) / 153);
            d = 5 * d - 3 - 153 * m;
            d = Math.floor((d + 5) / 5);
            y = 100 * y + j;
            if (m < 10) {
                m += 3;
            }
            else {
                m -= 9;
                y = y + 1;
            }
        }
        jf *= 24;
        h = Math.floor(jf);
        jf = (jf - h) * 60;
        n = Math.floor(jf);
        s = (jf - n) * 60;
        return { y, m, d, h, n, s };
    }
    static t2d(h, n, s) {
        return (h - 12) / 24 + n / 1440 + s / 86400;
    }
    static w2j(y, m, d, h = 12, n = 0, s = 0, ct = 0, SG = 2361222) {
        var a = Math.floor((14 - m) / 12);
        y = y + 4800 - a;
        m = m + 12 * a - 3;
        var jd = d + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4);
        if (ct == 1)
            jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        else if (ct == 2)
            jd = jd - 32083;
        else {
            jd = jd - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
            if (jd < SG) {
                jd = d + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
                if (jd > SG)
                    jd = SG;
            }
        }
        return jd + _DateTime.t2d(h, n, s);
    }
    // convert unix timestamp to jd 
    static u2j(ut) {
        var jd = 24405875e-1 + ut / 86400;
        return jd;
    }
    //-------------------------------------------------------------------------
    // julian date to unix time
    static j2u(jd) {
        return (jd - 24405875e-1) * 86400 + 0.5;
    }
    //-------------------------------------------------------------------------
    // get current time in julian date
    static jdnow() {
        var dt = /* @__PURE__ */ new Date();
        var ut = dt.getTime() / 1e3;
        return _DateTime.u2j(ut);
    }
    //-------------------------------------------------------------------------
    // get local time zone offset between local time and UTC in days
    static ltzoh() {
        var dt = /* @__PURE__ */ new Date();
        var tz = dt.getTimezoneOffset() / 60;
        return -tz;
    }
    static j2s(jd, fs = "%Www %y-%mm-%dd %HH:%nn:%ss %zz", tz = 0, ct = 0, SG = 2361222) {
        jd += tz / 24;
        var dt = _DateTime.j2w(jd, ct, SG);
        var s = Math.floor(dt.s);
        var l = Math.floor((dt.s - s) * 1e3);
        var jdn = Math.floor(jd + 0.5);
        var wd = (jdn + 2) % 7;
        var h = dt.h % 12;
        if (h == 0)
            h = 12;
        var W = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        var M = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var fm = fs;
        var fstr, rstr, re;
        fstr = "%yyyy";
        re = new RegExp(fstr, "g");
        rstr = "0000" + dt.y.toString();
        rstr = rstr.substr(rstr.length - 4);
        fm = fm.replace(re, rstr);
        fstr = "%yy";
        var y = dt.y % 100;
        re = new RegExp(fstr, "g");
        rstr = "00" + y.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "%y";
        re = new RegExp(fstr, "g");
        rstr = dt.y.toString();
        fm = fm.replace(re, rstr);
        fstr = "%MMM";
        re = new RegExp(fstr, "g");
        rstr = M[dt.m - 1];
        rstr = rstr.substr(0, 3);
        rstr = rstr.toUpperCase();
        fm = fm.replace(re, rstr);
        fstr = "%Mmm";
        re = new RegExp(fstr, "g");
        rstr = M[dt.m - 1];
        rstr = rstr.substr(0, 3);
        fm = fm.replace(re, rstr);
        fstr = "%mm";
        re = new RegExp(fstr, "g");
        rstr = "00" + dt.m.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "%M";
        re = new RegExp(fstr, "g");
        rstr = M[dt.m - 1];
        fm = fm.replace(re, rstr);
        fstr = "%m";
        re = new RegExp(fstr, "g");
        rstr = dt.m.toString();
        fm = fm.replace(re, rstr);
        fstr = "%dd";
        re = new RegExp(fstr, "g");
        rstr = "00" + dt.d.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "%d";
        re = new RegExp(fstr, "g");
        rstr = dt.d.toString();
        fm = fm.replace(re, rstr);
        fstr = "%HH";
        re = new RegExp(fstr, "g");
        rstr = "00" + dt.h.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "%H";
        re = new RegExp(fstr, "g");
        rstr = dt.h.toString();
        fm = fm.replace(re, rstr);
        fstr = "%hh";
        re = new RegExp(fstr, "g");
        rstr = "00" + h.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "%h";
        re = new RegExp(fstr, "g");
        rstr = h.toString();
        fm = fm.replace(re, rstr);
        fstr = "%AA";
        re = new RegExp(fstr, "g");
        rstr = dt.h < 12 ? "AM" : "PM";
        fm = fm.replace(re, rstr);
        fstr = "%aa";
        re = new RegExp(fstr, "g");
        rstr = dt.h < 12 ? "am" : "pm";
        fm = fm.replace(re, rstr);
        fstr = "%nn";
        re = new RegExp(fstr, "g");
        rstr = "00" + dt.n.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "%n";
        re = new RegExp(fstr, "g");
        rstr = dt.n.toString();
        fm = fm.replace(re, rstr);
        fstr = "%ss";
        re = new RegExp(fstr, "g");
        rstr = "00" + s.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "%s";
        re = new RegExp(fstr, "g");
        rstr = s.toString();
        fm = fm.replace(re, rstr);
        fstr = "%lll";
        re = new RegExp(fstr, "g");
        rstr = "000" + l.toString();
        rstr = rstr.substr(rstr.length - 3);
        fm = fm.replace(re, rstr);
        fstr = "%l";
        re = new RegExp(fstr, "g");
        rstr = l.toString();
        fm = fm.replace(re, rstr);
        fstr = "%WWW";
        re = new RegExp(fstr, "g");
        rstr = W[wd];
        rstr = rstr.substr(0, 3);
        rstr = rstr.toUpperCase();
        fm = fm.replace(re, rstr);
        fstr = "%Www";
        re = new RegExp(fstr, "g");
        rstr = W[wd];
        rstr = rstr.substr(0, 3);
        fm = fm.replace(re, rstr);
        fstr = "%W";
        re = new RegExp(fstr, "g");
        rstr = W[wd];
        fm = fm.replace(re, rstr);
        fstr = "%w";
        re = new RegExp(fstr, "g");
        rstr = wd.toString();
        fm = fm.replace(re, rstr);
        fstr = "%zz";
        re = new RegExp(fstr, "g");
        var tzs = tz < 0 ? "-" : "+";
        var tzi = Math.floor(tz);
        var tzh = "00" + tzi.toString();
        tzh = tzh.substr(tzh.length - 2);
        rstr = tzs + tzh;
        var tzf = tz - tzi;
        if (tzf > 0) {
            tzh = "00" + Math.floor(tzf * 60 + 0.5).toString();
            tzh = tzh.substr(tzh.length - 2);
            rstr += ":" + tzh;
        }
        fm = fm.replace(re, rstr);
        return fm;
    }
    static s2j(tstr, tz = 0, ct = 0, SG = 2361222) {
        var str, pstr;
        var y = 0, m = 0, d = 0, h = 12, n = 0, s = 0, ls = 0;
        var jd = -1;
        str = _DateTime.GetDigits(tstr);
        if (str.length == 8 || str.length == 14 || str.length == 17) {
            pstr = str.substr(0, 4);
            y = parseInt(pstr);
            pstr = str.substr(4, 2);
            m = parseInt(pstr);
            pstr = str.substr(6, 2);
            d = parseInt(pstr);
            if (str.length == 14 || str.length == 17) {
                pstr = str.substr(8, 2);
                h = parseInt(pstr);
                pstr = str.substr(10, 2);
                n = parseInt(pstr);
                pstr = str.substr(12, 2);
                s = parseInt(pstr);
                if (str.length == 17) {
                    pstr = str.substr(14, 3);
                    ls = parseInt(pstr);
                    s += ls / 1e3;
                }
            }
            jd = _DateTime.w2j(y, m, d, h, n, s, ct, SG) - tz / 24;
        }
        return jd;
    }
    //-------------------------------------------------------------------------
    // set time zone in hours for this instance
    SetTimezone(tz) {
        if (tz == void 0) {
            this.m_tz = _DateTime.ltzoh();
        }
        else if (tz <= 14 || tz >= -12) {
            this.m_tz = tz;
        }
    }
    //-------------------------------------------------------------------------
    // set time to now
    Set2Now() {
        this.m_jd = _DateTime.jdnow();
    }
    //-------------------------------------------------------------------------
    // set time in jd
    SetJD(jd) {
        this.m_jd = jd;
    }
    //-------------------------------------------------------------------------
    // set in unix time
    SetUnixTime(ut) {
        this.m_jd = _DateTime.u2j(ut);
    }
    SetDateTime(year, month, day, hour = 12, minute = 0, second = 0, tz = 0, ct = 0, SG = 2361222) {
        this.m_jd = _DateTime.w2j(year, month, day, hour, minute, second, ct, SG) - tz / 24;
    }
    SetDateTimeString(tstr, tz = 0, ct = 0, SG = 2361222) {
        var jd = _DateTime.s2j(tstr, tz, ct, SG);
        if (jd >= 0)
            this.m_jd = jd;
    }
    //-------------------------------------------------------------------------
    // set calendar type [0=British (default), 1=Gregorian, 2=Julian]
    SetCT(ct) {
        ct = Math.round(ct % 3);
        this.m_ct = ct;
    }
    //-------------------------------------------------------------------------
    // set Beginning of Gregorian calendar in JDN [default=2361222]
    SetSG(sg) {
        sg = Math.round(sg);
        this.m_SG = sg;
    }
    ToString(fs = "%Www %y-%mm-%dd %HH:%nn:%ss %zz") {
        return _DateTime.j2s(this.m_jd, fs, this.m_tz, this.m_ct, this.m_SG);
    }
    //-------------------------------------------------------------------------
    // filter input string to get digits only
    static GetDigits(str) {
        var ostr = "";
        var len = str.length;
        var i = 0;
        if (len > 0) {
            for (i = 0; i < len; i++)
                if (str[i] >= "0" && str[i] <= "9")
                    ostr += str[i];
        }
        return ostr;
    }
    //-------------------------------------------------------------------------
    // get properties
    get jd() {
        return this.m_jd;
    }
    // julian date
    get jdl() {
        return this.m_jd + this.m_tz / 24;
    }
    // julian date for this time zone
    get jdn() {
        return Math.round(this.m_jd);
    }
    // julian date number
    get jdnl() {
        return Math.round(this.m_jd + this.m_tz / 24);
    }
    // julian date number for this time zone
    get y() {
        var dt = _DateTime.j2w(this.jdl, this.m_ct, this.m_SG);
        return dt.y;
    }
    // year
    get m() {
        var dt = _DateTime.j2w(this.jdl, this.m_ct, this.m_SG);
        return dt.m;
    }
    // month
    get d() {
        var dt = _DateTime.j2w(this.jdl, this.m_ct, this.m_SG);
        return dt.d;
    }
    // day
    get h() {
        var dt = _DateTime.j2w(this.jdl, this.m_ct, this.m_SG);
        return dt.h;
    }
    // hour [0-23]
    get n() {
        var dt = _DateTime.j2w(this.jdl, this.m_ct, this.m_SG);
        return dt.n;
    }
    // minute
    get s() {
        var dt = _DateTime.j2w(this.jdl, this.m_ct, this.m_SG);
        var s = Math.floor(dt.s);
        return s;
    }
    // second
    get l() {
        var dt = _DateTime.j2w(this.jdl, this.m_ct, this.m_SG);
        var s = Math.floor(dt.s);
        var l = Math.floor((dt.s - s) * 1e3);
        return l;
    }
    // millisecond
    get w() {
        return (this.jdnl + 2) % 7;
    }
    // weekday [0=sat, 1=sun, ..., 6=fri]
    get ut() {
        return _DateTime.j2u(this.m_jd);
    }
    // unix time
    get tz() {
        return this.m_tz;
    }
    // time zone 
    get ct() {
        return this.m_ct;
    }
    // calendar type
    get SG() {
        return this.m_SG;
    }
    // Beginning of Gregorian calendar in JDN [default=2361222]
    get mlen() {
        return _DateTime.wml(this.y, this.m, this.m_ct, this.m_SG);
    }
    // length of this month
    //----------------------------------------------------------------------------
    static wml(y, m, ct = 0, SG = 2361222) {
        var j1, j2;
        var m2 = m + 1;
        var y2 = y;
        if (m2 > 12) {
            y2++;
            m2 %= 12;
        }
        j1 = _DateTime.w2j(y, m, 1, 12, 0, 0, ct, SG);
        j2 = _DateTime.w2j(y2, m2, 1, 12, 0, 0, ct, SG);
        return j2 - j1;
    }
};
var burmeseDate = class _burmeseDate extends DateTime {
    //-------------------------------------------------------------------------
    constructor(m_jd, m_tz, m_ct = 0, m_SG = 2361222) {
        super(m_jd, m_tz, m_ct, m_SG);
    }
    //-------------------------------------------------------------------------
    static GetMyConst(my) {
        var EI, WO, NM, EW = 0, i;
        var fme, wte;
        if (my >= 1312) {
            EI = 3;
            WO = -0.5;
            NM = 8;
            fme = [[1377, 1]];
            wte = [1344, 1345];
        }
        else if (my >= 1217) {
            EI = 2;
            WO = -1;
            NM = 4;
            fme = [[1234, 1], [1261, -1]];
            wte = [1263, 1264];
        }
        else if (my >= 1100) {
            EI = 1.3;
            WO = -0.85;
            NM = -1;
            fme = [[1120, 1], [1126, -1], [1150, 1], [1172, -1], [1207, 1]];
            wte = [1201, 1202];
        }
        else if (my >= 798) {
            EI = 1.2;
            WO = -1.1;
            NM = -1;
            fme = [
                [813, -1],
                [849, -1],
                [851, -1],
                [854, -1],
                [927, -1],
                [933, -1],
                [936, -1],
                [938, -1],
                [949, -1],
                [952, -1],
                [963, -1],
                [968, -1],
                [1039, -1]
            ];
            wte = [];
        }
        else {
            EI = 1.1;
            WO = -1.1;
            NM = -1;
            fme = [
                [205, 1],
                [246, 1],
                [471, 1],
                [572, -1],
                [651, 1],
                [653, 2],
                [656, 1],
                [672, 1],
                [729, 1],
                [767, -1]
            ];
            wte = [];
        }
        i = _burmeseDate.bSearch2(my, fme);
        if (i >= 0)
            WO += fme[i][1];
        i = _burmeseDate.bSearch1(my, wte);
        if (i >= 0)
            EW = 1;
        return { EI, WO, NM, EW };
    }
    //----------------------------------------------------------------------------
    static bSearch2(k, A) {
        var i = 0;
        var l = 0;
        var u = A.length - 1;
        while (u >= l) {
            i = Math.floor((l + u) / 2);
            if (A[i][0] > k)
                u = i - 1;
            else if (A[i][0] < k)
                l = i + 1;
            else
                return i;
        }
        return -1;
    }
    //-----------------------------------------------------------------------------
    // Search a 1D array
    // input: (k=key,A=array)
    // output: (i=index)
    static bSearch1(k, A) {
        var i = 0;
        var l = 0;
        var u = A.length - 1;
        while (u >= l) {
            i = Math.floor((l + u) / 2);
            if (A[i] > k)
                u = i - 1;
            else if (A[i] < k)
                l = i + 1;
            else
                return i;
        }
        return -1;
    }
    //-------------------------------------------------------------------------
    static cal_watat(my) {
        var SY = 1577917828 / 432e4;
        var LM = 1577917828 / 53433336;
        var MO = 1954168050623e-6;
        var c = _burmeseDate.GetMyConst(my);
        var TA = (SY / 12 - LM) * (12 - c.NM);
        var ed = SY * (my + 3739) % LM;
        if (ed < TA)
            ed += LM;
        var fm = Math.round(SY * my + MO - ed + 4.5 * LM + c.WO);
        var TW = 0, watat = 0;
        if (c.EI >= 2) {
            TW = LM - (SY / 12 - LM) * c.NM;
            if (ed >= TW)
                watat = 1;
        }
        else {
            watat = (my * 7 + 2) % 19;
            if (watat < 0)
                watat += 19;
            watat = Math.floor(watat / 12);
        }
        watat ^= c.EW;
        return { fm, watat };
    }
    //-------------------------------------------------------------------------
    static cal_my(my) {
        var yd = 0, y1, nd = 0, werr = 0, fm = 0;
        var y2 = BurmeseDate.cal_watat(my);
        var myt = y2.watat;
        do {
            yd++;
            y1 = BurmeseDate.cal_watat(my - yd);
        } while (y1.watat == 0 && yd < 3);
        if (myt) {
            nd = (y2.fm - y1.fm) % 354;
            myt = Math.floor(nd / 31) + 1;
            fm = y2.fm;
            if (nd != 30 && nd != 31) {
                werr = 1;
            }
        }
        else
            fm = y1.fm + 354 * yd;
        var tg1 = y1.fm + 354 * yd - 102;
        return { myt, tg1, fm, werr };
    }
    //-------------------------------------------------------------------------
    static j2m(jdn) {
        jdn = Math.round(jdn);
        var SY = 1577917828 / 432e4;
        var MO = 1954168050623e-6;
        var my, yo, dd, myl, mmt, a, b, c, e, f, mm, md;
        my = Math.floor((jdn - 0.5 - MO) / SY);
        yo = BurmeseDate.cal_my(my);
        dd = jdn - yo.tg1 + 1;
        b = Math.floor(yo.myt / 2);
        c = Math.floor(1 / (yo.myt + 1));
        myl = 354 + (1 - c) * 30 + b;
        mmt = Math.floor((dd - 1) / myl);
        dd -= mmt * myl;
        a = Math.floor((dd + 423) / 512);
        mm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);
        e = Math.floor((mm + 12) / 16);
        f = Math.floor((mm + 11) / 16);
        md = dd - Math.floor(29.544 * mm - 29.26) - b * e + c * f * 30;
        mm += f * 3 - e * 4 + 12 * mmt;
        return { myt: yo.myt, my, mm, md };
    }
    //-------------------------------------------------------------------------
    static cal_mp(md, mm, myt) {
        var mml = _burmeseDate.cal_mml(mm, myt);
        return Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / mml);
    }
    //-------------------------------------------------------------------------
    static cal_mml(mm, myt) {
        var mml = 30 - mm % 2;
        if (mm == 3)
            mml += Math.floor(myt / 2);
        return mml;
    }
    //-------------------------------------------------------------------------
    static cal_myl(myt) {
        return 354 + (1 - Math.floor(1 / (myt + 1))) * 30 + Math.floor(myt / 2);
    }
    //-------------------------------------------------------------------------
    static cal_mf(md) {
        return md - 15 * Math.floor(md / 16);
    }
    //-------------------------------------------------------------------------
    static cal_md(mf, mp, mm, myt) {
        var mml = _burmeseDate.cal_mml(mm, myt);
        var m1 = mp % 2;
        var m2 = Math.floor(mp / 2);
        return m1 * (15 + m2 * (mml - 15)) + (1 - m1) * (mf + 15 * m2);
    }
    //-------------------------------------------------------------------------
    static m2j(my, mm, md) {
        var b, c, dd, myl, mmt;
        var yo = _burmeseDate.cal_my(my);
        mmt = Math.floor(mm / 13);
        mm = mm % 13 + mmt;
        b = Math.floor(yo.myt / 2);
        c = 1 - Math.floor((yo.myt + 1) / 2);
        mm += 4 - Math.floor((mm + 15) / 16) * 4 + Math.floor((mm + 12) / 16);
        dd = md + Math.floor(29.544 * mm - 29.26) - c * Math.floor((mm + 11) / 16) * 30 + b * Math.floor((mm + 12) / 16);
        myl = 354 + (1 - c) * 30 + b;
        dd += mmt * myl;
        return dd + yo.tg1 - 1;
    }
    //-------------------------------------------------------------------------
    SetMDateTime(my, mm, md, hour = 12, minute = 0, second = 0, tz = 0) {
        this.m_jd = _burmeseDate.m2j(my, mm, md) + DateTime.t2d(hour, minute, second) - tz / 24;
    }
    //-------------------------------------------------------------------------
    static cal_sabbath(md, mm, myt) {
        var mml = _burmeseDate.cal_mml(mm, myt);
        var s = 0;
        if (md == 8 || md == 15 || md == 23 || md == mml)
            s = 1;
        if (md == 7 || md == 14 || md == 22 || md == mml - 1)
            s = 2;
        return s;
    }
    //-------------------------------------------------------------------------
    static cal_yatyaza(mm, wd) {
        var m1 = mm % 4;
        var yatyaza = 0;
        var wd1 = Math.floor(m1 / 2) + 4;
        var wd2 = (1 - Math.floor(m1 / 2) + m1 % 2) * (1 + 2 * (m1 % 2));
        if (wd == wd1 || wd == wd2)
            yatyaza = 1;
        return yatyaza;
    }
    //-------------------------------------------------------------------------
    static cal_pyathada(mm, wd) {
        var m1 = mm % 4;
        var pyathada = 0;
        var wda = [1, 3, 3, 0, 2, 1, 2];
        if (m1 == 0 && wd == 4)
            pyathada = 2;
        if (m1 == wda[wd])
            pyathada = 1;
        return pyathada;
    }
    //-------------------------------------------------------------------------
    static cal_nagahle(mm) {
        if (mm <= 0)
            mm = 4;
        return Math.floor(mm % 12 / 3);
    }
    //-------------------------------------------------------------------------
    static cal_mahabote(my, wd) {
        return (my - wd) % 7;
    }
    //-------------------------------------------------------------------------
    // nakhat 
    // input: ( my = year )
    // output: ( [0=Ogre, 1=Elf, 2=Human] )
    static cal_nakhat(my) {
        return my % 3;
    }
    //-------------------------------------------------------------------------
    static cal_thamanyo(mm, wd) {
        var mmt = Math.floor(mm / 13);
        mm = mm % 13 + mmt;
        if (mm <= 0)
            mm = 4;
        var thamanyo = 0;
        var m1 = mm - 1 - Math.floor(mm / 9);
        var wd1 = (m1 * 2 - Math.floor(m1 / 8)) % 7;
        var wd2 = (wd + 7 - wd1) % 7;
        if (wd2 <= 1)
            thamanyo = 1;
        return thamanyo;
    }
    //-------------------------------------------------------------------------
    static cal_amyeittasote(md, wd) {
        var mf = md - 15 * Math.floor(md / 16);
        var amyeittasote = 0;
        var wda = [5, 8, 3, 7, 2, 4, 1];
        if (mf == wda[wd])
            amyeittasote = 1;
        return amyeittasote;
    }
    //-------------------------------------------------------------------------
    static cal_warameittugyi(md, wd) {
        var mf = md - 15 * Math.floor(md / 16);
        var warameittugyi = 0;
        var wda = [7, 1, 4, 8, 9, 6, 3];
        if (mf == wda[wd])
            warameittugyi = 1;
        return warameittugyi;
    }
    //-------------------------------------------------------------------------
    static cal_warameittunge(md, wd) {
        var mf = md - 15 * Math.floor(md / 16);
        var warameittunge = 0;
        var wn = (wd + 6) % 7;
        if (12 - mf == wn)
            warameittunge = 1;
        return warameittunge;
    }
    //-------------------------------------------------------------------------
    static cal_yatpote(md, wd) {
        var mf = md - 15 * Math.floor(md / 16);
        var yatpote = 0;
        var wda = [8, 1, 4, 6, 9, 8, 7];
        if (mf == wda[wd])
            yatpote = 1;
        return yatpote;
    }
    //-------------------------------------------------------------------------
    static cal_thamaphyu(md, wd) {
        var mf = md - 15 * Math.floor(md / 16);
        var thamaphyu = 0;
        var wda = [1, 2, 6, 6, 5, 6, 7];
        if (mf == wda[wd])
            thamaphyu = 1;
        var wdb = [0, 1, 0, 0, 0, 3, 3];
        if (mf == wdb[wd])
            thamaphyu = 1;
        if (mf == 4 && wd == 5)
            thamaphyu = 1;
        return thamaphyu;
    }
    //-------------------------------------------------------------------------
    static cal_nagapor(md, wd) {
        var nagapor = 0;
        var wda = [26, 21, 2, 10, 18, 2, 21];
        if (md == wda[wd])
            nagapor = 1;
        var wdb = [17, 19, 1, 0, 9, 0, 0];
        if (md == wdb[wd])
            nagapor = 1;
        if (md == 2 && wd == 1 || (md == 12 || md == 4 || md == 18) && wd == 2)
            nagapor = 1;
        return nagapor;
    }
    //-------------------------------------------------------------------------
    static cal_yatyotema(mm, md) {
        var mmt = Math.floor(mm / 13);
        mm = mm % 13 + mmt;
        if (mm <= 0)
            mm = 4;
        var mf = md - 15 * Math.floor(md / 16);
        var yatyotema = 0;
        var m1 = mm % 2 ? mm : (mm + 9) % 12;
        m1 = (m1 + 4) % 12 + 1;
        if (mf == m1)
            yatyotema = 1;
        return yatyotema;
    }
    //-------------------------------------------------------------------------
    static cal_mahayatkyan(mm, md) {
        if (mm <= 0)
            mm = 4;
        var mf = md - 15 * Math.floor(md / 16);
        var mahayatkyan = 0;
        var m1 = (Math.floor(mm % 12 / 2) + 4) % 6 + 1;
        if (mf == m1)
            mahayatkyan = 1;
        return mahayatkyan;
    }
    //-------------------------------------------------------------------------
    static cal_shanyat(mm, md) {
        var mmt = Math.floor(mm / 13);
        mm = mm % 13 + mmt;
        if (mm <= 0)
            mm = 4;
        var mf = md - 15 * Math.floor(md / 16);
        var shanyat = 0;
        var sya = [8, 8, 2, 2, 9, 3, 3, 5, 1, 4, 7, 4];
        if (mf == sya[mm - 1])
            shanyat = 1;
        return shanyat;
    }
    //-------------------------------------------------------------------------
    static cal_astro(jdn) {
        jdn = Math.round(jdn);
        var myt, my, mm, md;
        var hs = [];
        var yo = _burmeseDate.j2m(jdn);
        myt = yo.myt;
        my = yo.my;
        mm = yo.mm;
        md = yo.md;
        var wd = (jdn + 2) % 7;
        if (_burmeseDate.cal_thamanyo(mm, wd)) {
            hs.push("Thamanyo");
        }
        if (_burmeseDate.cal_amyeittasote(md, wd)) {
            hs.push("Amyeittasote");
        }
        if (_burmeseDate.cal_warameittugyi(md, wd)) {
            hs.push("Warameittugyi");
        }
        if (_burmeseDate.cal_warameittunge(md, wd)) {
            hs.push("Warameittunge");
        }
        if (_burmeseDate.cal_yatpote(md, wd)) {
            hs.push("Yatpote");
        }
        if (_burmeseDate.cal_thamaphyu(md, wd)) {
            hs.push("Thamaphyu");
        }
        if (_burmeseDate.cal_nagapor(md, wd)) {
            hs.push("Nagapor");
        }
        if (_burmeseDate.cal_yatyotema(mm, md)) {
            hs.push("Yatyotema");
        }
        if (_burmeseDate.cal_mahayatkyan(mm, md)) {
            hs.push("Mahayatkyan");
        }
        if (_burmeseDate.cal_shanyat(mm, md)) {
            hs.push("Shanyat");
        }
        return hs;
    }
    static cal_holiday(jdn) {
        jdn = Math.round(jdn);
        var myt, my, mm, md, mp, mmt, gy, gm, gd;
        var yo = _burmeseDate.j2m(jdn);
        myt = yo.myt;
        my = yo.my;
        mm = yo.mm;
        md = yo.md;
        mp = _burmeseDate.cal_mp(md, mm, myt);
        mmt = Math.floor(mm / 13);
        var hs = [];
        var go = DateTime.j2w(jdn);
        gy = go.y;
        gm = go.m;
        gd = go.d;
        var SY = 1577917828 / 432e4;
        var MO = 1954168050623e-6;
        var BGNTG = 1100, SE3 = 1312;
        var akn, atn, ja, jk;
        ja = SY * (my + mmt) + MO;
        if (my >= SE3)
            jk = ja - 2.169918982;
        else
            jk = ja - 2.1675;
        akn = Math.round(jk);
        atn = Math.round(ja);
        if (jdn == atn + 1) {
            hs.push("Myanmar New Year's Day");
        }
        if (my + mmt >= BGNTG) {
            if (jdn == atn) {
                hs.push("Thingyan Atat");
            }
            else if (jdn > akn && jdn < atn) {
                hs.push("Thingyan Akyat");
            }
            else if (jdn == akn) {
                hs.push("Thingyan Akya");
            }
            else if (jdn == akn - 1) {
                hs.push("Thingyan Akyo");
            }
            else if (my + mmt >= 1369 && my + mmt < 1379 && (jdn == akn - 2 || jdn >= atn + 2 && jdn <= akn + 7)) {
                hs.push("Holiday");
            }
        }
        if (gy >= 2018 && gm == 1 && gd == 1) {
            hs.push("New Year's Day");
        }
        else if (gy >= 1948 && gm == 1 && gd == 4) {
            hs.push("Independence Day");
        }
        else if (gy >= 1947 && gm == 2 && gd == 12) {
            hs.push("Union Day");
        }
        else if (gy >= 1958 && gm == 3 && gd == 2) {
            hs.push("Peasants' Day");
        }
        else if (gy >= 1945 && gm == 3 && gd == 27) {
            hs.push("Resistance Day");
        }
        else if (gy >= 1923 && gm == 5 && gd == 1) {
            hs.push("Labour Day");
        }
        else if (gy >= 1947 && gm == 7 && gd == 19) {
            hs.push("Martyrs' Day");
        }
        else if (gy >= 1752 && gm == 12 && gd == 25) {
            hs.push("Christmas Day");
        }
        else if (gy == 2017 && gm == 12 && gd == 30) {
            hs.push("Holiday");
        }
        else if (gy >= 2017 && gm == 12 && gd == 31) {
            hs.push("Holiday");
        }
        if (mm == 2 && mp == 1) {
            hs.push("Buddha Day");
        }
        else if (mm == 4 && mp == 1) {
            hs.push("Start of Buddhist Lent");
        }
        else if (mm == 7 && mp == 1) {
            hs.push("End of Buddhist Lent");
        }
        else if (my >= 1379 && mm == 7 && (md == 14 || md == 16)) {
            hs.push("Holiday");
        }
        else if (mm == 8 && mp == 1) {
            hs.push("Tazaungdaing");
        }
        else if (my >= 1379 && mm == 8 && md == 14) {
            hs.push("Holiday");
        }
        else if (my >= 1282 && mm == 8 && md == 25) {
            hs.push("National Day");
        }
        else if (mm == 10 && md == 1) {
            hs.push("Karen New Year's Day");
        }
        else if (mm == 12 && mp == 1) {
            hs.push("Tabaung Pwe");
        }
        return hs;
    }
    //----------------------------------------------------------------------------
    static DoE(y) {
        var a, b, c, d, e, f, g, h, i, k, l, m, p, q, n;
        a = y % 19;
        b = Math.floor(y / 100);
        c = y % 100;
        d = Math.floor(b / 4);
        e = b % 4;
        f = Math.floor((b + 8) / 25);
        g = Math.floor((b - f + 1) / 3);
        h = (19 * a + b - d - g + 15) % 30;
        i = Math.floor(c / 4);
        k = c % 4;
        l = (32 + 2 * e + 2 * i - h - k) % 7;
        m = Math.floor((a + 11 * h + 22 * l) / 451);
        q = h + l - 7 * m + 114;
        p = q % 31 + 1;
        n = Math.floor(q / 31);
        return Math.round(DateTime.w2j(y, n, p, 12, 0, 0, 1));
    }
    //----------------------------------------------------------------------------
    static cal_holiday2(jdn) {
        jdn = Math.round(jdn);
        var myt, my, mm, md, mp, mmt, gy, gm, gd;
        var yo = _burmeseDate.j2m(jdn);
        myt = yo.myt;
        my = yo.my;
        mm = yo.mm;
        md = yo.md;
        mp = _burmeseDate.cal_mp(md, mm, myt);
        mmt = Math.floor(mm / 13);
        var hs = [];
        var go = DateTime.j2w(jdn);
        gy = go.y;
        gm = go.m;
        gd = go.d;
        var doe = _burmeseDate.DoE(gy);
        if (gy <= 2017 && gm == 1 && gd == 1) {
            hs.push("New Year's Day");
        }
        else if (gy >= 1915 && gm == 2 && gd == 13) {
            hs.push("G. Aung San BD");
        }
        else if (gy >= 1969 && gm == 2 && gd == 14) {
            hs.push("Valentines Day");
        }
        else if (gy >= 1970 && gm == 4 && gd == 22) {
            hs.push("Earth Day");
        }
        else if (gy >= 1392 && gm == 4 && gd == 1) {
            hs.push("April Fools' Day");
        }
        else if (gy >= 1948 && gm == 5 && gd == 8) {
            hs.push("Red Cross Day");
        }
        else if (gy >= 1994 && gm == 10 && gd == 5) {
            hs.push("World Teachers' Day");
        }
        else if (gy >= 1947 && gm == 10 && gd == 24) {
            hs.push("United Nations Day");
        }
        else if (gy >= 1753 && gm == 10 && gd == 31) {
            hs.push("Halloween");
        }
        if (gy >= 1876 && jdn == doe) {
            hs.push("Easter");
        }
        else if (gy >= 1876 && jdn == doe - 2) {
            hs.push("Good Friday");
        }
        if (my >= 1309 && mm == 11 && md == 16) {
            hs.push("Mon National Day");
        }
        else if (mm == 9 && md == 1) {
            hs.push("Shan New Year's Day");
            if (my >= 1306) {
                hs.push("Authors' Day");
            }
        }
        else if (mm == 3 && mp == 1) {
            hs.push("Mahathamaya Day");
        }
        else if (mm == 6 && mp == 1) {
            hs.push("Garudhamma Day");
        }
        else if (my >= 1356 && mm == 10 && mp == 1) {
            hs.push("Mothers' Day");
        }
        else if (my >= 1370 && mm == 12 && mp == 1) {
            hs.push("Fathers' Day");
        }
        else if (mm == 5 && mp == 1) {
            hs.push("Metta Day");
        }
        else if (mm == 5 && md == 10) {
            hs.push("Taungpyone Pwe");
        }
        else if (mm == 5 && md == 23) {
            hs.push("Yadanagu Pwe");
        }
        return hs;
    }
    //-----------------------------------------------------------------------------
    static j2ms(jd, fs = "&y &M &P &ff", tz = 0) {
        jd += tz / 24;
        var jdn = Math.round(jd);
        var myt, my, mm, md, mp, mf;
        var yo = _burmeseDate.j2m(jdn);
        myt = yo.myt;
        my = yo.my;
        mm = yo.mm;
        md = yo.md;
        mp = _burmeseDate.cal_mp(md, mm, myt);
        mf = _burmeseDate.cal_mf(md);
        var mma = [
            "First Waso",
            "Tagu",
            "Kason",
            "Nayon",
            "Waso",
            "Wagaung",
            "Tawthalin",
            "Thadingyut",
            "Tazaungmon",
            "Nadaw",
            "Pyatho",
            "Tabodwe",
            "Tabaung",
            "Late Tagu",
            "Late Kason"
        ];
        var mpa = ["Waxing", "Full Moon", "Waning", "New Moon"];
        var fm = fs;
        var fstr, rstr, re;
        fstr = "&yyyy";
        re = new RegExp(fstr, "g");
        rstr = "0000" + my.toString();
        rstr = rstr.substr(rstr.length - 4);
        fm = fm.replace(re, rstr);
        var sy = my + 1182;
        fstr = "&YYYY";
        re = new RegExp(fstr, "g");
        rstr = "0000" + sy.toString();
        rstr = rstr.substr(rstr.length - 4);
        fm = fm.replace(re, rstr);
        fstr = "&y";
        re = new RegExp(fstr, "g");
        rstr = my.toString();
        fm = fm.replace(re, rstr);
        fstr = "&mm";
        re = new RegExp(fstr, "g");
        rstr = "00" + mm.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "&M";
        re = new RegExp(fstr, "g");
        rstr = mma[mm];
        if (mm == 4 && myt > 0) {
            rstr = "Second " + rstr;
        }
        fm = fm.replace(re, rstr);
        fstr = "&m";
        re = new RegExp(fstr, "g");
        rstr = mm.toString();
        fm = fm.replace(re, rstr);
        fstr = "&P";
        re = new RegExp(fstr, "g");
        rstr = mpa[mp];
        fm = fm.replace(re, rstr);
        fstr = "&dd";
        re = new RegExp(fstr, "g");
        rstr = "00" + md.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "&d";
        re = new RegExp(fstr, "g");
        rstr = md.toString();
        fm = fm.replace(re, rstr);
        fstr = "&ff";
        re = new RegExp(fstr, "g");
        rstr = "00" + mf.toString();
        rstr = rstr.substr(rstr.length - 2);
        fm = fm.replace(re, rstr);
        fstr = "&f";
        re = new RegExp(fstr, "g");
        rstr = mf.toString();
        fm = fm.replace(re, rstr);
        return fm;
    }
    //-------------------------------------------------------------------------
    // get properties
    // Myanmar year type
    get myt() {
        var yo = _burmeseDate.j2m(this.jdnl);
        return yo.myt;
    }
    // Myanmar year
    get my() {
        var yo = _burmeseDate.j2m(this.jdnl);
        return yo.my;
    }
    // Sasana year
    get sy() {
        return this.my + 1182;
    }
    // Myanmar year name
    get my_name() {
        var yna = [
            "Hpusha",
            "Magha",
            "Phalguni",
            "Chitra",
            "Visakha",
            "Jyeshtha",
            "Ashadha",
            "Sravana",
            "Bhadrapaha",
            "Asvini",
            "Krittika",
            "Mrigasiras"
        ];
        return yna[this.my % 12];
    }
    get mm() {
        var yo = burmeseDateurmeseDate.j2m(this.jdnl);
        return yo.mm;
    }
    // Myanmar day of the month [1-30]
    get md() {
        var yo = _burmeseDate.j2m(this.jdnl);
        return yo.md;
    }
    // Moon phase [0=waxing, 1=full moon, 2=waning, 3=new moon]
    get mp() {
        var yo = _burmeseDate.j2m(this.jdnl);
        return _burmeseDate.cal_mp(yo.md, yo.mm, yo.myt);
    }
    // Fortnight day [1-15]
    get mf() {
        return _burmeseDate.cal_mf(this.md);
    }
    // Length of this Myanmar month
    get mmlen() {
        return _burmeseDate.cal_mml(this.mm, this.myt);
    }
    // get sabbath string
    get sabbath() {
        var yo = _burmeseDate.j2m(this.jdnl);
        var sb = _burmeseDate.cal_sabbath(yo.md, yo.mm, yo.myt);
        var str = "";
        if (sb == 1)
            str = "Sabbath";
        else if (sb == 2)
            str = "Sabbath Eve";
        return str;
    }
    // get yatyaza string
    get yatyaza() {
        var v = _burmeseDate.cal_yatyaza(this.mm, this.w);
        return v ? "Yatyaza" : "";
    }
    // get pyathada string
    get pyathada() {
        var v = _burmeseDate.cal_pyathada(this.mm, this.w);
        var pa = ["", "Pyathada", "Afternoon Pyathada"];
        return pa[v % 3];
    }
    // get nagahle direction
    get nagahle() {
        var v = _burmeseDate.cal_nagahle(this.mm);
        var pa = ["West", "North", "East", "South"];
        return pa[v % 4];
    }
    // get mahabote
    get mahabote() {
        var v = _burmeseDate.cal_mahabote(this.my, this.w);
        var pa = ["Binga", "Atun", "Yaza", "Adipati", "Marana", "Thike", "Puti"];
        return pa[v % 7];
    }
    // get nakhat
    get nakhat() {
        var v = _burmeseDate.cal_nakhat(this.my);
        var pa = ["Ogre", "Elf", "Human"];
        return pa[v % 3];
    }
    // get the array of astrological days
    get astro() {
        return _burmeseDate.cal_astro(this.jdnl);
    }
    // get the array of public holidays
    get holidays() {
        return _burmeseDate.cal_holiday(this.jdnl);
    }
    // get the array of other holidays
    get holidays2() {
        return _burmeseDate.cal_holiday2(this.jdnl);
    }
    ToMString(fs = "&yyyy &M &P &ff") {
        return _burmeseDate.j2ms(this.jd, fs, this.tz);
    }
};
// opt/burmeseDate/translate.ts
var translate = ({ text, lang }) => {
    const a = [
        [
            " ",
            "Myanmar Year",
            "\u1019\u103C\u1014\u103A\u1019\u102C\u1014\u103E\u1005\u103A"
        ],
        [
            " ",
            "Good Friday",
            "\u101E\u1031\u102C\u1000\u103C\u102C\u1014\u1031\u1037\u1000\u103C\u102E\u1038"
        ],
        [
            " ",
            "New Year's",
            "\u1014\u103E\u1005\u103A\u1006\u1014\u103A\u1038"
        ],
        [
            " ",
            "Independence",
            "\u101C\u103D\u1010\u103A\u101C\u1015\u103A\u101B\u1031\u1038"
        ],
        [
            " ",
            "Union",
            "\u1015\u103C\u100A\u103A\u1011\u1031\u102C\u1004\u103A\u1005\u102F"
        ],
        [
            " ",
            "Peasants'",
            "\u1010\u1031\u102C\u1004\u103A\u101E\u1030\u101C\u101A\u103A\u101E\u1019\u102C\u1038"
        ],
        [
            " ",
            "Resistance",
            "\u1010\u1031\u102C\u103A\u101C\u103E\u1014\u103A\u101B\u1031\u1038"
        ],
        [
            " ",
            "Labour",
            "\u1021\u101C\u102F\u1015\u103A\u101E\u1019\u102C\u1038"
        ],
        [
            " ",
            "Martyrs'",
            "\u1021\u102C\u1007\u102C\u1014\u100A\u103A"
        ],
        [
            " ",
            "Christmas",
            "\u1001\u101B\u1005\u1039\u1005\u1019\u1010\u103A"
        ],
        [
            " ",
            "Buddha",
            "\u1017\u102F\u1012\u1039\u1013"
        ],
        [
            " ",
            "Start of Buddhist Lent",
            "\u1013\u1019\u1039\u1019\u1005\u1000\u103C\u102C\u1014\u1031\u1037"
        ],
        [
            " ",
            "End of Buddhist Lent",
            "\u1019\u102E\u1038\u1011\u103D\u1014\u103A\u1038\u1015\u103D\u1032"
        ],
        [
            " ",
            "Tazaungdaing",
            "\u1010\u1014\u103A\u1006\u1031\u102C\u1004\u103A\u1010\u102D\u102F\u1004\u103A"
        ],
        [
            " ",
            "National",
            "\u1021\u1019\u103B\u102D\u102F\u1038\u101E\u102C\u1038"
        ],
        [
            " ",
            "Karen",
            "\u1000\u101B\u1004\u103A"
        ],
        [
            " ",
            "Pwe",
            "\u1015\u103D\u1032"
        ],
        [
            " ",
            "Thingyan",
            "\u101E\u1004\u103A\u1039\u1000\u103C\u1014\u103A"
        ],
        [
            " ",
            "Akyo",
            "\u1021\u1000\u103C\u102D\u102F"
        ],
        [
            " ",
            "Akyat",
            "\u1021\u1000\u103C\u1010\u103A"
        ],
        [
            " ",
            "Akya",
            "\u1021\u1000\u103B"
        ],
        [
            " ",
            "Atat",
            "\u1021\u1010\u1000\u103A"
        ],
        [
            " ",
            "Amyeittasote"
        ],
        [
            " ",
            "Warameittugyi",
            "\u101D\u102B\u101B\u1019\u102D\u1010\u1039\u1010\u102F\u1000\u103C\u102E\u1038"
        ],
        [
            " ",
            "Warameittunge",
            "\u101D\u102B\u101B\u1019\u102D\u1010\u1039\u1010\u102F\u1004\u101A\u103A"
        ],
        [
            " ",
            "Thamaphyu",
            "\u101E\u1019\u102C\u1038\u1016\u103C\u1030"
        ],
        [
            " ",
            "Thamanyo",
            "\u101E\u1019\u102C\u1038\u100A\u102D\u102F"
        ],
        [
            " ",
            "Yatpote",
            "\u101B\u1000\u103A\u1015\u102F\u1015\u103A"
        ],
        [
            " ",
            "Yatyotema",
            "\u101B\u1000\u103A\u101A\u102F\u1010\u103A\u1019\u102C"
        ],
        [
            " ",
            "Mahayatkyan",
            "\u1019\u101F\u102C\u101B\u1000\u103A\u1000\u103C\u1019\u103A\u1038"
        ],
        [
            " ",
            "Nagapor",
            "\u1014\u1002\u102B\u1038\u1015\u1031\u102B\u103A"
        ],
        [
            " ",
            "Shanyat",
            "\u101B\u103E\u1019\u103A\u1038\u101B\u1000\u103A"
        ],
        [
            " ",
            "Mooon",
            "\u1019\u103D\u1014\u103A"
        ],
        [
            " ",
            "G. Aung San BD",
            "\u1017\u102D\u102F\u101C\u103A\u1001\u103B\u102F\u1015\u103A\u1019\u103D\u1031\u1038\u1014\u1031\u1037"
        ],
        [
            " ",
            "Valentines",
            "\u1001\u103B\u1005\u103A\u101E\u1030\u1019\u103B\u102C\u1038"
        ],
        [
            " ",
            "Earth",
            "\u1000\u1019\u1039\u1018\u102C\u1019\u103C\u1031"
        ],
        [
            " ",
            "April Fools'",
            "\u1027\u1015\u103C\u102E\u1021\u101B\u1030\u1038"
        ],
        [
            " ",
            "Red Cross",
            "\u1000\u103C\u1000\u103A\u1001\u103C\u1031\u1014\u102E"
        ],
        [
            " ",
            "United Nations",
            "\u1000\u102F\u101C\u101E\u1019\u1039\u1019\u1002\u1039\u1002"
        ],
        [
            " ",
            "Halloween",
            "\u101E\u101B\u1032\u1014\u1031\u1037"
        ],
        [
            " ",
            "Shan",
            "\u101B\u103E\u1019\u103A\u1038"
        ],
        [
            " ",
            "Mothers'",
            "\u1021\u1019\u1031\u1019\u103B\u102C\u1038"
        ],
        [
            " ",
            "Fathers'",
            "\u1021\u1016\u1031\u1019\u103B\u102C\u1038"
        ],
        [
            " ",
            "Sasana Year",
            "\u101E\u102C\u101E\u1014\u102C\u1014\u103E\u1005\u103A"
        ],
        [
            " ",
            "Eid",
            "\u1021\u102D\u1012\u103A"
        ],
        [
            " ",
            "Diwali",
            "\u1012\u102E\u101D\u102B\u101C\u102E"
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
            "\u1019\u1031\u1010\u1039\u1010\u102C"
        ],
        [
            " ",
            "Taungpyone",
            "\u1010\u1031\u102C\u1004\u103A\u1015\u103C\u102F\u1014\u103A\u1038"
        ],
        [
            " ",
            "Yadanagu",
            "\u101B\u1010\u1014\u102C\u1037\u1002\u1030"
        ],
        [
            " ",
            "Authors'",
            "\u1005\u102C\u1006\u102D\u102F\u1010\u1031\u102C\u103A"
        ],
        [
            " ",
            "World",
            "\u1000\u1019\u1039\u1018\u102C\u1037"
        ],
        [
            " ",
            "Teachers'",
            "\u1006\u101B\u102C\u1019\u103B\u102C\u1038"
        ],
        [
            " ",
            "Holiday",
            "\u101B\u102F\u1036\u1038\u1015\u102D\u1010\u103A\u101B\u1000\u103A"
        ],
        [
            " ",
            "Chinese",
            "\u1010\u101B\u102F\u1010\u103A"
        ],
        [
            " ",
            "Easter",
            "\u1011\u1019\u103C\u1031\u102C\u1000\u103A\u101B\u102C\u1014\u1031\u1037"
        ],
        [
            " ",
            "0",
            "\u1040"
        ],
        [
            " ",
            "1",
            "\u1041"
        ],
        [
            " ",
            "2",
            "\u1042"
        ],
        [
            " ",
            "3",
            "\u1043"
        ],
        [
            " ",
            "4",
            "\u1044"
        ],
        [
            " ",
            "5",
            "\u1045"
        ],
        [
            " ",
            "6",
            "\u1046"
        ],
        [
            " ",
            "7",
            "\u1047"
        ],
        [
            " ",
            "8",
            "\u1048"
        ],
        [
            " ",
            "9",
            "\u1049"
        ],
        [
            " ",
            "Sunday",
            "\u1010\u1014\u1004\u103A\u1039\u1002\u1014\u103D\u1031"
        ],
        [
            " ",
            "Monday",
            "\u1010\u1014\u1004\u103A\u1039\u101C\u102C"
        ],
        [
            " ",
            "Tuesday",
            "\u1021\u1004\u103A\u1039\u1002\u102B"
        ],
        [
            " ",
            "Wednesday",
            "\u1017\u102F\u1012\u1039\u1013\u101F\u1030\u1038"
        ],
        [
            " ",
            "Thursday",
            "\u1000\u103C\u102C\u101E\u1015\u1010\u1031\u1038"
        ],
        [
            " ",
            "Friday",
            "\u101E\u1031\u102C\u1000\u103C\u102C"
        ],
        [
            " ",
            "Saturday",
            "\u1005\u1014\u1031"
        ],
        [
            " ",
            "Sabbath Eve",
            "\u1021\u1016\u102D\u1010\u103A"
        ],
        [
            " ",
            "Sabbath",
            "\u1025\u1015\u102F\u101E\u103A"
        ],
        [
            " ",
            "Yatyaza",
            "\u101B\u1000\u103A\u101B\u102C\u1007\u102C"
        ],
        [
            " ",
            "Pyathada",
            "\u1015\u103C\u103F\u1012\u102B\u1038"
        ],
        [
            " ",
            "Afternoon",
            "\u1019\u103D\u1014\u103A\u1038\u101C\u103D\u1032"
        ],
        [
            " ",
            "January",
            "\u1007\u1014\u103A\u1014\u101D\u102B\u101B\u102E"
        ],
        [
            " ",
            "February",
            "\u1016\u1031\u1016\u1031\u102C\u103A\u101D\u102B\u101B\u102E"
        ],
        [
            " ",
            "March",
            "\u1019\u1010\u103A"
        ],
        [
            " ",
            "April",
            "\u1027\u1015\u103C\u102E"
        ],
        [
            " ",
            "May",
            "\u1019\u1031"
        ],
        [
            " ",
            "June",
            "\u1007\u103D\u1014\u103A"
        ],
        [
            " ",
            "July",
            "\u1007\u1030\u101C\u102D\u102F\u1004\u103A"
        ],
        [
            " ",
            "August",
            "\u1029\u1002\u102F\u1010\u103A"
        ],
        [
            " ",
            "September",
            "\u1005\u1000\u103A\u1010\u1004\u103A\u1018\u102C"
        ],
        [
            " ",
            "October",
            "\u1021\u1031\u102C\u1000\u103A\u1010\u102D\u102F\u1018\u102C"
        ],
        [
            " ",
            "November",
            "\u1014\u102D\u102F\u101D\u1004\u103A\u1018\u102C"
        ],
        [
            " ",
            "December",
            "\u1012\u102E\u1007\u1004\u103A\u1018\u102C"
        ],
        [
            " ",
            "Tagu",
            "\u1010\u1014\u103A\u1001\u1030\u1038"
        ],
        [
            " ",
            "Kason",
            "\u1000\u1006\u102F\u1014\u103A"
        ],
        [
            " ",
            "Nayon",
            "\u1014\u101A\u102F\u1014\u103A"
        ],
        [
            " ",
            "Waso",
            "\u101D\u102B\u1006\u102D\u102F"
        ],
        [
            " ",
            "Wagaung",
            "\u101D\u102B\u1001\u1031\u102B\u1004\u103A"
        ],
        [
            " ",
            "Tawthalin",
            "\u1010\u1031\u102C\u103A\u101E\u101C\u1004\u103A\u1038"
        ],
        [
            " ",
            "Thadingyut",
            "\u101E\u102E\u1010\u1004\u103A\u1038\u1000\u103B\u103D\u1010\u103A"
        ],
        [
            " ",
            "Tazaungmon",
            "\u1010\u1014\u103A\u1006\u1031\u102C\u1004\u103A\u1019\u102F\u1014\u103A\u1038"
        ],
        [
            " ",
            "Nadaw",
            "\u1014\u1010\u103A\u1010\u1031\u102C\u103A"
        ],
        [
            " ",
            "Pyatho",
            "\u1015\u103C\u102C\u101E\u102D\u102F"
        ],
        [
            " ",
            "Tabodwe",
            "\u1010\u1015\u102D\u102F\u1037\u1010\u103D\u1032"
        ],
        [
            " ",
            "Tabaung",
            "\u1010\u1015\u1031\u102B\u1004\u103A\u1038"
        ],
        [
            " ",
            "First",
            "\u1015"
        ],
        [
            " ",
            "Second",
            "\u1012\u102F"
        ],
        [
            " ",
            "Late",
            "\u1014\u103E\u1031\u102C\u1004\u103A\u1038"
        ],
        [
            " ",
            "Waxing",
            "\u101C\u1006\u1014\u103A\u1038"
        ],
        [
            " ",
            "Waning",
            "\u101C\u1006\u102F\u1010\u103A"
        ],
        [
            " ",
            "Full Moon",
            "\u101C\u1015\u103C\u100A\u103A\u1037"
        ],
        [
            " ",
            "New Moon",
            "\u101C\u1000\u103D\u101A\u103A"
        ],
        [
            " ",
            "Nay",
            "\u1014\u1031\u1037"
        ],
        [
            " ",
            "Day",
            "\u1014\u1031\u1037"
        ],
        [
            " ",
            "Yat",
            "\u101B\u1000\u103A"
        ],
        [
            " ",
            "Year",
            "\u1014\u103E\u1005\u103A"
        ],
        [
            " ",
            "Ku",
            "\u1001\u102F"
        ],
        [
            " ",
            "Naga",
            "\u1014\u1002\u102B\u1038"
        ],
        [
            " ",
            "Head",
            "\u1001\u1031\u102B\u1004\u103A\u1038"
        ],
        [
            " ",
            "Facing",
            "\u101C\u103E\u100A\u103A\u1037"
        ],
        [
            " ",
            "East",
            "\u1021\u101B\u103E\u1031\u1037"
        ],
        [
            " ",
            "West",
            "\u1021\u1014\u1031\u102C\u1000\u103A"
        ],
        [
            " ",
            "South",
            "\u1010\u1031\u102C\u1004\u103A"
        ],
        [
            " ",
            "North",
            "\u1019\u103C\u1031\u102C\u1000\u103A"
        ],
        [
            " ",
            "Mahabote",
            "\u1019\u101F\u102C\u1018\u102F\u1010\u103A"
        ],
        [
            " ",
            "Born",
            "\u1016\u103D\u102C\u1038"
        ],
        [
            " ",
            "Binga",
            "\u1018\u1004\u103A\u1039\u1002"
        ],
        [
            " ",
            "Atun",
            "\u1021\u1011\u103D\u1014\u103A\u1038"
        ],
        [
            " ",
            "Yaza",
            "\u101B\u102C\u1007"
        ],
        [
            " ",
            "Adipati",
            "\u1021\u1013\u102D\u1015\u1010\u102D"
        ],
        [
            " ",
            "Marana",
            "\u1019\u101B\u100F"
        ],
        [
            " ",
            "Thike",
            "\u101E\u102D\u102F\u1000\u103A"
        ],
        [
            " ",
            "Puti",
            "\u1015\u102F\u1010\u102D"
        ],
        [
            " ",
            "Ogre",
            "\u1018\u102E\u101C\u1030\u1038"
        ],
        [
            " ",
            "Elf",
            "\u1014\u1010\u103A"
        ],
        [
            " ",
            "Human",
            "\u101C\u1030"
        ],
        [
            " ",
            "Nakhat",
            "\u1014\u1000\u1039\u1001\u1010\u103A"
        ],
        [
            " ",
            "Hpusha",
            "\u1015\u102F\u103F"
        ],
        [
            " ",
            "Magha",
            "\u1019\u102C\u1001"
        ],
        [
            " ",
            "Phalguni",
            "\u1016\u1039\u101C\u1000\u102D\u102F\u1014\u103A"
        ],
        [
            " ",
            "Chitra",
            "\u1005\u101A\u103A"
        ],
        [
            " ",
            "Visakha",
            "\u1015\u102D\u101E\u103B\u1000\u103A"
        ],
        [
            " ",
            "Jyeshtha",
            "\u1005\u102D\u103F"
        ],
        [
            " ",
            "Ashadha",
            "\u1021\u102C\u101E\u1010\u103A"
        ],
        [
            " ",
            "Sravana",
            "\u101E\u101B\u101D\u1014\u103A"
        ],
        [
            " ",
            "Bhadrapaha",
            "\u1018\u1012\u103C"
        ],
        [
            " ",
            "Asvini",
            "\u1021\u102C\u101E\u102D\u1014\u103A"
        ],
        [
            " ",
            "Krittika",
            "\u1000\u103C\u1010\u102D\u102F\u1000\u103A"
        ],
        [
            " ",
            "Mrigasiras",
            "\u1019\u103C\u102D\u1000\u1039\u1000\u101E\u102D\u102F\u101D\u103A"
        ],
        [
            " ",
            "Calculator",
            "\u1010\u103D\u1000\u103A\u1005\u1000\u103A"
        ]
    ];
    let fstr, rstr, re;
    let fromLn = 1;
    let toLn = lang;
    let l = a.length;
    for (let i = 0; i < l; i++) {
        fstr = a[i][fromLn];
        re = new RegExp(fstr, "g");
        rstr = a[i][toLn];
        text = text.replace(re, rstr);
    }
    return text;
};
var translate_default = translate;
// opt/burmeseDate/thingyin.ts
function thingyanTime(my) {
    var SY = 1577917828 / 432e4;
    var LM = 1577917828 / 53433336;
    var MO = 1954168050623e-6;
    var SE3 = 1312;
    var ja = SY * my + MO;
    let jk;
    if (my >= SE3) {
        jk = ja - 2.169918982;
    }
    else {
        jk = ja - 2.1675;
    }
    return { ja, jk, da: Math.round(ja), dk: Math.round(jk) };
}
function getThingyan(my) {
    const to = my + 1, from = my, emName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ppp = thingyanTime(to), att = burmeseDate.j2w(ppp.ja), atatTime = att.y + "-" + emName[att.m - 1] + "-" + att.d + " " + att.h + ":" + att.n + ":" + Math.floor(att.s), akt = burmeseDate.j2w(ppp.jk), akyaTime = `${akt.y}-${emName[akt.m - 1]}-${akt.d} ${akt.h}:${akt.n}:${Math.floor(akt.s)}`, akd = burmeseDate.j2w(ppp.dk), akyod = burmeseDate.j2w(ppp.dk - 1), akyoDay = `${akyod.y}-${emName[akyod.m - 1]}-${akyod.d}`, akyaDay = `${akd.y}-${emName[akd.m - 1]}-${akd.d}`, akyatd = burmeseDate.j2w(ppp.dk + 1), akyatDay = `${akyatd.y}-${emName[akyatd.m - 1]}-${akyatd.d}`, atd = burmeseDate.j2w(ppp.da), atatDay = `${atd.y}-${emName[atd.m - 1]}-${atd.d}`, nyd = burmeseDate.j2w(ppp.da + 1), nyDay = `${nyd.y}-${emName[nyd.m - 1]}-${nyd.d}`;
    let sakd;
    if (ppp.da - ppp.dk > 2) {
        const sakdd = burmeseDate.j2w(ppp.da - 1);
        sakd = `${sakdd.y}-${emName[sakdd.m - 1]}-${sakdd.d}`;
    }
    else {
        sakd = "";
    }
    return { from, to, atatTime, akyaTime, akyoDay, akyaDay, akyatDay, sakd, atatDay, nyDay };
}
var thingyin_default = getThingyan;
// opt/burmeseDate/mmd.ts
function mmdate(date, lang) {
    const y = parseInt(date.split("-")[0]);
    const m = parseInt(date.split("-")[1]);
    const d = parseInt(date.split("-")[2]);
    const jdn = DateTime.w2j(y, m, d);
    const mdt = new burmeseDate(jdn, 6.5);
    const ssy = translate_default({ text: mdt.ToMString("&YYYY"), lang });
    const mmy = translate_default({ text: mdt.ToMString("&yyyy"), lang });
    const mmm = translate_default({ text: mdt.ToMString("&M"), lang });
    const mmd = translate_default({ text: mdt.ToMString("&f"), lang });
    const mwd = translate_default({ text: mdt.ToString("%W "), lang });
    const mp = translate_default({ text: mdt.ToMString("&P"), lang });
    const yyz = translate_default({ text: mdt.yatyaza, lang });
    const ptd = translate_default({ text: mdt.pyathada, lang });
    const dgh = translate_default({ text: mdt.nagahle, lang });
    const sbat = translate_default({ text: mdt.sabbath, lang });
    const mmlen = translate_default({ text: mdt.mmlen.toString(), lang });
    const MY = burmeseDate.j2m(jdn).my;
    const mmyt = ["common", "little watat", "big watat"][mdt.mf];
    const myt = translate_default({ text: mmyt, lang });
    const h = mdt.holidays;
    let hd1;
    if (h.length === 0) {
        hd1 = "";
    }
    else {
        hd1 = h.reduce(function (acc, currentValue) {
            return translate_default({ text: acc, lang }) + "," + translate_default({ text: currentValue, lang });
        });
    }
    const h2 = mdt.holidays2;
    let hd2;
    if (h2.length === 0) {
        hd2 = "";
    }
    else {
        hd2 = h2.reduce(function (acc, currentValue) {
            return translate_default({ text: acc, lang }) + "," + translate_default({ text: currentValue, lang });
        });
    }
    const myn = translate_default({ text: mdt.my_name, lang });
    const mhb = translate_default({ text: mdt.mahabote, lang });
    const nk = translate_default({ text: mdt.nakhat, lang });
    let ast = [];
    mdt.astro.forEach((item) => {
        const a = translate_default({ text: item, lang });
        ast.push(a);
    });
    return { ssy, mmy, myn, mmm, mp, mmd, yyz, ptd, dgh, sbat, hd1, hd2, mhb, nk, ast, mwd, MY, mmlen, myt };
}
// opt/json/raw-time-zones.json
var raw_time_zones_default = [
    { name: "Pacific/Niue", alternativeName: "Niue Time", group: ["Pacific/Niue"], continentCode: "OC", continentName: "Oceania", countryName: "Niue", countryCode: "NU", mainCities: ["Alofi"], rawOffsetInMinutes: -660, abbreviation: "NUT", rawFormat: "-11:00 Niue Time - Alofi" },
    { name: "Pacific/Midway", alternativeName: "Samoa Time", group: ["Pacific/Midway"], continentCode: "OC", continentName: "Oceania", countryName: "United States Minor Outlying Islands", countryCode: "UM", mainCities: ["Midway"], rawOffsetInMinutes: -660, abbreviation: "SST", rawFormat: "-11:00 Samoa Time - Midway" },
    { name: "Pacific/Pago_Pago", alternativeName: "Samoa Time", group: ["Pacific/Pago_Pago", "US/Samoa", "Pacific/Samoa", "Pacific/Midway"], continentCode: "OC", continentName: "Oceania", countryName: "American Samoa", countryCode: "AS", mainCities: ["Pago Pago"], rawOffsetInMinutes: -660, abbreviation: "SST", rawFormat: "-11:00 Samoa Time - Pago Pago" },
    { name: "Pacific/Rarotonga", alternativeName: "Cook Islands Time", group: ["Pacific/Rarotonga"], continentCode: "OC", continentName: "Oceania", countryName: "Cook Islands", countryCode: "CK", mainCities: ["Avarua"], rawOffsetInMinutes: -600, abbreviation: "CKT", rawFormat: "-10:00 Cook Islands Time - Avarua" },
    { name: "America/Adak", alternativeName: "Hawaii-Aleutian Time", group: ["America/Adak", "US/Aleutian", "America/Atka"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Adak"], rawOffsetInMinutes: -600, abbreviation: "HAST", rawFormat: "-10:00 Hawaii-Aleutian Time - Adak" },
    { name: "Pacific/Honolulu", alternativeName: "Hawaii-Aleutian Time", group: ["Pacific/Honolulu", "US/Hawaii", "Pacific/Johnston"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Honolulu", "East Honolulu", "Pearl City", "Hilo"], rawOffsetInMinutes: -600, abbreviation: "HAST", rawFormat: "-10:00 Hawaii-Aleutian Time - Honolulu, East Honolulu, Pearl City, Hilo" },
    { name: "Pacific/Tahiti", alternativeName: "Tahiti Time", group: ["Pacific/Tahiti"], continentCode: "OC", continentName: "Oceania", countryName: "French Polynesia", countryCode: "PF", mainCities: ["Faaa", "Papeete", "Punaauia"], rawOffsetInMinutes: -600, abbreviation: "TAHT", rawFormat: "-10:00 Tahiti Time - Faaa, Papeete, Punaauia" },
    { name: "Pacific/Marquesas", alternativeName: "Marquesas Time", group: ["Pacific/Marquesas"], continentCode: "OC", continentName: "Oceania", countryName: "French Polynesia", countryCode: "PF", mainCities: ["Marquesas"], rawOffsetInMinutes: -570, abbreviation: "MART", rawFormat: "-09:30 Marquesas Time - Marquesas" },
    { name: "America/Anchorage", alternativeName: "Alaska Time", group: ["America/Anchorage", "America/Juneau", "America/Metlakatla", "America/Nome", "America/Sitka", "America/Yakutat", "US/Alaska"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Anchorage", "Juneau", "Fairbanks", "Eagle River"], rawOffsetInMinutes: -540, abbreviation: "AKST", rawFormat: "-09:00 Alaska Time - Anchorage, Juneau, Fairbanks, Eagle River" },
    { name: "Pacific/Gambier", alternativeName: "Gambier Time", group: ["Pacific/Gambier"], continentCode: "OC", continentName: "Oceania", countryName: "French Polynesia", countryCode: "PF", mainCities: ["Gambier"], rawOffsetInMinutes: -540, abbreviation: "GAMT", rawFormat: "-09:00 Gambier Time - Gambier" },
    { name: "America/Los_Angeles", alternativeName: "Pacific Time", group: ["America/Los_Angeles", "US/Pacific"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Los Angeles", "San Diego", "San Jose", "San Francisco"], rawOffsetInMinutes: -480, abbreviation: "PST", rawFormat: "-08:00 Pacific Time - Los Angeles, San Diego, San Jose, San Francisco" },
    { name: "America/Tijuana", alternativeName: "Pacific Time", group: ["America/Tijuana", "Mexico/BajaNorte", "America/Ensenada", "America/Santa_Isabel"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Tijuana", "Mexicali", "Ensenada", "Rosarito"], rawOffsetInMinutes: -480, abbreviation: "PST", rawFormat: "-08:00 Pacific Time - Tijuana, Mexicali, Ensenada, Rosarito" },
    { name: "America/Vancouver", alternativeName: "Pacific Time", group: ["America/Vancouver", "Canada/Pacific"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Vancouver", "Surrey", "Okanagan", "Victoria"], rawOffsetInMinutes: -480, abbreviation: "PST", rawFormat: "-08:00 Pacific Time - Vancouver, Surrey, Okanagan, Victoria" },
    { name: "Pacific/Pitcairn", alternativeName: "Pitcairn Time", group: ["Pacific/Pitcairn"], continentCode: "OC", continentName: "Oceania", countryName: "Pitcairn", countryCode: "PN", mainCities: ["Adamstown"], rawOffsetInMinutes: -480, abbreviation: "PST", rawFormat: "-08:00 Pitcairn Time - Adamstown" },
    { name: "America/Hermosillo", alternativeName: "Mexican Pacific Time", group: ["America/Hermosillo", "America/Mazatlan", "Mexico/BajaSur"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Hermosillo", "Culiac\xE1n", "Ciudad Obreg\xF3n", "Mazatl\xE1n"], rawOffsetInMinutes: -420, abbreviation: "GMT-7", rawFormat: "-07:00 Mexican Pacific Time - Hermosillo, Culiac\xE1n, Ciudad Obreg\xF3n, Mazatl\xE1n" },
    { name: "America/Edmonton", alternativeName: "Mountain Time", group: ["America/Cambridge_Bay", "America/Edmonton", "America/Inuvik", "America/Yellowknife", "Canada/Mountain"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Calgary", "Edmonton", "Red Deer", "Sherwood Park"], rawOffsetInMinutes: -420, abbreviation: "MST", rawFormat: "-07:00 Mountain Time - Calgary, Edmonton, Red Deer, Sherwood Park" },
    { name: "America/Ciudad_Juarez", alternativeName: "Mountain Time", group: ["America/Ciudad_Juarez"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Ciudad Ju\xE1rez"], rawOffsetInMinutes: -420, abbreviation: "MST", rawFormat: "-07:00 Mountain Time - Ciudad Ju\xE1rez" },
    { name: "America/Denver", alternativeName: "Mountain Time", group: ["America/Boise", "America/Denver", "Navajo", "US/Mountain", "America/Shiprock"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Denver", "El Paso", "Albuquerque", "Colorado Springs"], rawOffsetInMinutes: -420, abbreviation: "MST", rawFormat: "-07:00 Mountain Time - Denver, El Paso, Albuquerque, Colorado Springs" },
    { name: "America/Phoenix", alternativeName: "Mountain Time", group: ["America/Phoenix", "US/Arizona", "America/Creston"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Phoenix", "Tucson", "Mesa", "Chandler"], rawOffsetInMinutes: -420, abbreviation: "MST", rawFormat: "-07:00 Mountain Time - Phoenix, Tucson, Mesa, Chandler" },
    { name: "America/Whitehorse", alternativeName: "Yukon Time", group: ["America/Creston", "America/Dawson", "America/Dawson_Creek", "America/Fort_Nelson", "America/Whitehorse", "Canada/Yukon"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Whitehorse", "Fort St. John", "Creston", "Dawson"], rawOffsetInMinutes: -420, abbreviation: "YT", rawFormat: "-07:00 Yukon Time - Whitehorse, Fort St. John, Creston, Dawson" },
    { name: "America/Belize", alternativeName: "Central Time", group: ["America/Belize"], continentCode: "NA", continentName: "North America", countryName: "Belize", countryCode: "BZ", mainCities: ["Belize City", "San Ignacio", "San Pedro", "Orange Walk"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Belize City, San Ignacio, San Pedro, Orange Walk" },
    { name: "America/Chicago", alternativeName: "Central Time", group: ["America/Chicago", "America/Indiana/Knox", "America/Indiana/Tell_City", "America/Menominee", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "US/Central", "US/Indiana-Starke", "America/Knox_IN"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["Chicago", "Houston", "San Antonio", "Dallas"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Chicago, Houston, San Antonio, Dallas" },
    { name: "America/Guatemala", alternativeName: "Central Time", group: ["America/Guatemala"], continentCode: "NA", continentName: "North America", countryName: "Guatemala", countryCode: "GT", mainCities: ["Guatemala City", "Villa Nueva", "Mixco", "Cob\xE1n"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Guatemala City, Villa Nueva, Mixco, Cob\xE1n" },
    { name: "America/Managua", alternativeName: "Central Time", group: ["America/Managua"], continentCode: "NA", continentName: "North America", countryName: "Nicaragua", countryCode: "NI", mainCities: ["Managua", "Le\xF3n", "Masaya", "Chinandega"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Managua, Le\xF3n, Masaya, Chinandega" },
    { name: "America/Mexico_City", alternativeName: "Central Time", group: ["America/Bahia_Banderas", "America/Chihuahua", "America/Merida", "America/Mexico_City", "America/Monterrey", "Mexico/General"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Mexico City", "Iztapalapa", "Le\xF3n de los Aldama", "Puebla"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Mexico City, Iztapalapa, Le\xF3n de los Aldama, Puebla" },
    { name: "America/Matamoros", alternativeName: "Central Time", group: ["America/Matamoros", "America/Ojinaga"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Reynosa", "Heroica Matamoros", "Nuevo Laredo", "Piedras Negras"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Reynosa, Heroica Matamoros, Nuevo Laredo, Piedras Negras" },
    { name: "America/Costa_Rica", alternativeName: "Central Time", group: ["America/Costa_Rica"], continentCode: "NA", continentName: "North America", countryName: "Costa Rica", countryCode: "CR", mainCities: ["San Jos\xE9", "Lim\xF3n", "San Francisco", "Alajuela"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - San Jos\xE9, Lim\xF3n, San Francisco, Alajuela" },
    { name: "America/El_Salvador", alternativeName: "Central Time", group: ["America/El_Salvador"], continentCode: "NA", continentName: "North America", countryName: "El Salvador", countryCode: "SV", mainCities: ["San Salvador", "Soyapango", "San Miguel", "Santa Ana"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - San Salvador, Soyapango, San Miguel, Santa Ana" },
    { name: "America/Regina", alternativeName: "Central Time", group: ["America/Regina", "America/Swift_Current", "Canada/Saskatchewan"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Saskatoon, Regina, Prince Albert, Moose Jaw" },
    { name: "America/Tegucigalpa", alternativeName: "Central Time", group: ["America/Tegucigalpa"], continentCode: "NA", continentName: "North America", countryName: "Honduras", countryCode: "HN", mainCities: ["Tegucigalpa", "San Pedro Sula", "La Ceiba", "Choloma"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Tegucigalpa, San Pedro Sula, La Ceiba, Choloma" },
    { name: "America/Winnipeg", alternativeName: "Central Time", group: ["America/Rankin_Inlet", "America/Resolute", "America/Winnipeg", "Canada/Central", "America/Rainy_River"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Winnipeg", "Brandon", "Steinbach", "Kenora"], rawOffsetInMinutes: -360, abbreviation: "CST", rawFormat: "-06:00 Central Time - Winnipeg, Brandon, Steinbach, Kenora" },
    { name: "Pacific/Easter", alternativeName: "Easter Island Time", group: ["Pacific/Easter", "Chile/EasterIsland"], continentCode: "SA", continentName: "South America", countryName: "Chile", countryCode: "CL", mainCities: ["Easter"], rawOffsetInMinutes: -360, abbreviation: "EAST", rawFormat: "-06:00 Easter Island Time - Easter" },
    { name: "Pacific/Galapagos", alternativeName: "Galapagos Time", group: ["Pacific/Galapagos"], continentCode: "SA", continentName: "South America", countryName: "Ecuador", countryCode: "EC", mainCities: ["Galapagos"], rawOffsetInMinutes: -360, abbreviation: "GALT", rawFormat: "-06:00 Galapagos Time - Galapagos" },
    { name: "America/Rio_Branco", alternativeName: "Acre Time", group: ["America/Eirunepe", "America/Rio_Branco", "Brazil/Acre", "America/Porto_Acre"], continentCode: "SA", continentName: "South America", countryName: "Brazil", countryCode: "BR", mainCities: ["Rio Branco", "Cruzeiro do Sul", "Senador Guiomard", "Sena Madureira"], rawOffsetInMinutes: -300, abbreviation: "ACT", rawFormat: "-05:00 Acre Time - Rio Branco, Cruzeiro do Sul, Senador Guiomard, Sena Madureira" },
    { name: "America/Bogota", alternativeName: "Colombia Time", group: ["America/Bogota"], continentCode: "SA", continentName: "South America", countryName: "Colombia", countryCode: "CO", mainCities: ["Bogot\xE1", "Cali", "Medell\xEDn", "Barranquilla"], rawOffsetInMinutes: -300, abbreviation: "COT", rawFormat: "-05:00 Colombia Time - Bogot\xE1, Cali, Medell\xEDn, Barranquilla" },
    { name: "America/Havana", alternativeName: "Cuba Time", group: ["America/Havana", "Cuba"], continentCode: "NA", continentName: "North America", countryName: "Cuba", countryCode: "CU", mainCities: ["Havana", "Santiago de Cuba", "Camag\xFCey", "Holgu\xEDn"], rawOffsetInMinutes: -300, abbreviation: "CST", rawFormat: "-05:00 Cuba Time - Havana, Santiago de Cuba, Camag\xFCey, Holgu\xEDn" },
    { name: "America/Atikokan", alternativeName: "Eastern Time", group: ["America/Atikokan"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Atikokan"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Atikokan" },
    { name: "America/Cancun", alternativeName: "Eastern Time", group: ["America/Cancun"], continentCode: "NA", continentName: "North America", countryName: "Mexico", countryCode: "MX", mainCities: ["Canc\xFAn", "Chetumal", "Playa del Carmen", "Cozumel"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Canc\xFAn, Chetumal, Playa del Carmen, Cozumel" },
    { name: "America/Grand_Turk", alternativeName: "Eastern Time", group: ["America/Grand_Turk"], continentCode: "NA", continentName: "North America", countryName: "Turks and Caicos Islands", countryCode: "TC", mainCities: ["Cockburn Town"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Cockburn Town" },
    { name: "America/Cayman", alternativeName: "Eastern Time", group: ["America/Cayman"], continentCode: "NA", continentName: "North America", countryName: "Cayman Islands", countryCode: "KY", mainCities: ["George Town", "West Bay"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - George Town, West Bay" },
    { name: "America/Jamaica", alternativeName: "Eastern Time", group: ["America/Jamaica", "Jamaica"], continentCode: "NA", continentName: "North America", countryName: "Jamaica", countryCode: "JM", mainCities: ["Kingston", "New Kingston", "Spanish Town", "Portmore"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Kingston, New Kingston, Spanish Town, Portmore" },
    { name: "America/Nassau", alternativeName: "Eastern Time", group: ["America/Nassau"], continentCode: "NA", continentName: "North America", countryName: "Bahamas", countryCode: "BS", mainCities: ["Nassau", "Lucaya", "Freeport"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Nassau, Lucaya, Freeport" },
    { name: "America/New_York", alternativeName: "Eastern Time", group: ["America/Detroit", "America/Indiana/Indianapolis", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/New_York", "US/Michigan", "US/East-Indiana", "America/Indianapolis", "America/Fort_Wayne", "America/Louisville", "US/Eastern"], continentCode: "NA", continentName: "North America", countryName: "United States", countryCode: "US", mainCities: ["New York City", "Brooklyn", "Queens", "Philadelphia"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - New York City, Brooklyn, Queens, Philadelphia" },
    { name: "America/Panama", alternativeName: "Eastern Time", group: ["America/Panama", "America/Atikokan", "America/Cayman", "America/Coral_Harbour"], continentCode: "NA", continentName: "North America", countryName: "Panama", countryCode: "PA", mainCities: ["Panam\xE1", "San Miguelito", "Juan D\xEDaz", "David"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Panam\xE1, San Miguelito, Juan D\xEDaz, David" },
    { name: "America/Port-au-Prince", alternativeName: "Eastern Time", group: ["America/Port-au-Prince"], continentCode: "NA", continentName: "North America", countryName: "Haiti", countryCode: "HT", mainCities: ["Port-au-Prince", "Carrefour", "Delmas 73", "Port-de-Paix"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Port-au-Prince, Carrefour, Delmas 73, Port-de-Paix" },
    { name: "America/Toronto", alternativeName: "Eastern Time", group: ["America/Iqaluit", "America/Toronto", "America/Pangnirtung", "Canada/Eastern", "America/Nassau", "America/Montreal", "America/Nipigon", "America/Thunder_Bay"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Toronto", "Montr\xE9al", "Ottawa", "Mississauga"], rawOffsetInMinutes: -300, abbreviation: "EST", rawFormat: "-05:00 Eastern Time - Toronto, Montr\xE9al, Ottawa, Mississauga" },
    { name: "America/Guayaquil", alternativeName: "Ecuador Time", group: ["America/Guayaquil"], continentCode: "SA", continentName: "South America", countryName: "Ecuador", countryCode: "EC", mainCities: ["Quito", "Guayaquil", "Cuenca", "Santo Domingo de los Colorados"], rawOffsetInMinutes: -300, abbreviation: "ECT", rawFormat: "-05:00 Ecuador Time - Quito, Guayaquil, Cuenca, Santo Domingo de los Colorados" },
    { name: "America/Lima", alternativeName: "Peru Time", group: ["America/Lima"], continentCode: "SA", continentName: "South America", countryName: "Peru", countryCode: "PE", mainCities: ["Lima", "Callao", "Arequipa", "Trujillo"], rawOffsetInMinutes: -300, abbreviation: "PET", rawFormat: "-05:00 Peru Time - Lima, Callao, Arequipa, Trujillo" },
    { name: "America/Manaus", alternativeName: "Amazon Time", group: ["America/Boa_Vista", "America/Campo_Grande", "America/Cuiaba", "America/Manaus", "America/Porto_Velho", "Brazil/West"], continentCode: "SA", continentName: "South America", countryName: "Brazil", countryCode: "BR", mainCities: ["Manaus", "Campo Grande", "Cuiab\xE1", "Porto Velho"], rawOffsetInMinutes: -240, abbreviation: "AMT", rawFormat: "-04:00 Amazon Time - Manaus, Campo Grande, Cuiab\xE1, Porto Velho" },
    { name: "America/St_Kitts", alternativeName: "Atlantic Time", group: ["America/St_Kitts"], continentCode: "NA", continentName: "North America", countryName: "Saint Kitts and Nevis", countryCode: "KN", mainCities: ["Basseterre"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Basseterre" },
    { name: "America/Blanc-Sablon", alternativeName: "Atlantic Time", group: ["America/Blanc-Sablon"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Blanc-Sablon"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Blanc-Sablon" },
    { name: "America/Montserrat", alternativeName: "Atlantic Time", group: ["America/Montserrat"], continentCode: "NA", continentName: "North America", countryName: "Montserrat", countryCode: "MS", mainCities: ["Brades", "Plymouth"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Brades, Plymouth" },
    { name: "America/Barbados", alternativeName: "Atlantic Time", group: ["America/Barbados"], continentCode: "NA", continentName: "North America", countryName: "Barbados", countryCode: "BB", mainCities: ["Bridgetown"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Bridgetown" },
    { name: "America/St_Lucia", alternativeName: "Atlantic Time", group: ["America/St_Lucia"], continentCode: "NA", continentName: "North America", countryName: "Saint Lucia", countryCode: "LC", mainCities: ["Castries"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Castries" },
    { name: "America/Port_of_Spain", alternativeName: "Atlantic Time", group: ["America/Port_of_Spain"], continentCode: "NA", continentName: "North America", countryName: "Trinidad and Tobago", countryCode: "TT", mainCities: ["Chaguanas", "Mon Repos", "San Fernando", "Port of Spain"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Chaguanas, Mon Repos, San Fernando, Port of Spain" },
    { name: "America/Martinique", alternativeName: "Atlantic Time", group: ["America/Martinique"], continentCode: "NA", continentName: "North America", countryName: "Martinique", countryCode: "MQ", mainCities: ["Fort-de-France", "Le Lamentin", "Le Robert", "Sainte-Marie"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Fort-de-France, Le Lamentin, Le Robert, Sainte-Marie" },
    { name: "America/St_Barthelemy", alternativeName: "Atlantic Time", group: ["America/St_Barthelemy"], continentCode: "NA", continentName: "North America", countryName: "Saint Barthelemy", countryCode: "BL", mainCities: ["Gustavia"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Gustavia" },
    { name: "America/Halifax", alternativeName: "Atlantic Time", group: ["America/Glace_Bay", "America/Goose_Bay", "America/Halifax", "America/Moncton", "Canada/Atlantic"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["Halifax", "Moncton", "Sydney", "Dartmouth"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Halifax, Moncton, Sydney, Dartmouth" },
    { name: "Atlantic/Bermuda", alternativeName: "Atlantic Time", group: ["Atlantic/Bermuda"], continentCode: "NA", continentName: "North America", countryName: "Bermuda", countryCode: "BM", mainCities: ["Hamilton"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Hamilton" },
    { name: "America/St_Vincent", alternativeName: "Atlantic Time", group: ["America/St_Vincent"], continentCode: "NA", continentName: "North America", countryName: "Saint Vincent and the Grenadines", countryCode: "VC", mainCities: ["Kingstown"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Kingstown" },
    { name: "America/Kralendijk", alternativeName: "Atlantic Time", group: ["America/Kralendijk"], continentCode: "NA", continentName: "North America", countryName: "Bonaire, Saint Eustatius and Saba ", countryCode: "BQ", mainCities: ["Kralendijk"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Kralendijk" },
    { name: "America/Guadeloupe", alternativeName: "Atlantic Time", group: ["America/Guadeloupe"], continentCode: "NA", continentName: "North America", countryName: "Guadeloupe", countryCode: "GP", mainCities: ["Les Abymes", "Baie-Mahault", "Le Gosier", "Petit-Bourg"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Les Abymes, Baie-Mahault, Le Gosier, Petit-Bourg" },
    { name: "America/Marigot", alternativeName: "Atlantic Time", group: ["America/Marigot"], continentCode: "NA", continentName: "North America", countryName: "Saint Martin", countryCode: "MF", mainCities: ["Marigot"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Marigot" },
    { name: "America/Aruba", alternativeName: "Atlantic Time", group: ["America/Aruba"], continentCode: "NA", continentName: "North America", countryName: "Aruba", countryCode: "AW", mainCities: ["Oranjestad", "Tanki Leendert", "San Nicolas"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Oranjestad, Tanki Leendert, San Nicolas" },
    { name: "America/Lower_Princes", alternativeName: "Atlantic Time", group: ["America/Lower_Princes"], continentCode: "NA", continentName: "North America", countryName: "Sint Maarten", countryCode: "SX", mainCities: ["Philipsburg"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Philipsburg" },
    { name: "America/Tortola", alternativeName: "Atlantic Time", group: ["America/Tortola"], continentCode: "NA", continentName: "North America", countryName: "British Virgin Islands", countryCode: "VG", mainCities: ["Road Town"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Road Town" },
    { name: "America/Dominica", alternativeName: "Atlantic Time", group: ["America/Dominica"], continentCode: "NA", continentName: "North America", countryName: "Dominica", countryCode: "DM", mainCities: ["Roseau"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Roseau" },
    { name: "America/St_Thomas", alternativeName: "Atlantic Time", group: ["America/St_Thomas"], continentCode: "NA", continentName: "North America", countryName: "U.S. Virgin Islands", countryCode: "VI", mainCities: ["Saint Croix", "Charlotte Amalie"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Saint Croix, Charlotte Amalie" },
    { name: "America/Grenada", alternativeName: "Atlantic Time", group: ["America/Grenada"], continentCode: "NA", continentName: "North America", countryName: "Grenada", countryCode: "GD", mainCities: ["Saint George's"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Saint George's" },
    { name: "America/Antigua", alternativeName: "Atlantic Time", group: ["America/Antigua"], continentCode: "NA", continentName: "North America", countryName: "Antigua and Barbuda", countryCode: "AG", mainCities: ["Saint John\u2019s"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Saint John\u2019s" },
    { name: "America/Puerto_Rico", alternativeName: "Atlantic Time", group: ["America/Puerto_Rico", "America/Virgin", "America/Anguilla", "America/Antigua", "America/Aruba", "America/Blanc-Sablon", "America/Curacao", "America/Dominica", "America/Grenada", "America/Guadeloupe", "America/Kralendijk", "America/Lower_Princes", "America/Marigot", "America/Montserrat", "America/Port_of_Spain", "America/St_Barthelemy", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Tortola"], continentCode: "NA", continentName: "North America", countryName: "Puerto Rico", countryCode: "PR", mainCities: ["San Juan", "Bayam\xF3n", "Carolina", "Ponce"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - San Juan, Bayam\xF3n, Carolina, Ponce" },
    { name: "America/Santo_Domingo", alternativeName: "Atlantic Time", group: ["America/Santo_Domingo"], continentCode: "NA", continentName: "North America", countryName: "Dominican Republic", countryCode: "DO", mainCities: ["Santo Domingo", "Santiago de los Caballeros", "Santo Domingo Oeste", "Santo Domingo Este"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Santo Domingo, Santiago de los Caballeros, Santo Domingo Oeste, Santo Domingo Este" },
    { name: "America/Anguilla", alternativeName: "Atlantic Time", group: ["America/Anguilla"], continentCode: "NA", continentName: "North America", countryName: "Anguilla", countryCode: "AI", mainCities: ["The Valley"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - The Valley" },
    { name: "America/Thule", alternativeName: "Atlantic Time", group: ["America/Thule"], continentCode: "NA", continentName: "North America", countryName: "Greenland", countryCode: "GL", mainCities: ["Thule"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Thule" },
    { name: "America/Curacao", alternativeName: "Atlantic Time", group: ["America/Curacao"], continentCode: "NA", continentName: "North America", countryName: "Curacao", countryCode: "CW", mainCities: ["Willemstad"], rawOffsetInMinutes: -240, abbreviation: "AST", rawFormat: "-04:00 Atlantic Time - Willemstad" },
    { name: "America/La_Paz", alternativeName: "Bolivia Time", group: ["America/La_Paz"], continentCode: "SA", continentName: "South America", countryName: "Bolivia", countryCode: "BO", mainCities: ["La Paz", "Santa Cruz de la Sierra", "Cochabamba", "Sucre"], rawOffsetInMinutes: -240, abbreviation: "BOT", rawFormat: "-04:00 Bolivia Time - La Paz, Santa Cruz de la Sierra, Cochabamba, Sucre" },
    { name: "America/Santiago", alternativeName: "Chile Time", group: ["America/Santiago", "Chile/Continental"], continentCode: "SA", continentName: "South America", countryName: "Chile", countryCode: "CL", mainCities: ["Santiago", "Puente Alto", "Antofagasta", "Vi\xF1a del Mar"], rawOffsetInMinutes: -240, abbreviation: "CLT", rawFormat: "-04:00 Chile Time - Santiago, Puente Alto, Antofagasta, Vi\xF1a del Mar" },
    { name: "America/Guyana", alternativeName: "Guyana Time", group: ["America/Guyana"], continentCode: "SA", continentName: "South America", countryName: "Guyana", countryCode: "GY", mainCities: ["Georgetown", "Linden", "New Amsterdam"], rawOffsetInMinutes: -240, abbreviation: "GYT", rawFormat: "-04:00 Guyana Time - Georgetown, Linden, New Amsterdam" },
    { name: "America/Asuncion", alternativeName: "Paraguay Time", group: ["America/Asuncion"], continentCode: "SA", continentName: "South America", countryName: "Paraguay", countryCode: "PY", mainCities: ["Asunci\xF3n", "Ciudad del Este", "San Lorenzo", "Capiat\xE1"], rawOffsetInMinutes: -240, abbreviation: "PYT", rawFormat: "-04:00 Paraguay Time - Asunci\xF3n, Ciudad del Este, San Lorenzo, Capiat\xE1" },
    { name: "America/Caracas", alternativeName: "Venezuela Time", group: ["America/Caracas"], continentCode: "SA", continentName: "South America", countryName: "Venezuela", countryCode: "VE", mainCities: ["Caracas", "Maracaibo", "Maracay", "Valencia"], rawOffsetInMinutes: -240, abbreviation: "VET", rawFormat: "-04:00 Venezuela Time - Caracas, Maracaibo, Maracay, Valencia" },
    { name: "America/St_Johns", alternativeName: "Newfoundland Time", group: ["America/St_Johns", "Canada/Newfoundland"], continentCode: "NA", continentName: "North America", countryName: "Canada", countryCode: "CA", mainCities: ["St. John's", "Mount Pearl", "Corner Brook", "Conception Bay South"], rawOffsetInMinutes: -210, abbreviation: "NST", rawFormat: "-03:30 Newfoundland Time - St. John's, Mount Pearl, Corner Brook, Conception Bay South" },
    { name: "America/Argentina/Buenos_Aires", alternativeName: "Argentina Time", group: ["America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Buenos_Aires", "America/Catamarca", "America/Argentina/ComodRivadavia", "America/Cordoba", "America/Rosario", "America/Jujuy", "America/Mendoza"], continentCode: "SA", continentName: "South America", countryName: "Argentina", countryCode: "AR", mainCities: ["Buenos Aires", "C\xF3rdoba", "Rosario", "Mar del Plata"], rawOffsetInMinutes: -180, abbreviation: "ART", rawFormat: "-03:00 Argentina Time - Buenos Aires, C\xF3rdoba, Rosario, Mar del Plata" },
    { name: "America/Sao_Paulo", alternativeName: "Brasilia Time", group: ["America/Araguaina", "America/Bahia", "America/Belem", "America/Fortaleza", "America/Maceio", "America/Recife", "America/Santarem", "America/Sao_Paulo", "Brazil/East"], continentCode: "SA", continentName: "South America", countryName: "Brazil", countryCode: "BR", mainCities: ["S\xE3o Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador"], rawOffsetInMinutes: -180, abbreviation: "BRT", rawFormat: "-03:00 Brasilia Time - S\xE3o Paulo, Rio de Janeiro, Belo Horizonte, Salvador" },
    { name: "Antarctica/Palmer", alternativeName: "Chile Time", group: ["Antarctica/Palmer", "Antarctica/Rothera"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Palmer", "Rothera"], rawOffsetInMinutes: -180, abbreviation: "CLT", rawFormat: "-03:00 Chile Time - Palmer, Rothera" },
    { name: "America/Punta_Arenas", alternativeName: "Chile Time", group: ["America/Punta_Arenas"], continentCode: "SA", continentName: "South America", countryName: "Chile", countryCode: "CL", mainCities: ["Punta Arenas", "Puerto Natales"], rawOffsetInMinutes: -180, abbreviation: "CLT", rawFormat: "-03:00 Chile Time - Punta Arenas, Puerto Natales" },
    { name: "Atlantic/Stanley", alternativeName: "Falkland Islands Time", group: ["Atlantic/Stanley"], continentCode: "SA", continentName: "South America", countryName: "Falkland Islands", countryCode: "FK", mainCities: ["Stanley"], rawOffsetInMinutes: -180, abbreviation: "FKST", rawFormat: "-03:00 Falkland Islands Time - Stanley" },
    { name: "America/Cayenne", alternativeName: "French Guiana Time", group: ["America/Cayenne"], continentCode: "SA", continentName: "South America", countryName: "French Guiana", countryCode: "GF", mainCities: ["Cayenne", "Matoury", "Saint-Laurent-du-Maroni", "Kourou"], rawOffsetInMinutes: -180, abbreviation: "GFT", rawFormat: "-03:00 French Guiana Time - Cayenne, Matoury, Saint-Laurent-du-Maroni, Kourou" },
    { name: "America/Miquelon", alternativeName: "St. Pierre & Miquelon Time", group: ["America/Miquelon"], continentCode: "NA", continentName: "North America", countryName: "Saint Pierre and Miquelon", countryCode: "PM", mainCities: ["Saint-Pierre"], rawOffsetInMinutes: -180, abbreviation: "PM", rawFormat: "-03:00 St. Pierre & Miquelon Time - Saint-Pierre" },
    { name: "America/Paramaribo", alternativeName: "Suriname Time", group: ["America/Paramaribo"], continentCode: "SA", continentName: "South America", countryName: "Suriname", countryCode: "SR", mainCities: ["Paramaribo", "Lelydorp"], rawOffsetInMinutes: -180, abbreviation: "SRT", rawFormat: "-03:00 Suriname Time - Paramaribo, Lelydorp" },
    { name: "America/Montevideo", alternativeName: "Uruguay Time", group: ["America/Montevideo"], continentCode: "SA", continentName: "South America", countryName: "Uruguay", countryCode: "UY", mainCities: ["Montevideo", "Salto", "Paysand\xFA", "Las Piedras"], rawOffsetInMinutes: -180, abbreviation: "UYT", rawFormat: "-03:00 Uruguay Time - Montevideo, Salto, Paysand\xFA, Las Piedras" },
    { name: "America/Noronha", alternativeName: "Fernando de Noronha Time", group: ["America/Noronha", "Brazil/DeNoronha"], continentCode: "SA", continentName: "South America", countryName: "Brazil", countryCode: "BR", mainCities: ["Noronha"], rawOffsetInMinutes: -120, abbreviation: "FNT", rawFormat: "-02:00 Fernando de Noronha Time - Noronha" },
    { name: "Atlantic/South_Georgia", alternativeName: "South Georgia Time", group: ["Atlantic/South_Georgia"], continentCode: "AN", continentName: "Antarctica", countryName: "South Georgia and the South Sandwich Islands", countryCode: "GS", mainCities: ["Grytviken"], rawOffsetInMinutes: -120, abbreviation: "GST", rawFormat: "-02:00 South Georgia Time - Grytviken" },
    { name: "America/Nuuk", alternativeName: "West Greenland Time", group: ["America/Nuuk", "America/Godthab"], continentCode: "NA", continentName: "North America", countryName: "Greenland", countryCode: "GL", mainCities: ["Nuuk"], rawOffsetInMinutes: -120, abbreviation: "WGT", rawFormat: "-02:00 West Greenland Time - Nuuk" },
    { name: "Atlantic/Azores", alternativeName: "Azores Time", group: ["Atlantic/Azores"], continentCode: "EU", continentName: "Europe", countryName: "Portugal", countryCode: "PT", mainCities: ["Ponta Delgada"], rawOffsetInMinutes: -60, abbreviation: "AZOT", rawFormat: "-01:00 Azores Time - Ponta Delgada" },
    { name: "Atlantic/Cape_Verde", alternativeName: "Cape Verde Time", group: ["Atlantic/Cape_Verde"], continentCode: "AF", continentName: "Africa", countryName: "Cabo Verde", countryCode: "CV", mainCities: ["Praia", "Mindelo", "Espargos", "Assomada"], rawOffsetInMinutes: -60, abbreviation: "CVT", rawFormat: "-01:00 Cape Verde Time - Praia, Mindelo, Espargos, Assomada" },
    { name: "America/Scoresbysund", alternativeName: "East Greenland Time", group: ["America/Scoresbysund"], continentCode: "NA", continentName: "North America", countryName: "Greenland", countryCode: "GL", mainCities: ["Scoresbysund"], rawOffsetInMinutes: -60, abbreviation: "EGT", rawFormat: "-01:00 East Greenland Time - Scoresbysund" },
    { name: "Africa/Abidjan", alternativeName: "Greenwich Mean Time", group: ["Africa/Abidjan", "Iceland", "Africa/Accra", "Africa/Bamako", "Africa/Banjul", "Africa/Conakry", "Africa/Dakar", "Africa/Freetown", "Africa/Lome", "Africa/Nouakchott", "Africa/Ouagadougou", "Atlantic/Reykjavik", "Atlantic/St_Helena", "Africa/Timbuktu"], continentCode: "AF", continentName: "Africa", countryName: "Ivory Coast", countryCode: "CI", mainCities: ["Abidjan", "Abobo", "Bouak\xE9", "Korhogo"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Abidjan, Abobo, Bouak\xE9, Korhogo" },
    { name: "Africa/Bamako", alternativeName: "Greenwich Mean Time", group: ["Africa/Bamako"], continentCode: "AF", continentName: "Africa", countryName: "Mali", countryCode: "ML", mainCities: ["Bamako", "S\xE9gou", "Sikasso", "Mopti"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Bamako, S\xE9gou, Sikasso, Mopti" },
    { name: "Africa/Bissau", alternativeName: "Greenwich Mean Time", group: ["Africa/Bissau"], continentCode: "AF", continentName: "Africa", countryName: "Guinea-Bissau", countryCode: "GW", mainCities: ["Bissau", "Bafat\xE1"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Bissau, Bafat\xE1" },
    { name: "Africa/Conakry", alternativeName: "Greenwich Mean Time", group: ["Africa/Conakry"], continentCode: "AF", continentName: "Africa", countryName: "Guinea", countryCode: "GN", mainCities: ["Camayenne", "Conakry", "Nz\xE9r\xE9kor\xE9", "Kindia"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Camayenne, Conakry, Nz\xE9r\xE9kor\xE9, Kindia" },
    { name: "Africa/Dakar", alternativeName: "Greenwich Mean Time", group: ["Africa/Dakar"], continentCode: "AF", continentName: "Africa", countryName: "Senegal", countryCode: "SN", mainCities: ["Dakar", "Pikine", "Touba", "Thi\xE8s"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Dakar, Pikine, Touba, Thi\xE8s" },
    { name: "America/Danmarkshavn", alternativeName: "Greenwich Mean Time", group: ["America/Danmarkshavn"], continentCode: "NA", continentName: "North America", countryName: "Greenland", countryCode: "GL", mainCities: ["Danmarkshavn"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Danmarkshavn" },
    { name: "Europe/Isle_of_Man", alternativeName: "Greenwich Mean Time", group: ["Europe/Isle_of_Man"], continentCode: "EU", continentName: "Europe", countryName: "Isle of Man", countryCode: "IM", mainCities: ["Douglas"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Douglas" },
    { name: "Europe/Dublin", alternativeName: "Greenwich Mean Time", group: ["Europe/Dublin", "Eire"], continentCode: "EU", continentName: "Europe", countryName: "Ireland", countryCode: "IE", mainCities: ["Dublin", "South Dublin", "Cork", "Limerick"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Dublin, South Dublin, Cork, Limerick" },
    { name: "Africa/Freetown", alternativeName: "Greenwich Mean Time", group: ["Africa/Freetown"], continentCode: "AF", continentName: "Africa", countryName: "Sierra Leone", countryCode: "SL", mainCities: ["Freetown", "Bo", "Kenema", "Koidu"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Freetown, Bo, Kenema, Koidu" },
    { name: "Atlantic/St_Helena", alternativeName: "Greenwich Mean Time", group: ["Atlantic/St_Helena"], continentCode: "AF", continentName: "Africa", countryName: "Saint Helena", countryCode: "SH", mainCities: ["Jamestown"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Jamestown" },
    { name: "Africa/Accra", alternativeName: "Greenwich Mean Time", group: ["Africa/Accra"], continentCode: "AF", continentName: "Africa", countryName: "Ghana", countryCode: "GH", mainCities: ["Kumasi", "Accra", "Tamale", "Takoradi"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Kumasi, Accra, Tamale, Takoradi" },
    { name: "Africa/Lome", alternativeName: "Greenwich Mean Time", group: ["Africa/Lome"], continentCode: "AF", continentName: "Africa", countryName: "Togo", countryCode: "TG", mainCities: ["Lom\xE9", "Sokod\xE9", "Kara", "Atakpam\xE9"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Lom\xE9, Sokod\xE9, Kara, Atakpam\xE9" },
    { name: "Europe/London", alternativeName: "Greenwich Mean Time", group: ["Europe/London", "GB", "GB-Eire", "Europe/Guernsey", "Europe/Isle_of_Man", "Europe/Jersey", "Europe/Belfast"], continentCode: "EU", continentName: "Europe", countryName: "United Kingdom", countryCode: "GB", mainCities: ["London", "Birmingham", "Liverpool", "Glasgow"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - London, Birmingham, Liverpool, Glasgow" },
    { name: "Africa/Monrovia", alternativeName: "Greenwich Mean Time", group: ["Africa/Monrovia"], continentCode: "AF", continentName: "Africa", countryName: "Liberia", countryCode: "LR", mainCities: ["Monrovia", "Gbarnga", "Kakata", "Bensonville"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Monrovia, Gbarnga, Kakata, Bensonville" },
    { name: "Africa/Nouakchott", alternativeName: "Greenwich Mean Time", group: ["Africa/Nouakchott"], continentCode: "AF", continentName: "Africa", countryName: "Mauritania", countryCode: "MR", mainCities: ["Nouakchott", "Nouadhibou", "Dar Naim", "N\xE9ma"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Nouakchott, Nouadhibou, Dar Naim, N\xE9ma" },
    { name: "Africa/Ouagadougou", alternativeName: "Greenwich Mean Time", group: ["Africa/Ouagadougou"], continentCode: "AF", continentName: "Africa", countryName: "Burkina Faso", countryCode: "BF", mainCities: ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Saaba"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Ouagadougou, Bobo-Dioulasso, Koudougou, Saaba" },
    { name: "Atlantic/Reykjavik", alternativeName: "Greenwich Mean Time", group: ["Atlantic/Reykjavik", "Iceland"], continentCode: "EU", continentName: "Europe", countryName: "Iceland", countryCode: "IS", mainCities: ["Reykjav\xEDk", "K\xF3pavogur", "Hafnarfj\xF6r\xF0ur", "Reykjanesb\xE6r"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Reykjav\xEDk, K\xF3pavogur, Hafnarfj\xF6r\xF0ur, Reykjanesb\xE6r" },
    { name: "Europe/Jersey", alternativeName: "Greenwich Mean Time", group: ["Europe/Jersey"], continentCode: "EU", continentName: "Europe", countryName: "Jersey", countryCode: "JE", mainCities: ["Saint Helier"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Saint Helier" },
    { name: "Europe/Guernsey", alternativeName: "Greenwich Mean Time", group: ["Europe/Guernsey"], continentCode: "EU", continentName: "Europe", countryName: "Guernsey", countryCode: "GG", mainCities: ["Saint Peter Port"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Saint Peter Port" },
    { name: "Africa/Banjul", alternativeName: "Greenwich Mean Time", group: ["Africa/Banjul"], continentCode: "AF", continentName: "Africa", countryName: "Gambia", countryCode: "GM", mainCities: ["Serekunda", "Brikama", "Bununka Kunda", "Sukuta"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Serekunda, Brikama, Bununka Kunda, Sukuta" },
    { name: "Africa/Sao_Tome", alternativeName: "Greenwich Mean Time", group: ["Africa/Sao_Tome"], continentCode: "AF", continentName: "Africa", countryName: "Sao Tome and Principe", countryCode: "ST", mainCities: ["S\xE3o Tom\xE9"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - S\xE3o Tom\xE9" },
    { name: "Antarctica/Troll", alternativeName: "Greenwich Mean Time", group: ["Antarctica/Troll"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Troll"], rawOffsetInMinutes: 0, abbreviation: "GMT", rawFormat: "+00:00 Greenwich Mean Time - Troll" },
    { name: "Africa/Casablanca", alternativeName: "Western European Time", group: ["Africa/Casablanca"], continentCode: "AF", continentName: "Africa", countryName: "Morocco", countryCode: "MA", mainCities: ["Casablanca", "Rabat", "F\xE8s", "Sale"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - Casablanca, Rabat, F\xE8s, Sale" },
    { name: "Africa/El_Aaiun", alternativeName: "Western European Time", group: ["Africa/El_Aaiun"], continentCode: "AF", continentName: "Africa", countryName: "Western Sahara", countryCode: "EH", mainCities: ["Laayoune", "Dakhla", "Boujdour"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - Laayoune, Dakhla, Boujdour" },
    { name: "Atlantic/Canary", alternativeName: "Western European Time", group: ["Atlantic/Canary"], continentCode: "EU", continentName: "Europe", countryName: "Spain", countryCode: "ES", mainCities: ["Las Palmas de Gran Canaria", "Santa Cruz de Tenerife", "La Laguna", "Telde"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - Las Palmas de Gran Canaria, Santa Cruz de Tenerife, La Laguna, Telde" },
    { name: "Europe/Lisbon", alternativeName: "Western European Time", group: ["Atlantic/Madeira", "Europe/Lisbon", "Portugal"], continentCode: "EU", continentName: "Europe", countryName: "Portugal", countryCode: "PT", mainCities: ["Lisbon", "Porto", "Amadora", "Braga"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - Lisbon, Porto, Amadora, Braga" },
    { name: "Atlantic/Faroe", alternativeName: "Western European Time", group: ["Atlantic/Faroe", "Atlantic/Faeroe"], continentCode: "EU", continentName: "Europe", countryName: "Faroe Islands", countryCode: "FO", mainCities: ["T\xF3rshavn"], rawOffsetInMinutes: 0, abbreviation: "WET", rawFormat: "+00:00 Western European Time - T\xF3rshavn" },
    { name: "Africa/Windhoek", alternativeName: "Central Africa Time", group: ["Africa/Windhoek"], continentCode: "AF", continentName: "Africa", countryName: "Namibia", countryCode: "NA", mainCities: ["Windhoek", "Rundu", "Walvis Bay", "Oshakati"], rawOffsetInMinutes: 60, abbreviation: "CAT", rawFormat: "+01:00 Central Africa Time - Windhoek, Rundu, Walvis Bay, Oshakati" },
    { name: "Africa/Algiers", alternativeName: "Central European Time", group: ["Africa/Algiers"], continentCode: "AF", continentName: "Africa", countryName: "Algeria", countryCode: "DZ", mainCities: ["Algiers", "Oran", "Constantine", "Annaba"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Algiers, Oran, Constantine, Annaba" },
    { name: "Europe/Amsterdam", alternativeName: "Central European Time", group: ["Europe/Amsterdam"], continentCode: "EU", continentName: "Europe", countryName: "The Netherlands", countryCode: "NL", mainCities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Amsterdam, Rotterdam, The Hague, Utrecht" },
    { name: "Europe/Andorra", alternativeName: "Central European Time", group: ["Europe/Andorra"], continentCode: "EU", continentName: "Europe", countryName: "Andorra", countryCode: "AD", mainCities: ["Andorra la Vella", "les Escaldes"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Andorra la Vella, les Escaldes" },
    { name: "Europe/Belgrade", alternativeName: "Central European Time", group: ["Europe/Belgrade", "Europe/Ljubljana", "Europe/Podgorica", "Europe/Sarajevo", "Europe/Skopje", "Europe/Zagreb"], continentCode: "EU", continentName: "Europe", countryName: "Serbia", countryCode: "RS", mainCities: ["Belgrade", "Ni\u0161", "Novi Sad", "Zemun"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Belgrade, Ni\u0161, Novi Sad, Zemun" },
    { name: "Europe/Berlin", alternativeName: "Central European Time", group: ["Europe/Berlin", "Europe/Busingen", "Arctic/Longyearbyen", "Europe/Copenhagen", "Europe/Oslo", "Europe/Stockholm", "Atlantic/Jan_Mayen"], continentCode: "EU", continentName: "Europe", countryName: "Germany", countryCode: "DE", mainCities: ["Berlin", "Hamburg", "Munich", "K\xF6ln"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Berlin, Hamburg, Munich, K\xF6ln" },
    { name: "Europe/Bratislava", alternativeName: "Central European Time", group: ["Europe/Bratislava"], continentCode: "EU", continentName: "Europe", countryName: "Slovakia", countryCode: "SK", mainCities: ["Bratislava", "Ko\u0161ice", "Nitra", "Pre\u0161ov"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Bratislava, Ko\u0161ice, Nitra, Pre\u0161ov" },
    { name: "Europe/Brussels", alternativeName: "Central European Time", group: ["Europe/Brussels", "Europe/Amsterdam", "Europe/Luxembourg"], continentCode: "EU", continentName: "Europe", countryName: "Belgium", countryCode: "BE", mainCities: ["Brussels", "Antwerpen", "Gent", "Charleroi"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Brussels, Antwerpen, Gent, Charleroi" },
    { name: "Europe/Budapest", alternativeName: "Central European Time", group: ["Europe/Budapest"], continentCode: "EU", continentName: "Europe", countryName: "Hungary", countryCode: "HU", mainCities: ["Budapest", "Debrecen", "Szeged", "Miskolc"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Budapest, Debrecen, Szeged, Miskolc" },
    { name: "Europe/Copenhagen", alternativeName: "Central European Time", group: ["Europe/Copenhagen"], continentCode: "EU", continentName: "Europe", countryName: "Denmark", countryCode: "DK", mainCities: ["Copenhagen", "\xC5rhus", "Odense", "Aalborg"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Copenhagen, \xC5rhus, Odense, Aalborg" },
    { name: "Europe/Gibraltar", alternativeName: "Central European Time", group: ["Europe/Gibraltar"], continentCode: "EU", continentName: "Europe", countryName: "Gibraltar", countryCode: "GI", mainCities: ["Gibraltar"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Gibraltar" },
    { name: "Europe/Ljubljana", alternativeName: "Central European Time", group: ["Europe/Ljubljana"], continentCode: "EU", continentName: "Europe", countryName: "Slovenia", countryCode: "SI", mainCities: ["Ljubljana", "Maribor", "Kranj", "Celje"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Ljubljana, Maribor, Kranj, Celje" },
    { name: "Arctic/Longyearbyen", alternativeName: "Central European Time", group: ["Arctic/Longyearbyen"], continentCode: "EU", continentName: "Europe", countryName: "Svalbard and Jan Mayen", countryCode: "SJ", mainCities: ["Longyearbyen"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Longyearbyen" },
    { name: "Europe/Luxembourg", alternativeName: "Central European Time", group: ["Europe/Luxembourg"], continentCode: "EU", continentName: "Europe", countryName: "Luxembourg", countryCode: "LU", mainCities: ["Luxembourg", "Esch-sur-Alzette", "Dudelange"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Luxembourg, Esch-sur-Alzette, Dudelange" },
    { name: "Europe/Madrid", alternativeName: "Central European Time", group: ["Africa/Ceuta", "Europe/Madrid"], continentCode: "EU", continentName: "Europe", countryName: "Spain", countryCode: "ES", mainCities: ["Madrid", "Barcelona", "Valencia", "Sevilla"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Madrid, Barcelona, Valencia, Sevilla" },
    { name: "Europe/Monaco", alternativeName: "Central European Time", group: ["Europe/Monaco"], continentCode: "EU", continentName: "Europe", countryName: "Monaco", countryCode: "MC", mainCities: ["Monaco", "Monte-Carlo"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Monaco, Monte-Carlo" },
    { name: "Europe/Oslo", alternativeName: "Central European Time", group: ["Europe/Oslo", "Atlantic/Jan_Mayen"], continentCode: "EU", continentName: "Europe", countryName: "Norway", countryCode: "NO", mainCities: ["Oslo", "Bergen", "Trondheim", "Stavanger"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Oslo, Bergen, Trondheim, Stavanger" },
    { name: "Europe/Paris", alternativeName: "Central European Time", group: ["Europe/Paris", "Europe/Monaco"], continentCode: "EU", continentName: "Europe", countryName: "France", countryCode: "FR", mainCities: ["Paris", "Marseille", "Lyon", "Toulouse"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Paris, Marseille, Lyon, Toulouse" },
    { name: "Europe/Podgorica", alternativeName: "Central European Time", group: ["Europe/Podgorica"], continentCode: "EU", continentName: "Europe", countryName: "Montenegro", countryCode: "ME", mainCities: ["Podgorica", "Nik\u0161i\u0107", "Herceg Novi", "Pljevlja"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Podgorica, Nik\u0161i\u0107, Herceg Novi, Pljevlja" },
    { name: "Europe/Prague", alternativeName: "Central European Time", group: ["Europe/Prague", "Europe/Bratislava"], continentCode: "EU", continentName: "Europe", countryName: "Czechia", countryCode: "CZ", mainCities: ["Prague", "Brno", "Ostrava", "Pilsen"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Prague, Brno, Ostrava, Pilsen" },
    { name: "Europe/Rome", alternativeName: "Central European Time", group: ["Europe/Rome", "Europe/San_Marino", "Europe/Vatican"], continentCode: "EU", continentName: "Europe", countryName: "Italy", countryCode: "IT", mainCities: ["Rome", "Milan", "Naples", "Turin"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Rome, Milan, Naples, Turin" },
    { name: "Europe/San_Marino", alternativeName: "Central European Time", group: ["Europe/San_Marino"], continentCode: "EU", continentName: "Europe", countryName: "San Marino", countryCode: "SM", mainCities: ["San Marino"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - San Marino" },
    { name: "Europe/Malta", alternativeName: "Central European Time", group: ["Europe/Malta"], continentCode: "EU", continentName: "Europe", countryName: "Malta", countryCode: "MT", mainCities: ["San Pawl il-Ba\u0127ar", "Birkirkara", "Mosta", "Sliema"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - San Pawl il-Ba\u0127ar, Birkirkara, Mosta, Sliema" },
    { name: "Europe/Sarajevo", alternativeName: "Central European Time", group: ["Europe/Sarajevo"], continentCode: "EU", continentName: "Europe", countryName: "Bosnia and Herzegovina", countryCode: "BA", mainCities: ["Sarajevo", "Banja Luka", "Zenica", "Tuzla"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Sarajevo, Banja Luka, Zenica, Tuzla" },
    { name: "Europe/Skopje", alternativeName: "Central European Time", group: ["Europe/Skopje"], continentCode: "EU", continentName: "Europe", countryName: "North Macedonia", countryCode: "MK", mainCities: ["Skopje", "Kumanovo", "Prilep", "Bitola"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Skopje, Kumanovo, Prilep, Bitola" },
    { name: "Europe/Stockholm", alternativeName: "Central European Time", group: ["Europe/Stockholm"], continentCode: "EU", continentName: "Europe", countryName: "Sweden", countryCode: "SE", mainCities: ["Stockholm", "G\xF6teborg", "Malm\xF6", "Uppsala"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Stockholm, G\xF6teborg, Malm\xF6, Uppsala" },
    { name: "Europe/Tirane", alternativeName: "Central European Time", group: ["Europe/Tirane"], continentCode: "EU", continentName: "Europe", countryName: "Albania", countryCode: "AL", mainCities: ["Tirana", "Durr\xEBs", "Elbasan", "Vlor\xEB"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Tirana, Durr\xEBs, Elbasan, Vlor\xEB" },
    { name: "Africa/Tunis", alternativeName: "Central European Time", group: ["Africa/Tunis"], continentCode: "AF", continentName: "Africa", countryName: "Tunisia", countryCode: "TN", mainCities: ["Tunis", "Sfax", "Sousse", "Kairouan"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Tunis, Sfax, Sousse, Kairouan" },
    { name: "Europe/Vaduz", alternativeName: "Central European Time", group: ["Europe/Vaduz"], continentCode: "EU", continentName: "Europe", countryName: "Liechtenstein", countryCode: "LI", mainCities: ["Vaduz"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Vaduz" },
    { name: "Europe/Vatican", alternativeName: "Central European Time", group: ["Europe/Vatican"], continentCode: "EU", continentName: "Europe", countryName: "Vatican", countryCode: "VA", mainCities: ["Vatican City"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Vatican City" },
    { name: "Europe/Vienna", alternativeName: "Central European Time", group: ["Europe/Vienna"], continentCode: "EU", continentName: "Europe", countryName: "Austria", countryCode: "AT", mainCities: ["Vienna", "Graz", "Linz", "Favoriten"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Vienna, Graz, Linz, Favoriten" },
    { name: "Europe/Warsaw", alternativeName: "Central European Time", group: ["Europe/Warsaw", "Poland"], continentCode: "EU", continentName: "Europe", countryName: "Poland", countryCode: "PL", mainCities: ["Warsaw", "\u0141\xF3d\u017A", "Krak\xF3w", "Wroc\u0142aw"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Warsaw, \u0141\xF3d\u017A, Krak\xF3w, Wroc\u0142aw" },
    { name: "Europe/Zagreb", alternativeName: "Central European Time", group: ["Europe/Zagreb"], continentCode: "EU", continentName: "Europe", countryName: "Croatia", countryCode: "HR", mainCities: ["Zagreb", "Split", "Rijeka", "Osijek"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Zagreb, Split, Rijeka, Osijek" },
    { name: "Europe/Zurich", alternativeName: "Central European Time", group: ["Europe/Zurich", "Europe/Busingen", "Europe/Vaduz"], continentCode: "EU", continentName: "Europe", countryName: "Switzerland", countryCode: "CH", mainCities: ["Z\xFCrich", "Gen\xE8ve", "Basel", "Lausanne"], rawOffsetInMinutes: 60, abbreviation: "CET", rawFormat: "+01:00 Central European Time - Z\xFCrich, Gen\xE8ve, Basel, Lausanne" },
    { name: "Africa/Bangui", alternativeName: "West Africa Time", group: ["Africa/Bangui"], continentCode: "AF", continentName: "Africa", countryName: "Central African Republic", countryCode: "CF", mainCities: ["Bangui", "Bimbo", "B\xE9goua", "Carnot"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Bangui, Bimbo, B\xE9goua, Carnot" },
    { name: "Africa/Malabo", alternativeName: "West Africa Time", group: ["Africa/Malabo"], continentCode: "AF", continentName: "Africa", countryName: "Equatorial Guinea", countryCode: "GQ", mainCities: ["Bata", "Malabo", "Ebebiyin"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Bata, Malabo, Ebebiyin" },
    { name: "Africa/Brazzaville", alternativeName: "West Africa Time", group: ["Africa/Brazzaville"], continentCode: "AF", continentName: "Africa", countryName: "Republic of the Congo", countryCode: "CG", mainCities: ["Brazzaville", "Pointe-Noire", "Dolisie", "Nkayi"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Brazzaville, Pointe-Noire, Dolisie, Nkayi" },
    { name: "Africa/Porto-Novo", alternativeName: "West Africa Time", group: ["Africa/Porto-Novo"], continentCode: "AF", continentName: "Africa", countryName: "Benin", countryCode: "BJ", mainCities: ["Cotonou", "Abomey-Calavi", "Porto-Novo", "Parakou"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Cotonou, Abomey-Calavi, Porto-Novo, Parakou" },
    { name: "Africa/Douala", alternativeName: "West Africa Time", group: ["Africa/Douala"], continentCode: "AF", continentName: "Africa", countryName: "Cameroon", countryCode: "CM", mainCities: ["Douala", "Yaound\xE9", "Bamenda", "Bafoussam"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Douala, Yaound\xE9, Bamenda, Bafoussam" },
    { name: "Africa/Kinshasa", alternativeName: "West Africa Time", group: ["Africa/Kinshasa"], continentCode: "AF", continentName: "Africa", countryName: "Democratic Republic of the Congo", countryCode: "CD", mainCities: ["Kinshasa", "Kikwit", "Masina", "Mbandaka"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Kinshasa, Kikwit, Masina, Mbandaka" },
    { name: "Africa/Lagos", alternativeName: "West Africa Time", group: ["Africa/Lagos", "Africa/Bangui", "Africa/Brazzaville", "Africa/Douala", "Africa/Kinshasa", "Africa/Libreville", "Africa/Luanda", "Africa/Malabo", "Africa/Niamey", "Africa/Porto-Novo"], continentCode: "AF", continentName: "Africa", countryName: "Nigeria", countryCode: "NG", mainCities: ["Lagos", "Kano", "Ibadan", "Port Harcourt"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Lagos, Kano, Ibadan, Port Harcourt" },
    { name: "Africa/Libreville", alternativeName: "West Africa Time", group: ["Africa/Libreville"], continentCode: "AF", continentName: "Africa", countryName: "Gabon", countryCode: "GA", mainCities: ["Libreville", "Port-Gentil", "Franceville", "Owendo"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Libreville, Port-Gentil, Franceville, Owendo" },
    { name: "Africa/Luanda", alternativeName: "West Africa Time", group: ["Africa/Luanda"], continentCode: "AF", continentName: "Africa", countryName: "Angola", countryCode: "AO", mainCities: ["Luanda", "Lubango", "Huambo", "Benguela"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Luanda, Lubango, Huambo, Benguela" },
    { name: "Africa/Ndjamena", alternativeName: "West Africa Time", group: ["Africa/Ndjamena"], continentCode: "AF", continentName: "Africa", countryName: "Chad", countryCode: "TD", mainCities: ["N'Djamena", "Moundou", "Ab\xE9ch\xE9", "Sarh"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - N'Djamena, Moundou, Ab\xE9ch\xE9, Sarh" },
    { name: "Africa/Niamey", alternativeName: "West Africa Time", group: ["Africa/Niamey"], continentCode: "AF", continentName: "Africa", countryName: "Niger", countryCode: "NE", mainCities: ["Niamey", "Zinder", "Maradi", "Agadez"], rawOffsetInMinutes: 60, abbreviation: "WAT", rawFormat: "+01:00 West Africa Time - Niamey, Zinder, Maradi, Agadez" },
    { name: "Africa/Bujumbura", alternativeName: "Central Africa Time", group: ["Africa/Bujumbura"], continentCode: "AF", continentName: "Africa", countryName: "Burundi", countryCode: "BI", mainCities: ["Bujumbura", "Gitega", "Ngozi", "Rumonge"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Bujumbura, Gitega, Ngozi, Rumonge" },
    { name: "Africa/Gaborone", alternativeName: "Central Africa Time", group: ["Africa/Gaborone"], continentCode: "AF", continentName: "Africa", countryName: "Botswana", countryCode: "BW", mainCities: ["Gaborone", "Francistown", "Mogoditshane", "Maun"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Gaborone, Francistown, Mogoditshane, Maun" },
    { name: "Africa/Harare", alternativeName: "Central Africa Time", group: ["Africa/Harare"], continentCode: "AF", continentName: "Africa", countryName: "Zimbabwe", countryCode: "ZW", mainCities: ["Harare", "Bulawayo", "Chitungwiza", "Mutare"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Harare, Bulawayo, Chitungwiza, Mutare" },
    { name: "Africa/Juba", alternativeName: "Central Africa Time", group: ["Africa/Juba"], continentCode: "AF", continentName: "Africa", countryName: "South Sudan", countryCode: "SS", mainCities: ["Juba", "Winejok", "Yei", "Malakal"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Juba, Winejok, Yei, Malakal" },
    { name: "Africa/Khartoum", alternativeName: "Central Africa Time", group: ["Africa/Khartoum"], continentCode: "AF", continentName: "Africa", countryName: "Sudan", countryCode: "SD", mainCities: ["Khartoum", "Omdurman", "Nyala", "Port Sudan"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Khartoum, Omdurman, Nyala, Port Sudan" },
    { name: "Africa/Kigali", alternativeName: "Central Africa Time", group: ["Africa/Kigali"], continentCode: "AF", continentName: "Africa", countryName: "Rwanda", countryCode: "RW", mainCities: ["Kigali", "Gisenyi", "Butare", "Gitarama"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Kigali, Gisenyi, Butare, Gitarama" },
    { name: "Africa/Blantyre", alternativeName: "Central Africa Time", group: ["Africa/Blantyre"], continentCode: "AF", continentName: "Africa", countryName: "Malawi", countryCode: "MW", mainCities: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Lilongwe, Blantyre, Mzuzu, Zomba" },
    { name: "Africa/Lubumbashi", alternativeName: "Central Africa Time", group: ["Africa/Lubumbashi"], continentCode: "AF", continentName: "Africa", countryName: "Democratic Republic of the Congo", countryCode: "CD", mainCities: ["Lubumbashi", "Mbuji-Mayi", "Kananga", "Kisangani"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Lubumbashi, Mbuji-Mayi, Kananga, Kisangani" },
    { name: "Africa/Lusaka", alternativeName: "Central Africa Time", group: ["Africa/Lusaka"], continentCode: "AF", continentName: "Africa", countryName: "Zambia", countryCode: "ZM", mainCities: ["Lusaka", "Ndola", "Kitwe", "Chipata"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Lusaka, Ndola, Kitwe, Chipata" },
    { name: "Africa/Maputo", alternativeName: "Central Africa Time", group: ["Africa/Maputo", "Africa/Blantyre", "Africa/Bujumbura", "Africa/Gaborone", "Africa/Harare", "Africa/Kigali", "Africa/Lubumbashi", "Africa/Lusaka"], continentCode: "AF", continentName: "Africa", countryName: "Mozambique", countryCode: "MZ", mainCities: ["Maputo", "Matola", "Nampula", "Beira"], rawOffsetInMinutes: 120, abbreviation: "CAT", rawFormat: "+02:00 Central Africa Time - Maputo, Matola, Nampula, Beira" },
    { name: "Europe/Athens", alternativeName: "Eastern European Time", group: ["Europe/Athens"], continentCode: "EU", continentName: "Europe", countryName: "Greece", countryCode: "GR", mainCities: ["Athens", "Thessalon\xEDki", "P\xE1tra", "Piraeus"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Athens, Thessalon\xEDki, P\xE1tra, Piraeus" },
    { name: "Asia/Beirut", alternativeName: "Eastern European Time", group: ["Asia/Beirut"], continentCode: "AS", continentName: "Asia", countryName: "Lebanon", countryCode: "LB", mainCities: ["Beirut", "Ra\u2019s Bayr\u016Bt", "Tripoli", "Sidon"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Beirut, Ra\u2019s Bayr\u016Bt, Tripoli, Sidon" },
    { name: "Europe/Bucharest", alternativeName: "Eastern European Time", group: ["Europe/Bucharest"], continentCode: "EU", continentName: "Europe", countryName: "Romania", countryCode: "RO", mainCities: ["Bucharest", "Sector 3", "Ia\u015Fi", "Sector 6"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Bucharest, Sector 3, Ia\u015Fi, Sector 6" },
    { name: "Africa/Cairo", alternativeName: "Eastern European Time", group: ["Africa/Cairo", "Egypt"], continentCode: "AF", continentName: "Africa", countryName: "Egypt", countryCode: "EG", mainCities: ["Cairo", "Alexandria", "Giza", "Shubr\u0101 al Khaymah"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Cairo, Alexandria, Giza, Shubr\u0101 al Khaymah" },
    { name: "Europe/Chisinau", alternativeName: "Eastern European Time", group: ["Europe/Chisinau", "Europe/Tiraspol"], continentCode: "EU", continentName: "Europe", countryName: "Moldova", countryCode: "MD", mainCities: ["Chisinau", "Tiraspol", "B\u0103l\u0163i", "Bender"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Chisinau, Tiraspol, B\u0103l\u0163i, Bender" },
    { name: "Asia/Hebron", alternativeName: "Eastern European Time", group: ["Asia/Gaza", "Asia/Hebron"], continentCode: "AS", continentName: "Asia", countryName: "Palestinian Territory", countryCode: "PS", mainCities: ["East Jerusalem", "Gaza", "Kh\u0101n Y\u016Bnis", "Jab\u0101ly\u0101"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - East Jerusalem, Gaza, Kh\u0101n Y\u016Bnis, Jab\u0101ly\u0101" },
    { name: "Europe/Helsinki", alternativeName: "Eastern European Time", group: ["Europe/Helsinki", "Europe/Mariehamn"], continentCode: "EU", continentName: "Europe", countryName: "Finland", countryCode: "FI", mainCities: ["Helsinki", "Espoo", "Tampere", "Oulu"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Helsinki, Espoo, Tampere, Oulu" },
    { name: "Europe/Kaliningrad", alternativeName: "Eastern European Time", group: ["Europe/Kaliningrad"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Kaliningrad", "Chernyakhovsk", "Sovetsk", "Baltiysk"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Kaliningrad, Chernyakhovsk, Sovetsk, Baltiysk" },
    { name: "Europe/Kyiv", alternativeName: "Eastern European Time", group: ["Europe/Kyiv", "Europe/Uzhgorod", "Europe/Zaporozhye", "Europe/Kiev"], continentCode: "EU", continentName: "Europe", countryName: "Ukraine", countryCode: "UA", mainCities: ["Kyiv", "Kharkiv", "Odesa", "Dnipro"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Kyiv, Kharkiv, Odesa, Dnipro" },
    { name: "Europe/Mariehamn", alternativeName: "Eastern European Time", group: ["Europe/Mariehamn"], continentCode: "EU", continentName: "Europe", countryName: "Aland Islands", countryCode: "AX", mainCities: ["Mariehamn"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Mariehamn" },
    { name: "Asia/Nicosia", alternativeName: "Eastern European Time", group: ["Asia/Famagusta", "Asia/Nicosia", "Europe/Nicosia"], continentCode: "EU", continentName: "Europe", countryName: "Cyprus", countryCode: "CY", mainCities: ["Nicosia", "Limassol", "Larnaca", "Str\xF3volos"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Nicosia, Limassol, Larnaca, Str\xF3volos" },
    { name: "Europe/Riga", alternativeName: "Eastern European Time", group: ["Europe/Riga"], continentCode: "EU", continentName: "Europe", countryName: "Latvia", countryCode: "LV", mainCities: ["Riga", "Daugavpils", "Liep\u0101ja", "Jelgava"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Riga, Daugavpils, Liep\u0101ja, Jelgava" },
    { name: "Europe/Sofia", alternativeName: "Eastern European Time", group: ["Europe/Sofia"], continentCode: "EU", continentName: "Europe", countryName: "Bulgaria", countryCode: "BG", mainCities: ["Sofia", "Plovdiv", "Varna", "Burgas"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Sofia, Plovdiv, Varna, Burgas" },
    { name: "Europe/Tallinn", alternativeName: "Eastern European Time", group: ["Europe/Tallinn"], continentCode: "EU", continentName: "Europe", countryName: "Estonia", countryCode: "EE", mainCities: ["Tallinn", "Tartu", "Narva", "P\xE4rnu"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Tallinn, Tartu, Narva, P\xE4rnu" },
    { name: "Africa/Tripoli", alternativeName: "Eastern European Time", group: ["Africa/Tripoli", "Libya"], continentCode: "AF", continentName: "Africa", countryName: "Libya", countryCode: "LY", mainCities: ["Tripoli", "Benghazi", "Ajdabiya", "Mi\u015Fr\u0101tah"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Tripoli, Benghazi, Ajdabiya, Mi\u015Fr\u0101tah" },
    { name: "Europe/Vilnius", alternativeName: "Eastern European Time", group: ["Europe/Vilnius"], continentCode: "EU", continentName: "Europe", countryName: "Lithuania", countryCode: "LT", mainCities: ["Vilnius", "Kaunas", "Klaip\u0117da", "\u0160iauliai"], rawOffsetInMinutes: 120, abbreviation: "EET", rawFormat: "+02:00 Eastern European Time - Vilnius, Kaunas, Klaip\u0117da, \u0160iauliai" },
    { name: "Asia/Jerusalem", alternativeName: "Israel Time", group: ["Asia/Jerusalem", "Israel", "Asia/Tel_Aviv"], continentCode: "AS", continentName: "Asia", countryName: "Israel", countryCode: "IL", mainCities: ["Jerusalem", "Tel Aviv", "West Jerusalem", "Haifa"], rawOffsetInMinutes: 120, abbreviation: "IST", rawFormat: "+02:00 Israel Time - Jerusalem, Tel Aviv, West Jerusalem, Haifa" },
    { name: "Africa/Johannesburg", alternativeName: "South Africa Time", group: ["Africa/Johannesburg", "Africa/Maseru", "Africa/Mbabane"], continentCode: "AF", continentName: "Africa", countryName: "South Africa", countryCode: "ZA", mainCities: ["Johannesburg", "Cape Town", "Durban", "Soweto"], rawOffsetInMinutes: 120, abbreviation: "SAST", rawFormat: "+02:00 South Africa Time - Johannesburg, Cape Town, Durban, Soweto" },
    { name: "Africa/Mbabane", alternativeName: "South Africa Time", group: ["Africa/Mbabane"], continentCode: "AF", continentName: "Africa", countryName: "Eswatini", countryCode: "SZ", mainCities: ["Manzini", "Mbabane", "Lobamba"], rawOffsetInMinutes: 120, abbreviation: "SAST", rawFormat: "+02:00 South Africa Time - Manzini, Mbabane, Lobamba" },
    { name: "Africa/Maseru", alternativeName: "South Africa Time", group: ["Africa/Maseru"], continentCode: "AF", continentName: "Africa", countryName: "Lesotho", countryCode: "LS", mainCities: ["Maseru", "Mohale\u2019s Hoek", "Mafeteng", "Leribe"], rawOffsetInMinutes: 120, abbreviation: "SAST", rawFormat: "+02:00 South Africa Time - Maseru, Mohale\u2019s Hoek, Mafeteng, Leribe" },
    { name: "Asia/Kuwait", alternativeName: "Arabian Time", group: ["Asia/Kuwait"], continentCode: "AS", continentName: "Asia", countryName: "Kuwait", countryCode: "KW", mainCities: ["Al A\u1E29mad\u012B", "\u1E28awall\u012B", "As S\u0101lim\u012Byah", "\u015Eab\u0101\u1E29 as S\u0101lim"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Al A\u1E29mad\u012B, \u1E28awall\u012B, As S\u0101lim\u012Byah, \u015Eab\u0101\u1E29 as S\u0101lim" },
    { name: "Asia/Bahrain", alternativeName: "Arabian Time", group: ["Asia/Bahrain"], continentCode: "AS", continentName: "Asia", countryName: "Bahrain", countryCode: "BH", mainCities: ["Ar Rif\u0101\u2018", "Manama", "Al Muharraq", "D\u0101r Kulayb"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Ar Rif\u0101\u2018, Manama, Al Muharraq, D\u0101r Kulayb" },
    { name: "Asia/Baghdad", alternativeName: "Arabian Time", group: ["Asia/Baghdad"], continentCode: "AS", continentName: "Asia", countryName: "Iraq", countryCode: "IQ", mainCities: ["Baghdad", "Al Maw\u015Fil al Jad\u012Bdah", "Al Ba\u015Frah al Qad\u012Bmah", "Mosul"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Baghdad, Al Maw\u015Fil al Jad\u012Bdah, Al Ba\u015Frah al Qad\u012Bmah, Mosul" },
    { name: "Asia/Qatar", alternativeName: "Arabian Time", group: ["Asia/Qatar", "Asia/Bahrain"], continentCode: "AS", continentName: "Asia", countryName: "Qatar", countryCode: "QA", mainCities: ["Doha", "Ar Rayy\u0101n", "Umm \u015Eal\u0101l Mu\u1E29ammad", "Al Wakrah"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Doha, Ar Rayy\u0101n, Umm \u015Eal\u0101l Mu\u1E29ammad, Al Wakrah" },
    { name: "Asia/Riyadh", alternativeName: "Arabian Time", group: ["Asia/Riyadh", "Antarctica/Syowa", "Asia/Aden", "Asia/Kuwait"], continentCode: "AS", continentName: "Asia", countryName: "Saudi Arabia", countryCode: "SA", mainCities: ["Jeddah", "Riyadh", "Mecca", "Medina"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Jeddah, Riyadh, Mecca, Medina" },
    { name: "Asia/Aden", alternativeName: "Arabian Time", group: ["Asia/Aden"], continentCode: "AS", continentName: "Asia", countryName: "Yemen", countryCode: "YE", mainCities: ["Sanaa", "Aden", "Al \u1E28udaydah", "Taiz"], rawOffsetInMinutes: 180, abbreviation: "AST", rawFormat: "+03:00 Arabian Time - Sanaa, Aden, Al \u1E28udaydah, Taiz" },
    { name: "Asia/Amman", alternativeName: "Asia/Amman", group: ["Asia/Amman"], continentCode: "AS", continentName: "Asia", countryName: "Jordan", countryCode: "JO", mainCities: ["Amman", "Zarqa", "Irbid", "Russeifa"], rawOffsetInMinutes: 180, abbreviation: "GMT+3", rawFormat: "+03:00 Asia/Amman - Amman, Zarqa, Irbid, Russeifa" },
    { name: "Asia/Damascus", alternativeName: "Asia/Damascus", group: ["Asia/Damascus"], continentCode: "AS", continentName: "Asia", countryName: "Syria", countryCode: "SY", mainCities: ["Aleppo", "Damascus", "Homs", "Latakia"], rawOffsetInMinutes: 180, abbreviation: "GMT+3", rawFormat: "+03:00 Asia/Damascus - Aleppo, Damascus, Homs, Latakia" },
    { name: "Africa/Addis_Ababa", alternativeName: "East Africa Time", group: ["Africa/Addis_Ababa"], continentCode: "AF", continentName: "Africa", countryName: "Ethiopia", countryCode: "ET", mainCities: ["Addis Ababa", "Jijiga", "Gonder", "Mek'ele"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Addis Ababa, Jijiga, Gonder, Mek'ele" },
    { name: "Indian/Antananarivo", alternativeName: "East Africa Time", group: ["Indian/Antananarivo"], continentCode: "AF", continentName: "Africa", countryName: "Madagascar", countryCode: "MG", mainCities: ["Antananarivo", "Toamasina", "Antsirabe", "Mahajanga"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Antananarivo, Toamasina, Antsirabe, Mahajanga" },
    { name: "Africa/Asmara", alternativeName: "East Africa Time", group: ["Africa/Asmara"], continentCode: "AF", continentName: "Africa", countryName: "Eritrea", countryCode: "ER", mainCities: ["Asmara", "Keren", "Himora", "Massawa"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Asmara, Keren, Himora, Massawa" },
    { name: "Africa/Dar_es_Salaam", alternativeName: "East Africa Time", group: ["Africa/Dar_es_Salaam"], continentCode: "AF", continentName: "Africa", countryName: "Tanzania", countryCode: "TZ", mainCities: ["Dar es Salaam", "Mwanza", "Arusha", "Mbeya"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Dar es Salaam, Mwanza, Arusha, Mbeya" },
    { name: "Africa/Djibouti", alternativeName: "East Africa Time", group: ["Africa/Djibouti"], continentCode: "AF", continentName: "Africa", countryName: "Djibouti", countryCode: "DJ", mainCities: ["Djibouti", "Ali Sabih", "Dikhil", "Tadjoura"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Djibouti, Ali Sabih, Dikhil, Tadjoura" },
    { name: "Africa/Kampala", alternativeName: "East Africa Time", group: ["Africa/Kampala"], continentCode: "AF", continentName: "Africa", countryName: "Uganda", countryCode: "UG", mainCities: ["Kampala", "Gulu", "Lira", "Mbarara"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Kampala, Gulu, Lira, Mbarara" },
    { name: "Indian/Mayotte", alternativeName: "East Africa Time", group: ["Indian/Mayotte"], continentCode: "AF", continentName: "Africa", countryName: "Mayotte", countryCode: "YT", mainCities: ["Mamoudzou", "Koungou", "Dzaoudzi"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Mamoudzou, Koungou, Dzaoudzi" },
    { name: "Africa/Mogadishu", alternativeName: "East Africa Time", group: ["Africa/Mogadishu"], continentCode: "AF", continentName: "Africa", countryName: "Somalia", countryCode: "SO", mainCities: ["Mogadishu", "Borama", "Hargeysa", "Berbera"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Mogadishu, Borama, Hargeysa, Berbera" },
    { name: "Indian/Comoro", alternativeName: "East Africa Time", group: ["Indian/Comoro"], continentCode: "AF", continentName: "Africa", countryName: "Comoros", countryCode: "KM", mainCities: ["Moroni", "Moutsamoudou", "Fomboni"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Moroni, Moutsamoudou, Fomboni" },
    { name: "Africa/Nairobi", alternativeName: "East Africa Time", group: ["Africa/Nairobi", "Africa/Addis_Ababa", "Africa/Asmara", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Kampala", "Africa/Mogadishu", "Indian/Antananarivo", "Indian/Comoro", "Indian/Mayotte", "Africa/Asmera"], continentCode: "AF", continentName: "Africa", countryName: "Kenya", countryCode: "KE", mainCities: ["Nairobi", "Kakamega", "Mombasa", "Ruiru"], rawOffsetInMinutes: 180, abbreviation: "EAT", rawFormat: "+03:00 East Africa Time - Nairobi, Kakamega, Mombasa, Ruiru" },
    { name: "Europe/Minsk", alternativeName: "Moscow Time", group: ["Europe/Minsk"], continentCode: "EU", continentName: "Europe", countryName: "Belarus", countryCode: "BY", mainCities: ["Minsk", "Homyel'", "Hrodna", "Mahilyow"], rawOffsetInMinutes: 180, abbreviation: "MSK", rawFormat: "+03:00 Moscow Time - Minsk, Homyel', Hrodna, Mahilyow" },
    { name: "Europe/Moscow", alternativeName: "Moscow Time", group: ["Europe/Kirov", "Europe/Moscow", "Europe/Volgograd", "W-SU"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Moscow", "Saint Petersburg", "Nizhniy Novgorod", "Kazan"], rawOffsetInMinutes: 180, abbreviation: "MSK", rawFormat: "+03:00 Moscow Time - Moscow, Saint Petersburg, Nizhniy Novgorod, Kazan" },
    { name: "Europe/Simferopol", alternativeName: "Moscow Time", group: ["Europe/Simferopol"], continentCode: "EU", continentName: "Europe", countryName: "Ukraine", countryCode: "UA", mainCities: ["Sevastopol", "Simferopol", "Kerch", "Yevpatoriya"], rawOffsetInMinutes: 180, abbreviation: "MSK", rawFormat: "+03:00 Moscow Time - Sevastopol, Simferopol, Kerch, Yevpatoriya" },
    { name: "Antarctica/Syowa", alternativeName: "Syowa Time", group: ["Antarctica/Syowa"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Syowa"], rawOffsetInMinutes: 180, abbreviation: "SYOT", rawFormat: "+03:00 Syowa Time - Syowa" },
    { name: "Europe/Istanbul", alternativeName: "Turkey Time", group: ["Europe/Istanbul", "Turkey", "Asia/Istanbul"], continentCode: "AS", continentName: "Asia", countryName: "Turkey", countryCode: "TR", mainCities: ["Istanbul", "Ankara", "Bursa", "\u0130zmir"], rawOffsetInMinutes: 180, abbreviation: "TRT", rawFormat: "+03:00 Turkey Time - Istanbul, Ankara, Bursa, \u0130zmir" },
    { name: "Asia/Tehran", alternativeName: "Iran Time", group: ["Asia/Tehran", "Iran"], continentCode: "AS", continentName: "Asia", countryName: "Iran", countryCode: "IR", mainCities: ["Tehran", "Mashhad", "Isfahan", "Karaj"], rawOffsetInMinutes: 210, abbreviation: "IRST", rawFormat: "+03:30 Iran Time - Tehran, Mashhad, Isfahan, Karaj" },
    { name: "Asia/Yerevan", alternativeName: "Armenia Time", group: ["Asia/Yerevan"], continentCode: "AS", continentName: "Asia", countryName: "Armenia", countryCode: "AM", mainCities: ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat"], rawOffsetInMinutes: 240, abbreviation: "AMT", rawFormat: "+04:00 Armenia Time - Yerevan, Gyumri, Vanadzor, Vagharshapat" },
    { name: "Asia/Baku", alternativeName: "Azerbaijan Time", group: ["Asia/Baku"], continentCode: "AS", continentName: "Asia", countryName: "Azerbaijan", countryCode: "AZ", mainCities: ["Baku", "Sumqay\u0131t", "Ganja", "Lankaran"], rawOffsetInMinutes: 240, abbreviation: "AZT", rawFormat: "+04:00 Azerbaijan Time - Baku, Sumqay\u0131t, Ganja, Lankaran" },
    { name: "Asia/Tbilisi", alternativeName: "Georgia Time", group: ["Asia/Tbilisi"], continentCode: "AS", continentName: "Asia", countryName: "Georgia", countryCode: "GE", mainCities: ["Tbilisi", "Batumi", "Kutaisi", "Rustavi"], rawOffsetInMinutes: 240, abbreviation: "GET", rawFormat: "+04:00 Georgia Time - Tbilisi, Batumi, Kutaisi, Rustavi" },
    { name: "Asia/Dubai", alternativeName: "Gulf Time", group: ["Asia/Dubai", "Asia/Muscat", "Indian/Mahe", "Indian/Reunion"], continentCode: "AS", continentName: "Asia", countryName: "United Arab Emirates", countryCode: "AE", mainCities: ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain City"], rawOffsetInMinutes: 240, abbreviation: "GST", rawFormat: "+04:00 Gulf Time - Dubai, Abu Dhabi, Sharjah, Al Ain City" },
    { name: "Asia/Muscat", alternativeName: "Gulf Time", group: ["Asia/Muscat"], continentCode: "AS", continentName: "Asia", countryName: "Oman", countryCode: "OM", mainCities: ["Muscat", "Seeb", "Bawshar", "\u2018Ibr\u012B"], rawOffsetInMinutes: 240, abbreviation: "GST", rawFormat: "+04:00 Gulf Time - Muscat, Seeb, Bawshar, \u2018Ibr\u012B" },
    { name: "Indian/Mauritius", alternativeName: "Mauritius Time", group: ["Indian/Mauritius"], continentCode: "AF", continentName: "Africa", countryName: "Mauritius", countryCode: "MU", mainCities: ["Port Louis", "Vacoas", "Beau Bassin-Rose Hill", "Curepipe"], rawOffsetInMinutes: 240, abbreviation: "MUT", rawFormat: "+04:00 Mauritius Time - Port Louis, Vacoas, Beau Bassin-Rose Hill, Curepipe" },
    { name: "Indian/Reunion", alternativeName: "R\xE9union Time", group: ["Indian/Reunion"], continentCode: "AF", continentName: "Africa", countryName: "Reunion", countryCode: "RE", mainCities: ["Saint-Denis", "Saint-Paul", "Le Tampon", "Saint-Pierre"], rawOffsetInMinutes: 240, abbreviation: "RET", rawFormat: "+04:00 R\xE9union Time - Saint-Denis, Saint-Paul, Le Tampon, Saint-Pierre" },
    { name: "Europe/Samara", alternativeName: "Samara Time", group: ["Europe/Astrakhan", "Europe/Samara", "Europe/Saratov", "Europe/Ulyanovsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Samara", "Saratov", "Tolyatti", "Izhevsk"], rawOffsetInMinutes: 240, abbreviation: "SAMT", rawFormat: "+04:00 Samara Time - Samara, Saratov, Tolyatti, Izhevsk" },
    { name: "Indian/Mahe", alternativeName: "Seychelles Time", group: ["Indian/Mahe"], continentCode: "AF", continentName: "Africa", countryName: "Seychelles", countryCode: "SC", mainCities: ["Victoria"], rawOffsetInMinutes: 240, abbreviation: "SCT", rawFormat: "+04:00 Seychelles Time - Victoria" },
    { name: "Asia/Kabul", alternativeName: "Afghanistan Time", group: ["Asia/Kabul"], continentCode: "AS", continentName: "Asia", countryName: "Afghanistan", countryCode: "AF", mainCities: ["Kabul", "Her\u0101t", "Maz\u0101r-e Shar\u012Bf", "Kandah\u0101r"], rawOffsetInMinutes: 270, abbreviation: "AFT", rawFormat: "+04:30 Afghanistan Time - Kabul, Her\u0101t, Maz\u0101r-e Shar\u012Bf, Kandah\u0101r" },
    { name: "Indian/Kerguelen", alternativeName: "French Southern & Antarctic Time", group: ["Indian/Kerguelen"], continentCode: "AN", continentName: "Antarctica", countryName: "French Southern Territories", countryCode: "TF", mainCities: ["Port-aux-Fran\xE7ais"], rawOffsetInMinutes: 300, abbreviation: "FSAT", rawFormat: "+05:00 French Southern & Antarctic Time - Port-aux-Fran\xE7ais" },
    { name: "Indian/Maldives", alternativeName: "Maldives Time", group: ["Indian/Maldives", "Indian/Kerguelen"], continentCode: "AS", continentName: "Asia", countryName: "Maldives", countryCode: "MV", mainCities: ["Male"], rawOffsetInMinutes: 300, abbreviation: "MVT", rawFormat: "+05:00 Maldives Time - Male" },
    { name: "Antarctica/Mawson", alternativeName: "Mawson Time", group: ["Antarctica/Mawson"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Mawson"], rawOffsetInMinutes: 300, abbreviation: "MAWT", rawFormat: "+05:00 Mawson Time - Mawson" },
    { name: "Asia/Karachi", alternativeName: "Pakistan Time", group: ["Asia/Karachi"], continentCode: "AS", continentName: "Asia", countryName: "Pakistan", countryCode: "PK", mainCities: ["Karachi", "Lahore", "Faisalabad", "Rawalpindi"], rawOffsetInMinutes: 300, abbreviation: "PKT", rawFormat: "+05:00 Pakistan Time - Karachi, Lahore, Faisalabad, Rawalpindi" },
    { name: "Asia/Dushanbe", alternativeName: "Tajikistan Time", group: ["Asia/Dushanbe"], continentCode: "AS", continentName: "Asia", countryName: "Tajikistan", countryCode: "TJ", mainCities: ["Dushanbe", "Isfara", "Istaravshan", "K\u016Dlob"], rawOffsetInMinutes: 300, abbreviation: "TJT", rawFormat: "+05:00 Tajikistan Time - Dushanbe, Isfara, Istaravshan, K\u016Dlob" },
    { name: "Asia/Ashgabat", alternativeName: "Turkmenistan Time", group: ["Asia/Ashgabat", "Asia/Ashkhabad"], continentCode: "AS", continentName: "Asia", countryName: "Turkmenistan", countryCode: "TM", mainCities: ["Ashgabat", "T\xFCrkmenabat", "Da\u015Foguz", "Mary"], rawOffsetInMinutes: 300, abbreviation: "TMT", rawFormat: "+05:00 Turkmenistan Time - Ashgabat, T\xFCrkmenabat, Da\u015Foguz, Mary" },
    { name: "Asia/Tashkent", alternativeName: "Uzbekistan Time", group: ["Asia/Samarkand", "Asia/Tashkent"], continentCode: "AS", continentName: "Asia", countryName: "Uzbekistan", countryCode: "UZ", mainCities: ["Tashkent", "Namangan", "Samarkand", "Andijon"], rawOffsetInMinutes: 300, abbreviation: "UZT", rawFormat: "+05:00 Uzbekistan Time - Tashkent, Namangan, Samarkand, Andijon" },
    { name: "Asia/Aqtobe", alternativeName: "West Kazakhstan Time", group: ["Asia/Aqtau", "Asia/Aqtobe", "Asia/Atyrau", "Asia/Oral", "Asia/Qyzylorda"], continentCode: "AS", continentName: "Asia", countryName: "Kazakhstan", countryCode: "KZ", mainCities: ["Aktobe", "Kyzylorda", "Oral", "Atyrau"], rawOffsetInMinutes: 300, abbreviation: "AQTT", rawFormat: "+05:00 West Kazakhstan Time - Aktobe, Kyzylorda, Oral, Atyrau" },
    { name: "Asia/Yekaterinburg", alternativeName: "Yekaterinburg Time", group: ["Asia/Yekaterinburg"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Yekaterinburg", "Chelyabinsk", "Ufa", "Perm"], rawOffsetInMinutes: 300, abbreviation: "YEKT", rawFormat: "+05:00 Yekaterinburg Time - Yekaterinburg, Chelyabinsk, Ufa, Perm" },
    { name: "Asia/Colombo", alternativeName: "India Time", group: ["Asia/Colombo"], continentCode: "AS", continentName: "Asia", countryName: "Sri Lanka", countryCode: "LK", mainCities: ["Colombo", "Dehiwala-Mount Lavinia", "Maharagama", "Jaffna"], rawOffsetInMinutes: 330, abbreviation: "IST", rawFormat: "+05:30 India Time - Colombo, Dehiwala-Mount Lavinia, Maharagama, Jaffna" },
    { name: "Asia/Kolkata", alternativeName: "India Time", group: ["Asia/Kolkata", "Asia/Calcutta"], continentCode: "AS", continentName: "Asia", countryName: "India", countryCode: "IN", mainCities: ["Mumbai", "Delhi", "Bengaluru", "Hyder\u0101b\u0101d"], rawOffsetInMinutes: 330, abbreviation: "IST", rawFormat: "+05:30 India Time - Mumbai, Delhi, Bengaluru, Hyder\u0101b\u0101d" },
    { name: "Asia/Kathmandu", alternativeName: "Nepal Time", group: ["Asia/Kathmandu", "Asia/Katmandu"], continentCode: "AS", continentName: "Asia", countryName: "Nepal", countryCode: "NP", mainCities: ["Kathmandu", "Bharatpur", "P\u0101tan", "Birga\xF1j"], rawOffsetInMinutes: 345, abbreviation: "NPT", rawFormat: "+05:45 Nepal Time - Kathmandu, Bharatpur, P\u0101tan, Birga\xF1j" },
    { name: "Asia/Dhaka", alternativeName: "Bangladesh Time", group: ["Asia/Dhaka", "Asia/Dacca"], continentCode: "AS", continentName: "Asia", countryName: "Bangladesh", countryCode: "BD", mainCities: ["Dhaka", "Chattogram", "Khulna", "Rangpur"], rawOffsetInMinutes: 360, abbreviation: "BST", rawFormat: "+06:00 Bangladesh Time - Dhaka, Chattogram, Khulna, Rangpur" },
    { name: "Asia/Thimphu", alternativeName: "Bhutan Time", group: ["Asia/Thimphu", "Asia/Thimbu"], continentCode: "AS", continentName: "Asia", countryName: "Bhutan", countryCode: "BT", mainCities: ["Thimphu", "Phuntsholing", "Tsirang", "Pun\u0101kha"], rawOffsetInMinutes: 360, abbreviation: "BTT", rawFormat: "+06:00 Bhutan Time - Thimphu, Phuntsholing, Tsirang, Pun\u0101kha" },
    { name: "Asia/Urumqi", alternativeName: "China Time", group: ["Asia/Urumqi", "Antarctica/Vostok", "Asia/Kashgar"], continentCode: "AS", continentName: "Asia", countryName: "China", countryCode: "CN", mainCities: ["\xDCr\xFCmqi", "Shihezi", "Korla", "Aksu"], rawOffsetInMinutes: 360, abbreviation: "CST", rawFormat: "+06:00 China Time - \xDCr\xFCmqi, Shihezi, Korla, Aksu" },
    { name: "Asia/Almaty", alternativeName: "East Kazakhstan Time", group: ["Asia/Almaty", "Asia/Qostanay"], continentCode: "AS", continentName: "Asia", countryName: "Kazakhstan", countryCode: "KZ", mainCities: ["Almaty", "Shymkent", "Karagandy", "Taraz"], rawOffsetInMinutes: 360, abbreviation: "ALMT", rawFormat: "+06:00 East Kazakhstan Time - Almaty, Shymkent, Karagandy, Taraz" },
    { name: "Indian/Chagos", alternativeName: "Indian Ocean Time", group: ["Indian/Chagos"], continentCode: "AS", continentName: "Asia", countryName: "British Indian Ocean Territory", countryCode: "IO", mainCities: ["Chagos"], rawOffsetInMinutes: 360, abbreviation: "IOT", rawFormat: "+06:00 Indian Ocean Time - Chagos" },
    { name: "Asia/Bishkek", alternativeName: "Kyrgyzstan Time", group: ["Asia/Bishkek"], continentCode: "AS", continentName: "Asia", countryName: "Kyrgyzstan", countryCode: "KG", mainCities: ["Bishkek", "Osh", "Jalal-Abad", "Karakol"], rawOffsetInMinutes: 360, abbreviation: "KGT", rawFormat: "+06:00 Kyrgyzstan Time - Bishkek, Osh, Jalal-Abad, Karakol" },
    { name: "Asia/Omsk", alternativeName: "Omsk Time", group: ["Asia/Omsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Omsk", "Tara", "Kalachinsk"], rawOffsetInMinutes: 360, abbreviation: "OMST", rawFormat: "+06:00 Omsk Time - Omsk, Tara, Kalachinsk" },
    { name: "Antarctica/Vostok", alternativeName: "Vostok Time", group: ["Antarctica/Vostok"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Vostok"], rawOffsetInMinutes: 360, abbreviation: "VOST", rawFormat: "+06:00 Vostok Time - Vostok" },
    { name: "Asia/Yangon", alternativeName: "Myanmar Time", group: ["Asia/Yangon", "Indian/Cocos", "Asia/Rangoon"], continentCode: "AS", continentName: "Asia", countryName: "Myanmar", countryCode: "MM", mainCities: ["Yangon", "Mandalay", "Nay Pyi Taw", "Mawlamyine"], rawOffsetInMinutes: 390, abbreviation: "MMT", rawFormat: "+06:30 Myanmar Time - Yangon, Mandalay, Nay Pyi Taw, Mawlamyine" },
    { name: "Indian/Cocos", alternativeName: "Cocos Islands Time", group: ["Indian/Cocos"], continentCode: "AS", continentName: "Asia", countryName: "Cocos Islands", countryCode: "CC", mainCities: ["West Island"], rawOffsetInMinutes: 390, abbreviation: "CCT", rawFormat: "+06:30 Cocos Islands Time - West Island" },
    { name: "Indian/Christmas", alternativeName: "Christmas Island Time", group: ["Indian/Christmas"], continentCode: "OC", continentName: "Oceania", countryName: "Christmas Island", countryCode: "CX", mainCities: ["Flying Fish Cove"], rawOffsetInMinutes: 420, abbreviation: "CXT", rawFormat: "+07:00 Christmas Island Time - Flying Fish Cove" },
    { name: "Antarctica/Davis", alternativeName: "Davis Time", group: ["Antarctica/Davis"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Davis"], rawOffsetInMinutes: 420, abbreviation: "DAVT", rawFormat: "+07:00 Davis Time - Davis" },
    { name: "Asia/Hovd", alternativeName: "Hovd Time", group: ["Asia/Hovd"], continentCode: "AS", continentName: "Asia", countryName: "Mongolia", countryCode: "MN", mainCities: ["Ulaangom", "Khovd", "\xD6lgii", "Altai"], rawOffsetInMinutes: 420, abbreviation: "HOVT", rawFormat: "+07:00 Hovd Time - Ulaangom, Khovd, \xD6lgii, Altai" },
    { name: "Asia/Bangkok", alternativeName: "Indochina Time", group: ["Asia/Bangkok", "Asia/Phnom_Penh", "Asia/Vientiane", "Indian/Christmas"], continentCode: "AS", continentName: "Asia", countryName: "Thailand", countryCode: "TH", mainCities: ["Bangkok", "Samut Prakan", "Mueang Nonthaburi", "Chon Buri"], rawOffsetInMinutes: 420, abbreviation: "ICT", rawFormat: "+07:00 Indochina Time - Bangkok, Samut Prakan, Mueang Nonthaburi, Chon Buri" },
    { name: "Asia/Ho_Chi_Minh", alternativeName: "Indochina Time", group: ["Asia/Ho_Chi_Minh", "Asia/Saigon"], continentCode: "AS", continentName: "Asia", countryName: "Vietnam", countryCode: "VN", mainCities: ["Ho Chi Minh City", "Da Nang", "Bi\xEAn H\xF2a", "C\u1EA7n Th\u01A1"], rawOffsetInMinutes: 420, abbreviation: "ICT", rawFormat: "+07:00 Indochina Time - Ho Chi Minh City, Da Nang, Bi\xEAn H\xF2a, C\u1EA7n Th\u01A1" },
    { name: "Asia/Phnom_Penh", alternativeName: "Indochina Time", group: ["Asia/Phnom_Penh"], continentCode: "AS", continentName: "Asia", countryName: "Cambodia", countryCode: "KH", mainCities: ["Phnom Penh", "Takeo", "Siem Reap", "Battambang"], rawOffsetInMinutes: 420, abbreviation: "ICT", rawFormat: "+07:00 Indochina Time - Phnom Penh, Takeo, Siem Reap, Battambang" },
    { name: "Asia/Vientiane", alternativeName: "Indochina Time", group: ["Asia/Vientiane"], continentCode: "AS", continentName: "Asia", countryName: "Laos", countryCode: "LA", mainCities: ["Vientiane", "Savannakhet", "Pakse", "Thakh\xE8k"], rawOffsetInMinutes: 420, abbreviation: "ICT", rawFormat: "+07:00 Indochina Time - Vientiane, Savannakhet, Pakse, Thakh\xE8k" },
    { name: "Asia/Novosibirsk", alternativeName: "Novosibirsk Time", group: ["Asia/Barnaul", "Asia/Krasnoyarsk", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Tomsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Novosibirsk", "Krasnoyarsk", "Barnaul", "Tomsk"], rawOffsetInMinutes: 420, abbreviation: "NOVT", rawFormat: "+07:00 Novosibirsk Time - Novosibirsk, Krasnoyarsk, Barnaul, Tomsk" },
    { name: "Asia/Jakarta", alternativeName: "Western Indonesia Time", group: ["Asia/Jakarta", "Asia/Pontianak"], continentCode: "AS", continentName: "Asia", countryName: "Indonesia", countryCode: "ID", mainCities: ["Jakarta", "Surabaya", "Bekasi", "Bandung"], rawOffsetInMinutes: 420, abbreviation: "WIB", rawFormat: "+07:00 Western Indonesia Time - Jakarta, Surabaya, Bekasi, Bandung" },
    { name: "Australia/Perth", alternativeName: "Australian Western Time", group: ["Australia/Perth", "Australia/West"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Perth", "Mandurah", "Bunbury", "Baldivis"], rawOffsetInMinutes: 480, abbreviation: "AWST", rawFormat: "+08:00 Australian Western Time - Perth, Mandurah, Bunbury, Baldivis" },
    { name: "Asia/Brunei", alternativeName: "Brunei Darussalam Time", group: ["Asia/Brunei"], continentCode: "AS", continentName: "Asia", countryName: "Brunei", countryCode: "BN", mainCities: ["Bandar Seri Begawan", "Kuala Belait", "Seria", "Tutong"], rawOffsetInMinutes: 480, abbreviation: "BNT", rawFormat: "+08:00 Brunei Darussalam Time - Bandar Seri Begawan, Kuala Belait, Seria, Tutong" },
    { name: "Asia/Makassar", alternativeName: "Central Indonesia Time", group: ["Asia/Makassar", "Asia/Ujung_Pandang"], continentCode: "AS", continentName: "Asia", countryName: "Indonesia", countryCode: "ID", mainCities: ["Makassar", "Samarinda", "Denpasar", "Balikpapan"], rawOffsetInMinutes: 480, abbreviation: "WITA", rawFormat: "+08:00 Central Indonesia Time - Makassar, Samarinda, Denpasar, Balikpapan" },
    { name: "Asia/Macau", alternativeName: "China Time", group: ["Asia/Macau", "Asia/Macao"], continentCode: "AS", continentName: "Asia", countryName: "Macao", countryCode: "MO", mainCities: ["Macau"], rawOffsetInMinutes: 480, abbreviation: "CST", rawFormat: "+08:00 China Time - Macau" },
    { name: "Asia/Shanghai", alternativeName: "China Time", group: ["Asia/Shanghai", "PRC", "Asia/Chongqing", "Asia/Harbin", "Asia/Chungking"], continentCode: "AS", continentName: "Asia", countryName: "China", countryCode: "CN", mainCities: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou"], rawOffsetInMinutes: 480, abbreviation: "CST", rawFormat: "+08:00 China Time - Shanghai, Beijing, Shenzhen, Guangzhou" },
    { name: "Asia/Hong_Kong", alternativeName: "Hong Kong Time", group: ["Asia/Hong_Kong", "Hongkong"], continentCode: "AS", continentName: "Asia", countryName: "Hong Kong", countryCode: "HK", mainCities: ["Hong Kong", "Kowloon", "Victoria", "Tuen Mun"], rawOffsetInMinutes: 480, abbreviation: "HKT", rawFormat: "+08:00 Hong Kong Time - Hong Kong, Kowloon, Victoria, Tuen Mun" },
    { name: "Asia/Irkutsk", alternativeName: "Irkutsk Time", group: ["Asia/Irkutsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Irkutsk", "Ulan-Ude", "Bratsk", "Angarsk"], rawOffsetInMinutes: 480, abbreviation: "IRKT", rawFormat: "+08:00 Irkutsk Time - Irkutsk, Ulan-Ude, Bratsk, Angarsk" },
    { name: "Asia/Kuala_Lumpur", alternativeName: "Malaysia Time", group: ["Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Brunei"], continentCode: "AS", continentName: "Asia", countryName: "Malaysia", countryCode: "MY", mainCities: ["Kuala Lumpur", "Petaling Jaya", "Klang", "Johor Bahru"], rawOffsetInMinutes: 480, abbreviation: "MYT", rawFormat: "+08:00 Malaysia Time - Kuala Lumpur, Petaling Jaya, Klang, Johor Bahru" },
    { name: "Asia/Manila", alternativeName: "Philippine Time", group: ["Asia/Manila"], continentCode: "AS", continentName: "Asia", countryName: "Philippines", countryCode: "PH", mainCities: ["Quezon City", "Davao", "Manila", "Caloocan City"], rawOffsetInMinutes: 480, abbreviation: "PHT", rawFormat: "+08:00 Philippine Time - Quezon City, Davao, Manila, Caloocan City" },
    { name: "Asia/Singapore", alternativeName: "Singapore Time", group: ["Asia/Singapore", "Singapore", "Asia/Kuala_Lumpur"], continentCode: "AS", continentName: "Asia", countryName: "Singapore", countryCode: "SG", mainCities: ["Singapore", "Woodlands", "Punggol", "Kampong Pasir Ris"], rawOffsetInMinutes: 480, abbreviation: "SGT", rawFormat: "+08:00 Singapore Time - Singapore, Woodlands, Punggol, Kampong Pasir Ris" },
    { name: "Asia/Taipei", alternativeName: "Taipei Time", group: ["Asia/Taipei", "ROC"], continentCode: "AS", continentName: "Asia", countryName: "Taiwan", countryCode: "TW", mainCities: ["Taipei", "Kaohsiung", "Taichung", "Tainan"], rawOffsetInMinutes: 480, abbreviation: "TWT", rawFormat: "+08:00 Taipei Time - Taipei, Kaohsiung, Taichung, Tainan" },
    { name: "Asia/Ulaanbaatar", alternativeName: "Ulaanbaatar Time", group: ["Asia/Choibalsan", "Asia/Ulaanbaatar", "Asia/Ulan_Bator"], continentCode: "AS", continentName: "Asia", countryName: "Mongolia", countryCode: "MN", mainCities: ["Ulan Bator", "Erdenet", "Darhan", "M\xF6r\xF6n"], rawOffsetInMinutes: 480, abbreviation: "ULAT", rawFormat: "+08:00 Ulaanbaatar Time - Ulan Bator, Erdenet, Darhan, M\xF6r\xF6n" },
    { name: "Australia/Eucla", alternativeName: "Australian Central Western Time", group: ["Australia/Eucla"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Eucla"], rawOffsetInMinutes: 525, abbreviation: "ACWST", rawFormat: "+08:45 Australian Central Western Time - Eucla" },
    { name: "Asia/Dili", alternativeName: "East Timor Time", group: ["Asia/Dili"], continentCode: "OC", continentName: "Oceania", countryName: "Timor Leste", countryCode: "TL", mainCities: ["Dili", "Maliana", "Suai", "Likis\xE1"], rawOffsetInMinutes: 540, abbreviation: "TLT", rawFormat: "+09:00 East Timor Time - Dili, Maliana, Suai, Likis\xE1" },
    { name: "Asia/Jayapura", alternativeName: "Eastern Indonesia Time", group: ["Asia/Jayapura"], continentCode: "AS", continentName: "Asia", countryName: "Indonesia", countryCode: "ID", mainCities: ["Jayapura", "Ambon", "Sorong", "Ternate"], rawOffsetInMinutes: 540, abbreviation: "WIT", rawFormat: "+09:00 Eastern Indonesia Time - Jayapura, Ambon, Sorong, Ternate" },
    { name: "Asia/Tokyo", alternativeName: "Japan Time", group: ["Asia/Tokyo", "Japan"], continentCode: "AS", continentName: "Asia", countryName: "Japan", countryCode: "JP", mainCities: ["Tokyo", "Yokohama", "Osaka", "Nagoya"], rawOffsetInMinutes: 540, abbreviation: "JST", rawFormat: "+09:00 Japan Time - Tokyo, Yokohama, Osaka, Nagoya" },
    { name: "Asia/Pyongyang", alternativeName: "Korean Time", group: ["Asia/Pyongyang"], continentCode: "AS", continentName: "Asia", countryName: "North Korea", countryCode: "KP", mainCities: ["Pyongyang", "Hamh\u016Dng", "Namp\u2019o", "Sunch\u2019\u014Fn"], rawOffsetInMinutes: 540, abbreviation: "KST", rawFormat: "+09:00 Korean Time - Pyongyang, Hamh\u016Dng, Namp\u2019o, Sunch\u2019\u014Fn" },
    { name: "Asia/Seoul", alternativeName: "Korean Time", group: ["Asia/Seoul", "ROK"], continentCode: "AS", continentName: "Asia", countryName: "South Korea", countryCode: "KR", mainCities: ["Seoul", "Busan", "Incheon", "Daegu"], rawOffsetInMinutes: 540, abbreviation: "KST", rawFormat: "+09:00 Korean Time - Seoul, Busan, Incheon, Daegu" },
    { name: "Pacific/Palau", alternativeName: "Palau Time", group: ["Pacific/Palau"], continentCode: "OC", continentName: "Oceania", countryName: "Palau", countryCode: "PW", mainCities: ["Ngerulmud"], rawOffsetInMinutes: 540, abbreviation: "PWT", rawFormat: "+09:00 Palau Time - Ngerulmud" },
    { name: "Asia/Chita", alternativeName: "Yakutsk Time", group: ["Asia/Chita", "Asia/Khandyga", "Asia/Yakutsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Chita", "Yakutsk", "Blagoveshchensk", "Belogorsk"], rawOffsetInMinutes: 540, abbreviation: "YAKT", rawFormat: "+09:00 Yakutsk Time - Chita, Yakutsk, Blagoveshchensk, Belogorsk" },
    { name: "Australia/Adelaide", alternativeName: "Australian Central Time", group: ["Australia/Adelaide", "Australia/Broken_Hill", "Australia/South", "Australia/Yancowinna"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Adelaide", "Adelaide Hills", "Mount Gambier", "Morphett Vale"], rawOffsetInMinutes: 570, abbreviation: "ACST", rawFormat: "+09:30 Australian Central Time - Adelaide, Adelaide Hills, Mount Gambier, Morphett Vale" },
    { name: "Australia/Darwin", alternativeName: "Australian Central Time", group: ["Australia/Darwin", "Australia/North"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Darwin", "Alice Springs", "Palmerston"], rawOffsetInMinutes: 570, abbreviation: "ACST", rawFormat: "+09:30 Australian Central Time - Darwin, Alice Springs, Palmerston" },
    { name: "Australia/Brisbane", alternativeName: "Australian Eastern Time", group: ["Australia/Brisbane", "Australia/Lindeman", "Australia/Queensland"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Brisbane", "Gold Coast", "Logan City", "Townsville"], rawOffsetInMinutes: 600, abbreviation: "AEST", rawFormat: "+10:00 Australian Eastern Time - Brisbane, Gold Coast, Logan City, Townsville" },
    { name: "Australia/Sydney", alternativeName: "Australian Eastern Time", group: ["Antarctica/Macquarie", "Australia/Hobart", "Australia/Melbourne", "Australia/Sydney", "Australia/Tasmania", "Australia/Currie", "Australia/Victoria", "Australia/ACT", "Australia/NSW", "Australia/Canberra"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Sydney", "Melbourne", "Canberra", "Newcastle"], rawOffsetInMinutes: 600, abbreviation: "AEST", rawFormat: "+10:00 Australian Eastern Time - Sydney, Melbourne, Canberra, Newcastle" },
    { name: "Pacific/Guam", alternativeName: "Chamorro Time", group: ["Pacific/Guam", "Pacific/Saipan"], continentCode: "OC", continentName: "Oceania", countryName: "Guam", countryCode: "GU", mainCities: ["Dededo Village", "Yigo Village", "Tamuning-Tumon-Harmon Village", "Tamuning"], rawOffsetInMinutes: 600, abbreviation: "ChST", rawFormat: "+10:00 Chamorro Time - Dededo Village, Yigo Village, Tamuning-Tumon-Harmon Village, Tamuning" },
    { name: "Pacific/Saipan", alternativeName: "Chamorro Time", group: ["Pacific/Saipan"], continentCode: "OC", continentName: "Oceania", countryName: "Northern Mariana Islands", countryCode: "MP", mainCities: ["Saipan"], rawOffsetInMinutes: 600, abbreviation: "ChST", rawFormat: "+10:00 Chamorro Time - Saipan" },
    { name: "Pacific/Chuuk", alternativeName: "Chuuk Time", group: ["Pacific/Chuuk", "Pacific/Truk", "Pacific/Yap"], continentCode: "OC", continentName: "Oceania", countryName: "Micronesia", countryCode: "FM", mainCities: ["Chuuk"], rawOffsetInMinutes: 600, abbreviation: "CHUT", rawFormat: "+10:00 Chuuk Time - Chuuk" },
    { name: "Antarctica/DumontDUrville", alternativeName: "Dumont-d\u2019Urville Time", group: ["Antarctica/DumontDUrville"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["DumontDUrville"], rawOffsetInMinutes: 600, abbreviation: "DDUT", rawFormat: "+10:00 Dumont-d\u2019Urville Time - DumontDUrville" },
    { name: "Pacific/Port_Moresby", alternativeName: "Papua New Guinea Time", group: ["Pacific/Port_Moresby", "Antarctica/DumontDUrville", "Pacific/Chuuk", "Pacific/Yap", "Pacific/Truk"], continentCode: "OC", continentName: "Oceania", countryName: "Papua New Guinea", countryCode: "PG", mainCities: ["Port Moresby", "Lae", "Mount Hagen", "Popondetta"], rawOffsetInMinutes: 600, abbreviation: "PGT", rawFormat: "+10:00 Papua New Guinea Time - Port Moresby, Lae, Mount Hagen, Popondetta" },
    { name: "Asia/Vladivostok", alternativeName: "Vladivostok Time", group: ["Asia/Ust-Nera", "Asia/Vladivostok"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Khabarovsk", "Vladivostok", "Khabarovsk Vtoroy", "Komsomolsk-on-Amur"], rawOffsetInMinutes: 600, abbreviation: "VLAT", rawFormat: "+10:00 Vladivostok Time - Khabarovsk, Vladivostok, Khabarovsk Vtoroy, Komsomolsk-on-Amur" },
    { name: "Australia/Lord_Howe", alternativeName: "Lord Howe Time", group: ["Australia/Lord_Howe", "Australia/LHI"], continentCode: "OC", continentName: "Oceania", countryName: "Australia", countryCode: "AU", mainCities: ["Lord Howe"], rawOffsetInMinutes: 630, abbreviation: "LHST", rawFormat: "+10:30 Lord Howe Time - Lord Howe" },
    { name: "Pacific/Bougainville", alternativeName: "Bougainville Time", group: ["Pacific/Bougainville"], continentCode: "OC", continentName: "Oceania", countryName: "Papua New Guinea", countryCode: "PG", mainCities: ["Arawa"], rawOffsetInMinutes: 660, abbreviation: "BST", rawFormat: "+11:00 Bougainville Time - Arawa" },
    { name: "Antarctica/Casey", alternativeName: "Casey Time", group: ["Antarctica/Casey"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["Casey"], rawOffsetInMinutes: 660, abbreviation: "CAST", rawFormat: "+11:00 Casey Time - Casey" },
    { name: "Pacific/Kosrae", alternativeName: "Kosrae Time", group: ["Pacific/Kosrae", "Pacific/Pohnpei"], continentCode: "OC", continentName: "Oceania", countryName: "Micronesia", countryCode: "FM", mainCities: ["Kosrae", "Palikir - National Government Center"], rawOffsetInMinutes: 660, abbreviation: "KOST", rawFormat: "+11:00 Kosrae Time - Kosrae, Palikir - National Government Center" },
    { name: "Pacific/Noumea", alternativeName: "New Caledonia Time", group: ["Pacific/Noumea"], continentCode: "OC", continentName: "Oceania", countryName: "New Caledonia", countryCode: "NC", mainCities: ["Noum\xE9a", "Mont-Dore", "Dumb\xE9a"], rawOffsetInMinutes: 660, abbreviation: "NCT", rawFormat: "+11:00 New Caledonia Time - Noum\xE9a, Mont-Dore, Dumb\xE9a" },
    { name: "Pacific/Norfolk", alternativeName: "Norfolk Island Time", group: ["Pacific/Norfolk"], continentCode: "OC", continentName: "Oceania", countryName: "Norfolk Island", countryCode: "NF", mainCities: ["Kingston"], rawOffsetInMinutes: 660, abbreviation: "NFT", rawFormat: "+11:00 Norfolk Island Time - Kingston" },
    { name: "Asia/Sakhalin", alternativeName: "Sakhalin Time", group: ["Asia/Magadan", "Asia/Sakhalin", "Asia/Srednekolymsk"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Yuzhno-Sakhalinsk", "Magadan", "Korsakov", "Kholmsk"], rawOffsetInMinutes: 660, abbreviation: "SAKT", rawFormat: "+11:00 Sakhalin Time - Yuzhno-Sakhalinsk, Magadan, Korsakov, Kholmsk" },
    { name: "Pacific/Guadalcanal", alternativeName: "Solomon Islands Time", group: ["Pacific/Guadalcanal", "Pacific/Pohnpei", "Pacific/Ponape"], continentCode: "OC", continentName: "Oceania", countryName: "Solomon Islands", countryCode: "SB", mainCities: ["Honiara"], rawOffsetInMinutes: 660, abbreviation: "SBT", rawFormat: "+11:00 Solomon Islands Time - Honiara" },
    { name: "Pacific/Efate", alternativeName: "Vanuatu Time", group: ["Pacific/Efate"], continentCode: "OC", continentName: "Oceania", countryName: "Vanuatu", countryCode: "VU", mainCities: ["Port-Vila"], rawOffsetInMinutes: 660, abbreviation: "VUT", rawFormat: "+11:00 Vanuatu Time - Port-Vila" },
    { name: "Pacific/Fiji", alternativeName: "Fiji Time", group: ["Pacific/Fiji"], continentCode: "OC", continentName: "Oceania", countryName: "Fiji", countryCode: "FJ", mainCities: ["Nasinu", "Suva", "Lautoka", "Nadi"], rawOffsetInMinutes: 720, abbreviation: "FJT", rawFormat: "+12:00 Fiji Time - Nasinu, Suva, Lautoka, Nadi" },
    { name: "Pacific/Tarawa", alternativeName: "Gilbert Islands Time", group: ["Pacific/Tarawa", "Pacific/Funafuti", "Pacific/Majuro", "Pacific/Wake", "Pacific/Wallis"], continentCode: "OC", continentName: "Oceania", countryName: "Kiribati", countryCode: "KI", mainCities: ["Tarawa"], rawOffsetInMinutes: 720, abbreviation: "GILT", rawFormat: "+12:00 Gilbert Islands Time - Tarawa" },
    { name: "Pacific/Majuro", alternativeName: "Marshall Islands Time", group: ["Pacific/Kwajalein", "Pacific/Majuro", "Kwajalein"], continentCode: "OC", continentName: "Oceania", countryName: "Marshall Islands", countryCode: "MH", mainCities: ["Majuro", "Kwajalein", "RMI Capitol"], rawOffsetInMinutes: 720, abbreviation: "MHT", rawFormat: "+12:00 Marshall Islands Time - Majuro, Kwajalein, RMI Capitol" },
    { name: "Pacific/Nauru", alternativeName: "Nauru Time", group: ["Pacific/Nauru"], continentCode: "OC", continentName: "Oceania", countryName: "Nauru", countryCode: "NR", mainCities: ["Yaren"], rawOffsetInMinutes: 720, abbreviation: "NRT", rawFormat: "+12:00 Nauru Time - Yaren" },
    { name: "Pacific/Auckland", alternativeName: "New Zealand Time", group: ["Pacific/Auckland", "NZ", "Antarctica/McMurdo", "Antarctica/South_Pole"], continentCode: "OC", continentName: "Oceania", countryName: "New Zealand", countryCode: "NZ", mainCities: ["Auckland", "Wellington", "Christchurch", "Manukau City"], rawOffsetInMinutes: 720, abbreviation: "NZST", rawFormat: "+12:00 New Zealand Time - Auckland, Wellington, Christchurch, Manukau City" },
    { name: "Antarctica/McMurdo", alternativeName: "New Zealand Time", group: ["Antarctica/McMurdo"], continentCode: "AN", continentName: "Antarctica", countryName: "Antarctica", countryCode: "AQ", mainCities: ["McMurdo"], rawOffsetInMinutes: 720, abbreviation: "NZST", rawFormat: "+12:00 New Zealand Time - McMurdo" },
    { name: "Asia/Kamchatka", alternativeName: "Petropavlovsk-Kamchatski Time", group: ["Asia/Anadyr", "Asia/Kamchatka"], continentCode: "EU", continentName: "Europe", countryName: "Russia", countryCode: "RU", mainCities: ["Petropavlovsk-Kamchatsky", "Yelizovo", "Vilyuchinsk", "Anadyr"], rawOffsetInMinutes: 720, abbreviation: "PETT", rawFormat: "+12:00 Petropavlovsk-Kamchatski Time - Petropavlovsk-Kamchatsky, Yelizovo, Vilyuchinsk, Anadyr" },
    { name: "Pacific/Funafuti", alternativeName: "Tuvalu Time", group: ["Pacific/Funafuti"], continentCode: "OC", continentName: "Oceania", countryName: "Tuvalu", countryCode: "TV", mainCities: ["Funafuti"], rawOffsetInMinutes: 720, abbreviation: "TVT", rawFormat: "+12:00 Tuvalu Time - Funafuti" },
    { name: "Pacific/Wake", alternativeName: "Wake Island Time", group: ["Pacific/Wake"], continentCode: "OC", continentName: "Oceania", countryName: "United States Minor Outlying Islands", countryCode: "UM", mainCities: ["Wake"], rawOffsetInMinutes: 720, abbreviation: "WAKT", rawFormat: "+12:00 Wake Island Time - Wake" },
    { name: "Pacific/Wallis", alternativeName: "Wallis & Futuna Time", group: ["Pacific/Wallis"], continentCode: "OC", continentName: "Oceania", countryName: "Wallis and Futuna", countryCode: "WF", mainCities: ["Mata-Utu"], rawOffsetInMinutes: 720, abbreviation: "WFT", rawFormat: "+12:00 Wallis & Futuna Time - Mata-Utu" },
    { name: "Pacific/Chatham", alternativeName: "Chatham Time", group: ["Pacific/Chatham", "NZ-CHAT"], continentCode: "OC", continentName: "Oceania", countryName: "New Zealand", countryCode: "NZ", mainCities: ["Chatham"], rawOffsetInMinutes: 765, abbreviation: "CHAST", rawFormat: "+12:45 Chatham Time - Chatham" },
    { name: "Pacific/Apia", alternativeName: "Apia Time", group: ["Pacific/Apia"], continentCode: "OC", continentName: "Oceania", countryName: "Samoa", countryCode: "WS", mainCities: ["Apia"], rawOffsetInMinutes: 780, abbreviation: "WST", rawFormat: "+13:00 Apia Time - Apia" },
    { name: "Pacific/Kanton", alternativeName: "Phoenix Islands Time", group: ["Pacific/Kanton", "Pacific/Enderbury"], continentCode: "OC", continentName: "Oceania", countryName: "Kiribati", countryCode: "KI", mainCities: ["Kanton"], rawOffsetInMinutes: 780, abbreviation: "PHOT", rawFormat: "+13:00 Phoenix Islands Time - Kanton" },
    { name: "Pacific/Fakaofo", alternativeName: "Tokelau Time", group: ["Pacific/Fakaofo"], continentCode: "OC", continentName: "Oceania", countryName: "Tokelau", countryCode: "TK", mainCities: ["Fakaofo"], rawOffsetInMinutes: 780, abbreviation: "TKT", rawFormat: "+13:00 Tokelau Time - Fakaofo" },
    { name: "Pacific/Tongatapu", alternativeName: "Tonga Time", group: ["Pacific/Tongatapu"], continentCode: "OC", continentName: "Oceania", countryName: "Tonga", countryCode: "TO", mainCities: ["Nuku\u2018alofa"], rawOffsetInMinutes: 780, abbreviation: "TOT", rawFormat: "+13:00 Tonga Time - Nuku\u2018alofa" },
    { name: "Pacific/Kiritimati", alternativeName: "Line Islands Time", group: ["Pacific/Kiritimati"], continentCode: "OC", continentName: "Oceania", countryName: "Kiribati", countryCode: "KI", mainCities: ["Kiritimati"], rawOffsetInMinutes: 840, abbreviation: "LINT", rawFormat: "+14:00 Line Islands Time - Kiritimati" }
];
// opt/worldTime/worldtime.ts
var dayOfYear = (date) => {
    return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1e3 / 60 / 60 / 24);
};
function worldTime(timeZoneName) {
    const dataTofind = raw_time_zones_default.find((item) => item.group.includes(timeZoneName) && item.name === timeZoneName);
    const rawOffset = -dataTofind.rawOffsetInMinutes;
    const rawOffsetInMinutes = dataTofind.rawOffsetInMinutes;
    const rawOffsetInSeconds = -(rawOffset * 60 * 1e3);
    const timestampInUtc = Date.now();
    const timestampLocal = timestampInUtc - rawOffset * 60 * 1e3;
    const localDateTime = new Date(timestampLocal);
    const dayNumberOfYear = dayOfYear(localDateTime);
    const weekOfYear = Math.round(dayNumberOfYear / 7);
    const utcOffsetString = dataTofind.rawFormat.split(" ")[0];
    const localDateTimeString = localDateTime.toUTCString().split(" ").slice(0, -1).join(" ") + " " + dataTofind.alternativeName;
    const utcDateTimeString = new Date(timestampInUtc).toUTCString();
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
        utcDateTimeString
    };
}
export { DateTime, burmeseDate, raw_time_zones_default as data, thingyin_default as getThingyan, mmdate, translate_default as translate, worldTime };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map