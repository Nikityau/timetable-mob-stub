import React, {useContext, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getTheme} from "./utils/getTheme";

const TimetablePage = React.lazy(() => import('./pages/timetable/timetable.page'))
const RingsSchedule = React.lazy(() => import('./components/rings-schedule/rings-schedule'))
const Notification = React.lazy(() => import('./components/notification/notification'))

import Loader from "./components/loader/loader";

import '../ui/styles/global/global.scss'
import '../ui/styles/fonts/sf-pro-display/sf-pro-display.scss'
import '../ui/styles/fonts/custom/custom.scss'
import '../ui/styles/fonts/inter/inter.scss'
import '../ui/styles/theme/dark.scss'
import '../ui/styles/theme/light.scss'
import '../ui/styles/side-offset/side-offset.scss'
import '../ui/styles/able/able.scss'

import './style/common/app.scss'

import {appContextApi} from "./context/app.context";

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
           <React.Suspense fallback={<Loader/>}>
               <div className={['app', getTheme(theme)].join(' ')}>
                   <div className={[
                       'app__container',
                   ].join(' ')}>
                       <TimetablePage/>
                   </div>
                   <RingsSchedule/>
                   <Notification/>
               </div>
           </React.Suspense>
       </AppContext.Provider>
    );
};


export default App;