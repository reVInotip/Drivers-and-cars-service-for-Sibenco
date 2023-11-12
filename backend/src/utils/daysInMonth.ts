export default function DaysInMonth(year: number, month: number): number {
    const date1 = new Date(year, month, 1);
    const date2 = new Date(year, month + 1, 1);
    return Math.round((date2.getTime() - date1.getTime()) / 1000 / 3600 / 24);
}