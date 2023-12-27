
function DivisibleBy(a, b){
    return ((a%b) == 0);
  }
//  =====================
function CreateDate(year, month, day){
    var date;
  
    date = {};
  
    date.year = year;
    date.month = month;
    date.day = day;
  
    return date;
}
// 
function DateToDays(date){
    var days;
  
    /* Day 1752-01-01 */
    days =  -79623;
  
    days = days + DaysInYears(date.year);
    days = days + DaysInMonths(date.month, date.year);
    days = days + date.day - 1;
  
    return days;
}
// function DaysBetweenDates(A, B){
//     var daysA, daysB, daysBetween;
  
//     daysA = DateToDays(A);
//     daysB = DateToDays(B);
  
//     daysBetween = daysB - daysA;
  
//     return daysBetween;
// }
function CreateDateTime(year, month, day, hours, minutes, seconds){
    var dateTime;
  
    dateTime = {};
  
    dateTime.date = CreateDate(year, month, day);
    dateTime.hours = hours;
    dateTime.minutes = minutes;
    dateTime.seconds = seconds;
  
    return dateTime;
}
// =============================================================
function DaysInYears(years){
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
}
// ----------
function DaysInMonths(month, year){
    var daysInMonth;
    var days;
    var i;
  
    daysInMonth = GetDaysInMonth(year);
  
    days = 0;
    for(i = 1; i < month; i = i + 1){
      days = days + daysInMonth[i];
    }
  
    return days;
}
// ==========================

// ------------
function IsLeapYear(year){
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
}
// ========================
  function GetDaysInMonth(year){
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
}
// ====================
function DecimalDigitToCharacter(digit){
    var c;
    if(digit == 1){
      c = '1';
    }else if(digit == 2){
      c = '2';
    }else if(digit == 3){
      c = '3';
    }else if(digit == 4){
      c = '4';
    }else if(digit == 5){
      c = '5';
    }else if(digit == 6){
      c = '6';
    }else if(digit == 7){
      c = '7';
    }else if(digit == 8){
      c = '8';
    }else if(digit == 9){
      c = '9';
    }else{
      c = '0';
    }
    return c;
  }
  function DateToStringISO8601(date){
    var str;
  
    str = [];
    str.length = 10;
  
    str[0] = DecimalDigitToCharacter(Math.floor(date.year/1000));
    str[1] = DecimalDigitToCharacter(Math.floor((date.year%1000)/100));
    str[2] = DecimalDigitToCharacter(Math.floor((date.year%100)/10));
    str[3] = DecimalDigitToCharacter(Math.floor(date.year%10));
  
    str[4] = '-';
  
    str[5] = DecimalDigitToCharacter(Math.floor((date.month%100)/10));
    str[6] = DecimalDigitToCharacter(Math.floor(date.month%10));
  
    str[7] = '-';
  
    str[8] = DecimalDigitToCharacter(Math.floor((date.day%100)/10));
    str[9] = DecimalDigitToCharacter(Math.floor(date.day%10));
  
    return str;
  }
function DateTimeToStringISO8601(datetime){
    var datestr, str;
    var i;
  
    str = [];
    str.length = 19;
  
    datestr = DateToStringISO8601(datetime.date);
    for(i = 0; i < datestr.length; i = i + 1){
      str[i] = datestr[i];
    }
  
    str[10] = 'T';
    str[11] = DecimalDigitToCharacter(Math.floor((datetime.hours%100)/10));
    str[12] = DecimalDigitToCharacter(Math.floor(datetime.hours%10));
  
    str[13] = ':';
  
    str[14] = DecimalDigitToCharacter(Math.floor((datetime.minutes%100)/10));
    str[15] = DecimalDigitToCharacter(Math.floor(datetime.minutes%10));
  
    str[16] = ':';
  
    str[17] = DecimalDigitToCharacter(Math.floor((datetime.seconds%100)/10));
    str[18] = DecimalDigitToCharacter(Math.floor(datetime.seconds%10));
  
    return str;
  }



// var a = CreateDate(2023,12,26)
// var b = DateToDays(a)

const GetDay = (year,month,date)=>{
  var days;
  
    /* Day 1752-01-01 */
    days =  -79623;
  
    days = days + DaysInYears(year);
    days = days + DaysInMonths(month, year);
    days = days + date - 1;
  
    return days;
}
function DaysBetweenDates(dateFrom, dateTo){
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
var b = DaysBetweenDates('1973-08-18', '2023-12-27')
var c = GetDay(2023,12,26)

console.log(c)
console.log(b/365)
// console.log(b/365)