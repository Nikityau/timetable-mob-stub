import {Action} from "redux";

import {ReduxNotificationsAction} from "./action/notification.action";

import {INotificationsState} from "./interface/notifications.state";

import {notificationsState} from "./state/notifications.state";


import {NotificationsReducer} from "./reducer/notifications.reducer";

const reducer = new NotificationsReducer()

export const notifications = (state:INotificationsState = notificationsState, action: Action) => {
    switch (action.type) {
        case ReduxNotificationsAction.NotificationAction.NOTIF_ON:
            return reducer.notifOn(state)
        case ReduxNotificationsAction.NotificationAction.NOTIF_OFF:
            return reducer.notifOff(state)
        default:
            return state
    }
}