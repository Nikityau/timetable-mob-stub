import produce from "immer";

import {ReduxNotificationsAction} from "../action/notification.action";
import INotifyAction = ReduxNotificationsAction.INotifyAction;

import {INote, INoteNotification, INotificationsState} from "../interface/notifications.state";

function dateLocaleRuEn(date: Date): {
    ru: string,
    en: string
} {
    const dateRuLocale = Intl.DateTimeFormat('ru', {
        month: "numeric",
        year: "numeric",
        day: "numeric"
    }).format(date)

    const dateEnLocale = Intl.DateTimeFormat('en', {
        month: "numeric",
        year: "numeric",
        day: "numeric"
    }).format(date)

    return  {
        ru: dateRuLocale,
        en: dateEnLocale
    }
}

export class NotificationsReducer {
    setNotifyState(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {
            draft.isNotifyOpen = action.payload.isNotifyOpen
        })
    }

    setInputData(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {
            const date = new Date(action.payload.inputData.date.timestamp)

            if(!date) {
                return
            }

            const dateLocale = dateLocaleRuEn(date)

            draft.inputData = {
                id: action.payload.inputData.id,
                lesson: action.payload.inputData.lesson,
                dateRu: dateLocale.ru,
                dateEn: dateLocale.en
            }
        })
    }

    deleteInputData(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {
            draft.inputData = null
        })
    }

    addNotification(state: INotificationsState, action: INotifyAction) {
        const data = action.payload.data

        const date = new Date(data?.date)

        const dateLocale = dateLocaleRuEn(date)

        const notification: INote = {
            id: data.id,
            dateRu: dateLocale.ru,
            dateEn: dateLocale.en,
            lesson: data.lesson,
            note: null,
            notify: null,
        }

        return produce(state, draft => {
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

            if (coincidence) {

            } else {
                draft.notifications.push(notification)
            }
        })
    }

    changeNotificationNotify(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {
            const notify = action.payload.notify
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
                lesson.notify = notify
            }
        })
    }

    changeNotificationNote(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {
            const note = action.payload.note
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
                lesson.note = note
            }
        })
    }

    addNotificationList(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {
            const list = action.payload.list

            for(let i = 0; i < list.length; ++i) {
                draft.notifications.push(list[i])
            }
        })
    }
}