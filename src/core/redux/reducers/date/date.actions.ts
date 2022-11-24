import {Action} from "redux";

export enum DateActions {
    NOW = 'date/now',
    SET_NOW = 'date/setNow',
    SET_CURRENT = 'date/setCurrent'
}

export function dateNow():Action {
    return {
        type: DateActions.NOW
    }
}