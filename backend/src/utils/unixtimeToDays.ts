import TodayDateInDays from "./todayDateInDays";

export default function UnixtimeToDays(beginDate: number, endDate: number) {
    const secondsInDay: number = 86400;
    let timeBegin: number;
    if (beginDate) {
        timeBegin = Math.ceil(beginDate / secondsInDay);
    } else {
        timeBegin = TodayDateInDays();
    }
    const timeEnd: number = Math.ceil(endDate / secondsInDay);

    return {begin: timeBegin, end: timeEnd}
}