import {IDatePayload} from "./interface/date.interface";

export const getDateNow = (state):IDatePayload => {
    return state['date']['now']
}
export const getDateCurrent = (state):IDatePayload => {
    return state['date']['current']
}
export const getDate = (state): { now: IDatePayload, current: IDatePayload } => {
    return state['date']
}