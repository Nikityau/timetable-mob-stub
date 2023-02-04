import {TimeBefore} from "../../../../helpers/parseTime";

export interface NotifyState {
    isNotifyActive: boolean,
    isNotifyRepeat: boolean,
    timeBefore: TimeBefore,
    isNoteActive: boolean,
    isNoteRepeat: boolean,
    noteText: string
    close: () => void
}

export const notifyState: NotifyState = {
    isNotifyActive: false,
    isNotifyRepeat: false,
    timeBefore: "unk",
    isNoteActive: false,
    isNoteRepeat: false,
    noteText: "",
    close: () => {}
}