import {TabType} from "../../type/tab.type";
import {TabState} from "../state/tab.state";
import {TabAction, TabActionType} from "../action/tab.action";

export const tabReducer = (state: TabState, action: TabAction):TabState => {
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