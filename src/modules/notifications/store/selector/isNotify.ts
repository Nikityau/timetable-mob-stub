import {Lesson} from "../../../schedule-calendar";
import {Notification} from "../interface/notification";

import {ScheduleParsed} from "../../../schedule-calendar/store/interface/schedule";
import type {DateState} from "../../../date-calendar";

export const isNotify = (lesson: Lesson) => {
    return (state): boolean => {
        const date = (state['date'] as DateState)
        const timetable = (state['schedule'] as ScheduleParsed)

        const groupId = timetable.id
        if (!groupId) {
            return false
        }

        const nowDate = new Date(date.now.timestamp)
        const currentDate = new Date(date.current.timestamp)

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