import {NotifActionsType} from "./notif.state";

export interface INotifAction {
    type: NotifActionsType,
    payload: any
}