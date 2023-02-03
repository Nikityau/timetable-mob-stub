import {Action} from "redux";

export enum PageActionTypes {
    SET_ADDON_PAGE = 'page/addon',
    SET_MAIN_PAGE = 'page/main'
}

export interface PageAction extends Action {
    type: PageActionTypes,
    payload: null
}

export const mainPage = (): PageAction => {
    return {
        type: PageActionTypes.SET_MAIN_PAGE,
        payload: null
    }
}

export const addonPage = (): PageAction => {
    return {
        type: PageActionTypes.SET_ADDON_PAGE,
        payload: null
    }
}