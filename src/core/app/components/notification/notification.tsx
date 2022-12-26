import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import Tabber from "./components/tabber/tabber";
import Header from "./components/header/header";
import Groups from "./components/groups/groups";
import Notify from "./components/notify/notify";
import Note from "./components/note/note";

import './style/common/notification.scss'

import {AppContext} from "../../app";

const Notification = () => {

    const appContext = useContext(AppContext)

    const isNotifyOpen = useSelector(appContext.reduxApi.getNotifPopUpState())

    const [containerHeight, setContainerHeight] = useState<number>(0)

    useEffect(() => {
        const header = document.querySelector('.notification__header')
        const headerHeight = header.clientHeight
        const winHeight = window.screen.availHeight
        setContainerHeight(winHeight - headerHeight)
    }, [])

    return (
        <div className={[
            'notification',
            isNotifyOpen
                ? 'notification_open'
                : 'el_disable'
        ].join(' ')}>
            <div className={[
                'notification__main',
                isNotifyOpen
                    ? 'notification__main_open'
                    : ''
            ].join(' ')}>
                <div className={'notification__header'}>
                    <Tabber/>
                    <Header/>
                </div>
                <div className={'notification__container'}
                    style={{
                        height: `${containerHeight}px`
                    }}
                >
                    <div className={'notification__groups'}>
                        <Groups/>
                    </div>
                    <div className={'notification__notify'}>
                        <Notify/>
                    </div>
                    <div className={'notification__note'}>
                        <Note/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;