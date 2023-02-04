import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {dateReducer} from "../../modules/date-calendar";
import {scheduleReducer} from "../../modules/schedule-calendar/store/reducer/schedule.reducer";
import {themeReducer} from "../../features/theme";
import {scheduleRingsReducer} from "../../modules/schedule-rings";
import {pageReducer} from "../../features/addon-page";
import {notifReducer} from "../../modules/notifications";

const enhancers = composeWithDevTools(applyMiddleware())

const reducer = combineReducers({
    date: dateReducer,
    schedule: scheduleReducer,
    theme: themeReducer,
    rings: scheduleRingsReducer,
    page: pageReducer,
    notifications: notifReducer
})

const store = createStore(reducer, enhancers)

export default store