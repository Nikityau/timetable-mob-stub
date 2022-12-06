import {IThemeAction} from "../interface/theme.action";

namespace ReduxThemeAction {
    export enum ThemeAction {
        LIGHT = "theme/setLight",
        DARK = "theme/setDark",
        DEFAULT = "theme/setDefault"
    }

    export function setLight(): IThemeAction {
        return {
            type: ThemeAction.LIGHT
        }
    }

    export function setDark(): IThemeAction {
        return {
            type: ThemeAction.DARK
        }
    }

    export function setDefault(): IThemeAction {
        return {
            type: ThemeAction.DEFAULT
        }
    }
}

export default ReduxThemeAction