/*
Calculate the Julian Day Number of any date given on the Gregorian Calendar.
y = year, m = month number (Jan = 1, Feb = 2, etc.), d = the day in the month.
*/
type G2j = {
    year: number;
    month: number;
    day: number;
}

export const gregoToJulian = ({year, month, day}: G2j) =>{
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
};
/*
Gregorian to Julian Day Number
*/
export function julianToGrego(jdn : number) {
  const datetime = jdn + 0.5;
  const day = Math.floor(datetime);
  const time = (datetime - day) * 24 * 60 * 60;

  const a = day + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);

  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);

  const dayOfMonth = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);

  const hour = Math.floor(time / 3600);
  const minute = Math.floor((time % 3600) / 60);
  const second = Math.floor(time % 60);

  return {
    year: year,
    month: month,
    day: dayOfMonth,
    hour: hour,
    minute: minute,
    second: second
  };
}



