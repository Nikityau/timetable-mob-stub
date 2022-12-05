export function parseLessons(lessons: any[]): any {
    const lessonsCopy = JSON.parse(JSON.stringify(lessons))

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

    const weeksDict = {
        "11": {
            types: [
                ""
            ]
        }
    }

    for (let i = 0; i < lessonsCopy.length; ++i) {
        weekday = lessonsCopy[i]["week_day"]

        if ((weekday != 'def' && weekday != prevWeekdayValue) || i == lessonsCopy.length - 1) {
            weeks.above_week.push(above_week)
            weeks.below_week.push(below_week)

            above_week = []
            below_week = []

        }

        if (
            lessonsCopy[i]["week_type"] == "под чертой"
            || lessonsCopy[i]["week_type"] == "над чертой"
        ) {
            weekType = lessonsCopy[i]["week_type"]
            lessonNumber = lessonsCopy[i]["lesson_number"]

            let isAllFind = false

            if (weeksDict[`${weekday}:${lessonNumber}`]) {
                const week = weeksDict[`${weekday}:${lessonNumber}`]

                if(week.types.includes("под чертой") && week.types.includes("над чертой")) {
                    isAllFind = true
                }

            } else {
                if(weekType == "над чертой") {
                    above_week.push(lessonsCopy[i])
                }
                if(weekType == "под чертой") {
                    below_week.push(lessonsCopy[i])
                }

                weeksDict[`${weekday}:${lessonNumber}`] = {
                    types: [
                        weekType
                    ]
                }
            }

            if(!isAllFind) {
                for(let j = 0; j < lessonsCopy.length; ++j) {
                    const lesson = lessonsCopy[j]
                    if(weekType == "над чертой") {
                        if(
                            lesson["week_day"] == weekday &&
                            lesson["lesson_number"] == lessonNumber &&
                            lesson["week_type"] == "под чертой"
                        ) {
                            below_week.push(lessonsCopy[j])

                            weeksDict[`${weekday}:${lessonNumber}`].types.push("под чертой")

                            break;
                        }
                    }
                    if(weekType == "под чертой") {
                        if(
                            lesson["week_day"] == weekday &&
                            lesson["lesson_number"] == lessonNumber &&
                            lesson["week_type"] == "над чертой"
                        ) {
                            above_week.push(lessonsCopy[j])

                            weeksDict[`${weekday}:${lessonNumber}`].types.push("над чертой")

                            break;
                        }
                    }
                }
            }
        }

        if (lessonsCopy[i]["week_type"] == "обе недели") {
            above_week.push(lessonsCopy[i])
            below_week.push(lessonsCopy[i])
        }

        prevWeekdayValue = lessonsCopy[i]["week_day"]
    }

    console.log(weeks)

    return weeks
}