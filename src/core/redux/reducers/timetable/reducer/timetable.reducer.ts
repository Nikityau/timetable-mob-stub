import produce from "immer";

import {ITimetableAction} from "../interface/timetable.action";
import {ITimetableSlice} from "../interface/timetable.slice";

import {timetableData, timetableData_2, timetableData_3, timetableData_4} from '../data/timetable'

import {ParseLessonsAdapter} from "../utils/parseLessons.adapter";

const lessonAdapter = new ParseLessonsAdapter()

export class TimetableReducer {
    init(state:ITimetableSlice, action: ITimetableAction) {
        return produce(state, draft => {
            //draft.original = timetableData

            const timetable = timetableData_4

            draft.id = timetable.id
            draft.full_title = timetable.full_title
            draft.title = timetable.title
            draft.number = timetable.number
            draft.course = timetable.course
            draft.faculty_id = timetable.faculty_id
            draft.update_date = timetable.update_date
            draft.lessons.original = timetable.lessons
        })
    }

    setTimetable(state:ITimetableSlice, action: ITimetableAction) {
        return produce(state, draft => {
            //draft.original = action.payload.timetable
        })
    }

    setParsedTimetable(state:ITimetableSlice, action: ITimetableAction) {
        return produce(state,  draft => {
            draft.lessons.parsed = lessonAdapter.parse(state.lessons.original)
        })
    }
}