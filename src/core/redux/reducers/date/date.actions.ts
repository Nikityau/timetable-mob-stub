import {IDateAction, IDatePayload} from "./interface/date.interface";

export enum DateActions {
    INIT = 'date/init',
    NOW = 'date/now',
    SET_NOW = 'date/setNow',
    SET_CURRENT = 'date/setCurrent'
}

export function dateInit():IDateAction {
    return  {
        type: DateActions.INIT
    }
}
export function dateNow():IDateAction {
    return {
        type: DateActions.NOW
    }
}
export function dateCurrent(payload:IDatePayload):IDateAction {
    return {
        type: DateActions.SET_CURRENT,
        payload
    }
}
