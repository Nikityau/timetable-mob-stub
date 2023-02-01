import Dates from "../../../../helpers/date/date";

import {DateState} from "../reducer/date.reducer";

export function checkDate(date: Date) {
    return (state: any): boolean => {
        const current = (state['date'] as DateState).current;

        return Dates.isDatesCompare(date, new Date(current.timestamp))
    }
}