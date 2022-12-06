import {Action} from "redux";

import ReduxDateAction from "../action/date.action";

import Dates from "../../../../utils/namespaces/dates";

export interface IDateAction extends Action {
    type: ReduxDateAction.DateAction,
    payload?: Dates.DateObj
}