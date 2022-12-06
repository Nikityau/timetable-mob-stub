import ReduxDateAction from "../reducers/date/action/date.action";
import ReduxDateSelector from "../reducers/date/selector/date.selector";

import ReduxTimeTableAction from "../reducers/timetable/action/timetable.action";
import ReduxTimeTableSelector from "../reducers/timetable/selector/timetable.selector";

import ReduxThemeAction from "../reducers/theme/action/theme.action";
import ReduxThemeSelector from "../reducers/theme/selector/theme.selector";

namespace ReduxApi {
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

export default ReduxApi