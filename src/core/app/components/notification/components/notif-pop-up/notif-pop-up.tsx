import React, {useState} from 'react';

import {INotifePopUp} from "./interface/notife-pop-up";

import NotifHeader from "./components/notif-header/notif-header";
import NotifMain from "./components/notif-main/notif-main";

import './style/common/notif-pop-up.scss'

const NotifPopUp = ({isOpen}:INotifePopUp) => {

    return (
        <div className={[
            'notification__notif-pop-up notif-pop-up',
            isOpen
                ? 'notification_notif_window_open'
                : 'notification_notif_window_close'
        ].join(' ')}>
            <div className={'notif-pop-up__container'}>
                <NotifHeader/>
                <NotifMain/>
            </div>
        </div>
    );
};

export default NotifPopUp;