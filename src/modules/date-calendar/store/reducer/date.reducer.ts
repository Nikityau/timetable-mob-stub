import produce from "immer";

import Dates from "../../../../helpers/date/date";

import {DateAction, DateActionTypes} from '../action/date.action'

export type DateState = {
    now: Dates.DateObj,
    current: Dates.DateObj
}

const nowDate = Dates.getDateNow()

const initState: DateState = {
    now: nowDate,
    current: nowDate
}

export const dateReducer = (state: DateState = initState, action:DateAction) => {
    switch (action.type) {
        case DateActionTypes.SET_DATE_CURRENT_EQ_NOW:
            return produce(state, draft => {
                draft.current = draft.now

                return draft
            })
        case DateActionTypes.SET_DATE_CURRENT:
            return produce(state, draft => {
                draft.current = Dates.createDateObj(action.payload)

                return draft
            })
        default: return state
    }
}