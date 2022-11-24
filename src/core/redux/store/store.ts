import { createStore, combineReducers, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import {theme} from "../reducers/theme/theme.slice";
import {timetable} from "../reducers/timetable/timetable.slice";
import {date} from "../reducers/date/date.slice";
import {notifications} from "../reducers/notifications/notifications.slice";

const enhancers = composeWithDevTools(
    applyMiddleware()
)

const reducers = combineReducers({
    theme,
    timetable,
    date,
    notifications,
})

const store = createStore(reducers, enhancers)

export default store