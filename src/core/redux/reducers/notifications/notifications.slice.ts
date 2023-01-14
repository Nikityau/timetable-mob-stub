import {ReduxNotificationsAction} from "./action/notification.action";

import {INotificationsState} from "./interface/notifications.state";

import {notificationsState} from "./state/notifications.state";

import {NotificationsReducer} from "./reducer/notifications.reducer";
import INotifyAction = ReduxNotificationsAction.INotifyAction;
import NotificationAction = ReduxNotificationsAction.NotificationAction;

const reducer = new NotificationsReducer()

export const notifications = (state: INotificationsState = notificationsState, action: INotifyAction) => {
    switch (action.type) {
        case ReduxNotificationsAction.NotificationAction.OPEN:
        case ReduxNotificationsAction.NotificationAction.CLOSE:
            return reducer.setNotifyState(state, action)
        case ReduxNotificationsAction.NotificationAction.SET_INPUT_DATA:
            return reducer.setInputData(state, action)
        case ReduxNotificationsAction.NotificationAction.DELETE_INPUT_DATA:
            return reducer.deleteInputData(state, action)
        case NotificationAction.ADD_NOTIFICATION:
            return reducer.addNotification(state, action)
        case NotificationAction.CHANGE_NOTIFICATION_NOTIFY:
            return reducer.changeNotificationNotify(state, action)
        case NotificationAction.CHANGE_NOTIFICATION_NOTE:
            return reducer.changeNotificationNote(state, action)
        case NotificationAction.ADD_NOTIFICATION_LIST:
            return reducer.addNotificationList(state, action)
        default:
            return state
    }
}