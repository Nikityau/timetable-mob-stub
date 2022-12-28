import {differenceInDays, differenceInWeeks, eachDayOfInterval} from "date-fns";

namespace Dates {
    export type WeekdayShort = 'вс' | 'сб' | 'пн' | 'вт' | 'ср' | 'чт' | 'пт'
    export type MonthFull = 'Январь' | 'Февраль' | 'Март' | 'Апрель' | 'Май' | 'Июнь' | 'Июль' | 'Август' | 'Сентябрь' | 'Октябрь' | 'Ноябрь' | 'Декабрь'

    export enum Day {
        'вс',
        'пн',
        'вт',
        'ср',
        'чт',
        'пт',
        'сб',
    }
    export enum Month {
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    }

    export interface DateObj {
        weekday: string,
        date: number,
        month: string,
        year: number,
        full: string,
        dateString: string
    }

    export function castToWeekdayShort(weekday: Day | WeekdayShort | string):WeekdayShort {
        return weekday as WeekdayShort
    }

    function createDate(year: number, month: number, date: number): Date {
        return new Date(year, month, date)
    }

    export function getDateNow():DateObj {
        return getDateObj(new Date(Date.now()))
    }
    export function getDateObj(date:Date):DateObj {
        const dateNum = date.getDate()
        const weekday = Dates.Day[date.getDay()]
        const month = Dates.Month[date.getMonth()]
        const year = date.getFullYear()
        const fullYear = `${dateNum}:${weekday}:${month}:${year}`

        return {
            date: dateNum,
            weekday,
            month,
            year,
            full: fullYear,
            dateString: date.toDateString()
        }
    }
    export function getDaysInMonth(year:number, month:number):number {
        return createDate(year, month, 0).getDate()
    }
    export function getMonthNum(month: string | MonthFull): number {
        if(month in Month)
            return Month[month]
        return Month[getDateNow().month]
    }
    export function getDatesOfMonth(year:number, month: number):Date[] {
        const days = getDaysInMonth(year, month + 1)
        return eachDayOfInterval({
            start: new Date(year, month, 1),
            end: new Date(year, month, days)
        })
    }
    export function getDatesOfWeek(year: number, month:number, date: number):Date[] {
        const tempDate = createDate(year, month, date)
        let day = tempDate.getDay()

        if(day == 0) {
            day = 7
        }

        return eachDayOfInterval({
            start: new Date(year, month, date - day + 1),
            end: new Date(year, month, date + (7 - day))
        })
    }
    export function getDatesOfPrevWeek(year: number, month: number, date: number):Date[] {
        const tempDate = createDate(year, month, date)
        let day = tempDate.getDay()

        if(day == 0) {
            day = 7
        }

        const mondayCurrent = date - day + 1
        const mondayPrev = mondayCurrent - 7

        return eachDayOfInterval({
            start: new Date(year, month, mondayPrev),
            end: new Date(year, month, mondayPrev + 6),
        })
    }
    export function getDatesOfNextWeek(year: number, month: number, date: number):Date[] {
        const tempDate = createDate(year, month, date)
        let day = tempDate.getDay()

        if(day == 0) {
            day = 7
        }

        const mondayCurrent = date - day + 1
        const mondayNext = mondayCurrent + 7

        return eachDayOfInterval({
            start: new Date(year, month, mondayNext),
            end: new Date(year, month, mondayNext + 6),
        })
    }
    export function getFirstDayInWeek(date: Date) {
        let day = date.getDay()

        const mondayCurrent = 7 - day
        console.log(day)

        return new Date(date.getFullYear(), date.getMonth(), mondayCurrent)
    }


    export function isWeekend(day: Day | WeekdayShort | number):boolean {
        if(day == 'сб' || day == 'вс') return true
        if(day == 6 || day == 0) return true

        return false;
    }

    export function isDatesCompare(fDate:Date, sDate: Date):boolean {
        if(fDate.getDate() != sDate.getDate()) return false
        if(fDate.getMonth() != sDate.getMonth()) return false
        if(fDate.getFullYear() != sDate.getFullYear()) return false

        return true
    }

    export function isDateBelongs(date: Date, array: Date[]): boolean {
        for(let i = 0; i < array.length; ++i) {
            if(
                isDatesCompare(
                    date,
                    array[i]
                )
            ) return true
        }

        return false
    }

    export function getWeekType(date: Date = new Date(Date.now())): 1 | -1 {
        const dateNow = new Date(Date.now())
        const zeroDay = new Date(dateNow.getFullYear(), 8, 1)

        let difference = Math.abs(differenceInDays(
            zeroDay,
            date,
        ))
        const roundedWeekDifference = Math.round(difference / 7)

        if(roundedWeekDifference % 2 == 0) return 1

        return -1
    }
}

export default Dates