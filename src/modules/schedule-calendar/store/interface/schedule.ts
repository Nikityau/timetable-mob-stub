import {Lesson} from "./lesson";

export interface Schedule {
    id: number | string,
    full_title: string,
    title: string,
    number: string,
    course: number | string,
    faculty_id: number | string,
    update_date: string | Date,
}

export interface ScheduleParsed extends Schedule {
    lessons: {
        original: Lesson[] | any[],
        parsed: {
            above_week: Lesson[][],
            below_week: Lesson[][]
        }
    }
}

export interface ScheduleInput extends Schedule {
    lessons: Lesson[]
}

