import {findRepeatedLessons} from './findRepeatedLessons'

export function parseDay(day: any[]): any {
    const parsedDay = []

    let lessonNumber = 0
    const lessonsHistory = new Map<number, boolean>()

    let subgroups = {}

    for (let lesson of day) {
        if (!lesson.subgroup) {
            parsedDay.push(lesson)
        } else {
            lessonNumber = lesson['lesson_number']
            if (lessonsHistory.has(lessonNumber)) {
                continue
            }

            lessonsHistory.set(lessonNumber, true)

            subgroups = findRepeatedLessons(lesson, day, lessonNumber)

            parsedDay.push(subgroups)
            subgroups = {}
        }
    }

    return parsedDay
}