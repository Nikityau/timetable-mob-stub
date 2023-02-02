import {TabType} from "../../type/tab.type";

export interface TabState {
    activeTab: TabType,
    switchToTab: TabType,
    isCanClose: boolean,
    isNoContact: boolean
}

export const initTabState: TabState = {
    activeTab: 'left',
    switchToTab: 'right',
    isNoContact: false,
    isCanClose: true
}