import ReduxTimeTableAction from "../action/timetable.action";

import {ITimetableSlice, ITimetableInput} from "./timetable.slice";

export interface ITimetableAction {
    type: ReduxTimeTableAction.TimeTableAction
    payload: {
        timetable?: ITimetableInput
    }
}