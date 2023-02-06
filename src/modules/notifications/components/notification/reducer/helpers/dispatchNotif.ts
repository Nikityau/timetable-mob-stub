import {Note} from "../../../../store/interface/notification";

import {NotifyActionsType} from "../action/notify.action";

export const dispatchNotif = (dispatcher, note: Note) => {
    dispatcher({
        type: NotifyActionsType.IS_NOTIFY_ACTIVE,
        payload: true
    })
    dispatcher({
        type: NotifyActionsType.IS_NOTIFY_REPEAT,
        payload: note.notify.isRepeat
    })
    dispatcher({
        type: NotifyActionsType.TIME_BEFORE,
        payload: note.notify.isRepeat
    })
}