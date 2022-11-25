import {Action} from "redux";
import {DateActions} from "../date.actions";

export interface IDatePayload {
    weekday: string,
    date: string | number,
    month: string,
    year: string | number,
    full: string
}

export interface IDateAction extends Action {
    type: DateActions,
    payload?: IDatePayload
}