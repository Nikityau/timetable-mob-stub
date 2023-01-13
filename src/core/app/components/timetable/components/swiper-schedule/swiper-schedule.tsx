import React, {useContext, useEffect, useState} from 'react';
import {Swiper} from "swiper/react";

import Dates from "../../../../../utils/namespaces/dates";
import DateObj = Dates.DateObj;

import {getFullWeek} from './swiper-schedule-slides'

import {ISwiperSchedule} from "./interface/swiper-schedule";

import 'swiper/css'
import './style/common/swiper-schedule.scss'

import {AppContext} from "../../../../app";
import {SlideChangeController} from "./controller/slide-change.controller";

const slideChangeController = new SlideChangeController()

const SwiperSchedule = ({schedule, below_week, above_week}: ISwiperSchedule) => {

    const appContext = useContext(AppContext)

    useEffect(() => {
        const unsub = appContext.calendar.subscribe('toCurrentDay', toCurr)

        return () => {
            unsub()
        }
    }, [])

    useEffect(() => {
        appContext.calendar.pull('nowDate', dateNow)
        appContext.calendar.pull('currentDate', currentDate)
    }, [])

    const toCurr = (currDate: DateObj) => {
        slideChangeController.currDate = currDate
        slideChangeController.toCurrentDay()
    }

    const dateNow = (nowDate: DateObj) => {
        slideChangeController.nowDate = nowDate
    }

    const currentDate = (currentDate: DateObj) => {
        slideChangeController.currDate = currentDate
        slideChangeController.initSlideChange()
    }

    const onSlideChange = (swiper) => {
        slideChangeController.onSlideChange(swiper, appContext)
    }

    return (
        <div className={'swiper-schedule'}>
            <div className={'swiper-schedule__container'}>
                {
                    schedule && schedule.length > 0 &&
                    <Swiper
                        className={'swiper-schedule__swiper'}
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                        navigation={false}
                        slidesPerGroup={1}
                        initialSlide={2}
                        onInit={slideChangeController.onSwiperInit}
                        onSlideChange={onSlideChange}
                    >
                        {
                            getFullWeek(below_week, 'below_week', 'below_week_copy')
                        }
                        {
                            getFullWeek(above_week, 'above_week', 'above_week_main')
                        }
                        {
                            getFullWeek(below_week, 'below_week', 'below_week_main')
                        }
                        {
                            getFullWeek(above_week, 'above_week', 'above_week_copy')
                        }
                    </Swiper>
                }
            </div>
        </div>
    );
};

export default SwiperSchedule;