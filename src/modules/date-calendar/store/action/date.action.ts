import { Action } from 'redux'

export enum DateActionTypes {
    SET_DATE_CURRENT = 'date/setDateCurrent',
    SET_DATE_CURRENT_EQ_NOW = 'date/setDateCurrentEqNow',
    SET_DATE_NEXT = 'date/next',
    SET_DATE_PREV = 'date/prev',
}

export interface DateAction extends Action {
    type: DateActionTypes,
    payload: Date
}

export function changeCurrentDate(date: Date):DateAction {
    return {
        type: DateActionTypes.SET_DATE_CURRENT,
        payload: date
    }
}
export function changeCurrentDateEqNow():DateAction {
    return {
        type: DateActionTypes.SET_DATE_CURRENT_EQ_NOW,
        payload: null
    }
}
export function nextDay(): DateAction {
    return {
        type: DateActionTypes.SET_DATE_NEXT,
        payload: null
    }
}
export function prevDay(): DateAction {
    return {
        type: DateActionTypes.SET_DATE_PREV,
        payload: null
    }
}