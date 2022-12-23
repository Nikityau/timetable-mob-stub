import store from "../core/redux/store/store";

import ReduxTimeTableAction from "../core/redux/reducers/timetable/action/timetable.action";
import {ReduxAddonPage} from "../core/redux/reducers/addonPage/action/addonPage.action";

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

        return "XOCHU_PIZZA"
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