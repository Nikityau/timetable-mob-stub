import {Action} from "redux";

const themeState = "DEFAULT"

export const theme = (state = themeState, action: Action) => {
    switch (action.type) {
        default:
            return state
    }
}