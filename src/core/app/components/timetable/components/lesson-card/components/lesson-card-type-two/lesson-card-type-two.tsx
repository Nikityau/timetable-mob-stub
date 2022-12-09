import React, {useReducer, useState} from 'react';

import Tab from "./components/tab/tab";
import {tabReducer} from "./reducer/reducer/tab.reducer";
import {initTabState} from "./reducer/state/tab-state";

import {TabController} from "./tab-controller/tab-controller";
import {TabActionType} from "./reducer/action/tab.action.type";

import './style/common/lesson-card-type-two.scss'
import './style/common/_/_animation.scss'
import './style/common/_/_active.scss'
import './style/common/_/_position.scss'
import './style/common/_/_header.scss'
import './style/common/_/_contact.scss'
import './style/common/_/_addon.scss'

export type TabType = 'left' | 'right'
export type domClass = string

interface ILessonCard {
    subgroupOne: {
        lessonType: string,
        discipline: string,
        teachers: any[],
        offices: any[]
    },
    subgroupTwo: {
        lessonType: string,
        discipline: string,
        teachers: any[],
        offices: any[]
    }
}

const LessonCardTypeTwo = ({subgroupOne, subgroupTwo}: ILessonCard) => {

    const [state, dispatch] = useReducer(tabReducer, initTabState)
    //const [tabController, setTabController] = useState(new TabController(state, dispatch()))

    const tabChange = (tab: TabType) => {
        return () => {
            if (state.activeTab == tab) return
            dispatch({
                type: TabActionType.SET_ACTIVE_CLOSE_CONTACT,
                payload: {
                    activeTab: tab,
                    isNoContact: true,
                    isCanClose: false
                }
            })

            setTimeout(() => {
                dispatch({type: TabActionType.SET_IS_CAN_CLOSE, payload: true})
            }, 300)

            setTimeout(() => {
                dispatch({type: TabActionType.SET_IS_NO_CONTACT, payload: false})
                if (tab == 'left') {
                    dispatch({type: TabActionType.SET_SWITCH_TO_TAB, payload: 'right'})
                } else {
                    dispatch({type: TabActionType.SET_SWITCH_TO_TAB, payload: 'left'})
                }

            }, 350)
        }
    }

    const activeTabClass = (tab: TabType): domClass => {
        return state.activeTab == tab
            ? 'tabpen__tab_active tabpen__tab_animation_on'
            : 'tabpen__tab_inactive'
    }
    const contactTabClass = (): domClass => {
        return state.isNoContact
            ? 'tabpen__tab_not_contact'
            : 'tabpen__tab_can_contact'
    }
    const switchToTabClass = (tab: TabType): domClass => {
        return state.switchToTab == tab
            ? 'tabpen__tab_upper'
            : 'tabpen__tab_lower'
    }
    const closeTabClass = (tab: TabType): domClass => {
        return state.activeTab != tab && state.isCanClose
            ? [
                'tabpen__tab_inactive_close',
                tab == 'left'
                    ? 'tabpen__tab_left_inactive'
                    : 'tabpen__tab_right_inactive',
                'tabpen__tab_animation_off'
            ].join(' ')
            : ''
    }

    return (
        <div className={'lesson-card-tabpen'}>
            <div className={'lesson-card-tabpen__container'}>
                <Tab
                    tabType={'left'}
                    activeTabClass={activeTabClass}
                    contactTabClass={contactTabClass}
                    switchToTabClass={switchToTabClass}
                    closeTabClass={closeTabClass}
                    tabChangeLeft={tabChange('left')}
                    tabChangeRight={tabChange('right')}
                    data={{
                        tabOneTitle: subgroupOne.lessonType,
                        tabTwoTitle: subgroupTwo.lessonType,
                        tabContent: {
                            offices: subgroupOne.offices,
                            teachers: subgroupOne.teachers,
                            discipline: subgroupOne.discipline
                        }
                    }}
                />
                <Tab
                    tabType={'right'}
                    activeTabClass={activeTabClass}
                    contactTabClass={contactTabClass}
                    switchToTabClass={switchToTabClass}
                    closeTabClass={closeTabClass}
                    tabChangeLeft={tabChange('left')}
                    tabChangeRight={tabChange('right')}
                    data={{
                        tabOneTitle: subgroupOne.lessonType,
                        tabTwoTitle: subgroupTwo.lessonType,
                        tabContent: {
                            offices: subgroupTwo.offices,
                            teachers: subgroupTwo.teachers,
                            discipline: subgroupTwo.discipline
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default LessonCardTypeTwo;