import {Action} from "redux";

export enum ThemeActionTypes {
    SET_DARK_THEME = 'theme/setDark',
    SET_LIGHT_THEME = 'theme/setLight'
}

export interface ThemeAction extends Action {
    type: ThemeActionTypes,
    payload: null
}

export const darkTheme = (): ThemeAction => {
    return {
        type: ThemeActionTypes.SET_DARK_THEME,
        payload: null
    }
}

export const lightTheme = (): ThemeAction => {
    return {
        type: ThemeActionTypes.SET_LIGHT_THEME,
        payload: null
    }
}