import produce from "immer";

import {PageAction, PageActionTypes} from "../action/addon-page.action";

import {Page} from "../type/page";

const initState: Page = {
    type: "MAIN"
}

export const pageReducer = (state: Page = initState, action: PageAction) => {
    switch(action.type) {
        case PageActionTypes.SET_MAIN_PAGE:
            return produce(state, draft => {
                draft.type = 'MAIN'

                return draft
            })
        case PageActionTypes.SET_ADDON_PAGE:
            return produce(state, draft => {
                draft.type = 'ADDON'

                return draft
            })
        default:
            return state
    }
}