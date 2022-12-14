import React, {useEffect, useState} from 'react';

import {INotifMain} from "./interface/notif-main";

import NotifSubgroups from "./components/subgroups/notif-subgroups";
import NotifNotification from "./components/notification/notif-notification";

import './style/common/notif-main.scss'

const NotifMain = ({}: INotifMain) => {

    const [mainHeight, setMainHeight] = useState<number>(0)

    useEffect(() => {
        const notifHeader = document.querySelector('.notif-pop-up__header')
        const winHeight = window.screen.availHeight
        const notifHeaderHeight = notifHeader.clientHeight
        setMainHeight(winHeight - notifHeaderHeight)

    }, [])

    return (
        <div className={'notif-pop-up__main'}
            style={{
                height: `${mainHeight}px`
            }}
        >
            <div className={'notif-pop-up__main-container'}>
                <NotifSubgroups/>
                <NotifNotification/>
            </div>
        </div>
    );
};

export default NotifMain;