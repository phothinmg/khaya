
function J2G(jd,ct=0, tz=0, SG=2361222){
    // var jd = parseInt(jdd);
    let 
    j ,
    jf ,
    month,
    date,
    year,
    hour,
    minutes,
    seconds;
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
    // var lom = lengthOfMonth(year,month);

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
        // length_of_month: lom,
    })

};
  function jutoge() {
    const jdn = document.getElementById('cc').value;
    const jdnn = parseInt(jdn,0,7)
    const jdnnn= J2G(jdnn);
    const ree = JSON.stringify(jdnnn, null, 2);
    document.getElementById('dd').innerHTML = ree;
    console.log(jdn);
  }

console.log(J2G(2460416.687106333));
