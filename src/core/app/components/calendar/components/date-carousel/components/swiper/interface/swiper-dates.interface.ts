export interface ISwiperDates {
    weeksDates: Array<Array<Date>>,
    dateSpec: 'prev' | 'current' | 'next'
    currentDate: {
        date: number,
        month: number,
        year: number
    },
    changeDates: (y: number, m: number, d: number, spec: 'prev' | 'current' | 'next', activeIndexPrev: number | 'undef', direction: 'left' | 'right') => void,
}