import {parseDay} from "./parseDay";

export function parseBySubgroups(week: any[]): any {
    let parsedWeek = []

    for(let day of week) {
        const parsedDay = parseDay(day)
        parsedWeek.push(parsedDay)
    }

    return parsedWeek
}
