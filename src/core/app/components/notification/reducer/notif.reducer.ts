import produce from "immer";

import {INotifAction} from "./interface/notif.action";
import {INotifState, NotifActionsType} from "./interface/notif.state";

export function notifReducer(state: INotifState, action: INotifAction): INotifState {
    switch (action.type) {
        case NotifActionsType.IS_NOTIFY_ACTIVE:
            return produce(state, draft => {
                draft.isNotifyActive = action.payload
            })
        case NotifActionsType.IS_NOTIFY_REPEAT:
            return produce(state, draft => {
                draft.isNotifyRepeat = action.payload
            })
        case NotifActionsType.TIME_BEFORE:
            return produce(state, draft => {
                draft.timeBefore = action.payload
            })
        case NotifActionsType.IS_NOTE_ACTIVE:
            return produce(state, draft => {
                draft.isNoteActive = action.payload
            })
        case NotifActionsType.IS_NOTE_REPEAT:
            return produce(state, draft => {
                draft.isNoteRepeat = action.payload
            })
        case NotifActionsType.NOTE_TEXT:
            return produce(state, draft => {
                draft.noteText = action.payload
            })
        case NotifActionsType.CLEAR:
            return produce(state, draft => {
                draft.isNotifyRepeat = false
                draft.isNotifyActive = false
                draft.timeBefore = "unk"
                draft.isNoteRepeat = false
                draft.isNoteActive = false
                draft.noteText = ""
            })
        default:
            return state
    }
}