export function findRepeatedLessons(lessonCurrent,day, lessonNumber): any {
    let subgroups = {
        week_day: lessonCurrent['week_day'],
        lesson_number: lessonCurrent['lesson_number'],
        time_period: lessonCurrent['time_period'],
        subgroups: []
    }

    for(let lesson of day) {
        if(lesson['lesson_number'] != lessonNumber) continue

        subgroups['subgroups'].push({
            auditorium_id: lesson['auditorium_id'],
            lesson_type: lesson['lesson_type'],
            week_type: lesson['week_type'],
            teacher: lesson['teacher'],
            subgroup: lesson['subgroup'],
            discipline: lesson['discipline'],
        })
    }

    return subgroups
}