import {Action} from "redux";

import {ScheduleInput} from "../interface/schedule";

export enum ScheduleActionTypes {
    SET_SCHEDULE = "schedule/set",
    PARSE_SCHEDULE = "schedule/parse",
    DELETE_SCHEDULE = "schedule/delete"
}


export interface ScheduleAction extends Action {
    type: ScheduleActionTypes,
    payload: ScheduleInput
}

export const setSchedule = (schedule: ScheduleInput): ScheduleAction => {
    return {
        type: ScheduleActionTypes.SET_SCHEDULE,
        payload: schedule
    }
}

export const parseSchedule = (): ScheduleAction => {
    return {
        type: ScheduleActionTypes.PARSE_SCHEDULE,
        payload: null
    }
}

export const deleteSchedule = (): ScheduleAction => {
    return {
        type: ScheduleActionTypes.DELETE_SCHEDULE,
        payload: null
    }
}
