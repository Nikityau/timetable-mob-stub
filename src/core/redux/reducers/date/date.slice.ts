import {DateActions} from "./date-set.actions";
import {DateReducer} from "./date.reducer";

import {IDateAction} from "./interface/date.interface";
import {DateState} from "./interface/date-state.interface";

const dateState: DateState = {
    now: {
        weekday: '',
        date: 0,
        month: '',
        year: 2022,
        full: ''
    },
    current: {
        weekday: '',
        date: 0,
        month: '',
        year: 2022,
        full: ''
    }
}

const dateReducer = new DateReducer()

export const date = (state = dateState, action: IDateAction) => {
    switch (action.type) {
        case DateActions.INIT:
            return dateReducer.init(state, action)
        case DateActions.NOW:
            return dateReducer.now(state, action)
        case DateActions.SET_NOW:
            return dateReducer.setNow(state, action)
        case DateActions.SET_CURRENT:
            return dateReducer.setCurrent(state, action)
        case DateActions.SET_CURRENT_ACCORDING_NOW:
            return dateReducer.setCurrentAccordingNow(state, action)
        default:
            return state
    }
}