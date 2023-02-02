import React, {useEffect} from 'react';
import {Swiper} from "swiper/react";
import {useDispatch, useSelector} from "react-redux";

import {ScheduleInput} from "../../store/interface/schedule";
import {parseSchedule, setSchedule} from "../../store/action/schedule.action";
import {getParsedSchedule} from "../../store/selector/schedule.selector";

import {timetableData} from '../../store/data/schedule'

import './style/swiper-sc.scss'
import fullWeek from "../full-week/full-week";

const SwiperSc = () => {

    const schedule = useSelector(getParsedSchedule)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSchedule(timetableData as ScheduleInput))
        dispatch(parseSchedule())
    }, [])

    return (
        <>
            {
                schedule.below_week &&
                schedule.above_week &&
                <Swiper
                    className={'swiper-schedule__swiper'}
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    navigation={false}
                    slidesPerGroup={1}
                    initialSlide={2}
                    onInit={() => {}}
                    onSlideChange={() => {}}
                >
                    {
                        fullWeek({
                            week: schedule.below_week,
                            weekType: 'below_week',
                            attr: 'below_week_copy'
                        })
                    }
                    {
                        fullWeek({
                            week: schedule.above_week,
                            weekType: 'above_week',
                            attr: 'above_week_main'
                        })
                    }
                    {
                        fullWeek({
                            week: schedule.below_week,
                            weekType: 'below_week',
                            attr: 'below_week_main'
                        })
                    }
                    {
                        fullWeek({
                            week: schedule.above_week,
                            weekType: 'above_week',
                            attr: 'above_week_copy'
                        })
                    }
                </Swiper>
            }
        </>
    );
};

export default SwiperSc;