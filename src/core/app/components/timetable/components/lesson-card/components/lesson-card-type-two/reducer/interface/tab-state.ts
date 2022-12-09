import {TabType} from "../../lesson-card-type-two";

export interface ITabState {
    activeTab: TabType,
    switchToTab: TabType,
    isCanClose: boolean,
    isNoContact: boolean
}