export namespace ReduxNotificationsAction {
    export enum NotificationAction {
        OPEN = "notify/open",
        CLOSE = "notify/close"
    }

    export interface INotifyAction {
        type: NotificationAction,
        payload: {
            isNotifyOpen?: boolean
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
}