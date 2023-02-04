
export interface NotifyAction {
    type: NotifyActionsType,
    payload: any
}

export enum NotifyActionsType {
    IS_NOTIFY_ACTIVE = "notify/isNotifyActive",
    IS_NOTIFY_REPEAT = "notify/isNotifyRepeat",
    TIME_BEFORE = "notify/timeBefore",
    IS_NOTE_ACTIVE = "notify/isNoteActive",
    IS_NOTE_REPEAT = "notify/isNoteRepeat",
    NOTE_TEXT = "notify/noteText",
    CLEAR = "notify/clear"
}