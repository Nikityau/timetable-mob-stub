import {TabActionType} from "../action/tab.action.type";
import {TabType} from "../../lesson-card-type-two";

export interface ITabAction {
    type: TabActionType,
    payload?: boolean | TabType | any
}