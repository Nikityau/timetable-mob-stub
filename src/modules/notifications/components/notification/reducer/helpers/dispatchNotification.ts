import {Note} from "../../../../store/interface/notification";

import {dispatchNotif} from "./dispatchNotif";
import {dispatchNote} from "./dispatchNote";

export const dispatchNotificationF = (dispatcher, note:Note) => {
    if (note.notify) {
        dispatchNotif(dispatcher, note)
    }
    if (note.note) {
        dispatchNote(dispatcher, note)
    }
}