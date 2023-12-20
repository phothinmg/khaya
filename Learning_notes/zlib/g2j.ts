/*
Calculate the Julian Day Number of any date given on the Gregorian Calendar.
y = year, m = month number (Jan = 1, Feb = 2, etc.), d = the day in the month.
*/
type G2j = {
    year: number;
    month: number;
    day: number;
}

const g2j = ({year, month, day}: G2j) =>{
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
  
    const JDN = day +
      Math.floor((153 * m + 2) / 5) +
      365 * y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) -
      32045;
  
    return JDN;
}