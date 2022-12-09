import ReduxDateAction from "../reducers/date/action/date.action";
import ReduxDateSelector from "../reducers/date/selector/date.selector";

import ReduxTimeTableAction from "../reducers/timetable/action/timetable.action";
import ReduxTimeTableSelector from "../reducers/timetable/selector/timetable.selector";

import ReduxThemeAction from "../reducers/theme/action/theme.action";
import ReduxThemeSelector from "../reducers/theme/selector/theme.selector";

import {IReduxApi} from "../../app-redux-bridge/interface/redux";
import {ThemeState} from "../reducers/theme/interface/theme.state";

import Dates from "../../utils/namespaces/dates";
import {IDateAction} from "../reducers/date/interface/date.interface";
import {IThemeAction} from "../reducers/theme/interface/theme.action";
import {ITimetableAction} from "../reducers/timetable/interface/timetable.action";

namespace RAPI {
    export class ReduxApi implements IReduxApi {
        getDateNow(state:any): Dates.DateObj {
            return ReduxDateSelector.getDateNow(state)
        }
        getDateCurrent(state: any): Dates.DateObj {
            return ReduxDateSelector.getDateCurrent(state)
        }
        setDateInit():IDateAction {
            return ReduxDateAction.init()
        }
        setDateCurrent(payload: Dates.DateObj): IDateAction {
            return ReduxDateAction.dateCurrent(payload)
        }
        setDateCurrentByNow(): IDateAction {
            return ReduxDateAction.dateCurrentByNow()
        }

        getTheme(state: any): ThemeState {
            return ReduxThemeSelector.getTheme(state).state
        }
        setThemeDefault(): IThemeAction {
            return ReduxThemeAction.setDefault()
        }

        getTimetable(state:any) {
            return ReduxTimeTableSelector.getParsedData(state)
        }
        getGroupTitle(state): any {
            return ReduxTimeTableSelector.getGroupFullTitle(state)
        }
        setTimetableInit(): ITimetableAction {
            return ReduxTimeTableAction.init()
        }
        setTimetableParsed(): ITimetableAction {
            return ReduxTimeTableAction.setParsedTimetable()
        }
    }

    export const DateApi = {
        Action: ReduxDateAction,
        Selector: ReduxDateSelector
    }

    export const TimetableApi = {
        Action: ReduxTimeTableAction,
        Selector: ReduxTimeTableSelector
    }

    export const ThemeApi = {
        Action: ReduxThemeAction,
        Selector: ReduxThemeSelector
    }
}

export default RAPI