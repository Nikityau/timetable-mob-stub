export function parseByDays(lessons: any[]): any {
    const weeks = {
        above_week: [],
        below_week: []
    }

    let above_week = []
    let below_week = []

    let weekday: number | 'def' = 'def'
    let prevWeekdayValue: number = 1
    let lessonNumber: number = 1
    let weekType: string = ""

    const weeksDict = {}

    for (let i = 0; i < lessons.length; ++i) {
        weekday = lessons[i]["week_day"]

        if ((weekday != 'def' && weekday != prevWeekdayValue) || i == lessons.length - 1) {
            weeks.above_week.push(above_week)
            weeks.below_week.push(below_week)

            above_week = []
            below_week = []

        }

        if (
            lessons[i]["week_type"] == "под чертой"
            || lessons[i]["week_type"] == "над чертой"
        ) {
            weekType = lessons[i]["week_type"]
            lessonNumber = lessons[i]["lesson_number"]

            let isAllFind = false

            if (weeksDict[`${weekday}:${lessonNumber}`]) {
                const week = weeksDict[`${weekday}:${lessonNumber}`]

                if (week.types.includes("под чертой") && week.types.includes("над чертой")) {
                    isAllFind = true
                }

            } else {
                if (weekType == "над чертой") {
                    above_week.push(lessons[i])
                }
                if (weekType == "под чертой") {
                    below_week.push(lessons[i])
                }

                weeksDict[`${weekday}:${lessonNumber}`] = {
                    types: [
                        weekType
                    ]
                }
            }

            if (!isAllFind) {
                for (let j = 0; j < lessons.length; ++j) {
                    const lesson = lessons[j]
                    if (weekType == "над чертой") {
                        if (
                            lesson["week_day"] == weekday &&
                            lesson["lesson_number"] == lessonNumber &&
                            lesson["week_type"] == "под чертой"
                        ) {
                            below_week.push(lessons[j])

                            weeksDict[`${weekday}:${lessonNumber}`].types.push("под чертой")

                            break;
                        }
                    }
                    if (weekType == "под чертой") {
                        if (
                            lesson["week_day"] == weekday &&
                            lesson["lesson_number"] == lessonNumber &&
                            lesson["week_type"] == "над чертой"
                        ) {
                            above_week.push(lessons[j])

                            weeksDict[`${weekday}:${lessonNumber}`].types.push("над чертой")

                            break;
                        }
                    }
                }
            }
        }

        if (lessons[i]["week_type"] == "обе недели") {
            above_week.push(lessons[i])
            below_week.push(lessons[i])
        }

        prevWeekdayValue = lessons[i]["week_day"]
    }

    return weeks
}