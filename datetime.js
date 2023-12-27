// Downloaded from https://repo.progsbase.com - Code Developed Using progsbase.

function CreateDate(year, month, day){
  var date;

  date = {};

  date.year = year;
  date.month = month;
  date.day = day;

  return date;
}
function IsLeapYearWithCheck(year, isLeapYearReference, message){
  var itIsLeapYear;
  var success;

  if(year >= 1752){
    success = true;
    itIsLeapYear = IsLeapYear(year);
  }else{
    success = false;
    itIsLeapYear = false;
    message.string = "Gregorian calendar was not in general use.".split('');
  }

  isLeapYearReference.booleanValue = itIsLeapYear;
  return success;
}
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
function DayToDateWithCheck(dayNr, dateReference, message){
  var date;
  var remainder;
  var success;

  if(dayNr >=  -79623){
    date = {};
    remainder = {};
    remainder.numberValue = dayNr + 79623;
    /* Days since 1752-01-01. Day 0: Thursday, 1970-01-01 */
    /* Find year. */
    date.year = GetYearFromDayNr(remainder.numberValue, remainder);

    /* Find month. */
    date.month = GetMonthFromDayNr(remainder.numberValue, date.year, remainder);

    /* Find day. */
    date.day = 1 + remainder.numberValue;

    dateReference.date = date;
    success = true;
  }else{
    success = false;
    message.string = "Gregorian calendar was not in general use before 1752.".split('');
  }

  return success;
}
function DayToDate(dayNr){
  var date;
  var success;
  var dateRef;
  var message;

  dateRef = {};
  message = {};

  success = DayToDateWithCheck(dayNr, dateRef, message);
  if(success){
    date = dateRef.date;
    delete(dateRef);
    FreeStringReference(message);
  }else{
    date = CreateDate(1970, 1, 1);
  }

  return date;
}
function GetMonthFromDayNrWithCheck(dayNr, year, monthReference, remainderReference, message){
  var month;
  var success;

  if(dayNr >=  -79623){
    month = GetMonthFromDayNr(dayNr, year, remainderReference);
    monthReference.numberValue = month;
    success = true;
  }else{
    success = false;
    message.string = "Gregorian calendar not in general use before 1752.".split('');
  }

  return success;
}
function GetMonthFromDayNr(dayNr, year, remainderReference){
  var daysInMonth;
  var done;
  var month;

  daysInMonth = GetDaysInMonth(year);
  done = false;
  month = 1;

  for(;  !done ; ){
    if(dayNr >= daysInMonth[month]){
      dayNr = dayNr - daysInMonth[month];
      month = month + 1;
    }else{
      done = true;
    }
  }
  remainderReference.numberValue = dayNr;

  return month;
}
function GetYearFromDayNrWithCheck(dayNr, yearReference, remainder, message){
  var success;
  var year;

  if(dayNr >= 0){
    success = true;
    year = GetYearFromDayNr(dayNr, remainder);
    yearReference.numberValue = year;
  }else{
    success = false;
    message.string = "Day number must be 0 or higher. 0 is 1752-01-01.".split('');
  }

  return success;
}
function GetYearFromDayNr(dayNr, remainder){
  var nrOfDays;
  var done;
  var year;

  done = false;
  year = 1752;

  for(;  !done ; ){
    if(IsLeapYear(year)){
      nrOfDays = 366;
    }else{
      nrOfDays = 365;
    }

    if(dayNr >= nrOfDays){
      /* First day is 0. */
      dayNr = dayNr - nrOfDays;
      year = year + 1;
    }else{
      done = true;
    }
  }
  remainder.numberValue = dayNr;

  return year;
}
function DaysBetweenDates(A, B){
  var daysA, daysB, daysBetween;

  daysA = DateToDays(A);
  daysB = DateToDays(B);

  daysBetween = daysB - daysA;

  return daysBetween;
}
function GetDaysInMonthWithCheck(year, daysInMonthReference, message){
  var daysInMonth;
  var success;
  var date;

  date = CreateDate(year, 1, 1);

  success = IsValidDate(date, message);
  if(success){
    daysInMonth = GetDaysInMonth(year);

    daysInMonthReference.numberArray = daysInMonth;
  }

  return success;
}
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
function DateToDaysWithCheck(date, dayNumberReferenceReference, message){
  var days;
  var success;

  success = IsValidDate(date, message);
  if(success){
    days = DateToDays(date);
    dayNumberReferenceReference.numberValue = days;
  }

  return success;
}
function DateToDays(date){
  var days;

  /* Day 1752-01-01 */
  days =  -79623;

  days = days + DaysInYears(date.year);
  days = days + DaysInMonths(date.month, date.year);
  days = days + date.day - 1;

  return days;
}
function DateToWeekdayNumberWithCheck(date, weekDayNumberReference, message){
  var weekDay;
  var success;

  success = IsValidDate(date, message);
  if(success){
    weekDay = DateToWeekdayNumber(date);
    weekDayNumberReference.numberValue = weekDay;
  }

  return success;
}
function DateToWeekdayNumber(date){
  var days, weekDay;

  days = DateToDays(date)
  days = days + 79623;
  days = days + 5;

  weekDay = days%7 + 1;

  return weekDay;
}
function DaysInMonthsWithCheck(month, year, daysInMonthsReference, message){
  var days;
  var success;
  var date;

  date = CreateDate(year, month, 1);

  success = IsValidDate(date, message);
  if(success){
    days = DaysInMonths(month, year);

    daysInMonthsReference.numberValue = days;
  }

  return success;
}
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
function DaysInYearsWithCheck(years, daysReference, message){
  var days;
  var success;
  var date;

  date = CreateDate(years, 1, 1);

  success = IsValidDate(date, message);
  if(success){
    days = DaysInYears(years);
    daysReference.numberValue = days;
  }

  return success;
}
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
function IsValidDate(date, message){
  var valid;
  var daysInMonth;
  var daysInThisMonth;

  if(date.year >= 1752){
    if(date.month >= 1 && date.month <= 12){
      daysInMonth = GetDaysInMonth(date.year);
      daysInThisMonth = daysInMonth[date.month];
      if(date.day >= 1 && date.day <= daysInThisMonth){
        valid = true;
      }else{
        valid = false;
        message.string = "The month does not have the given day number.".split('');
      }
    }else{
      valid = false;
      message.string = "Month must be between 1 and 12, inclusive.".split('');
    }
  }else{
    valid = false;
    message.string = "Gregorian calendar was not in general use before 1752.".split('');
  }

  return valid;
}
function AddDaysToDate(date, days, message){
  var n;
  var success;
  var dateReference;
  var daysRef;

  daysRef = {};
  success = DateToDaysWithCheck(date, daysRef, message);

  if(success){
    n = daysRef.numberValue;
    n = n + days;

    dateReference = {};
    success = DayToDateWithCheck(n, dateReference, message);
    if(success){
      AssignDate(date, dateReference.date);
    }
  }

  return success;
}
function AssignDate(a, b){
  a.year = b.year;
  a.month = b.month;
  a.day = b.day;
}
function AddMonthsToDate(date, months){
  var i;

  if(months > 0){
    for(i = 0; i < months; i = i + 1){
      date.month = date.month + 1;

      if(date.month == 13){
        date.month = 1;
        date.year = date.year + 1;
      }
    }
  }
  if(months < 0){
    for(i = 0; i <  -months; i = i + 1){
      date.month = date.month - 1;

      if(date.month == 0){
        date.month = 12;
        date.year = date.year - 1;
      }
    }
  }
}
function DateToStringISO8601WithCheck(date, datestr, message){
  var success;

  success = IsValidDate(date, message);

  if(success){
    if(date.year <= 9999){
      datestr.string = DateToStringISO8601(date);
    }else{
      message.string = "This library works from 1752 to 9999.".split('');
    }
  }

  return success;
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
function DateFromStringISO8601(str){
  var date;
  var n;

  date = {};

  n = CharacterToDecimalDigit(str[0])*1000;
  n = n + CharacterToDecimalDigit(str[1])*100;
  n = n + CharacterToDecimalDigit(str[2])*10;
  n = n + CharacterToDecimalDigit(str[3])*1;

  date.year = n;

  n = CharacterToDecimalDigit(str[5])*10;
  n = n + CharacterToDecimalDigit(str[6])*1;

  date.month = n;

  n = CharacterToDecimalDigit(str[8])*10;
  n = n + CharacterToDecimalDigit(str[9])*1;

  date.day = n;

  return date;
}
function DateEquals(a, b){
  return a.year == b.year && a.month == b.month && a.day == b.day;
}
function CopyDate(a){
  var b;

  b = CreateDate(a.year, a.month, a.day);

  return b;
}
function GetSecondsFromDate(date){
  var seconds, days, secondsInMinute, secondsInHour, secondsInDay;
  var dayNumberReferenceReference;
  var message;
  var success;

  seconds = 0;
  dayNumberReferenceReference = {};
  message = {};

  success = DateToDaysWithCheck(date, dayNumberReferenceReference, message);
  if(success){
    days = dayNumberReferenceReference.numberValue;

    secondsInMinute = 60;
    secondsInHour = 60*secondsInMinute;
    secondsInDay = 24*secondsInHour;

    seconds = seconds + secondsInDay*days;
  }

  delete(dayNumberReferenceReference);
  delete(message);

  return seconds;
}
function CreateDateTimeTimezone(year, month, day, hours, minutes, seconds, timezoneOffsetSeconds){
  var dateTimeTimezone;

  dateTimeTimezone = {};

  dateTimeTimezone.dateTime = CreateDateTime(year, month, day, hours, minutes, seconds);
  dateTimeTimezone.timezoneOffsetSeconds = timezoneOffsetSeconds;

  return dateTimeTimezone;
}
function CreateDateTimeTimezoneInHoursAndMinutes(year, month, day, hours, minutes, seconds, timezoneOffsetHours, timezoneOffsetMinutes){
  var dateTimeTimezone;

  dateTimeTimezone = {};

  dateTimeTimezone.dateTime = CreateDateTime(year, month, day, hours, minutes, seconds);
  dateTimeTimezone.timezoneOffsetSeconds = GetSecondsFromHours(timezoneOffsetHours) + GetSecondsFromMinutes(timezoneOffsetMinutes);

  return dateTimeTimezone;
}
function GetDateFromDateTimeTimeZone(dateTimeTimezone, dateTimeReference, message){
  var dateTime;

  dateTime = dateTimeTimezone.dateTime;

  return AddSecondsToDateTimeWithCheck(dateTime,  -dateTimeTimezone.timezoneOffsetSeconds, dateTimeReference, message);
}
function CreateDateTimeTimezoneFromDateTimeAndTimeZoneInSeconds(dateTime, timezoneOffsetSeconds, dateTimeTimezoneReference, message){
  var success;
  var adjustedDateTimeReference;
  var dateTimeTimezone;

  adjustedDateTimeReference = {};
  dateTimeTimezone = {};

  success = AddSecondsToDateTime(dateTime, timezoneOffsetSeconds, adjustedDateTimeReference, message);

  if(success){
    dateTimeTimezone.dateTime = adjustedDateTimeReference.dateTime;
    dateTimeTimezone.timezoneOffsetSeconds = timezoneOffsetSeconds;

    dateTimeTimezoneReference.dateTimeTimezone = dateTimeTimezone;
  }

  return success;
}
function CreateDateTimeTimezoneFromDateTimeAndTimeZoneInHoursAndMinutes(dateTime, timezoneOffsetHours, timezoneOffsetMinutes, dateTimeTimezoneReference, message){
  return CreateDateTimeTimezoneFromDateTimeAndTimeZoneInSeconds(dateTime, GetSecondsFromHours(timezoneOffsetHours) + GetSecondsFromMinutes(timezoneOffsetMinutes), dateTimeTimezoneReference, message);
}
function GetDateTimeTimezoneFromSeconds(dateTimeTzRef, seconds, offset, message){
  var success;
  var dateTimeRef;

  dateTimeRef = {};
  success = GetDateTimeFromSeconds(seconds, dateTimeRef, message);

  if(success){
    success = CreateDateTimeTimezoneFromDateTimeAndTimeZoneInSeconds(dateTimeRef.dateTime, offset, dateTimeTzRef, message);
  }

  return success;
}
function CreateDateTime(year, month, day, hours, minutes, seconds){
  var dateTime;

  dateTime = {};

  dateTime.date = CreateDate(year, month, day);
  dateTime.hours = hours;
  dateTime.minutes = minutes;
  dateTime.seconds = seconds;

  return dateTime;
}
function GetDateTimeFromSeconds(seconds, dateTimeReference, message){
  var dateTime;
  var secondsInMinute, secondsInHour, secondsInDay, days, remainder;
  var date;
  var dateReference;
  var success;

  secondsInMinute = 60;
  secondsInHour = 60*secondsInMinute;
  secondsInDay = 24*secondsInHour;
  days = Math.floor(seconds/secondsInDay);
  remainder = seconds - days*secondsInDay;
  dateReference = {};

  success = DayToDateWithCheck(days, dateReference, message);
  if(success){
    date = dateReference.date;

    dateTime = {};
    dateTime.date = date;
    dateTime.hours = Math.floor(remainder/secondsInHour);
    remainder = remainder - dateTime.hours*secondsInHour;
    dateTime.minutes = Math.floor(remainder/secondsInMinute);
    remainder = remainder - dateTime.minutes*secondsInMinute;
    dateTime.seconds = remainder;

    dateTimeReference.dateTime = dateTime;
  }

  return success;
}
function GetSecondsFromDateTime(dateTime){
  var seconds, secondsInMinute, secondsInHour;

  secondsInMinute = 60;
  secondsInHour = 60*secondsInMinute;

  seconds = GetSecondsFromDate(dateTime.date);
  seconds = seconds + secondsInHour*dateTime.hours;
  seconds = seconds + secondsInMinute*dateTime.minutes;
  seconds = seconds + dateTime.seconds;

  return seconds;
}
function GetSecondsFromMinutes(minutes){
  return minutes*60;
}
function GetSecondsFromHours(hours){
  return GetSecondsFromMinutes(hours*60);
}
function GetSecondsFromDays(days){
  return GetSecondsFromHours(days*24);
}
function GetSecondsFromWeeks(weeks){
  return GetSecondsFromDays(weeks*7);
}
function GetMinutesFromSeconds(seconds){
  return seconds/60;
}
function GetHoursFromSeconds(seconds){
  return GetMinutesFromSeconds(seconds)/60;
}
function GetDaysFromSeconds(seconds){
  return GetHoursFromSeconds(seconds)/24;
}
function GetWeeksFromSeconds(seconds){
  return GetDaysFromSeconds(seconds)/7;
}
function GetDateFromDateTime(dateTime){
  return dateTime.date;
}
function AddSecondsToDateTimeWithCheck(dateTime, seconds, dateTimeReference, message){
  var secondsInDateTime;
  var success;

  if(IsValidDateTime(dateTime, message)){
    secondsInDateTime = GetSecondsFromDateTime(dateTime);
    secondsInDateTime = secondsInDateTime + seconds;

    success = GetDateTimeFromSeconds(secondsInDateTime, dateTimeReference, message);
  }else{
    success = false;
  }

  return success;
}
function AddSecondsToDateTime(dateTime, seconds, dateTimeReference, message){
  var secondsInDateTime;

  secondsInDateTime = GetSecondsFromDateTime(dateTime);
  secondsInDateTime = secondsInDateTime + seconds;

  return GetDateTimeFromSeconds(secondsInDateTime, dateTimeReference, message);
}
function AddMinutesToDateTime(dateTime, minutes, dateTimeReference, message){
  return AddSecondsToDateTime(dateTime, GetSecondsFromMinutes(minutes), dateTimeReference, message);
}
function AddHoursToDateTime(dateTime, hours, dateTimeReference, message){
  return AddSecondsToDateTime(dateTime, GetSecondsFromHours(hours), dateTimeReference, message);
}
function AddDaysToDateTime(dateTime, days, dateTimeReference, message){
  return AddSecondsToDateTime(dateTime, GetSecondsFromDays(days), dateTimeReference, message);
}
function AddWeeksToDateTime(dateTime, weeks, dateTimeReference, message){
  return AddSecondsToDateTime(dateTime, GetSecondsFromWeeks(weeks), dateTimeReference, message);
}
function DateTimeToStringISO8601WithCheck(datetime, dateStr, message){
  var success;

  success = DateToStringISO8601WithCheck(datetime.date, dateStr, message);

  if(success){
    delete(dateStr.string);

    success = IsValidDateTime(datetime, message);
    if(success){
      dateStr.string = DateTimeToStringISO8601(datetime);
    }
  }

  return success;
}
function IsValidDateTime(datetime, message){
  var success;

  success = IsValidDate(datetime.date, message);

  if(success){
    if(datetime.hours <= 23 && datetime.hours >= 0){
      if(datetime.minutes <= 59 && datetime.minutes >= 0){
        if(datetime.seconds <= 59 && datetime.seconds >= 0){
          success = true;
        }else{
          success = false;
          message.string = "Seconds must be between 0 and 59.".split('');
        }
      }else{
        success = false;
        message.string = "Minutes must be between 0 and 59.".split('');
      }
    }else{
      success = false;
      message.string = "Hours must be between 0 and 23.".split('');
    }
  }

  return success;
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
function DateTimeFromStringISO8601(str){
  var dateTime;
  var n;

  dateTime = {};

  dateTime.date = DateFromStringISO8601(str);

  n = CharacterToDecimalDigit(str[11])*10;
  n = n + CharacterToDecimalDigit(str[12])*1;

  dateTime.hours = n;

  n = CharacterToDecimalDigit(str[14])*10;
  n = n + CharacterToDecimalDigit(str[15])*1;

  dateTime.minutes = n;

  n = CharacterToDecimalDigit(str[17])*10;
  n = n + CharacterToDecimalDigit(str[18])*1;

  dateTime.seconds = n;

  return dateTime;
}
function DateTimeEquals(a, b){
  return DateEquals(a.date, b.date) && a.hours == b.hours && a.minutes == b.minutes && a.seconds == b.seconds;
}
function FreeDateTime(datetime){
  delete(datetime.date);
  delete(datetime);
}
function test(){
  var failures;

  failures = CreateNumberReference(0);

  testIsLeapYear(failures);
  testDayToDate(failures);
  dateToDayTest(failures);
  testSecondsToDateTime(failures);
  testSecondsToDateTime2(failures);
  testDatetimeToSecondsTest(failures);
  testIsValidDate(failures);
  testDayDifferenceBetweenTwoDayes(failures);
  testWeekDay(failures);
  testTimezones1(failures);
  testTimezones2(failures);
  testDaysBetween(failures);
  testToString(failures);

  return failures.numberValue;
}
function testIsLeapYear(failures){
  var success;
  var errorMessage;
  var isLeapYearReference;
  var aDateTime;
  var dateTimeReference;

  isLeapYearReference = {};
  errorMessage = {};

  success = IsLeapYearWithCheck(2012, isLeapYearReference, errorMessage);
  AssertTrue(success, failures);
  AssertTrue(isLeapYearReference.booleanValue, failures);

  success = IsLeapYearWithCheck(2016, isLeapYearReference, errorMessage);
  AssertTrue(success, failures);
  AssertTrue(isLeapYearReference.booleanValue, failures);

  success = IsLeapYearWithCheck(2000, isLeapYearReference, errorMessage);
  AssertTrue(success, failures);
  AssertTrue(isLeapYearReference.booleanValue, failures);

  success = IsLeapYearWithCheck(2100, isLeapYearReference, errorMessage);
  AssertTrue(success, failures);
  AssertFalse(isLeapYearReference.booleanValue, failures);

  success = IsLeapYearWithCheck(2200, isLeapYearReference, errorMessage);
  AssertTrue(success, failures);
  AssertFalse(isLeapYearReference.booleanValue, failures);

  success = IsLeapYearWithCheck(2018, isLeapYearReference, errorMessage);
  AssertTrue(success, failures);
  AssertFalse(isLeapYearReference.booleanValue, failures);

  /* Excel bug. */
  success = IsLeapYearWithCheck(1900, isLeapYearReference, errorMessage);
  AssertTrue(success, failures);
  AssertFalse(isLeapYearReference.booleanValue, failures);

  /* For generating inputs: */
  aDateTime = CreateDateTime(2019, 11, 28, 10, 6, 40);
  GetWeeksFromSeconds(GetSecondsFromDateTime(aDateTime));
  GetDateFromDateTime(aDateTime);
  dateTimeReference = {};
  AddMinutesToDateTime(aDateTime, 900, dateTimeReference, errorMessage);
  AddHoursToDateTime(aDateTime, 48, dateTimeReference, errorMessage);
  AddDaysToDateTime(aDateTime, 90, dateTimeReference, errorMessage);
  AddWeeksToDateTime(aDateTime, 20, dateTimeReference, errorMessage);
}
function testDayToDate(failures){
  var success;
  var date;
  var dateReference;
  var errorMessage;

  dateReference = {};
  errorMessage = {};

  success = DayToDateWithCheck(17483, dateReference, errorMessage);
  AssertTrue(success, failures);
  date = dateReference.date;
  AssertEquals(2017, date.year, failures);
  AssertEquals(11, date.month, failures);
  AssertEquals(13, date.day, failures);

  success = DayToDateWithCheck(0, dateReference, errorMessage);
  AssertTrue(success, failures);
  date = dateReference.date;
  AssertEquals(1970, date.year, failures);
  AssertEquals(1, date.month, failures);
  AssertEquals(1, date.day, failures);
}
function dateToDayTest(failures){
  var date;
  var day;
  var dayNumberReferenceReference;
  var message;
  var success;

  dayNumberReferenceReference = {};
  message = {};

  date = CreateDate(2017, 11, 13);
  success = DateToDaysWithCheck(date, dayNumberReferenceReference, message);
  AssertTrue(success, failures);
  day = dayNumberReferenceReference.numberValue;
  AssertEquals(17483, day, failures);

  date = CreateDate(1970, 1, 1);
  success = DateToDaysWithCheck(date, dayNumberReferenceReference, message);
  AssertTrue(success, failures);
  day = dayNumberReferenceReference.numberValue;
  AssertEquals(0, day, failures);

  date = CreateDate(2020, 2, 28);
  success = AddDaysToDate(date, 2, message);

  AssertTrue(success, failures);

  if(success){
    AssertEquals(2020, date.year, failures);
    AssertEquals(3, date.month, failures);
    AssertEquals(1, date.day, failures);
  }

  date = CreateDate(2023, 4, 30);
  success = AddDaysToDate(date, 1, message);

  AssertTrue(success, failures);

  if(success){
    AssertEquals(2023, date.year, failures);
    AssertEquals(5, date.month, failures);
    AssertEquals(1, date.day, failures);
  }
}
function testSecondsToDateTime(failures){
  var seconds;
  var dateTime;
  var dateTimeReference;
  var errorMessage;
  var success;

  dateTimeReference = {};
  errorMessage = {};

  seconds = 1510565444;

  success = GetDateTimeFromSeconds(seconds, dateTimeReference, errorMessage);
  AssertTrue(success, failures);
  dateTime = dateTimeReference.dateTime;
  AssertEquals(2017, dateTime.date.year, failures);
  AssertEquals(11, dateTime.date.month, failures);
  AssertEquals(13, dateTime.date.day, failures);
  AssertEquals(9, dateTime.hours, failures);
  AssertEquals(30, dateTime.minutes, failures);
  AssertEquals(44, dateTime.seconds, failures);
}
function testDatetimeToSecondsTest(failures){
  var dateTime;
  var seconds;

  dateTime = CreateDateTime(2017, 11, 13, 9, 30, 44);

  seconds = GetSecondsFromDateTime(dateTime);

  AssertEquals(1510565444, seconds, failures);
}
function testIsValidDate(failures){
  var date;

  date = CreateDate(2017, 11, 13);
  AssertTrue(IsValidDate(date, {}), failures);

  date = CreateDate(2017, 2, 31);
  AssertFalse(IsValidDate(date, {}), failures);

  date = CreateDate(2016, 2, 29);
  AssertTrue(IsValidDate(date, {}), failures);

  date = CreateDate(2017, 2, 29);
  AssertFalse(IsValidDate(date, {}), failures);

  date = CreateDate(2017, 0, 29);
  AssertFalse(IsValidDate(date, {}), failures);

  date = CreateDate(2017, 1, 32);
  AssertFalse(IsValidDate(date, {}), failures);
}
function testDayDifferenceBetweenTwoDayes(failures){
  var date1, date2;
  var day1, day2, days;
  var dayNumberReferenceReference;
  var errorMessage;
  var success;

  dayNumberReferenceReference = {};
  errorMessage = {};

  date1 = CreateDate(2014, 3, 5);
  date2 = CreateDate(2018, 9, 23);

  success = DateToDaysWithCheck(date1, dayNumberReferenceReference, errorMessage);
  AssertTrue(success, failures);
  day1 = dayNumberReferenceReference.numberValue;
  success = DateToDaysWithCheck(date2, dayNumberReferenceReference, errorMessage);
  AssertTrue(success, failures);
  day2 = dayNumberReferenceReference.numberValue;

  days = day2 - day1;

  AssertEquals(days, 1663, failures);
}
function testWeekDay(failures){
  var date1, date2;
  var day1, day2;
  var weekDayNumberReference;
  var errorMessage;
  var success;

  weekDayNumberReference = {};
  errorMessage = {};

  date1 = CreateDate(2014, 3, 5);
  date2 = CreateDate(2018, 9, 23);

  success = DateToWeekdayNumberWithCheck(date1, weekDayNumberReference, errorMessage);
  AssertTrue(success, failures);
  day1 = weekDayNumberReference.numberValue;
  success = DateToWeekdayNumberWithCheck(date2, weekDayNumberReference, errorMessage);
  AssertTrue(success, failures);
  day2 = weekDayNumberReference.numberValue;

  AssertEquals(day1, 3, failures);
  AssertEquals(day2, 7, failures);
}
function testDaysBetween(failures){
  var a, b;
  var days;

  a = CreateDate(2014, 3, 5);
  b = CreateDate(2018, 9, 23);

  days = DaysBetweenDates(a, b);

  AssertEquals(1663, days, failures);
}
function testTimezones1(failures){
  var errorMessage;
  var success;
  var dateTimeTimezoneReference;
  var dateTimeTimezone;
  var dateTime;

  dateTime = CreateDateTime(2018, 9, 24, 7, 20, 0);

  dateTimeTimezoneReference = {};
  errorMessage = {};

  success = CreateDateTimeTimezoneFromDateTimeAndTimeZoneInHoursAndMinutes(dateTime, 2, 0, dateTimeTimezoneReference, errorMessage);
  AssertTrue(success, failures);
  dateTimeTimezone = dateTimeTimezoneReference.dateTimeTimezone;

  AssertEquals(2018, dateTimeTimezone.dateTime.date.year, failures);
  AssertEquals(9, dateTimeTimezone.dateTime.date.month, failures);
  AssertEquals(24, dateTimeTimezone.dateTime.date.day, failures);
  AssertEquals(9, dateTimeTimezone.dateTime.hours, failures);
  AssertEquals(20, dateTimeTimezone.dateTime.minutes, failures);
  AssertEquals(0, dateTimeTimezone.dateTime.seconds, failures);
}
function testTimezones2(failures){
  var errorMessage;
  var success;
  var dateTimeTimezone;
  var dateTimeReference;

  errorMessage = {};

  dateTimeTimezone = CreateDateTimeTimezoneInHoursAndMinutes(2018, 9, 24, 9, 20, 0, 2, 0);
  dateTimeReference = {};
  success = GetDateFromDateTimeTimeZone(dateTimeTimezone, dateTimeReference, errorMessage);
  AssertTrue(success, failures);

  AssertEquals(2018, dateTimeReference.dateTime.date.year, failures);
  AssertEquals(9, dateTimeReference.dateTime.date.month, failures);
  AssertEquals(24, dateTimeReference.dateTime.date.day, failures);
  AssertEquals(7, dateTimeReference.dateTime.hours, failures);
  AssertEquals(20, dateTimeReference.dateTime.minutes, failures);
  AssertEquals(0, dateTimeReference.dateTime.seconds, failures);
}
function testSecondsToDateTime2(failures){
  var seconds;
  var dateTime;
  var dateTimeReference;
  var errorMessage;
  var success;

  dateTimeReference = {};
  errorMessage = {};

  seconds = 1601596487;

  success = GetDateTimeFromSeconds(seconds, dateTimeReference, errorMessage);
  AssertTrue(success, failures);
  dateTime = dateTimeReference.dateTime;
  AssertEquals(2020, dateTime.date.year, failures);
  AssertEquals(10, dateTime.date.month, failures);
  AssertEquals(1, dateTime.date.day, failures);
  AssertEquals(23, dateTime.hours, failures);
  AssertEquals(54, dateTime.minutes, failures);
  AssertEquals(47, dateTime.seconds, failures);
}
function testToString(failures){
  var str;
  var date, date2;
  var dateTime, dateTime2;

  date = CreateDate(2020, 9, 14);

  str = DateToStringISO8601(date);

  AssertStringEquals(str, "2020-09-14".split(''), failures);

  date2 = DateFromStringISO8601(str);

  dateTime = CreateDateTime(2020, 9, 14, 13, 59, 44);

  str = DateTimeToStringISO8601(dateTime);

  AssertTrue(DateEquals(date, date2), failures);

  AssertStringEquals(str, "2020-09-14T13:59:44".split(''), failures);

  AssertEquals(date.year, date2.year, failures);
  AssertEquals(date.month, date2.month, failures);
  AssertEquals(date.day, date2.day, failures);

  dateTime2 = DateTimeFromStringISO8601(str);

  AssertTrue(DateTimeEquals(dateTime, dateTime2), failures);
}
function CreateBooleanReference(value){
  var ref;

  ref = {};
  ref.booleanValue = value;

  return ref;
}
function CreateBooleanArrayReference(value){
  var ref;

  ref = {};
  ref.booleanArray = value;

  return ref;
}
function CreateBooleanArrayReferenceLengthValue(lengthx, value){
  var ref;
  var i;

  ref = {};
  ref.booleanArray = [];
  ref.booleanArray.length = lengthx;

  for(i = 0; i < lengthx; i = i + 1){
    ref.booleanArray[i] = value;
  }

  return ref;
}
function FreeBooleanArrayReference(booleanArrayReference){
  delete(booleanArrayReference.booleanArray);
  delete(booleanArrayReference);
}
function CreateCharacterReference(value){
  var ref;

  ref = {};
  ref.characterValue = value;

  return ref;
}
function CreateNumberReference(value){
  var ref;

  ref = {};
  ref.numberValue = value;

  return ref;
}
function CreateNumberArrayReference(value){
  var ref;

  ref = {};
  ref.numberArray = value;

  return ref;
}
function CreateNumberArrayReferenceLengthValue(lengthx, value){
  var ref;
  var i;

  ref = {};
  ref.numberArray = [];
  ref.numberArray.length = lengthx;

  for(i = 0; i < lengthx; i = i + 1){
    ref.numberArray[i] = value;
  }

  return ref;
}
function FreeNumberArrayReference(numberArrayReference){
  delete(numberArrayReference.numberArray);
  delete(numberArrayReference);
}
function CreateStringReference(value){
  var ref;

  ref = {};
  ref.string = value;

  return ref;
}
function CreateStringReferenceLengthValue(lengthx, value){
  var ref;
  var i;

  ref = {};
  ref.string = [];
  ref.string.length = lengthx;

  for(i = 0; i < lengthx; i = i + 1){
    ref.string[i] = value;
  }

  return ref;
}
function FreeStringReference(stringReference){
  delete(stringReference.string);
  delete(stringReference);
}
function CreateStringArrayReference(strings){
  var ref;

  ref = {};
  ref.stringArray = strings;

  return ref;
}
function CreateStringArrayReferenceLengthValue(lengthx, value){
  var ref;
  var i;

  ref = {};
  ref.stringArray = [];
  ref.stringArray.length = lengthx;

  for(i = 0; i < lengthx; i = i + 1){
    ref.stringArray[i] = CreateStringReference(value);
  }

  return ref;
}
function FreeStringArrayReference(stringArrayReference){
  var i;

  for(i = 0; i < stringArrayReference.stringArray.length; i = i + 1){
    delete(stringArrayReference.stringArray[i]);
  }
  delete(stringArrayReference.stringArray);
  delete(stringArrayReference);
}
function Negate(x){
  return  -x;
}
function Positive(x){
  return  +x;
}
function Factorial(x){
  var i, f;

  f = 1;

  for(i = 2; i <= x; i = i + 1){
    f = f*i;
  }

  return f;
}
function Round(x){
  return Math.floor(x + 0.5);
}
function BankersRound(x){
  var r;

  if(Absolute(x - Truncate(x)) == 0.5){
    if( !DivisibleBy(Round(x), 2) ){
      r = Round(x) - 1;
    }else{
      r = Round(x);
    }
  }else{
    r = Round(x);
  }

  return r;
}
function Ceil(x){
  return Math.ceil(x);
}
function Floor(x){
  return Math.floor(x);
}
function Truncate(x){
  var t;

  if(x >= 0){
    t = Math.floor(x);
  }else{
    t = Math.ceil(x);
  }

  return t;
}
function Absolute(x){
  return Math.abs(x);
}
function Logarithm(x){
  return Math.log10(x);
}
function NaturalLogarithm(x){
  return Math.log(x);
}
function Sin(x){
  return Math.sin(x);
}
function Cos(x){
  return Math.cos(x);
}
function Tan(x){
  return Math.tan(x);
}
function Asin(x){
  return Math.asin(x);
}
function Acos(x){
  return Math.acos(x);
}
function Atan(x){
  return Math.atan(x);
}
function Atan2(y, x){
  var a;

  /* Atan2 is an invalid operation when x = 0 and y = 0, but this method does not return errors. */
  a = 0;

  if(x > 0){
    a = Atan(y/x);
  }else if(x < 0 && y >= 0){
    a = Atan(y/x) + Math.PI;
  }else if(x < 0 && y < 0){
    a = Atan(y/x) - Math.PI;
  }else if(x == 0 && y > 0){
    a = Math.PI/2;
  }else if(x == 0 && y < 0){
    a =  -Math.PI/2;
  }

  return a;
}
function Squareroot(x){
  return Math.sqrt(x);
}
function Exp(x){
  return Math.exp(x);
}
function DivisibleBy(a, b){
  return ((a%b) == 0);
}
function Combinations(n, k){
  var i, j, c;

  c = 1;
  j = 1;
  i = n - k + 1;

  for(; i <= n; ){
    c = c*i;
    c = c/j;

    i = i + 1;
    j = j + 1;
  }

  return c;
}
function Permutations(n, k){
  var i, c;

  c = 1;

  for(i = n - k + 1; i <= n; i = i + 1){
    c = c*i;
  }

  return c;
}
function EpsilonCompare(a, b, epsilon){
  return Math.abs(a - b) < epsilon;
}
function GreatestCommonDivisor(a, b){
  var t;

  for(; b != 0; ){
    t = b;
    b = a%b;
    a = t;
  }

  return a;
}
function GCDWithSubtraction(a, b){
  var g;

  if(a == 0){
    g = b;
  }else{
    for(; b != 0; ){
      if(a > b){
        a = a - b;
      }else{
        b = b - a;
      }
    }

    g = a;
  }

  return g;
}
function IsInteger(a){
  return (a - Math.floor(a)) == 0;
}
function GreatestCommonDivisorWithCheck(a, b, gcdReference){
  var success;
  var gcd;

  if(IsInteger(a) && IsInteger(b)){
    gcd = GreatestCommonDivisor(a, b);
    gcdReference.numberValue = gcd;
    success = true;
  }else{
    success = false;
  }

  return success;
}
function LeastCommonMultiple(a, b){
  var lcm;

  if(a > 0 && b > 0){
    lcm = Math.abs(a*b)/GreatestCommonDivisor(a, b);
  }else{
    lcm = 0;
  }

  return lcm;
}
function Sign(a){
  var s;

  if(a > 0){
    s = 1;
  }else if(a < 0){
    s =  -1;
  }else{
    s = 0;
  }

  return s;
}
function Max(a, b){
  return Math.max(a, b);
}
function Min(a, b){
  return Math.min(a, b);
}
function Power(a, b){
  return a**b;
}
function Gamma(x){
  return LanczosApproximation(x);
}
function LogGamma(x){
  return Math.log(Gamma(x));
}
function LanczosApproximation(z){
  var p;
  var i, y, t, x;

  p = [];
  p.length = 8;
  p[0] = 676.5203681218851;
  p[1] =  -1259.1392167224028;
  p[2] = 771.32342877765313;
  p[3] =  -176.61502916214059;
  p[4] = 12.507343278686905;
  p[5] =  -0.13857109526572012;
  p[6] = 9.9843695780195716e-6;
  p[7] = 1.5056327351493116e-7;

  if(z < 0.5){
    y = Math.PI/(Math.sin(Math.PI*z)*LanczosApproximation(1 - z));
  }else{
    z = z - 1;
    x = 0.99999999999980993;
    for(i = 0; i < p.length; i = i + 1){
      x = x + p[i]/(z + i + 1);
    }
    t = z + p.length - 0.5;
    y = Math.sqrt(2*Math.PI)*t**(z + 0.5)*Math.exp( -t)*x;
  }

  return y;
}
function Beta(x, y){
  return Gamma(x)*Gamma(y)/Gamma(x + y);
}
function Sinh(x){
  return (Math.exp(x) - Math.exp( -x))/2;
}
function Cosh(x){
  return (Math.exp(x) + Math.exp( -x))/2;
}
function Tanh(x){
  return Sinh(x)/Cosh(x);
}
function Cot(x){
  return 1/Math.tan(x);
}
function Sec(x){
  return 1/Math.cos(x);
}
function Csc(x){
  return 1/Math.sin(x);
}
function Coth(x){
  return Cosh(x)/Sinh(x);
}
function Sech(x){
  return 1/Cosh(x);
}
function Csch(x){
  return 1/Sinh(x);
}
function Error(x){
  var y, t, tau, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10;

  if(x == 0){
    y = 0;
  }else if(x < 0){
    y =  -Error( -x);
  }else{
    c1 =  -1.26551223;
    c2 =  +1.00002368;
    c3 =  +0.37409196;
    c4 =  +0.09678418;
    c5 =  -0.18628806;
    c6 =  +0.27886807;
    c7 =  -1.13520398;
    c8 =  +1.48851587;
    c9 =  -0.82215223;
    c10 =  +0.17087277;

    t = 1/(1 + 0.5*Math.abs(x));

    tau = t*Math.exp( -(x**2) + c1 + t*(c2 + t*(c3 + t*(c4 + t*(c5 + t*(c6 + t*(c7 + t*(c8 + t*(c9 + t*c10)))))))));

    y = 1 - tau;
  }

  return y;
}
function ErrorInverse(x){
  var y, a, t;

  a = (8*(Math.PI - 3))/(3*Math.PI*(4 - Math.PI));

  t = 2/(Math.PI*a) + Math.log(1 - x**2)/2;
  y = Sign(x)*Math.sqrt(Math.sqrt(t**2 - Math.log(1 - x**2)/a) - t);

  return y;
}
function FallingFactorial(x, n){
  var k, y;

  y = 1;

  for(k = 0; k <= n - 1; k = k + 1){
    y = y*(x - k);
  }

  return y;
}
function RisingFactorial(x, n){
  var k, y;

  y = 1;

  for(k = 0; k <= n - 1; k = k + 1){
    y = y*(x + k);
  }

  return y;
}
function Hypergeometric(a, b, c, z, maxIterations, precision){
  var y;

  if(Math.abs(z) >= 0.5){
    y = (1 - z)**( -a)*HypergeometricDirect(a, c - b, c, z/(z - 1), maxIterations, precision);
  }else{
    y = HypergeometricDirect(a, b, c, z, maxIterations, precision);
  }

  return y;
}
function HypergeometricDirect(a, b, c, z, maxIterations, precision){
  var y, yp, n;
  var done;

  y = 0;
  done = false;

  for(n = 0; n < maxIterations &&  !done ; n = n + 1){
    yp = RisingFactorial(a, n)*RisingFactorial(b, n)/RisingFactorial(c, n)*z**n/Factorial(n);
    if(Math.abs(yp) < precision){
      done = true;
    }
    y = y + yp;
  }

  return y;
}
function BernouilliNumber(n){
  return AkiyamaTanigawaAlgorithm(n);
}
function AkiyamaTanigawaAlgorithm(n){
  var m, j, B;
  var A;

  A = [];
  A.length = n + 1;

  for(m = 0; m <= n; m = m + 1){
    A[m] = 1/(m + 1);
    for(j = m; j >= 1; j = j - 1){
      A[j - 1] = j*(A[j - 1] - A[j]);
    }
  }

  B = A[0];

  delete(A);

  return B;
}
function ToLowerCase(character){
  var toReturn;

  toReturn = character;
  if(character == 'A'){
    toReturn = 'a';
  }else if(character == 'B'){
    toReturn = 'b';
  }else if(character == 'C'){
    toReturn = 'c';
  }else if(character == 'D'){
    toReturn = 'd';
  }else if(character == 'E'){
    toReturn = 'e';
  }else if(character == 'F'){
    toReturn = 'f';
  }else if(character == 'G'){
    toReturn = 'g';
  }else if(character == 'H'){
    toReturn = 'h';
  }else if(character == 'I'){
    toReturn = 'i';
  }else if(character == 'J'){
    toReturn = 'j';
  }else if(character == 'K'){
    toReturn = 'k';
  }else if(character == 'L'){
    toReturn = 'l';
  }else if(character == 'M'){
    toReturn = 'm';
  }else if(character == 'N'){
    toReturn = 'n';
  }else if(character == 'O'){
    toReturn = 'o';
  }else if(character == 'P'){
    toReturn = 'p';
  }else if(character == 'Q'){
    toReturn = 'q';
  }else if(character == 'R'){
    toReturn = 'r';
  }else if(character == 'S'){
    toReturn = 's';
  }else if(character == 'T'){
    toReturn = 't';
  }else if(character == 'U'){
    toReturn = 'u';
  }else if(character == 'V'){
    toReturn = 'v';
  }else if(character == 'W'){
    toReturn = 'w';
  }else if(character == 'X'){
    toReturn = 'x';
  }else if(character == 'Y'){
    toReturn = 'y';
  }else if(character == 'Z'){
    toReturn = 'z';
  }

  return toReturn;
}
function ToUpperCase(character){
  var toReturn;

  toReturn = character;
  if(character == 'a'){
    toReturn = 'A';
  }else if(character == 'b'){
    toReturn = 'B';
  }else if(character == 'c'){
    toReturn = 'C';
  }else if(character == 'd'){
    toReturn = 'D';
  }else if(character == 'e'){
    toReturn = 'E';
  }else if(character == 'f'){
    toReturn = 'F';
  }else if(character == 'g'){
    toReturn = 'G';
  }else if(character == 'h'){
    toReturn = 'H';
  }else if(character == 'i'){
    toReturn = 'I';
  }else if(character == 'j'){
    toReturn = 'J';
  }else if(character == 'k'){
    toReturn = 'K';
  }else if(character == 'l'){
    toReturn = 'L';
  }else if(character == 'm'){
    toReturn = 'M';
  }else if(character == 'n'){
    toReturn = 'N';
  }else if(character == 'o'){
    toReturn = 'O';
  }else if(character == 'p'){
    toReturn = 'P';
  }else if(character == 'q'){
    toReturn = 'Q';
  }else if(character == 'r'){
    toReturn = 'R';
  }else if(character == 's'){
    toReturn = 'S';
  }else if(character == 't'){
    toReturn = 'T';
  }else if(character == 'u'){
    toReturn = 'U';
  }else if(character == 'v'){
    toReturn = 'V';
  }else if(character == 'w'){
    toReturn = 'W';
  }else if(character == 'x'){
    toReturn = 'X';
  }else if(character == 'y'){
    toReturn = 'Y';
  }else if(character == 'z'){
    toReturn = 'Z';
  }

  return toReturn;
}
function IsUpperCase(character){
  var isUpper;

  isUpper = true;
  if(character == 'A'){
  }else if(character == 'B'){
  }else if(character == 'C'){
  }else if(character == 'D'){
  }else if(character == 'E'){
  }else if(character == 'F'){
  }else if(character == 'G'){
  }else if(character == 'H'){
  }else if(character == 'I'){
  }else if(character == 'J'){
  }else if(character == 'K'){
  }else if(character == 'L'){
  }else if(character == 'M'){
  }else if(character == 'N'){
  }else if(character == 'O'){
  }else if(character == 'P'){
  }else if(character == 'Q'){
  }else if(character == 'R'){
  }else if(character == 'S'){
  }else if(character == 'T'){
  }else if(character == 'U'){
  }else if(character == 'V'){
  }else if(character == 'W'){
  }else if(character == 'X'){
  }else if(character == 'Y'){
  }else if(character == 'Z'){
  }else{
    isUpper = false;
  }

  return isUpper;
}
function IsLowerCase(character){
  var isLower;

  isLower = true;
  if(character == 'a'){
  }else if(character == 'b'){
  }else if(character == 'c'){
  }else if(character == 'd'){
  }else if(character == 'e'){
  }else if(character == 'f'){
  }else if(character == 'g'){
  }else if(character == 'h'){
  }else if(character == 'i'){
  }else if(character == 'j'){
  }else if(character == 'k'){
  }else if(character == 'l'){
  }else if(character == 'm'){
  }else if(character == 'n'){
  }else if(character == 'o'){
  }else if(character == 'p'){
  }else if(character == 'q'){
  }else if(character == 'r'){
  }else if(character == 's'){
  }else if(character == 't'){
  }else if(character == 'u'){
  }else if(character == 'v'){
  }else if(character == 'w'){
  }else if(character == 'x'){
  }else if(character == 'y'){
  }else if(character == 'z'){
  }else{
    isLower = false;
  }

  return isLower;
}
function IsLetter(character){
  return IsUpperCase(character) || IsLowerCase(character);
}
function IsNumber(character){
  var isNumberx;

  isNumberx = true;
  if(character == '0'){
  }else if(character == '1'){
  }else if(character == '2'){
  }else if(character == '3'){
  }else if(character == '4'){
  }else if(character == '5'){
  }else if(character == '6'){
  }else if(character == '7'){
  }else if(character == '8'){
  }else if(character == '9'){
  }else{
    isNumberx = false;
  }

  return isNumberx;
}
function IsWhiteSpace(character){
  var isWhiteSpacex;

  isWhiteSpacex = true;
  if(character == ' '){
  }else if(character == '\t'){
  }else if(character == '\n'){
  }else if(character == '\r'){
  }else{
    isWhiteSpacex = false;
  }

  return isWhiteSpacex;
}
function IsSymbol(character){
  var isSymbolx;

  isSymbolx = true;
  if(character == '!'){
  }else if(character == '\"'){
  }else if(character == '#'){
  }else if(character == '$'){
  }else if(character == '%'){
  }else if(character == '&'){
  }else if(character == '\''){
  }else if(character == '('){
  }else if(character == ')'){
  }else if(character == '*'){
  }else if(character == '+'){
  }else if(character == ','){
  }else if(character == '-'){
  }else if(character == '.'){
  }else if(character == '/'){
  }else if(character == ':'){
  }else if(character == ';'){
  }else if(character == '<'){
  }else if(character == '='){
  }else if(character == '>'){
  }else if(character == '?'){
  }else if(character == '@'){
  }else if(character == '['){
  }else if(character == '\\'){
  }else if(character == ']'){
  }else if(character == '^'){
  }else if(character == '_'){
  }else if(character == '`'){
  }else if(character == '{'){
  }else if(character == '|'){
  }else if(character == '}'){
  }else if(character == '~'){
  }else{
    isSymbolx = false;
  }

  return isSymbolx;
}
function CharacterIsBefore(a, b){
  var ad, bd;

  ad = a.charCodeAt(0);
  bd = b.charCodeAt(0);

  return ad < bd;
}
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
function CharacterToDecimalDigit(c){
  var digit;

  if(c == '1'){
    digit = 1;
  }else if(c == '2'){
    digit = 2;
  }else if(c == '3'){
    digit = 3;
  }else if(c == '4'){
    digit = 4;
  }else if(c == '5'){
    digit = 5;
  }else if(c == '6'){
    digit = 6;
  }else if(c == '7'){
    digit = 7;
  }else if(c == '8'){
    digit = 8;
  }else if(c == '9'){
    digit = 9;
  }else{
    digit = 0;
  }

  return digit;
}
function AssertFalse(b, failures){
  if(b){
    failures.numberValue = failures.numberValue + 1;
  }
}
function AssertTrue(b, failures){
  if( !b ){
    failures.numberValue = failures.numberValue + 1;
  }
}
function AssertEquals(a, b, failures){
  if(a != b){
    failures.numberValue = failures.numberValue + 1;
  }
}
function AssertBooleansEqual(a, b, failures){
  if(a != b){
    failures.numberValue = failures.numberValue + 1;
  }
}
function AssertCharactersEqual(a, b, failures){
  if(a != b){
    failures.numberValue = failures.numberValue + 1;
  }
}
function AssertStringEquals(a, b, failures){
  if( !StringsEqual(a, b) ){
    failures.numberValue = failures.numberValue + 1;
  }
}
function AssertNumberArraysEqual(a, b, failures){
  var i;

  if(a.length == b.length){
    for(i = 0; i < a.length; i = i + 1){
      AssertEquals(a[i], b[i], failures);
    }
  }else{
    failures.numberValue = failures.numberValue + 1;
  }
}
function AssertBooleanArraysEqual(a, b, failures){
  var i;

  if(a.length == b.length){
    for(i = 0; i < a.length; i = i + 1){
      AssertBooleansEqual(a[i], b[i], failures);
    }
  }else{
    failures.numberValue = failures.numberValue + 1;
  }
}
function AssertStringArraysEqual(a, b, failures){
  var i;

  if(a.length == b.length){
    for(i = 0; i < a.length; i = i + 1){
      AssertStringEquals(a[i].string, b[i].string, failures);
    }
  }else{
    failures.numberValue = failures.numberValue + 1;
  }
}
function StringToNumberArray(string){
  var i;
  var array;

  array = [];
  array.length = string.length;

  for(i = 0; i < string.length; i = i + 1){
    array[i] = string[i].charCodeAt(0);
  }
  return array;
}
function NumberArrayToString(array){
  var i;
  var string;

  string = [];
  string.length = array.length;

  for(i = 0; i < array.length; i = i + 1){
    string[i] = String.fromCharCode(array[i]);
  }
  return string;
}
function NumberArraysEqual(a, b){
  var equal;
  var i;

  equal = true;
  if(a.length == b.length){
    for(i = 0; i < a.length && equal; i = i + 1){
      if(a[i] != b[i]){
        equal = false;
      }
    }
  }else{
    equal = false;
  }

  return equal;
}
function BooleanArraysEqual(a, b){
  var equal;
  var i;

  equal = true;
  if(a.length == b.length){
    for(i = 0; i < a.length && equal; i = i + 1){
      if(a[i] != b[i]){
        equal = false;
      }
    }
  }else{
    equal = false;
  }

  return equal;
}
function StringsEqual(a, b){
  var equal;
  var i;

  equal = true;
  if(a.length == b.length){
    for(i = 0; i < a.length && equal; i = i + 1){
      if(a[i] != b[i]){
        equal = false;
      }
    }
  }else{
    equal = false;
  }

  return equal;
}
function FillNumberArray(a, value){
  var i;

  for(i = 0; i < a.length; i = i + 1){
    a[i] = value;
  }
}
function FillString(a, value){
  var i;

  for(i = 0; i < a.length; i = i + 1){
    a[i] = value;
  }
}
function FillBooleanArray(a, value){
  var i;

  for(i = 0; i < a.length; i = i + 1){
    a[i] = value;
  }
}
function FillNumberArrayRange(a, value, from, to){
  var i, lengthx;
  var success;

  if(from >= 0 && from <= a.length && to >= 0 && to <= a.length && from <= to){
    lengthx = to - from;
    for(i = 0; i < lengthx; i = i + 1){
      a[from + i] = value;
    }

    success = true;
  }else{
    success = false;
  }

  return success;
}
function FillBooleanArrayRange(a, value, from, to){
  var i, lengthx;
  var success;

  if(from >= 0 && from <= a.length && to >= 0 && to <= a.length && from <= to){
    lengthx = to - from;
    for(i = 0; i < lengthx; i = i + 1){
      a[from + i] = value;
    }

    success = true;
  }else{
    success = false;
  }

  return success;
}
function FillStringRange(a, value, from, to){
  var i, lengthx;
  var success;

  if(from >= 0 && from <= a.length && to >= 0 && to <= a.length && from <= to){
    lengthx = to - from;
    for(i = 0; i < lengthx; i = i + 1){
      a[from + i] = value;
    }

    success = true;
  }else{
    success = false;
  }

  return success;
}
function CopyNumberArray(a){
  var i;
  var n;

  n = [];
  n.length = a.length;

  for(i = 0; i < a.length; i = i + 1){
    n[i] = a[i];
  }

  return n;
}
function CopyBooleanArray(a){
  var i;
  var n;

  n = [];
  n.length = a.length;

  for(i = 0; i < a.length; i = i + 1){
    n[i] = a[i];
  }

  return n;
}
function CopyString(a){
  var i;
  var n;

  n = [];
  n.length = a.length;

  for(i = 0; i < a.length; i = i + 1){
    n[i] = a[i];
  }

  return n;
}
function CopyNumberArrayRange(a, from, to, copyReference){
  var i, lengthx;
  var n;
  var success;

  if(from >= 0 && from <= a.length && to >= 0 && to <= a.length && from <= to){
    lengthx = to - from;
    n = [];
    n.length = lengthx;

    for(i = 0; i < lengthx; i = i + 1){
      n[i] = a[from + i];
    }

    copyReference.numberArray = n;
    success = true;
  }else{
    success = false;
  }

  return success;
}
function CopyBooleanArrayRange(a, from, to, copyReference){
  var i, lengthx;
  var n;
  var success;

  if(from >= 0 && from <= a.length && to >= 0 && to <= a.length && from <= to){
    lengthx = to - from;
    n = [];
    n.length = lengthx;

    for(i = 0; i < lengthx; i = i + 1){
      n[i] = a[from + i];
    }

    copyReference.booleanArray = n;
    success = true;
  }else{
    success = false;
  }

  return success;
}
function CopyStringRange(a, from, to, copyReference){
  var i, lengthx;
  var n;
  var success;

  if(from >= 0 && from <= a.length && to >= 0 && to <= a.length && from <= to){
    lengthx = to - from;
    n = [];
    n.length = lengthx;

    for(i = 0; i < lengthx; i = i + 1){
      n[i] = a[from + i];
    }

    copyReference.string = n;
    success = true;
  }else{
    success = false;
  }

  return success;
}
function IsLastElement(lengthx, index){
  return index + 1 == lengthx;
}
function CreateNumberArray(lengthx, value){
  var array;

  array = [];
  array.length = lengthx;
  FillNumberArray(array, value);

  return array;
}
function CreateBooleanArray(lengthx, value){
  var array;

  array = [];
  array.length = lengthx;
  FillBooleanArray(array, value);

  return array;
}
function CreateString(lengthx, value){
  var array;

  array = [];
  array.length = lengthx;
  FillString(array, value);

  return array;
}
function SwapElementsOfNumberArray(A, ai, bi){
  var tmp;

  tmp = A[ai];
  A[ai] = A[bi];
  A[bi] = tmp;
}
function SwapElementsOfStringArray(A, ai, bi){
  var tmp;

  tmp = A.stringArray[ai];
  A.stringArray[ai] = A.stringArray[bi];
  A.stringArray[bi] = tmp;
}
function ReverseNumberArray(array){
  var i;

  for(i = 0; i < array.length/2; i = i + 1){
    SwapElementsOfNumberArray(array, i, array.length - i - 1);
  }
}

