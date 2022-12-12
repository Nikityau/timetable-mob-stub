import ReduxDateAction from "./action/date.action";

import {DateReducer} from "./reducer/date.reducer";

import {IDateAction} from "./interface/date.interface"

import {dateState} from "./state/date.state";

const dateReducer = new DateReducer()

export const date = (state = dateState, action: IDateAction) => {
    switch (action.type) {
        case ReduxDateAction.DateAction.INIT:
            return dateReducer.init(state, action)
        case ReduxDateAction.DateAction.NOW:
            return dateReducer.now(state, action)
        case ReduxDateAction.DateAction.SET_NOW:
            return dateReducer.setNow(state, action)
        case ReduxDateAction.DateAction.SET_CURRENT:
            return dateReducer.setCurrent(state, action)
        case ReduxDateAction.DateAction.SET_CURRENT_ACCORDING_NOW:
            return dateReducer.setCurrentAccordingNow(state, action)
        default:
            return state
    }
}