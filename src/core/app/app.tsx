import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getTheme} from "./utils/getTheme";

import '../ui/styles/global/global.scss'
import '../ui/styles/fonts/sf-pro-display/sf-pro-display.scss'
import '../ui/styles/fonts/custom/custom.scss'
import '../ui/styles/theme/dark.scss'
import '../ui/styles/theme/light.scss'
import '../ui/styles/side-offset/side-offset.scss'

import './style/common/app.scss'

import {appContextApi} from "./context/app.context";

import TimetablePage from "./pages/timetable/timetable.page";

export const AppContext = React.createContext(appContextApi)

const App = () => {

    const appContext = useContext(AppContext)

    const dispatch = useDispatch()

    const theme = useSelector(appContext.reduxApi.getTheme())

    useEffect(() => {
        dispatch(appContext.reduxApi.setTimeTableInit())
        dispatch(appContext.reduxApi.setTimetableParsed())
        dispatch(appContext.reduxApi.setDateInit())
        dispatch(appContext.reduxApi.setThemeDefault())
    }, [])

    return (
       <AppContext.Provider value={appContextApi}>
           <div className={['app', getTheme(theme)].join(' ')}>
               <div className={'app__container'}>
                   <TimetablePage/>
                   {/*<AppRouter/>*/}
               </div>
           </div>
       </AppContext.Provider>
    );
};

export default App;