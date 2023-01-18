import React, {useContext, useEffect, useReducer, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Tabber from "./components/tabber/tabber";
import Header from "./components/header/header";
import Groups from "./components/groups/groups";
import Notify, {TimeBefore} from "./components/notify/notify";
import Note from "./components/note/note";

import './style/common/notification.scss'

import {AppContext} from "../../app";
import {notifState} from "./reducer/state/notif.state";
import {NotifActionsType} from "./reducer/interface/notif.state";
import {ReduxNotificationsAction} from "../../../redux/reducers/notifications/action/notification.action";

import {notifReducer} from "./reducer/notif.reducer";
import {ReduxNotificationSelector} from "../../../redux/reducers/notifications/selector/notification.selector";

export const NotifyContext = React.createContext(null)

const parseTime = (time: TimeBefore): string => {
    switch (time) {
        case "5m":
            return "00:05"
        case "15m":
            return "00:15"
        case "30m":
            return "00:30"
        case "1h":
            return "01:00"
        case "1d":
            return "24:00"
        default:
            return "unk"
    }
}


const Notification = () => {

    const appContext = useContext(AppContext)

    const isNotifyOpen = useSelector(appContext.reduxApi.getNotifPopUpState())

    const [containerHeight, setContainerHeight] = useState<number>(0)

    const [notification, dispatchNotification] = useReducer(notifReducer, notifState)

    const dispatch = useDispatch()

    useEffect(() => {
        const header = document.querySelector('.notification__header')
        const headerHeight = header.clientHeight
        const winHeight = window.screen.availHeight
        setContainerHeight(winHeight - headerHeight)
    }, [])

    const onClose = () => {
        if (notification.isNotifyActive) {
            dispatch(ReduxNotificationsAction.changeNotificationNotify({
                isRepeat: notification.isNotifyRepeat,
                time: parseTime(notification.timeBefore)
            }))
        } else {
            dispatch(ReduxNotificationsAction.changeNotificationNotify(null))
        }

        if (notification.isNoteActive) {
            dispatch(ReduxNotificationsAction.changeNotificationNote({
                isRepeat: notification.isNoteRepeat,
                text: notification.noteText
            }))
        } else {
            dispatch(ReduxNotificationsAction.changeNotificationNote(null))
        }

        dispatch(ReduxNotificationsAction.notifyCloseAction())
        dispatch(ReduxNotificationsAction.deleteInputData())
        dispatchNotification({
            type: NotifActionsType.CLEAR,
            payload: null
        })
    }

    return (
        <NotifyContext.Provider value={{
            notif: notification,
            dispatch: dispatchNotification
        }}>
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
                        <Tabber onClose={onClose}/>
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
        </NotifyContext.Provider>
    );
};

export default Notification;