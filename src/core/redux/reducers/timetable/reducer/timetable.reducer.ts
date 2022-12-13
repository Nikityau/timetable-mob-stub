import produce from "immer";

import {ITimetableAction} from "../interface/timetable.action";

import {timetableData, timetableData_2} from '../data/timetable'

import {parseLessons} from '../utils/parse'

export class TimetableReducer {
    init(state, action: ITimetableAction) {
        return produce(state, draft => {
            draft.original = timetableData
        })
    }

    setTimetable(state, action: ITimetableAction) {
        return produce(state, draft => {
            draft.original = action.payload.timetable
        })
    }

    setParsedTimetable(state, action: ITimetableAction) {
        return produce(state,  draft => {
            const lessons = draft.original.lessons
            if(lessons.length == 0) {
                draft.parsed = {
                    above_week: [],
                    below_week: []
                }
            } else {
                const parsed = parseLessons(lessons)
                draft.parsed = parsed
            }
        })
    }
}