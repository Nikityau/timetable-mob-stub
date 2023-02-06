import {useEffect, useReducer, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getNotifPopUpState} from "../../store/selector/notif.selector";
import {notifyReducer} from "../../components/notification/reducer/notif.reducer";

import {notifyState} from "../../components/notification/reducer/state/notify.state";
import {NotifyActionsType} from "../../components/notification/reducer/action/notify.action";
import {store} from "../../../../store";

import {parseTime} from "../parseTime";
import {
    addNotification, changeNotificationNote, changeNotificationNotify, deleteInputData,
    notifyCloseAction,
    notifyOpenAction,
    setNotificationInputData
} from "../../store/action/notif.action";

import Event from "../../../../helpers/event/event";
import SwipeController from "../../controllers/swipe.controller";
import {
    dispatchNotificationF
} from "../../components/notification/reducer/helpers/dispatchNotification";

const swipeController = new SwipeController()

export const useNotification = () => {
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
        swipeController.closeHandler = onClose
    }, [notification])

    const checkNotification = () => {
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
            dispatchNotificationF(dispatchNotification, isFind)
        } else {
            const date = store.getState().date

            const nowDate = new Date(date['now']['timestamp'])
            const currentDate = new Date(date['current']['timestamp'])

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
                        dispatchNotificationF(dispatchNotification, note)

                        return
                    }
                }
            }
        }
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
        checkNotification()
    }

    function onOpen() {
        dispatch(notifyOpenAction())
        swipeController.open()
    }

    function onClose() {
        dispatch(notifyCloseAction())
        if (notification.isNotifyActive) {
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
        })
    }

    return {
        isNotifyOpen,
        notification,
        dispatchNotification,
        ref:el,
        swipe: {
            onTouchStart: swipeController.onTouchStart,
            onTouchMove: swipeController.onTouchMove,
            onTouchEnd: swipeController.onTouchEnd,
            scroll: {
                onScroll: swipeController.scrollController.onScroll
            }
        }
    }
}