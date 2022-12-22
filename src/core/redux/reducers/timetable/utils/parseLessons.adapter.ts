import {LessonsParsed} from "../interface/timetable.slice";
import {ILesson} from "../interface/lesson";

export class ParseLessonsAdapter {
    parse(lessons: ILesson[]): LessonsParsed {
        const parsed: LessonsParsed = {
            above_week: [],
            below_week: []
        }

        if (lessons.length == 0) return parsed

        const lessonsCopy = JSON.parse(JSON.stringify(lessons))

        const aboveWeek = this.parseByWeek(lessonsCopy, 'над чертой', 'обе недели')
        const belowWeek = this.parseByWeek(lessonsCopy, 'под чертой', 'обе недели')

        const aboveWeekDays = this.parseByDays(aboveWeek)
        const belowWeekDays = this.parseByDays(belowWeek)

        const aboveWeekBySubgroups = this.parseBySubgroups(aboveWeekDays)
        const belowWeekBySubgroups = this.parseBySubgroups(belowWeekDays)

        parsed.above_week = this.fillWeek(aboveWeekBySubgroups)
        parsed.below_week = this.fillWeek(belowWeekBySubgroups)

        return parsed
    }

    private parseByWeek(lessons: ILesson[], condition: string, addonCondition?: string): ILesson[] {
        const week = []

        for (let day of lessons) {
            if (day.week_type == condition || day.week_type == addonCondition) {
                week.push(day)
            }
        }

        return week
    }

    private parseByDays(week: ILesson[]): ILesson[][] {
        const weekParsed = []

        let prevDay = week[0].week_day

        let dayLessons = []

        for (let day of week) {
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

    private parseBySubgroups(week: ILesson[][]): ILesson[][] {
        const parsedWeek: ILesson[][] = []

        let dayN = []

        const lessonDict = new Map<string, boolean>()

        for (let day of week) {
            for (let lesson of day) {
                if (lessonDict.has(`${lesson.week_day}:${lesson.lesson_number}`)) continue

                if (lesson.subgroup) {
                    lessonDict.set(`${lesson.week_day}:${lesson.lesson_number}`, true)

                    const lessonSubs = this.findSubgroupInDay(day, lesson.lesson_number)
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

    private findSubgroupInDay(day: ILesson[], lessonNumber: number): ILesson {
        let lessonSubs: ILesson = undefined

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

    private fillWeek(weeks: ILesson[][]): ILesson[][] {
        const filledWeek = JSON.parse(JSON.stringify(weeks)) as ILesson[][]
        const length = filledWeek.length
        let dayCount = 7 - length

        for(; dayCount > 0; --dayCount) {
            filledWeek.push(null)
        }

        return filledWeek
    }
}