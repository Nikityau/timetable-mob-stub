import produce from "immer";

import {ScheduleParsed} from "../interface/schedule";
import {ScheduleAction, ScheduleActionTypes} from "../action/schedule.action";

import {parse} from "../../helpers/parseInputSchedule";

const initState: ScheduleParsed = null

export const scheduleReducer = (state: ScheduleParsed = initState, action: ScheduleAction) => {
    switch (action.type) {
        case ScheduleActionTypes.SET_SCHEDULE:
            return produce(state, draft => {
                const inputSchedule = action.payload

                return  {
                    id: inputSchedule.id,
                    full_title: inputSchedule.full_title,
                    title: inputSchedule.title,
                    number: inputSchedule.number,
                    course: inputSchedule.course,
                    faculty_id: inputSchedule.faculty_id,
                    update_date: inputSchedule.update_date,
                    lessons: {
                        original: inputSchedule.lessons,
                        parsed: null
                    }
                }
            })
        case ScheduleActionTypes.PARSE_SCHEDULE:
            return produce(state, draft => {
                draft.lessons.parsed = parse(draft.lessons.original)

                return draft
            })
        case ScheduleActionTypes.DELETE_SCHEDULE:
            return produce(state, draft => {
                return null
            })
        default:
            return state
    }
}