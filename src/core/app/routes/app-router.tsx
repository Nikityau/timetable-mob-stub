import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import TimetablePage from "../pages/timetable/timetable.page";
import RingsPage from "../pages/rings/rings.page";

import {AppRoutes} from "./app-routes";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoutes.DEFAULT} element={<TimetablePage/>}/>
                <Route path={AppRoutes.RINGS} element={<RingsPage/>}/>

                {/*<Route path={AppRoutes.DEFAULT} element={<Navigate to={'/timetable'}/>}/>*/}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;