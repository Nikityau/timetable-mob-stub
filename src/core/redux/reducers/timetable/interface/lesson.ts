export interface ILesson {
    week_day: number
    lesson_number: 1,
    time_period: string,
    week_type: string,
    discipline: string,
    auditorium_id: string,
    subgroup: string | null,
    subgroups?: ILessonSubgroup[] | null
    teacher: string,
    lesson_type: string
}

export interface ILessonSubgroup {
    auditorium_id: string,
    discipline: string,
    subgroup: string | null,
    teacher: string,
    lesson_type: string,
    week_type: string,
}