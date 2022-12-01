import Dates from "../../../../../../../../utils/namespaces/dates";

export interface IDateCard {
    weekday: Dates.WeekdayShort,
    date: string | number,
    isCurrent?: boolean,
    isWeekend?: boolean,
    fullDate: Date
}