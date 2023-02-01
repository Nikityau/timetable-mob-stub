import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {dateReducer} from "../../modules/date-calendar";

const enhancers = composeWithDevTools(applyMiddleware())

const reducer = combineReducers({
    date: dateReducer
})

const store = createStore(reducer, enhancers)

export default store