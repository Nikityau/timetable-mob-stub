import produce from "immer";

import {ReduxAddonPage} from "../action/addonPage.action";

import {IAddonPageState} from "../interface/addonPage.state";

export class AddonPageReducer {
    yes(state: IAddonPageState, action: ReduxAddonPage.IAddonAction) {
        return produce(state, draft => {
            draft.isAddonPage = true
        })
    }
    no(state: IAddonPageState, action: ReduxAddonPage.IAddonAction) {
        return produce(state, draft => {
            draft.isAddonPage = false
        })
    }
}