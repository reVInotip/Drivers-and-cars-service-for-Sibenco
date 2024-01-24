export default function TodayDateInDays(): number {
    const date = new Date();
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    
    let sumDays = 0;
    for (let i: number = 1; i < month; ++i) {
        sumDays += 28 + ((0x3bbeecc >> (month * 2)) & 3);
    }

    if ((month > 2) && ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))) {
        ++sumDays;
    }

    const todayDateInDays = date.getDate() + sumDays;
    return todayDateInDays;
}