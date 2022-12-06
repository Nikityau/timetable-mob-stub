import produce from "immer";

import {IDateAction} from "../interface/date.interface";

import Dates from "../../../../utils/namespaces/dates";

export class DateReducer {
    init(state, action: IDateAction) {
        return produce(state, draft => {
            const date = Dates.getDateNow()

            draft.now = date
            draft.current = date
        })
    }

    now(state, action: IDateAction) {
        return produce(state, draft => {
            draft.now = Dates.getDateNow()
        })
    }

    setNow(state, action: IDateAction) {
        return produce(state, draft => {
            draft.now = action.payload
        })
    }

    setCurrent(state, action: IDateAction) {
        return produce(state, draft => {
            draft.current = action.payload
        })
    }

    setCurrentAccordingNow(state, action: IDateAction) {
        return produce(state, draft => {
            draft.current = draft.now
        })
    }
}