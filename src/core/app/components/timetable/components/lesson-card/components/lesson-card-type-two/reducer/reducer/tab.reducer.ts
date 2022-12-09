import {ITabState} from "../interface/tab-state";
import {ITabAction} from "../interface/tab.action";

import {TabType} from "../../lesson-card-type-two";

import {TabActionType} from "../action/tab.action.type";

export const tabReducer = (state: ITabState, action: ITabAction):ITabState => {
    switch (action.type) {
        case TabActionType.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload as TabType
            }
        case TabActionType.SET_SWITCH_TO_TAB:
            return {
                ...state,
                switchToTab: action.payload as TabType
            }
        case TabActionType.SET_IS_CAN_CLOSE:
            return {
                ...state,
                isCanClose: action.payload as boolean
            }
        case TabActionType.SET_IS_NO_CONTACT:
            return {
                ...state,
                isNoContact: action.payload as boolean
            }
        case TabActionType.SET_ACTIVE_CLOSE_CONTACT:
            return {
                ...state,
                activeTab: action.payload['activeTab'],
                isNoContact: action.payload['isNoContact'],
                isCanClose: action.payload['isCanClose']
            }
        default:
            return state
    }
}