import { INotifState } from "../interface/notif.state";

export const notifState: INotifState = {
    isNotifyActive: false,
    isNotifyRepeat: false,
    timeBefore: "unk",
    isNoteActive: false,
    isNoteRepeat: false,
    noteText: "",
    close: () => {}
}