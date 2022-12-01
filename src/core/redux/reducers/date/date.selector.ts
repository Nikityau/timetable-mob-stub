import Dates from "../../../utils/namespaces/dates";
import {DateState} from "./interface/date-state.interface";


namespace ReduxDateSelector {
    export const getDateNow = (state): Dates.DateObj => {
        return state['date']['now']
    }
    export const getDateCurrent = (state): Dates.DateObj => {
        return state['date']['current']
    }
    export const getDate = (state): DateState => {
        return state['date']
    }
}

export default ReduxDateSelector