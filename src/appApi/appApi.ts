import store from "../core/redux/store/store";

import ReduxTimeTableAction from "../core/redux/reducers/timetable/action/timetable.action";

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
}

export function createAppApi() {
    Object.defineProperty(window, 'appApi', {
        value: new AppApi()
    })
}