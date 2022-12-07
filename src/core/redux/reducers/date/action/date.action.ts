import {IDateAction} from "../interface/date.interface";

import Dates from "../../../../utils/namespaces/dates";

namespace ReduxDateAction {
    export enum DateAction {
        INIT = 'date/init',
        NOW = 'date/now',
        SET_NOW = 'date/setNow',
        SET_CURRENT = 'date/setCurrent',
        SET_CURRENT_ACCORDING_NOW = 'date/setCurrentAccordingNow'
    }

    export function init(): IDateAction {
        return {
            type: DateAction.INIT
        }
    }

    export function dateNow(): IDateAction {
        return {
            type: DateAction.NOW
        }
    }

    export function dateCurrent(payload: Dates.DateObj): IDateAction {
        return {
            type: DateAction.SET_CURRENT,
            payload
        }
    }

    export function dateCurrentByNow(): IDateAction {
        return {
            type: DateAction.SET_CURRENT_ACCORDING_NOW
        }
    }
}

export default ReduxDateAction

