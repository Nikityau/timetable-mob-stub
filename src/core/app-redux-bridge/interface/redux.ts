import Dates from "../../utils/namespaces/dates";

import {ReduxRingsAction} from "../../redux/reducers/rings/action/rings.slice";
import {ReduxNotificationsAction} from "../../redux/reducers/notifications/action/notification.action";

import {ThemeState} from "../../redux/reducers/theme/interface/theme.state";
import {IDateAction} from "../../redux/reducers/date/interface/date.interface";
import {IThemeAction} from "../../redux/reducers/theme/interface/theme.action";
import {ITimetableAction} from "../../redux/reducers/timetable/interface/timetable.action";
import IRingsAction = ReduxRingsAction.IRingsAction;
import INotifyAction = ReduxNotificationsAction.INotifyAction;

export interface IReduxApi {
    getDateCurrent(state:any):Dates.DateObj
    getDateNow(state:any):Dates.DateObj
    setDateInit(): IDateAction
    setDateCurrent(payload: Dates.DateObj): IDateAction
    setDateCurrentByNow(): IDateAction

    getTheme(state:any):ThemeState
    setThemeDefault(): IThemeAction

    getTimetable(state:any): any
    getGroupTitle(state):any
    setTimetableInit(): ITimetableAction
    setTimetableParsed(): ITimetableAction

    getNotifPopUpState(state:any):boolean

    getIsAddonPage(state: any):boolean

    getRingsScheduleState(state): boolean
    setRingsScheduleState(payload: boolean):IRingsAction

    setNotificationState(payload): INotifyAction
}