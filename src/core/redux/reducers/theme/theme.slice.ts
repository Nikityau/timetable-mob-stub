import ReduxThemeAction from "./action/theme.action";

import {themeState} from "./state/theme.state";
import {ThemeReducer} from "./reducer/theme.reducer";

import {IThemeAction} from "./interface/theme.action";

const themeReducer = new ThemeReducer()

export const theme = (state = themeState, action: IThemeAction) => {
    switch (action.type) {
        case ReduxThemeAction.ThemeAction.DARK:
            return themeReducer.setDark(state, action)
        case ReduxThemeAction.ThemeAction.LIGHT:
            return themeReducer.setLight(state, action)
        case ReduxThemeAction.ThemeAction.DEFAULT:
            return themeReducer.setDefault(state, action)
        default:
            return state
    }
}