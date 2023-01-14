import produce from "immer";

import {ReduxNotificationsAction} from "../action/notification.action";
import INotifyAction = ReduxNotificationsAction.INotifyAction;

import {INote, INoteNotification, INotificationsState} from "../interface/notifications.state";

export class NotificationsReducer {
    setNotifyState(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {
            draft.isNotifyOpen = action.payload.isNotifyOpen
        })
    }

    setInputData(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {
            draft.inputData = action.payload.lesson
        })
    }

    deleteInputData(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {
            draft.inputData = action.payload.lesson
        })
    }

    addNotification(state: INotificationsState, action: INotifyAction) {
        const data = action.payload.data

        const date = new Date(data.date)

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

        const notification: INote = {
            id: data.id,
            dateRu: dateRuLocale,
            dateEn: dateEnLocale,
            lesson: data.lesson,
            note: null,
            notify: null,
        }

        return produce(state, draft => {
            const coincidence = draft.notifications.find(lesson => {
                if (
                    lesson.id == data.id &&
                    lesson.dateRu == dateRuLocale &&
                    lesson.lesson.week_day == data.lesson.week_day &&
                    lesson.lesson.lesson_number == data.lesson.lesson_number &&
                    lesson.lesson.week_type == data.lesson.week_type
                )
                    return lesson
            })

            if(coincidence) {

            } else {
                draft.notifications.push(notification)
            }
        })
    }
    changeNotificationNotify(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {

        })
    }
    changeNotificationNote(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {

        })
    }

    addNotificationList(state: INotificationsState, action: INotifyAction) {
        return produce(state, draft => {

        })
    }
}