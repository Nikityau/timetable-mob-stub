import ReduxTimeTableAction from "../timetable.actions";

export interface ITimetableAction {
    type: ReduxTimeTableAction.TimeTableAction
    payload: any
}