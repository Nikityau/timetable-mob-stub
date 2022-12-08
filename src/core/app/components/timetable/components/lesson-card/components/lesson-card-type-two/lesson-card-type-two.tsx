import React, {useState} from 'react';

import './style/common/lesson-card-type-two.scss'

type TabType = 'left' | 'right'

const LessonCardTypeTwo = () => {

    const [isNoContact, setIsNoContact] = useState<boolean>(false)

    const [activeTab, setActiveTab] = useState<TabType>('left')
    const [switchToTab, setSwitchToTab] = useState<TabType>('right')
    const [isCanClose, setIsCanClose] = useState<boolean>(true)

    const tabChange = (tab: TabType) => {
        return () => {
            if(activeTab == tab) return

            setIsNoContact(true)
            setActiveTab(tab)
            setIsCanClose(false)

            setTimeout(() => {
                setIsCanClose(true)
            }, 400)

            setTimeout(() => {
                setIsNoContact(false)
                if(tab == 'left') {
                    setSwitchToTab('right')
                } else {
                    setSwitchToTab('left')
                }

            }, 600)
        }
    }

    return (
        <div className={'lesson-card-tabpen'}>
            <div className={'lesson-card-tabpen__container'}>
                <div className={
                    [
                        'tabpen__tab tabpen__tab_left',
                        activeTab == 'left'
                            ? 'tabpen__tab_active'
                            : 'tabpen__tab_inactive',
                        isNoContact
                            ? 'tabpen__tab_not_contact'
                            : 'tabpen__tab_can_contact',
                        switchToTab == 'left'
                            ? 'tabpen__tab_upper'
                            : 'tabpen__tab_lower',
                        activeTab != 'left' && isCanClose
                            ? 'tabpen__tab_inactive_close tabpen__tab_left_inactive'
                            : ''
                    ].join(' ')
                }>
                    <div className={'tabpen__tab__tab-spec-container tabpen__tab_left'}>
                        <div className={'tabpen__tab-headers'}>
                            <div className={'tabpen__tab-header tabpen__tab-header_left'}
                                 onClick={tabChange('left')}
                            >
                                <span>Практика</span>
                            </div>
                            <div className={'tabpen__tab-header tabpen__tab-header_right'}
                                 onClick={tabChange('right')}
                            >
                                <span>Лекция</span>
                            </div>
                        </div>
                        <div className={'tabpen__tab-content'}>
                            ANOTHER ONE
                        </div>
                    </div>
                </div>
                <div className={[
                    'tabpen__tab tabpen__tab_right',
                    activeTab == 'right'
                        ? 'tabpen__tab_active'
                        : 'tabpen__tab_inactive',
                    isNoContact
                        ? 'tabpen__tab_not_contact'
                        : 'tabpen__tab_can_contact',
                    switchToTab == 'right'
                        ? 'tabpen__tab_upper'
                        : 'tabpen__tab_lower',
                    activeTab != 'right' && isCanClose
                        ? 'tabpen__tab_inactive_close tabpen__tab_right_inactive'
                        : ''
                ].join(' ')}>
                    <div className={'tabpen__tab__tab-spec-container tabpen__tab_right'}>
                        <div className={'tabpen__tab-headers'}>
                            <div className={'tabpen__tab-header tabpen__tab-header_left'}
                                 onClick={tabChange('left')}
                            >
                                <span>Практика</span>
                            </div>
                            <div className={'tabpen__tab-header tabpen__tab-header_right'}
                                 onClick={tabChange('right')}
                            >
                                <span>Лекция</span>
                            </div>
                        </div>
                        <div className={'tabpen__tab-content'}>
                            AND ANOTHER ONE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonCardTypeTwo;