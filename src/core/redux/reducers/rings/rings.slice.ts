import {ReduxRingsAction} from "./action/rings.slice";

import {IRingsState} from "./interface/rings.state";

import {ringsState} from "./state/rings.state";

import {RingsReducer} from "./reducer/rings.reducer";

const ringsReducer = new RingsReducer()

export const ringsSchedule = (state:IRingsState = ringsState, action) => {
    switch (action.type) {
        case ReduxRingsAction.RingsAction.OPEN:
            return ringsReducer.open(state, action)
        case ReduxRingsAction.RingsAction.CLOSE:
            return ringsReducer.close(state, action)
        default:
            return state
    }
}