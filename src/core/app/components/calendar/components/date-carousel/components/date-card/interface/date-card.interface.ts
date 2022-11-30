import Dates from "../../../../../../../../utils/namespaces/dates";

export interface IDateCard {
    weekday: Dates.WeekdayShort,
    day: string | number,
    isCurrent?: boolean,
    isWeekend?: boolean,
    onClickHandler?: (date: Date) => void,
    fullDate: Date
}