import React from 'react';

import {domClass, TabType} from "./type/tab.type";

import TabCardHeader from './tab-card-header'
import TabCardContent from "./tab-card-content";

type TabProps = {
    tabType: TabType
    activeTabClass: (tab: TabType) => domClass,
    contactTabClass: () => domClass,
    switchToTabClass: (tab: TabType) => domClass,
    closeTabClass: (tab: TabType) => domClass,
    tabChangeLeft: () => void,
    tabChangeRight: () => void,
    onCardClick: () => void,
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

const Tab = ({
    tabType,
    activeTabClass,
    closeTabClass,
    contactTabClass,
    data,
    onCardClick,
    switchToTabClass,
    tabChangeLeft,
    tabChangeRight
}: TabProps) => {
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
                    onCardClick={onCardClick}
                    offices={data.tabContent.offices}
                    teachers={data.tabContent.teachers}
                    discipline={data.tabContent.discipline}
                    reverseColor={tabType == 'right'}
                />
            </div>
        </div>
    );
};

export default Tab;