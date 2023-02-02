import {LessonSubgroup} from "./lesson-subgroup";

export interface Lesson {
    week_day: number
    lesson_number: 1,
    time_period: string,
    week_type: string,
    discipline: string,
    auditorium_id: string,
    subgroup: string | null,
    subgroups?: LessonSubgroup[] | null
    teacher: string,
    lesson_type: string
}
