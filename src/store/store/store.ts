import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {dateReducer} from "../../modules/date-calendar";
import {scheduleReducer} from "../../modules/schedule-calendar/store/reducer/schedule.reducer";

const enhancers = composeWithDevTools(applyMiddleware())

const reducer = combineReducers({
    date: dateReducer,
    schedule: scheduleReducer
})

const store = createStore(reducer, enhancers)

export default store