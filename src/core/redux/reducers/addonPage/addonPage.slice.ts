import {ReduxAddonPage} from "./action/addonPage.action";

import {addonPageState} from "./state/addonPage.state";

import {AddonPageReducer} from "./reducer/addonPage.reducer";

const addonPageReducer = new AddonPageReducer()

export const addonPage = (state = addonPageState, action: ReduxAddonPage.IAddonAction) => {
    switch (action.type) {
        case ReduxAddonPage.AddonPageAction.YES:
            return addonPageReducer.yes(state, action)
        case ReduxAddonPage.AddonPageAction.NO:
            return addonPageReducer.no(state, action)
        default:
            return state
    }
}