import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";

import store from "./core/redux/store/store";

import App from "./core/app/app";

import {createAppApi} from './appApi/appApi'
createAppApi()

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
    <Provider store={store}>
        <App></App>
    </Provider>
)

