import data from '../json/raw-time-zones.json'assert { type: 'json' } ;
const dayOfYear = (date: any)=> {
    return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
};

export default function worldTime(timeZoneName : string){
    const dataTofind: any = data.find(item => item.group.includes(timeZoneName) && item.name === timeZoneName);//
    const rawOffset = - (dataTofind.rawOffsetInMinutes); // Time zone offset in minutes
    const rawOffsetInMinutes = dataTofind.rawOffsetInMinutes;
    const rawOffsetInSeconds = - (rawOffset * 60 * 1000);// raw offset in seconds
    const timestampInUtc = Date.now(); // Get the current timestamp in UTC
    const timestampLocal = timestampInUtc - rawOffset * 60 * 1000; // Adjust the timestamp with the offset
    const localDateTime = new Date(timestampLocal);// ******
    const dayNumberOfYear = dayOfYear(localDateTime); // day number of year
    const weekOfYear = Math.round(dayNumberOfYear/7); // week of year
    const utcOffsetString = dataTofind.rawFormat.split(' ')[0];// utc offset string
    const localDateTimeString = localDateTime.toUTCString().split(' ').slice(0,-1).join(' ') + ' ' + dataTofind.alternativeName;//
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
    }

}


