import {INotificationsState} from "../interface/notifications.state";
import {ILessonSubgroup} from "../../timetable/interface/lesson";

export namespace ReduxNotificationSelector {
    export const getNotifPopUpState = (state): boolean => {
        return state['notifications']['isNotifyOpen']
    }

    export const getGroups = (state):ILessonSubgroup[] => {
        const notify = (state['notifications'] as INotificationsState)
        const lesson = notify.inputData

        if(!lesson) {
            return []
        }

        if(!lesson.subgroups) {
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
        const lesson = notify.inputData

        if(!lesson) {
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
}