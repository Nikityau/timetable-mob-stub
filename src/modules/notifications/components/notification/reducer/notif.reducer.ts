import produce from "immer";

import {NotifyAction, NotifyActionsType} from "./action/notify.action";

import {NotifyState} from "./state/notify.state";

export function notifyReducer(state: NotifyState, action: NotifyAction): NotifyState {
    switch (action.type) {
        case NotifyActionsType.IS_NOTIFY_ACTIVE:
            return produce(state, draft => {
                draft.isNotifyActive = action.payload
            })
        case NotifyActionsType.IS_NOTIFY_REPEAT:
            return produce(state, draft => {
                draft.isNotifyRepeat = action.payload
            })
        case NotifyActionsType.TIME_BEFORE:
            return produce(state, draft => {
                draft.timeBefore = action.payload
            })
        case NotifyActionsType.IS_NOTE_ACTIVE:
            return produce(state, draft => {
                draft.isNoteActive = action.payload
            })
        case NotifyActionsType.IS_NOTE_REPEAT:
            return produce(state, draft => {
                draft.isNoteRepeat = action.payload
            })
        case NotifyActionsType.NOTE_TEXT:
            return produce(state, draft => {
                draft.noteText = action.payload
            })
        case NotifyActionsType.CLEAR:
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