import React from 'react';
import TabCardHeader from "../tab-card-header/tab-card-header";
import TabCardContent from "../tab-card-content/tab-card-content";
import {domClass, TabType} from "../../lesson-card-type-two";

interface ITab {
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

const Tab = (
    {
        tabType,
        activeTabClass,
        contactTabClass,
        switchToTabClass,
        closeTabClass,
        tabChangeLeft,
        tabChangeRight,
        data
    }: ITab
) => {
    return (
        <div className={
            [
                'tabpen__tab',
                tabType == 'left'
                    ? 'tabpen__tab_left'
                    : 'tabpen__tab_right',
                activeTabClass(tabType),
                contactTabClass(),
                switchToTabClass(tabType),
                closeTabClass(tabType)
            ].join(' ')
        }>
            <div className={[
                'tabpen__tab__tab-spec-container',
                tabType == 'left'
                    ? 'tabpen__tab_left'
                    : 'tabpen__tab_right'
            ].join(' ')}>
                <div className={'tabpen__tab-headers'}>
                    <TabCardHeader
                        classNames={['tabpen__tab-header_left']}
                        onClick={tabChangeLeft}
                        tabTitle={data.tabOneTitle}
                    />
                    <TabCardHeader
                        classNames={['tabpen__tab-header_right']}
                        onClick={tabChangeRight}
                        tabTitle={data.tabTwoTitle}
                    />
                </div>
                <TabCardContent
                    offices={data.tabContent.offices}
                    teachers={data.tabContent.teachers}
                    discipline={data.tabContent.discipline}
                />
            </div>
        </div>
    );
};

export default Tab;