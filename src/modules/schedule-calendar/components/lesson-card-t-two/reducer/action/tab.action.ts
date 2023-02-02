import {TabType} from "../../type/tab.type";

export enum TabActionType {
    SET_ACTIVE_TAB = 'tab/setActiveTab',
    SET_SWITCH_TO_TAB = 'tab/setSwitchToTab',
    SET_IS_NO_CONTACT = 'tab/setIsNoContact',
    SET_IS_CAN_CLOSE = 'tab/setIsCanClose',
    SET_ACTIVE_CLOSE_CONTACT = 'tab/setActiveCloseContact'
}

export interface TabAction {
    type: TabActionType,
    payload: boolean | TabType | any | null
}