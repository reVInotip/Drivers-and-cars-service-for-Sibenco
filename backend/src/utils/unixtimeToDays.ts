import TodayDateInDays from "./todayDate";

function GetCurrentYearInUnixtime() : number {
    let date = new Date();
    date.setDate(1);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return Math.round(date.getTime()/1000.0)
}

export default function UnixtimeToDays(endDate: number, beginDate?: number | undefined) {
    const secondsInDay: number = 86400;
    const secondSinceBeginOfThisYear: number = GetCurrentYearInUnixtime();
    let timeBegin: number;
    if (beginDate === undefined) {
        timeBegin = TodayDateInDays();
    } else {
        beginDate -= secondSinceBeginOfThisYear;
        if (beginDate < 0) {
            throw Error("Incorrect time begin");
        }
        timeBegin = Math.ceil(beginDate / secondsInDay);
    }
    endDate -= secondSinceBeginOfThisYear;
    if (endDate < 0) {
        throw Error("Incorrect time end");
    }
    const timeEnd: number = Math.ceil(endDate / secondsInDay);

    return {begin: timeBegin, end: timeEnd}
}