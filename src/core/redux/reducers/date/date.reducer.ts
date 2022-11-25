import produce from "immer";

import {IDateAction, IDatePayload} from "./interface/date.interface";

export type WeekdayShort = 'вс' | 'сб' | 'пн' | 'вт' | 'ср' | 'чт' | 'пт'

export enum DayByNum {
    'вс',
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб',
}

export enum MonthByNum {
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

function getDateNow(): IDatePayload {
    const date = new Date(Date.now())

    const dateNum = date.getDate()
    const weekday = DayByNum[date.getDay()]
    const month = MonthByNum[date.getMonth()]
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

export class DateReducer {
    init(state, action: IDateAction) {
        return produce(state, draft => {
            const date = getDateNow()

            draft.now = date
            draft.current = date
        })
    }

    now(state, action: IDateAction) {
        return produce(state, draft => {
            draft.now = getDateNow()
        })
    }

    setNow(state, action: IDateAction) {
        return produce(state, draft => {
            draft.now = action.payload
        })
    }

    setCurrent(state, action: IDateAction) {
        return produce(state, draft => {
            draft.current = action.payload
        })
    }
    setCurrentAccordingNow(state, action:IDateAction) {
        return produce(state, draft => {
            draft.current = draft.now
        })
    }
}