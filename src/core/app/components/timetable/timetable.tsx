import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import {computeTimetableH} from "./utils/computeTimetableH";

import SwiperSchedule from "./components/swiper-schedule/swiper-schedule";

import './style/common/timetable.scss'

import {AppContext} from "../../app";

const Timetable = () => {
    const appContext = useContext(AppContext)

    const [timetableHeight, setTimetableHeight] = useState<number>()

    const parsedTimetable = useSelector(appContext.reduxApi.getTimetable())

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
            <div className={'timetable__container'}>
                <SwiperSchedule
                    schedule={[parsedTimetable?.above_week || [], parsedTimetable?.below_week || []]}
                    above_week={parsedTimetable?.above_week || []}
                    below_week={parsedTimetable?.below_week || []}
                />
            </div>
        </div>
    );
};

export default Timetable;