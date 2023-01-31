import React from 'react'
import ReactDOM from 'react-dom/client'

import App from "./app/app";

import {WithRedux} from './store'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
    <WithRedux>
        <App/>
    </WithRedux>
)

