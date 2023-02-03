import produce from "immer";

import {ThemeAction, ThemeActionTypes} from "../action/theme.action";
import {Theme} from "../type/theme";

const themInit: Theme = {
    mode: 'DARK'
}

export const themeReducer = (state: Theme = themInit, action: ThemeAction) => {
    switch(action.type) {
        case ThemeActionTypes.SET_DARK_THEME:
            return produce(state, draft => {
                draft.mode = 'DARK'

                return draft
            })
        case ThemeActionTypes.SET_LIGHT_THEME:
            return produce(state, draft => {
                draft.mode = 'LIGHT'

                return draft
            })
        default:
            return state
    }
}