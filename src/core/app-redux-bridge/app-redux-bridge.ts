import Dates from "../utils/namespaces/dates";

import {IReduxApi} from "./interface/redux";
import {ThemeState} from "../redux/reducers/theme/interface/theme.state";

export class AppReduxBridge {
    private reduxApi: IReduxApi

    constructor(reduxApi: IReduxApi) {
        this.reduxApi = reduxApi
    }

    getDateNow() {
        return (state: any): Dates.DateObj => {
            return this.reduxApi.getDateNow(state)
        }
    }
    getDateCurrent()  {
        return (state: any):Dates.DateObj => {
            return this.reduxApi.getDateCurrent(state)
        }
    }
    setDateInit() {
        return this.reduxApi.setDateInit()
    }
    setDateCurrent(payload: Dates.DateObj) {
        return this.reduxApi.setDateCurrent(payload)
    }
    setDateCurrentByNow() {
        return this.reduxApi.setDateCurrentByNow()
    }

    getTheme() {
        return (state: any): ThemeState => {
            return this.reduxApi.getTheme(state)
        }
    }
    setThemeDefault() {
        return this.reduxApi.setThemeDefault()
    }

    getTimetable() {
        return (state: any) => {
            return this.reduxApi.getTimetable(state)
        }
    }
    getGroupTitle() {
        return (state: any) => {
            return this.reduxApi.getGroupTitle(state)
        }
    }
    setTimeTableInit() {
        return this.reduxApi.setTimetableInit()
    }
    setTimetableParsed() {
        return this.reduxApi.setTimetableParsed()
    }

    getNotifPopUpState() {
        return (state:any) => {
            return this.reduxApi.getNotifPopUpState(state)
        }
    }

    getIsAddonPage() {
        return (state:any): boolean => {
            return this.reduxApi.getIsAddonPage(state)
        }
    }

    getRingsState() {
        return (state):boolean => {
            return this.reduxApi.getRingsScheduleState(state)
        }
    }
    setRingsState(payload: boolean) {
        return this.reduxApi.setRingsScheduleState(payload)
    }

    setNotificationState(payload: boolean) {
        return this.reduxApi.setNotificationState(payload)
    }
}