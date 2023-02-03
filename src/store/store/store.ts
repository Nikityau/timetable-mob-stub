import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {dateReducer} from "../../modules/date-calendar";
import {scheduleReducer} from "../../modules/schedule-calendar/store/reducer/schedule.reducer";
import {themeReducer} from "../../modules/theme";
import {scheduleRingsReducer} from "../../modules/schedule-rings";
import {PageReducer} from "../../modules/addon-page";

const enhancers = composeWithDevTools(applyMiddleware())

const reducer = combineReducers({
    date: dateReducer,
    schedule: scheduleReducer,
    theme: themeReducer,
    rings: scheduleRingsReducer,
    page: PageReducer
})

const store = createStore(reducer, enhancers)

export default store