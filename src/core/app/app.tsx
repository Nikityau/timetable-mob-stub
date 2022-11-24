import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import Calendar from "./components/calendar/calendar";
import Timetable from "./components/timetable/timetable";

import '../ui/styles/global/global.scss'
import '../ui/styles/fonts/sf-pro-display/sf-pro-display.scss'
import '../ui/styles/theme/dark.scss'
import '../ui/styles/theme/light.scss'
import '../ui/styles/side-offset/side-offset.scss'

import './style/common/app.scss'

const App = () => {

    const theme = useSelector(state => state['theme'])

    const getTheme = () => {
        switch (theme) {
            case "LIGHT":
                return "theme_light"
            case "DARK":
                return "theme_dark"
            default:
                return "theme_dark"
        }
    }

    return (
        <div className={['app', getTheme()].join(' ')}>
            <div className={'app__container'}>
                <Calendar/>
                <Timetable/>
            </div>
        </div>
    );
};

export default App;