import {Action} from "redux";

import {notificationsState} from "./state/notifications.state";

import {ReduxNotificationsAction} from "./action/notification.action";

import {NotificationsReducer} from "./reducer/notifications.reducer";

const reducer = new NotificationsReducer()

export const notifications = (state = notificationsState, action: Action) => {
    switch (action.type) {
        case ReduxNotificationsAction.NotificationAction.NOTIF_ON:
            return reducer.notifOn(state)
        case ReduxNotificationsAction.NotificationAction.NOTIF_OFF:
            return reducer.notifOff(state)
        default:
            return state
    }
}