import {Action} from "redux";

import {timetableData} from "./timetable";

const timetableState: any | null = timetableData

export const timetable = (state = timetableState, action: Action) => {
    switch (action.type) {
        default:
            return state
    }
}