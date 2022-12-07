import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import {computeTimetableH} from "./utils/computeTimetableH";

import './style/common/timetable.scss'

import {AppContext} from "../../app";
import SwiperSchedule from "./components/swiper-schedule/swiper-schedule";


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
                <SwiperSchedule schedule={[parsedTimetable?.above_week || [], parsedTimetable?.below_week || []]}/>
            </div>
        </div>
    );
};

export default Timetable;