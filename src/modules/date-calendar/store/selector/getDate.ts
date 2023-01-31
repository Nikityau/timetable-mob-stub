import Dates from "../../../../helpers/date/date";

import {DateState} from "../reducer/date.reducer";

export const getDateCurrent = (state: any):Dates.DateObj => {
    return (state['date'] as DateState).current
}
export const getDateNow = (state: any):Dates.DateObj => {
    return (state['date'] as DateState).now
}