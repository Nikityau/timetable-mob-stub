import {TimeBefore} from "../../components/notify/notify";

export enum NotifActionsType {
    IS_NOTIFY_ACTIVE = "notify/isNotifyActive",
    IS_NOTIFY_REPEAT = "notify/isNotifyRepeat",
    TIME_BEFORE = "notify/timeBefore",
    IS_NOTE_ACTIVE = "notify/isNoteActive",
    IS_NOTE_REPEAT = "notify/isNoteRepeat",
    NOTE_TEXT = "notify/noteText",
    CLEAR = "notify/clear"
}

export interface INotifState {
    isNotifyActive: boolean,
    isNotifyRepeat: boolean,
    timeBefore: TimeBefore,
    isNoteActive: boolean,
    isNoteRepeat: boolean,
    noteText: string
    close: () => void
}