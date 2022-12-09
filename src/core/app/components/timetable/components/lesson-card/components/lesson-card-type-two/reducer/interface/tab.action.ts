import {TabActionType} from "../action/tab.action.type";
import {TabType} from "../../interface/lesson-card.types";

export interface ITabAction {
    type: TabActionType,
    payload?: boolean | TabType | any
}