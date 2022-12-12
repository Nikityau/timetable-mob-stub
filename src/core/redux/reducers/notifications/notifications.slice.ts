import {Action} from "redux";

import {notificationsState} from "./state/notifications.state";

export const notifications = (state = notificationsState, action: Action) => {
    switch (action.type) {
        default:
            return state
    }
}