export interface ISwiperDates {
    weeksDates: Array<Array<Date>>,
    dateSpec: 'prev' | 'current' | 'next'
    currentDate: any,
    changeDates: (y: number, m: number, d: number, spec: 'prev' | 'current' | 'next') => void,
}