import {ILesson} from "./lesson";

export interface ITimetableSlice {
    id: number | string,
    full_title: string,
    title: string,
    number: string,
    course: number | string,
    faculty_id: number | string
    update_date: string | Date
    lessons: {
        original: ILesson[] | any[],
        parsed: {
            above_week: ILesson[][],
            below_week: ILesson[][]
        }
    }
}

export type LessonsParsed = {
    above_week: ILesson[][],
    below_week: ILesson[][]
}