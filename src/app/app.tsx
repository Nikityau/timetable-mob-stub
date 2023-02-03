import React, {useEffect} from 'react';

import Main from "../pages/main/main";

import '../ui/styles/global/global.scss'
import '../ui/styles/fonts/sf-pro-display/sf-pro-display.scss'
import '../ui/styles/fonts/custom/custom.scss'
import '../ui/styles/fonts/inter/inter.scss'

import './style/app.scss'

const App = () => {
    return (
        <div className={'app'}>
            <div className={'app__container'}>
                <Main/>
            </div>
        </div>
    );
};

export default App;