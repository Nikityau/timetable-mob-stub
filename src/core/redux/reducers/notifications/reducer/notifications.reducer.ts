import produce from "immer";

import {ReduxNotificationsAction} from "../action/notification.action";
import INotifyAction = ReduxNotificationsAction.INotifyAction;

import {INotificationsState} from "../interface/notifications.state";

export class NotificationsReducer {
    setNotifyState(state:INotificationsState, action:INotifyAction) {
        return produce(state, draft => {
            draft.isNotifyOpen = action.payload.isNotifyOpen
        })
    }
}