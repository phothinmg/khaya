
const SG = 2361222; //2361222 - Gregorian start in British calendar (1752/Sep/14)
export function G2J (year: number, month: number, day: number){
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

export function J2G(jdn: number) {
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
  return {year: year,month: month,day: dayOfMonth,hour: hour,minute: minute,second: second };
}