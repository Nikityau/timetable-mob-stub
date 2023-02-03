import {ScheduleParsed} from "../interface/schedule";
import {LessonsParsed} from "../interface/lesson-parsed";

export const getGroupFullTitle = (state: any): string => {
    return (state['schedule'] as ScheduleParsed)?.full_title || 'UNK'
}

export const getParsedSchedule = (state: any): LessonsParsed => {
    const schedule = (state['schedule'] as ScheduleParsed)

    if (!schedule || !schedule.lessons.parsed) {
        return {
            below_week: [],
            above_week: []
        }
    }

    return schedule.lessons.parsed
}

export const getGroupId = (state: any): string => {
    return (state['schedule'] as ScheduleParsed).id.toString()
}