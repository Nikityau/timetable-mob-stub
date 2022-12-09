import {domClass, TabType} from "../../../interface/lesson-card.types";

export interface ITab {
    tabType: TabType
    activeTabClass: (tab: TabType) => domClass,
    contactTabClass: () => domClass,
    switchToTabClass: (tab: TabType) => domClass,
    closeTabClass: (tab: TabType) => domClass,
    tabChangeLeft: () => void,
    tabChangeRight: () => void,
    data: {
        tabOneTitle: string,
        tabTwoTitle: string,
        tabContent: {
            discipline: string,
            teachers: any[],
            offices: any[]
        }
    }
}