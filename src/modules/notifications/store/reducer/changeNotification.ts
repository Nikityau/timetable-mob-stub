import produce from "immer";

import {Notification} from "../interface/notification";
import {NotifAction} from "../action/notif.action";

export const changeNotification = (state: Notification, action: NotifAction, prop) => {
    return produce(state, draft => {
        const change = action.payload[prop]
        const data = draft.inputData

        const lesson = draft.notifications.find(lesson => {
            if (
                lesson.id == data.id &&
                lesson.dateRu == data.dateRu &&
                lesson.lesson.week_day == data.lesson.week_day &&
                lesson.lesson.lesson_number == data.lesson.lesson_number &&
                lesson.lesson.week_type == data.lesson.week_type
            )
                return lesson
        })

        if(lesson) {
            lesson[prop] = change
        }

        return draft
    })
}