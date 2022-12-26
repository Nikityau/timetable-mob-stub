import {Action} from "redux";

import {ReduxNotificationsAction} from "./action/notification.action";
import INotifyAction = ReduxNotificationsAction.INotifyAction;

import {INotificationsState} from "./interface/notifications.state";

import {notificationsState} from "./state/notifications.state";

import {NotificationsReducer} from "./reducer/notifications.reducer";

const reducer = new NotificationsReducer()

export const notifications = (state:INotificationsState = notificationsState, action: INotifyAction) => {
    switch (action.type) {
        case ReduxNotificationsAction.NotificationAction.OPEN:
        case ReduxNotificationsAction.NotificationAction.CLOSE:
            return reducer.setNotifyState(state, action)
        default:
            return state
    }
}