import {Action} from "redux";
import {DateActions} from "./date.actions";
import {DateReducer} from "./date.reducer";

const dateState = {
    now: {
        weekday: '',
        day: 0,
        month: 'sep',
        year: 2022,
        full: ''
    },
    current: {
        weekday: '',
        day: 0,
        month: 'sep',
        year: 2022,
        full: ''
    }
}

const dateReducer = new DateReducer()

export const date = (state = dateState, action:Action) => {
    switch (action.type) {
        case DateActions.NOW:
            return dateReducer.now(state, action)
        case DateActions.SET_NOW:
            return dateReducer.setNow(state, action)
        case DateActions.SET_CURRENT:
            return dateReducer.setCurrent(state, action)
        default:
            return state
    }
}