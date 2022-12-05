import {Action} from "redux";

import ReduxDateAction from "../date.actions";

import Dates from "../../../../utils/namespaces/dates";

export interface IDateAction extends Action {
    type: ReduxDateAction.DateActions,
    payload?: Dates.DateObj
}