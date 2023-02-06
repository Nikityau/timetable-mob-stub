import {Notification} from "../interface/notification";
import {LessonSubgroup} from "../../../schedule-calendar/store/interface/lesson-subgroup";

export const getNotifPopUpState = (state): boolean => {
    return state['notifications']['isOpen']
}
export const getGroups = (state): LessonSubgroup[] => {
    const notify = (state['notifications'] as Notification)
    const lesson = notify.inputData?.lesson

    if (!lesson) {
        return null
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
    const notify = (state['notifications'] as Notification)
    const lesson = notify.inputData?.lesson

    if (!lesson) {
        return null
    }

    return {
        lessonType: lesson.lesson_type,
        discipline: lesson.discipline
    }
}

