import store from "../core/redux/store/store";

import ReduxTimeTableAction from "../core/redux/reducers/timetable/action/timetable.action";
import {ReduxAddonPage} from "../core/redux/reducers/addonPage/action/addonPage.action";
import {ReduxNotificationsAction} from "../core/redux/reducers/notifications/action/notification.action";


class AppApi {
    setTimetable(timetable) {
        let timetableObj = undefined
        try {
            timetableObj = JSON.parse(timetable)
        } catch (e) {
            timetableObj = timetable
        }

        store.dispatch(ReduxTimeTableAction.setTimetable(timetableObj))

        setTimeout(() => {
            store.dispatch(ReduxTimeTableAction.setParsedTimetable())
        }, 500)

        return "OK"
    }

    setNotifications(notifications: any) {
        let notifs = undefined

        try {
            notifs = JSON.parse(notifications)
        } catch (e) {
            notifs = notifications
        }

        store.dispatch(ReduxNotificationsAction.addNotificationList(notifs))

        return "OK"
    }

    getNotifications() {
        const notifs = {
            lessons: []
        }

        notifs.lessons = store.getState().notifications.notifications

        return JSON.stringify(notifs)
    }

    addonPage() {
        store.dispatch(ReduxAddonPage.addonPageYes())
    }
    mainPage() {
        store.dispatch(ReduxAddonPage.addonPageNo())
    }
}

export function createAppApi() {
    Object.defineProperty(window, 'appApi', {
        value: new AppApi()
    })
}