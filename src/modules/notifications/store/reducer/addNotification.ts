import produce from "immer";

import {dateLocaleRuEn} from "../../helpers/dateLocaleRuEn";

import {Note, Notification} from "../interface/notification";
import {NotifAction} from '../action/notif.action'

export const addNotification = (state:Notification, action: NotifAction) => {
    return produce(state, draft => {
        const data = action.payload.data

        const date = new Date(data?.date)

        const dateLocale = dateLocaleRuEn(date)

        const notification: Note = {
            id: data.id,
            dateRu: dateLocale.ru,
            dateEn: dateLocale.en,
            lesson: data.lesson,
            note: null,
            notify: null,
        }

        const coincidence = draft.notifications.find(lesson => {
            if (
                lesson.id == data.id &&
                lesson.dateRu == dateLocale.ru &&
                lesson.lesson.week_day == data.lesson.week_day &&
                lesson.lesson.lesson_number == data.lesson.lesson_number &&
                lesson.lesson.week_type == data.lesson.week_type
            )
                return lesson
        })

        if (!coincidence) {
            draft.notifications.push(notification)
        }

        return draft
    })
}