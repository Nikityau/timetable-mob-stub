import { Action } from 'redux'

export enum DateActionTypes {
    SET_DATE_CURRENT = 'date/setDateCurrent'
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