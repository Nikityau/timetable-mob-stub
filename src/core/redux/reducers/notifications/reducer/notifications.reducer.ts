import produce from "immer";

export class NotificationsReducer {
    notifOn(state) {
        return produce(state, draft => {
            draft.isNotifPopUpOpen = true
        })
    }
    notifOff(state) {
        return produce(state, draft => {
            draft.isNotifPopUpOpen = false
        })
    }
}