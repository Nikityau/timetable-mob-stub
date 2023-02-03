import produce from "immer";

import {Rings} from "../type/rings";

import {RingsAction, RingsActionTypes} from "../action/rings.action";

const initRings: Rings = {
    isOpen: false
}

export const scheduleRingsReducer = (state: Rings = initRings, action: RingsAction) => {
    switch(action.type) {
        case RingsActionTypes.OPEN_RING_SCHEDULE:
            return produce(state, draft => {
                draft.isOpen = true

                return draft
            })
        case RingsActionTypes.CLOSE_RING_SCHEDULE:
            return produce(state, draft => {
                draft.isOpen = false

                return draft
            })
        default:
            return state
    }
}