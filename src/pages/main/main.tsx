import React, {useEffect} from 'react';

import {HeightHoc} from "../../helpers/height-hoc/height-hoc";

import {DateCalendar} from "../../modules/date-calendar";
import {ScheduleCalendar} from "../../modules/schedule-calendar";

import CurrentDate from "./components/current-date/current-date";
import InfoColumns from "./components/info-columns/info-columns";

import './style/main.scss'

const Main = () => {
    return (
        <div className={'main'}>
            <div className={'main__header'}>
                <CurrentDate/>
                <DateCalendar/>
                <InfoColumns/>
            </div>
            <HeightHoc
                classNames={['.main__header']}
                component={(height) => <ScheduleCalendar height={height}/> }/>
        </div>
    );
};

export default Main;