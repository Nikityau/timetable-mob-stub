import {TabType} from "../../interface/lesson-card.types";

export interface ITabState {
    activeTab: TabType,
    switchToTab: TabType,
    isCanClose: boolean,
    isNoContact: boolean
}