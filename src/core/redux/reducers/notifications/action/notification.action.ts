import {ILesson} from "../../timetable/interface/lesson";
import {INoteNotification, INotificationsState, INotifyNotification} from "../interface/notifications.state";
import Dates from "../../../../utils/namespaces/dates";

export namespace ReduxNotificationsAction {
    import DateObj = Dates.DateObj;

    export enum NotificationAction {
        OPEN = "notify/open",
        CLOSE = "notify/close",
        SET_INPUT_DATA = "notify/setInputData",
        DELETE_INPUT_DATA = "notify/deleteInputData",
        ADD_NOTIFICATION = "notify/addNotification",
        CHANGE_NOTIFICATION_NOTE = "notify/changeNotificationNote",
        CHANGE_NOTIFICATION_NOTIFY = "notify/changeNotificationNotify",
        ADD_NOTIFICATION_LIST = "notify/addNotificationList"
    }

    export interface INotificationData {
        id: string,
        date: Date,
        lesson: ILesson,
    }

    export interface INotifyAction {
        type: NotificationAction,
        payload: {
            isNotifyOpen?: boolean,
            inputData?: {
                id: string | number
                date: DateObj,
                lesson: ILesson,
            } | null,
            data?: INotificationData | null,
            notify?: INotifyNotification | null
            note?: INoteNotification | null,
            list?: any[]
        }
    }

    export const notifyOpenAction = ():INotifyAction => {
        return {
            type: NotificationAction.OPEN,
            payload: {
                isNotifyOpen: true
            }
        }
    }

    export const notifyCloseAction = ():INotifyAction => {
        return {
            type: NotificationAction.CLOSE,
            payload: {
                isNotifyOpen: false
            }
        }
    }

    export const setInputData = (payload: {
        id: string | number,
        date: DateObj
        lesson: ILesson
    }):INotifyAction => {
        return {
            type: NotificationAction.SET_INPUT_DATA,
            payload: {
                inputData: {
                    lesson: payload.lesson,
                    date: payload.date,
                    id: payload.id
                }
            }
        }
    }

    export const deleteInputData = ():INotifyAction => {
        return {
            type: NotificationAction.DELETE_INPUT_DATA,
            payload: {
                inputData: null
            }
        }
    }


    export const addNotification = (payload: INotificationData):INotifyAction => {
        return {
            type: NotificationAction.ADD_NOTIFICATION,
            payload: {
                data: payload
            }
        }
    }

    export const changeNotificationNotify = (payload: INotifyNotification):INotifyAction => {
        return {
            type: NotificationAction.CHANGE_NOTIFICATION_NOTIFY,
            payload: {
                notify: payload
            }
        }
    }
    export const changeNotificationNote = (payload: INoteNotification):INotifyAction => {
        return {
            type: NotificationAction.CHANGE_NOTIFICATION_NOTE,
            payload: {
                note: payload
            }
        }
    }

    export const addNotificationList = (payload: any[]):INotifyAction => {
        return {
            type: NotificationAction.ADD_NOTIFICATION_LIST,
            payload: {
                list: payload
            }
        }
    }
}