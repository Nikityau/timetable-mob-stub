import {IDateAction} from "./interface/date.interface";

import {DateActions} from "./date-set.actions";

import {Dates} from "../../../utils/namespaces/dates";

export function dateInit(): IDateAction {
    return {
        type: DateActions.INIT
    }
}

export function dateNow(): IDateAction {
    return {
        type: DateActions.NOW
    }
}

export function dateCurrent(payload: Dates.DateObj): IDateAction {
    return {
        type: DateActions.SET_CURRENT,
        payload
    }
}

export function dateCurrentByNow(): IDateAction {
    return {
        type: DateActions.SET_CURRENT_ACCORDING_NOW
    }
}
