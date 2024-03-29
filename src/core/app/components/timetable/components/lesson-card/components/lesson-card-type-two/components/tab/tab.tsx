import React from 'react';

import TabCardHeader from "../tab-card-header/tab-card-header";
import TabCardContent from "../tab-card-content/tab-card-content";

import {ITab} from "./interface/tab";

const Tab = (
    {
        tabType,
        activeTabClass,
        contactTabClass,
        switchToTabClass,
        closeTabClass,
        tabChangeLeft,
        tabChangeRight,
        data,
        onCardClick
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