import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import store from "../../../redux/store/store";

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

import ISwipe from "./controller/interface/swipe.interface";

import SwipeController from "./controller/swipe.controller";

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
const parseTimeBack = (time: string): TimeBefore => {
    switch (time) {
        case "00:05":
            return '5m'
        case "00:15":
            return '15m'
        case "00:30":
            return '30m'
        case "01:00":
            return '1h'
        case "24:00":
            return '1d'
        default:
            return 'unk'
    }
}

const swipeController: ISwipe = new SwipeController()

const Notification = () => {

    const el = useRef<HTMLDivElement>(undefined)

    const appContext = useContext(AppContext)

    const isNotifyOpen = useSelector(appContext.reduxApi.getNotifPopUpState())

    const [containerHeight, setContainerHeight] = useState<number>(0)

    const [notification, dispatchNotification] = useReducer(notifReducer, notifState)

    const dispatch = useDispatch()

    useEffect(() => {
        swipeController.setElement(el.current)
    }, [])

    useEffect(() => {
        const header = document.querySelector('.notification__header')
        const headerHeight = header.clientHeight
        const winHeight = window.screen.availHeight
        setContainerHeight(winHeight - headerHeight)
    }, [])

    useEffect(() => {
        checkNotification()

        if (isNotifyOpen) {
            swipeController.open()
        }

    }, [isNotifyOpen])

    useEffect(() => {
        swipeController.closeHandler = onClose
    }, [notification])

    const checkNotification = () => {
        console.log(isNotifyOpen)
        if (!isNotifyOpen) return

        const notif = store.getState().notifications
        const notifs = notif.notifications
        const inputData = notif.inputData

        const isFind = notifs.find(note => {
            if (
                note.id == inputData.id &&
                note.dateRu == inputData.dateRu &&
                note.lesson.week_day == inputData.lesson.week_day &&
                note.lesson.lesson_number == inputData.lesson.lesson_number &&
                note.lesson.week_type == inputData.lesson.week_type
            )
                return note
        })

        if (isFind.notify != null || isFind.note != null) {
            if (isFind.notify) {
                dispatchNotification({
                    type: NotifActionsType.IS_NOTIFY_ACTIVE,
                    payload: true
                })
                dispatchNotification({
                    type: NotifActionsType.IS_NOTIFY_REPEAT,
                    payload: isFind.notify.isRepeat
                })
                dispatchNotification({
                    type: NotifActionsType.TIME_BEFORE,
                    payload: parseTimeBack(isFind.notify.time)
                })
            }
            if (isFind.note) {
                dispatchNotification({
                    type: NotifActionsType.IS_NOTE_ACTIVE,
                    payload: true
                })
                dispatchNotification({
                    type: NotifActionsType.IS_NOTE_REPEAT,
                    payload: isFind.note.isRepeat
                })
                dispatchNotification({
                    type: NotifActionsType.NOTE_TEXT,
                    payload: isFind.note.text
                })
            }
        } else {
            const nowDate = new Date(store.getState().date['now']['timestamp'])
            const currentDate = new Date(store.getState().date['current']['timestamp'])

            for (let note of notifs) {
                if (
                    note.id == inputData.id &&
                    note.lesson.week_day == inputData.lesson.week_day &&
                    note.lesson.lesson_number == inputData.lesson.lesson_number &&
                    note.lesson.week_type == inputData.lesson.week_type
                ) {
                    if (
                        note.notify != null &&
                        currentDate >= nowDate
                    ) {
                        dispatchNotification({
                            type: NotifActionsType.IS_NOTIFY_ACTIVE,
                            payload: true
                        })
                        dispatchNotification({
                            type: NotifActionsType.IS_NOTIFY_REPEAT,
                            payload: note.notify.isRepeat
                        })
                        dispatchNotification({
                            type: NotifActionsType.TIME_BEFORE,
                            payload: parseTimeBack(note.notify.time)
                        })

                        if (note.note != null) {
                            dispatchNotification({
                                type: NotifActionsType.IS_NOTE_ACTIVE,
                                payload: true
                            })
                            dispatchNotification({
                                type: NotifActionsType.IS_NOTE_REPEAT,
                                payload: note.note.isRepeat
                            })
                            dispatchNotification({
                                type: NotifActionsType.NOTE_TEXT,
                                payload: note.note.text
                            })
                        }

                        return
                    }
                }
            }
        }

    }

    function onClose() {
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
                        : 'notification__main_close'
                ].join(' ')}
                     ref={el}

                     onTouchStart={swipeController.onTouchStart}
                     onTouchMove={swipeController.onTouchMove}
                     onTouchEnd={swipeController.onTouchEnd}
                     style={{
                         transform: `translate(0px, ${isNotifyOpen ? 0 : 100}%)`
                     }}
                >
                    <div className={'notification__header'}>
                        <Tabber/>
                        <Header/>
                    </div>
                    <div className={'notification__container'}
                         style={{
                             height: `${containerHeight}px`
                         }}
                         onScroll={swipeController.scrollController.onScroll}
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