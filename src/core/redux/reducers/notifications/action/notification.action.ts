import {ILesson} from "../../timetable/interface/lesson";

export namespace ReduxNotificationsAction {
    export enum NotificationAction {
        OPEN = "notify/open",
        CLOSE = "notify/close",
        SET_INPUT_DATA = "notify/setInputData",
        DELETE_INPUT_DATA = "notify/deleteInputData"
    }

    export interface INotifyAction {
        type: NotificationAction,
        payload: {
            isNotifyOpen?: boolean,
            lesson?: ILesson
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

    export const setInputData = (payload:ILesson):INotifyAction => {
        return {
            type: NotificationAction.SET_INPUT_DATA,
            payload: {
                lesson: payload
            }
        }
    }

    export const deleteInputData = ():INotifyAction => {
        return {
            type: NotificationAction.DELETE_INPUT_DATA,
            payload: {
                lesson: null
            }
        }
    }
}