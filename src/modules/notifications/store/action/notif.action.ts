import {Action} from "redux";

import {Lesson} from "../../../schedule-calendar";

import Dates from "../../../../helpers/date/date";
import DateObj = Dates.DateObj;

import {NoteNotification, NotifNotification} from "../interface/notification";

export enum NotifActionTypes {
    OPEN = "notif/open",
    CLOSE = "notif/close",
    SET_INPUT_DATA = "notif/setInputData",
    DELETE_INPUT_DATA = "notif/deleteInputData",
    ADD_NOTIFICATION = "notif/addNotification",
    CHANGE_NOTIFICATION_NOTE = "notif/changeNotificationNote",
    CHANGE_NOTIFICATION_NOTIFY = "notif/changeNotificationNotify",
    ADD_NOTIFICATION_LIST = "notif/addNotificationList"
}

export interface NotificationData {
    id: string,
    date: Date,
    lesson: Lesson,
}


export interface NotifAction extends Action {
    type: NotifActionTypes,
    payload: {
        isNotifyOpen?: boolean,
        inputData?: {
            id: string | number
            date: DateObj,
            lesson: Lesson,
        } | null,
        data?: NotificationData | null,
        notify?: NotifNotification | null
        note?: NoteNotification | null,
        list?: any[]
    }
}

export const notifyOpenAction = ():NotifAction => {
    return {
        type: NotifActionTypes.OPEN,
        payload: {
            isNotifyOpen: true
        }
    }
}

export const notifyCloseAction = ():NotifAction => {
    return {
        type: NotifActionTypes.CLOSE,
        payload: {
            isNotifyOpen: false
        }
    }
}

export const setNotificationInputData = (payload: {
    id: string | number,
    date: DateObj
    lesson: Lesson
}):NotifAction => {
    return {
        type: NotifActionTypes.SET_INPUT_DATA,
        payload: {
            inputData: {
                lesson: payload.lesson,
                date: payload.date,
                id: payload.id
            }
        }
    }
}

export const deleteInputData = ():NotifAction => {
    return {
        type: NotifActionTypes.DELETE_INPUT_DATA,
        payload: {
            inputData: null
        }
    }
}


export const addNotification = (payload: NotificationData):NotifAction => {
    return {
        type: NotifActionTypes.ADD_NOTIFICATION,
        payload: {
            data: payload
        }
    }
}

export const changeNotificationNotify = (payload: NotifNotification | null):NotifAction => {
    return {
        type: NotifActionTypes.CHANGE_NOTIFICATION_NOTIFY,
        payload: {
            notify: payload
        }
    }
}
export const changeNotificationNote = (payload: NoteNotification | null):NotifAction => {
    return {
        type: NotifActionTypes.CHANGE_NOTIFICATION_NOTE,
        payload: {
            note: payload
        }
    }
}

export const addNotificationList = (payload: any[]):NotifAction => {
    return {
        type: NotifActionTypes.ADD_NOTIFICATION_LIST,
        payload: {
            list: payload
        }
    }
}
