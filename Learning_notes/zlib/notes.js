
//  get ms
// var
// a = new Date(),
// b = a.getFullYear(),
// c = a.getMonth(),
// d = a.getDate(),
// e = a.getHours()*60,
// f = a.getMinutes(),
// g = a.getMilliseconds()/60,
// h = (e+f+g)*1000,
// i = h - 390000,
// j = 
// const a = new Date();
// const aa = a.getFullYear() + '-' + (a.getMonth()+1) + '-' + a.getDate();
// const utc = Date.parse(aa);
// const local = Date.parse(a.toDateString());
// const raw_offset = (local - utc);
// const ro = -390*60*1000;
// const loc = utc+ro;
// const lt = new Date(loc).toLocaleString()


// console.log(loc)
// console.log(ro)
// console.log(lt)
// -------------------------------------------------------------------------------------------------------------------
// const offset = -390; // Time zone offset in minutes
// const currentTimestamp = Date.now(); // Get the current timestamp in UTC
// const utcTimestamp = currentTimestamp - offset * 60 * 1000; // Adjust the timestamp with the offset

// const utcDate = new Date(utcTimestamp);
// const utcDateString = utcDate.toUTCString();
// const a = utcDateString.split(' ')[4];
// console.log(new Date().getTimezoneOffset());

// -----------------------------------------------------------------------------------------------