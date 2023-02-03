import {Theme, ThemeMode} from "../type/theme";

export const getTheme = (state: any): ThemeMode => {
    return (state['theme'] as Theme).mode
}