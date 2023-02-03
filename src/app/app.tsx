import React from 'react';
import {useSelector} from "react-redux";
import cn from 'classnames'

import {getTheme} from "../modules/theme";

import Main from "../pages/main/main";
import ScheduleRings from "../pages/schedule-rings/schedule-rings";

import '../ui/styles/global/global.scss'
import '../ui/styles/fonts/sf-pro-display/sf-pro-display.scss'
import '../ui/styles/fonts/custom/custom.scss'
import '../ui/styles/fonts/inter/inter.scss'
import '../ui/styles/theme/dark.scss'
import '../ui/styles/theme/light.scss'
import '../ui/styles/able/able.scss'

import './style/app.scss'

const App = () => {
    const theme = useSelector(getTheme)

    return (
        <div className={cn(
            'app',
            {
                'theme_dark': theme == 'DARK',
                'theme_light': theme == 'LIGHT'
            }
        )}>
            <div className={'app__container'}>
                <Main/>
                <ScheduleRings/>
            </div>
        </div>
    );
};

export default App;