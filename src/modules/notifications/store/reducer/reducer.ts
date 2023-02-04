import produce from "immer";

import {dateLocaleRuEn} from "../../helpers/dateLocaleRuEn";

import {Notification} from "../interface/notification";
import {NotifActionTypes} from "../action/notif.action";
import {addNotification} from "./addNotification";
import {changeNotification} from "./changeNotification";

const notifInitState: Notification = {
    isOpen: false,
    inputData: null,
    notifications: []
}

export const reducer = (state:Notification = notifInitState, action) => {
    switch (action.type) {
        case NotifActionTypes.OPEN:
            return produce(state, draft => {
                draft.isOpen = true

                return draft
            })
        case NotifActionTypes.CLOSE:
            return produce(state, draft => {
                draft.isOpen = false

                return draft
            })
        case NotifActionTypes.SET_INPUT_DATA:
            return produce(state, draft => {
                const date = new Date(action.payload.inputData.date.timestamp)

                if(!date) {
                    return draft
                }

                const dateLocale = dateLocaleRuEn(date)

                draft.inputData = {
                    id: action.payload.inputData.id,
                    lesson: action.payload.inputData.lesson,
                    dateRu: dateLocale.ru,
                    dateEn: dateLocale.en
                }

                return draft
            })
        case NotifActionTypes.DELETE_INPUT_DATA:
            return produce(state, draft => {
                draft.inputData = null

                return draft
            })
        case NotifActionTypes.ADD_NOTIFICATION:
            return addNotification(state, action)
        case NotifActionTypes.CHANGE_NOTIFICATION_NOTIFY:
            return changeNotification(state, action, 'notify')
        case NotifActionTypes.CHANGE_NOTIFICATION_NOTE:
            return changeNotification(state, action, 'note')
        case NotifActionTypes.ADD_NOTIFICATION_LIST:
            return produce(state, draft => {
                const list = action.payload.list

                for(let i = 0; i < list.length; ++i) {
                    draft.notifications.push(list[i])
                }

                return draft
            })
        default:
            return state
    }
}