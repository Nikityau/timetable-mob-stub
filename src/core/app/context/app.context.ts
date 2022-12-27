import ReduxApi from "../../redux/api/redux.api";

import {AppReduxBridge} from "../../app-redux-bridge/app-redux-bridge";
import {CalendarObserver} from "../observer/calendar.observer";

export const appContextApi = {
    reduxApi: new AppReduxBridge(new ReduxApi.ReduxApi()),
    calendar: new CalendarObserver()
}