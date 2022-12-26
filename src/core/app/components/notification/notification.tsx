import React, {useContext, useEffect} from 'react';
import {useSelector} from "react-redux";

import Tabber from "./components/tabber/tabber";
import Header from "./components/header/header";
import Groups from "./components/groups/groups";
import Notify from "./components/notify/notify";

import './style/common/notification.scss'

import {AppContext} from "../../app";

const Notification = () => {

    const appContext = useContext(AppContext)

    const isNotifyOpen = useSelector(appContext.reduxApi.getNotifPopUpState())

    return (
        <div className={'notification'}>
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
                <div className={'notification__container'}>
                    <div className={'notification__groups'}>
                        <Groups/>
                    </div>
                    <div className={'notification__notify'}>
                        <Notify/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;