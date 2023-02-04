import React, {useContext, useEffect, useReducer, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import cn from 'classnames'

import {HeightHoc} from "../../../../helpers/height-hoc/height-hoc";

import {getNotifPopUpState} from "../../store/selector/notif.selector";

import {notifyState} from "./reducer/state/notify.state";
import {notifyReducer} from "./reducer/notif.reducer";

import Notify from "../notify/notify";
import Tabber from "../tabber/tabber";
import Groups from "../groups/groups";
import Header from "../header/header";
import Note from "../note/note";

import './style/notification.scss'

import Event from "../../../../helpers/event/event";

import SwipeController from "../../controllers/swipe.controller";

import {NotifyActionsType} from "./reducer/action/notify.action";
import {parseTime, parseTimeBack} from "../../helpers/parseTime";
import {
    addNotification,
    changeNotificationNote,
    changeNotificationNotify,
    deleteInputData,
    notifyCloseAction, notifyOpenAction, setNotificationInputData
} from "../../store/action/notif.action";

import {store} from "../../../../store";


export const NotifyContext = React.createContext(null)

const swipeController = new SwipeController()
const Notification = () => {
    const el = useRef<HTMLDivElement>(undefined)

    const isNotifyOpen = useSelector(getNotifPopUpState)

    const [notification, dispatchNotification] = useReducer(notifyReducer, notifyState)

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubOpen = Event.on('openNotification', onOpen)
        const unsubInputData = Event.on('notificationInputData', onInputData)

        return () => {
            unsubOpen()
            unsubInputData()
        }
    }, [])

    useEffect(() => {
        swipeController.setElement(el.current)
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
        //if (!isNotifyOpen) return

        /*const notif = store.getState().notifications
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
                    type: NotifyActionsType.IS_NOTIFY_ACTIVE,
                    payload: true
                })
                dispatchNotification({
                    type: NotifyActionsType.IS_NOTIFY_REPEAT,
                    payload: isFind.notify.isRepeat
                })
                dispatchNotification({
                    type: NotifyActionsType.TIME_BEFORE,
                    payload: parseTimeBack(isFind.notify.time)
                })
            }
            if (isFind.note) {
                dispatchNotification({
                    type: NotifyActionsType.IS_NOTE_ACTIVE,
                    payload: true
                })
                dispatchNotification({
                    type: NotifyActionsType.IS_NOTE_REPEAT,
                    payload: isFind.note.isRepeat
                })
                dispatchNotification({
                    type: NotifyActionsType.NOTE_TEXT,
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
                            type: NotifyActionsType.IS_NOTIFY_ACTIVE,
                            payload: true
                        })
                        dispatchNotification({
                            type: NotifyActionsType.IS_NOTIFY_REPEAT,
                            payload: note.notify.isRepeat
                        })
                        dispatchNotification({
                            type: NotifyActionsType.TIME_BEFORE,
                            payload: parseTimeBack(note.notify.time)
                        })

                        if (note.note != null) {
                            dispatchNotification({
                                type: NotifyActionsType.IS_NOTE_ACTIVE,
                                payload: true
                            })
                            dispatchNotification({
                                type: NotifyActionsType.IS_NOTE_REPEAT,
                                payload: note.note.isRepeat
                            })
                            dispatchNotification({
                                type: NotifyActionsType.NOTE_TEXT,
                                payload: note.note.text
                            })
                        }

                        return
                    }
                }
            }
        }*/

    }

    const onInputData = ({lesson, id, date}) => {
        dispatch(setNotificationInputData({
            lesson,
            id,
            date
        }))
        dispatch(addNotification({
            date: new Date(date.timestamp),
            id,
            lesson
        }))
    }

    function onOpen() {
        dispatch(notifyOpenAction())
    }

    function onClose() {
        dispatch(notifyCloseAction())
        /* if (notification.isNotifyActive) {
             dispatch(changeNotificationNotify({
                 isRepeat: notification.isNotifyRepeat,
                 time: parseTime(notification.timeBefore)
             }))
         } else {
             dispatch(changeNotificationNotify(null))
         }

         if (notification.isNoteActive) {
             dispatch(changeNotificationNote({
                 isRepeat: notification.isNoteRepeat,
                 text: notification.noteText
             }))
         } else {
             dispatch(changeNotificationNote(null))
         }

         dispatch(notifyCloseAction())
         dispatch(deleteInputData())
         dispatchNotification({
             type: NotifyActionsType.CLEAR,
             payload: null
         })*/
    }

    return (
        <NotifyContext.Provider value={{
            notif: notification,
            dispatch: dispatchNotification
        }}>
            <div className={cn(
                'notification',
                isNotifyOpen
                    ? 'notification_open'
                    : 'el_disable'
            )}>
                <div className={cn(
                    'notification__main',
                    isNotifyOpen
                        ? 'notification__main_open'
                        : ''
                )}
                     ref={el}
                     onTouchStart={swipeController.onTouchStart}
                     onTouchMove={swipeController.onTouchMove}
                     onTouchEnd={swipeController.onTouchEnd}
                >
                    <div className={'notification__header'}>
                        <Tabber/>
                        <Header/>
                    </div>
                    <HeightHoc
                        classNames={['.notification__header']}
                        component={(h) => (
                            <div className={'notification__container'}
                                 style={{
                                     height: `${h}px`
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
                        )}
                    />
                </div>
            </div>
        </NotifyContext.Provider>
    );
};

export default Notification;
