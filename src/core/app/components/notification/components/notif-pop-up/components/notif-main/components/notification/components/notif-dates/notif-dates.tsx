import React, {useState} from 'react';

import NotifHeaderTab from "./components/notif-header-tab/notif-header-tab";
import NotifTabRing from "./components/norif-tab-ring/notif-tab-ring";
import NotifTabDate from "./components/notif-tab-date/notif-tab-date";
import NotifTabTime from "./components/notif-tab-time/notif-tab-time";

import './style/common/notif-dates.scss'

type Tab = 'ring' | 'date' | 'time'

const NotifDates = () => {

    const [tab, setTab] = useState<Tab>('ring')

    const isHeaderTabActive = (tabName: Tab): boolean => {
        return tab == tabName;
    }
    const isTabActive = (tabName:Tab):string => {
        if(tab == tabName) return ''

        return 'el_disable el_hide'
    }

    const onHeaderTabClick = (tabName: Tab) => {
        return () => {
            setTab(tabName)
        }
    }

    return (
        <div className={'notif-pop-up__notif-dates notif-dates'}>
            <div className={'notif-dates__container'}>
                <div className={'notif-dates__tabs-headers'}>
                    <NotifHeaderTab
                        className={'notif-dates__tab-ring'}
                        isTabActive={isHeaderTabActive('ring')}
                        onTabClick={onHeaderTabClick('ring')}
                    />
                    <NotifHeaderTab
                        className={'notif-dates__tab-date'}
                        isTabActive={isHeaderTabActive('date')}
                        onTabClick={onHeaderTabClick('date')}
                        text={'пн,10 окт.'}
                    />
                    <NotifHeaderTab
                        className={'notif-dates__tab-clock'}
                        isTabActive={isHeaderTabActive('time')}
                        onTabClick={onHeaderTabClick('time')}
                        text={'15:00'}
                    />
                </div>
                <div className={'notif-dates__tabs'}>
                    <div className={[
                        'notif-dates__tab',
                       isTabActive('ring')
                    ].join(' ')}>
                        <NotifTabRing/>
                    </div>
                    <div className={[
                        'notif-dates__tab',
                        isTabActive('date')
                    ].join(' ')}>
                        <NotifTabDate/>
                    </div>
                    <div className={[
                        'notif-dates__tab',
                        isTabActive('time')
                    ].join(' ')}>
                        <NotifTabTime/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotifDates;