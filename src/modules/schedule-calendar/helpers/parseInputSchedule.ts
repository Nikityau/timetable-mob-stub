import {nanoid} from "nanoid";

import {Lesson} from "../store/interface/lesson";
import {LessonsParsed} from "../store/interface/lesson-parsed";

export const parse = (lessons: Lesson[]): LessonsParsed => {
    const lessonParsed: LessonsParsed = {
        above_week: [],
        below_week: []
    }

    if (lessons.length == 0) return lessonParsed

    const lessonsCopy = JSON.parse(JSON.stringify(lessons))

    const aboveWeek = parseByWeek(lessonsCopy, 'над чертой', 'обе недели')
    const belowWeek = parseByWeek(lessonsCopy, 'под чертой', 'обе недели')

    const aboveWeekDays = parseByDays(aboveWeek)
    const belowWeekDays = parseByDays(belowWeek)

    const aboveWeekBySubgroups = parseBySubgroups(aboveWeekDays)
    const belowWeekBySubgroups = parseBySubgroups(belowWeekDays)

    lessonParsed.above_week = fillWeek(aboveWeekBySubgroups)
    lessonParsed.below_week = fillWeek(belowWeekBySubgroups)


    return lessonParsed
}

const parseByWeek = (lessons: Lesson[], condition: string, addonCondition?: string): Lesson[] => {
    const week = []

    for (let day of lessons) {
        if (day.week_type == condition || day.week_type == addonCondition) {
            week.push(day)
        }
    }

    return week
}

const parseByDays = (week: Lesson[]): Lesson[][] => {
    const weekParsed = []

    let prevDay = week[0].week_day

    let dayLessons = []

    for (let day of week) {
        day['unique_id'] = nanoid()
        if (prevDay != day.week_day) {
            weekParsed.push(dayLessons)
            dayLessons = []
        }

        dayLessons.push(day)

        prevDay = day.week_day
    }

    weekParsed.push(dayLessons)

    return weekParsed
}

const parseBySubgroups = (week: Lesson[][]): Lesson[][] => {
    const parsedWeek: Lesson[][] = []

    let dayN = []

    const lessonDict = new Map<string, boolean>()

    for (let day of week) {
        for (let lesson of day) {
            if (lessonDict.has(`${lesson.week_day}:${lesson.lesson_number}`)) continue

            if (lesson.subgroup) {
                lessonDict.set(`${lesson.week_day}:${lesson.lesson_number}`, true)

                const lessonSubs = findSubgroupInDay(day, lesson.lesson_number)
                dayN.push(lessonSubs)

                continue
            }

            dayN.push(lesson)
        }

        parsedWeek.push(dayN)
        dayN = []
    }

    return parsedWeek
}

const findSubgroupInDay = (day: Lesson[], lessonNumber: number): Lesson => {
    let lessonSubs: Lesson = undefined

    const lessons = day.filter(lesson => {
        if (lesson.lesson_number == lessonNumber) return lesson
    })
    lessonSubs = lessons[0]
    lessonSubs.subgroups = []

    for (let lesson of lessons) {
        lessonSubs.subgroups.push({
            auditorium_id: lesson.auditorium_id,
            lesson_type: lesson.lesson_type,
            subgroup: lesson.subgroup,
            week_type: lesson.week_type,
            teacher: lesson.teacher,
            discipline: lesson.discipline
        })
    }

    return lessonSubs
}

const fillWeek = (weeks: Lesson[][]): Lesson[][] => {
    const filledWeek = JSON.parse(JSON.stringify(weeks)) as Lesson[][]
    const length = filledWeek.length
    let dayCount = 7 - length

    for (; dayCount > 0; --dayCount) {
        filledWeek.push(null)
    }

    return filledWeek
}