import React from "react";
import {Provider} from "react-redux";

import  store from '../../store/store'
export const  WithRedux = ({ children }:React.PropsWithChildren) => {
    return (
        <Provider store={store}>
            { children }
        </Provider>
    )
}