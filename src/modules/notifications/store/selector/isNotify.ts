import {Lesson} from "../../../schedule-calendar";
import {Notification} from "../interface/notification";

export const isNotify = (lesson: Lesson) => {
    return (state): boolean => {
        const groupId = state['timetable']?.['id']
        if (!groupId) {
            return false
        }

        const nowDate = new Date(state['date']['now'].timestamp)

        const currDate = state['date']['current']
        const currentDate = new Date(currDate.timestamp)

        const ruLocale = Intl.DateTimeFormat('ru', {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        }).format(currentDate)

        const notify = (state['notifications'] as Notification)
        const notifs = notify.notifications

        if (notifs.length == 0) return false

        const isFind = notifs.find(note => {
            if (
                note.id == groupId &&
                note.dateRu == ruLocale &&
                note.lesson.week_day == lesson.week_day &&
                note.lesson.lesson_number == lesson.lesson_number &&
                note.lesson.week_type == lesson.week_type
            )
                return note
        })

        if (isFind) {
            return isFind.note != null || isFind.notify != null
        } else {
            for (let note of notifs) {
                if (
                    note.id == groupId &&
                    note.lesson.week_day == lesson.week_day &&
                    note.lesson.lesson_number == lesson.lesson_number &&
                    note.lesson.week_type == lesson.week_type
                ) {
                    if (
                        note.notify != null &&
                        note.notify?.isRepeat &&
                        currentDate >= nowDate
                    ) {
                        return true
                    }
                }
            }


            return false
        }
    }
}