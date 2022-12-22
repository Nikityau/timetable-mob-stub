import ReduxTimeTableAction from "../action/timetable.action";

import {ITimetableSlice} from "./timetable.slice";

export interface ITimetableAction {
    type: ReduxTimeTableAction.TimeTableAction
    payload: {
        timetable?:ITimetableSlice
    }
}