export namespace ReduxNotificationsAction {
    export enum NotificationAction {
        NOTIF_ON = 'notifications/notifOn',
        NOTIF_OFF = 'notifications/notifOff',
    }

    export const setNotifOn = () => {
        return {
            type: NotificationAction.NOTIF_ON,
            payload: null
        }
    }

    export const setNotiffOff = () => {
        return {
            type: NotificationAction.NOTIF_OFF,
            payload: null
        }
    }
}