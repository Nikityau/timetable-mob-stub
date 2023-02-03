import {Action} from "redux";

export enum RingsActionTypes {
    OPEN_RING_SCHEDULE = 'rings/open',
    CLOSE_RING_SCHEDULE = 'rings/close',
}

export interface RingsAction extends Action {
    type: RingsActionTypes,
    payload: null
}

export const closeRingsSchedule = (): RingsAction => {
    return {
        type: RingsActionTypes.CLOSE_RING_SCHEDULE,
        payload: null
    }
}
export const openRingsSchedule = (): RingsAction => {
    return {
        type: RingsActionTypes.OPEN_RING_SCHEDULE,
        payload: null
    }
}