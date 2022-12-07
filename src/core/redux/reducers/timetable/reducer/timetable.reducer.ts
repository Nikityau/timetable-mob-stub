import produce from "immer";

import {ITimetableAction} from "../interface/timetable.action";

import {timetableData} from '../data/timetable'

import {parseLessons} from '../utils/parse'

export class TimetableReducer {
    init(state, action: ITimetableAction) {
        return produce(state, draft => {
            draft.original = timetableData
        })
    }

    setTimetable(state, action: ITimetableAction) {
        return produce(state, draft => {


        })
    }

    setParsedTimetable(state, action: ITimetableAction) {
        return produce(state,  draft => {
            const lessons = draft.original.lessons
            const parsed = parseLessons(lessons)
            draft.parsed = parsed
        })
    }
}