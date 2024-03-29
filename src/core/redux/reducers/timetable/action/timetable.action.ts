import {ITimetableAction} from "../interface/timetable.action";
import timetableAction from "./timetable.action";
import {ITimetableSlice} from "../interface/timetable.slice";

namespace ReduxTimeTableAction {
    export enum TimeTableAction {
        INIT = "timetable/init",
        SET_TIMETABLE = "timetable/setTimetable",
        SET_PARSED_TIMETABLE = "timetable/setParsedTimeTable"
    }

    export function init(): ITimetableAction {
        return {
            type: TimeTableAction.INIT,
            payload: null
        }
    }

    export function setTimetable(timetable:ITimetableSlice): ITimetableAction {
        return {
            type: TimeTableAction.SET_TIMETABLE,
            payload: {
                timetable
            }
        }
    }

    export function setParsedTimetable(): ITimetableAction {
        return {
            type: TimeTableAction.SET_PARSED_TIMETABLE,
            payload: null
        }
    }

}

export default ReduxTimeTableAction