import {Action} from "redux";
import {DateActions} from "../date-set.actions";

import {Dates} from "../../../../utils/namespaces/dates";

export interface IDateAction extends Action {
    type: DateActions,
    payload?: Dates.DateObj
}