import Dates from "../../utils/namespaces/dates";

import {ThemeState} from "../../redux/reducers/theme/interface/theme.state";
import {IDateAction} from "../../redux/reducers/date/interface/date.interface";
import {IThemeAction} from "../../redux/reducers/theme/interface/theme.action";
import {ITimetableAction} from "../../redux/reducers/timetable/interface/timetable.action";

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
}