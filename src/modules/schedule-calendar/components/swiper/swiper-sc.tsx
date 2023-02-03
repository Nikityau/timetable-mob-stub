import React, {useEffect} from 'react';
import {Swiper} from "swiper/react";
import {useDispatch, useSelector} from "react-redux";

import {store} from "../../../../store";

import Dates from "../../../../helpers/date/date";
import DateObj = Dates.DateObj;

import {ScheduleInput} from "../../store/interface/schedule";
import {parseSchedule, setSchedule} from "../../store/action/schedule.action";
import {getParsedSchedule} from "../../store/selector/schedule.selector";

import fullWeek from "../full-week/full-week";

import {timetableData} from '../../store/data/schedule'
import {DayChangeController} from "../../controllers/day-change.controller";

import './style/swiper-sc.scss'

import Event from "../../../../helpers/event/event";

const dayChangeController = new DayChangeController()

const SwiperSc = () => {

    const schedule = useSelector(getParsedSchedule)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSchedule(timetableData as ScheduleInput))
        dispatch(parseSchedule())
    }, [])

    useEffect(() => {
        const unsub = Event.on('toCurrentDay', toCurr)

        return () => {
            unsub()
        }
    }, [schedule])

    useEffect(() => {
        Event.pullEmit('nowDate', dateNow)
        Event.pullEmit('currentDate', initSlideChange)
    }, [schedule])

    const toCurr = () => {
        dayChangeController.currDate = store.getState().date.current
        dayChangeController.toCurrentDay()
    }

    const dateNow = (nowDate: DateObj) => {
        dayChangeController.nowDate = store.getState().date.now
    }

    const initSlideChange = () => {
        dayChangeController.currDate = store.getState().date.current
        dayChangeController.initSlideChange()
    }

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
                    onInit={dayChangeController.onSwiperInit}
                    onSlideChange={dayChangeController.onSlideChange}
                    id={'schedule-calendar'}
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