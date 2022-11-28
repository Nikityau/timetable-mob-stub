import {WeeksDate} from "../../../date-carousel";

export interface ISwiperDates {
    dates: Date[],
    weeks: WeeksDate
    weeksDates: Array<Array<Date>>
    currentDate: any,
    changeDates: (y: number, m: number, d: number) => void
}