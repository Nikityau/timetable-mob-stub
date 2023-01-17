import {INotificationsState} from "../interface/notifications.state";
import {ILesson, ILessonSubgroup} from "../../timetable/interface/lesson";

export namespace ReduxNotificationSelector {
    export const getNotifPopUpState = (state): boolean => {
        return state['notifications']['isNotifyOpen']
    }

    export const getGroups = (state): ILessonSubgroup[] => {
        const notify = (state['notifications'] as INotificationsState)
        const lesson = notify.inputData?.lesson

        if (!lesson) {
            return []
        }

        if (!lesson.subgroups) {
            return [
                {
                    auditorium_id: lesson.auditorium_id,
                    teacher: lesson.teacher,
                    discipline: lesson.discipline,
                    subgroup: lesson.subgroup,
                    week_type: lesson.week_type,
                    lesson_type: lesson.lesson_type
                }
            ]
        }

        return lesson.subgroups
    }

    export const getLessonTypeNDiscipline = (state): { lessonType: string, discipline: string } => {
        const notify = (state['notifications'] as INotificationsState)
        const lesson = notify.inputData?.lesson

        if (!lesson) {
            return {
                lessonType: 'empty',
                discipline: 'empty'
            }
        }

        return {
            lessonType: lesson.lesson_type,
            discipline: lesson.discipline
        }
    }

    export const isNotify = (lesson: ILesson) => {
        return (state): boolean => {
            const groupId = state['timetable']?.['id']
            if(!groupId) {
                return false
            }

            const currDate = state['date']['current']
            const currentDate = new Date(currDate.timestamp)

            const ruLocale = Intl.DateTimeFormat('ru', {
                day: "numeric",
                month: "numeric",
                year: "numeric"
            }).format(currentDate)

            const notify = (state['notifications'] as INotificationsState)
            const notifs = notify.notifications

            if(notifs.length == 0) return false

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

            if(isFind) {
                return isFind.note != null || isFind.notify != null
            } else {
                return false
            }
        }
    }
}