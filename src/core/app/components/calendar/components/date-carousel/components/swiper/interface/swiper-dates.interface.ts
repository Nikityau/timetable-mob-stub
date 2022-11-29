export interface ISwiperDates {
    weeksDates: Array<Array<Date>>,
    dateSpec: 'prev' | 'current' | 'next'
    activeIndex: 'undef' | number
    currentDate: any,
    changeDates: (y: number, m: number, d: number, spec: 'prev' | 'current' | 'next', activeIndexPrev: number | 'undef') => void,
}