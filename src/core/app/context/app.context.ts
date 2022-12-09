import ReduxApi from "../../redux/api/redux.api";

import {AppReduxBridge} from "../../app-redux-bridge/app-redux-bridge";

export const appContextApi = {
    reduxApi: new AppReduxBridge(new ReduxApi.ReduxApi())
}