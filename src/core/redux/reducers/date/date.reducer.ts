import produce from "immer";
import {Action} from "redux";

const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
}

export class DateReducer {
    now(state, action: Action) {
        return produce(state, draft => {

        })
    }

    setNow(state, action: Action) {
        return produce(state, draft => {

        })
    }

    setCurrent(state, action: Action) {
        return produce(state, draft => {

        })
    }
}