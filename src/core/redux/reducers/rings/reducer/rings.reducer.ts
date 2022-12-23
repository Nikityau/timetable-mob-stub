import produce from "immer";

import {ReduxRingsAction} from "../action/rings.slice";

import {IRingsState} from "../interface/rings.state";

export class RingsReducer {
    open(state:IRingsState, action:ReduxRingsAction.IReduxAction) {
        return produce(state, draft => {
            draft.isOpen = true
        })
    }
    close(state: IRingsState, action: ReduxRingsAction.IReduxAction) {
        return produce(state, draft => {
            draft.isOpen = false
        })
    }
}