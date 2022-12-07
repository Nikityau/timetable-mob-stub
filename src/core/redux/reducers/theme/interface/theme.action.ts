import {Action} from "redux";

import ReduxThemeAction from "../action/theme.action";

export interface IThemeAction extends Action {
    type: ReduxThemeAction.ThemeAction,
    payload?: any
}