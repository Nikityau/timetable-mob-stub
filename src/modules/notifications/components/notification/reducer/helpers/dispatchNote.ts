import {Note} from "../../../../store/interface/notification";
import {NotifyActionsType} from "../action/notify.action";

export const dispatchNote = (dispatcher, note: Note) => {
    dispatcher({
        type: NotifyActionsType.IS_NOTE_ACTIVE,
        payload: true
    })
    dispatcher({
        type: NotifyActionsType.IS_NOTE_REPEAT,
        payload: note.note.isRepeat
    })
    dispatcher({
        type: NotifyActionsType.NOTE_TEXT,
        payload: note.note.text
    })
}