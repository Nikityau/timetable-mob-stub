import {eachDayOfInterval} from "date-fns";

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
        full: string
    }

    export function castToWeekdayShort(weekday: Day | WeekdayShort | string):WeekdayShort {
        return weekday as WeekdayShort
    }

    function createDate(year: number, month: number, date: number): Date {
        return new Date(year, month, date)
    }

    export function getDateNow():DateObj {
        const date = new Date(Date.now())

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
            full: fullYear
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
        const dates = eachDayOfInterval({
            start: new Date(year, month, 1),
            end: new Date(year, month, days)
        })

        return dates
    }
    export function getDatesOfWeek(year: number, month:number, date: number):Date[] {
        const tempDate = createDate(year, month, date)
        const day = tempDate.getDay()

        return eachDayOfInterval({
            start: new Date(year, month, date - day + 1),
            end: new Date(year, month, date + (7 - day))
        })
    }
    export function getDatesOfPrevWeek(year: number, month: number, date: number):Date[] {
        const tempDate = createDate(year, month, date)
        const day = tempDate.getDay()
        const mondayCurrent = date - day + 1
        const mondayPrev = mondayCurrent - 7

        return eachDayOfInterval({
            start: new Date(year, month, mondayPrev),
            end: new Date(year, month, mondayPrev + 6),
        })
    }
    export function getDatesOfNextWeek(year: number, month: number, date: number):Date[] {
        const tempDate = createDate(year, month, date)
        const day = tempDate.getDay()
        const mondayCurrent = date - day + 1
        const mondayNext = mondayCurrent + 7

        return eachDayOfInterval({
            start: new Date(year, month, mondayNext),
            end: new Date(year, month, mondayNext + 6),
        })
    }

    export function isWeekend(day: Day | WeekdayShort | number):boolean {
        if(day == 'сб' || day == 'вс') return true
        if(day == 6 || day == 0) return true

        return false;
    }
}

export default Dates