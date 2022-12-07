import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import {computeTimetableH} from "./utils/computeTimetableH";

import './style/common/timetable.scss'

import {AppContext} from "../../app";
import ScheduleDay from "./components/schedule-day/schedule-day";

const Timetable = () => {

    const appContext = useContext(AppContext)

    const [timetableHeight, setTimetableHeight] = useState<number>()

    const parsedTimetable = useSelector(appContext.reduxApi.timetable.selector.getTimetable)

    useEffect(() => {
        const height = computeTimetableH('.calendar')
        setTimetableHeight(height)
    }, [])

    return (
        <div className={'timetable'}
            style={{
                height: `${timetableHeight}px`
            }}
        >
            <div className={'timetable__container el_side_offset_m el_side_reverse_offset_m'}>
                <ScheduleDay scheduleDay={parsedTimetable.above_week[2]}/>
            </div>
        </div>
    );
};

export default Timetable;