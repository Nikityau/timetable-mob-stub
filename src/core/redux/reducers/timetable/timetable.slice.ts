import ReduxTimeTableAction from "./action/timetable.action";

import {TimetableReducer} from "./reducer/timetable.reducer";

import {ITimetableAction} from "./interface/timetable.action";

const timetableState: any | null = {
    original: null,
    parsed: {
        above_week: [],
        below_week: []
    }

}

const timetableReducer = new TimetableReducer()

export const timetable = (state = timetableState, action: ITimetableAction) => {
    switch (action.type) {
        case ReduxTimeTableAction.TimeTableAction.INIT:
            return timetableReducer.init(state, action)
        case ReduxTimeTableAction.TimeTableAction.SET_TIMETABLE:
            return timetableReducer.setTimetable(state, action)
        case ReduxTimeTableAction.TimeTableAction.SET_PARSED_TIMETABLE:
            return timetableReducer.setParsedTimetable(state, action)
        default:
            return state
    }
}