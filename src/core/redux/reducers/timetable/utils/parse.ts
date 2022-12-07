import {parseByDays} from './parseByDays'
import {parseBySubgroups} from './parseBySubgroups'

export function parseLessons(lessons: any[]): any {
    const lessonsCopy = JSON.parse(JSON.stringify(lessons))
    const parsedByDays = JSON.parse(JSON.stringify(parseByDays(lessonsCopy)))

    const aboveWeekParsed = parseBySubgroups(parsedByDays.above_week)
    const belowWeekParsed = parseBySubgroups(parsedByDays.below_week)

    const parsedLessons = {
        above_week: aboveWeekParsed,
        below_week: belowWeekParsed
    }

    return parsedLessons
}