import ReduxTimeTableAction from "../timetable.action";

export interface ITimetableAction {
    type: ReduxTimeTableAction.TimeTableAction
    payload: any
}