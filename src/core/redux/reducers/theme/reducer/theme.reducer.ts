import produce from "immer";

import {IThemeAction} from "../interface/theme.action";

export class ThemeReducer {
    setLight(state, action: IThemeAction) {
        return produce(state, draft => {
            draft.state = "LIGHT"
        })
    }
    setDark(state, action: IThemeAction) {
        return produce(state, draft => {
            draft.state = "DARK"
        })
    }
    setDefault(state, action: IThemeAction) {
        return produce(state, draft => {
            draft.state = "DARK"
        })
    }
}