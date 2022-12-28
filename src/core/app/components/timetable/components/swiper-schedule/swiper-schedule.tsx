import React, {useContext, useEffect, useState} from 'react';
import type {Swiper as SwiperType} from 'swiper'
import {useSelector} from "react-redux";
import {Swiper} from "swiper/react";

import Dates from "../../../../../utils/namespaces/dates";

import {getFullWeek} from './swiper-schedule-slides'

import {ISwiperSchedule} from "./interface/swiper-schedule";

import 'swiper/css'
import './style/common/swiper-schedule.scss'

import {AppContext} from "../../../../app";

let isRapidly: boolean = false

let isInitSwipe: boolean = true

const SwiperSchedule = ({schedule, below_week, above_week}: ISwiperSchedule) => {

    const appContext = useContext(AppContext)

    const nowDate = useSelector(appContext.reduxApi.getDateNow())
    const currDate = useSelector(appContext.reduxApi.getDateCurrent())

    const [swiper, setSwiper] = useState<SwiperType>()

    useEffect(() => {
        const unsub = appContext.calendar.subscribe(changeSlide)

        return () => {
            unsub()
        }
    }, [currDate])

    useEffect(() => {
        initSlideChange()
    }, [currDate, swiper])

    const changeSlide = () => {
        if (!swiper) return

        const weekType = Dates.getWeekType(new Date(currDate.dateString))
        console.log(weekType)
    }

    const initSlideChange = () => {
        if (!swiper) return;
        if (!currDate.dateString) return;

        if (!isInitSwipe) return

        isInitSwipe = false

        const weekType = Dates.getWeekType(new Date(currDate.dateString))

        const swiperDOMEl = swiper.el
        let slide = undefined;

        if (weekType == 1) {
            slide = swiperDOMEl.querySelector(`.swiper-slide[data-week-type-numeric="1"][data-day-type-string=\"${currDate.weekday}\"]`)
        }

        if (weekType == -1) {
            slide = swiperDOMEl.querySelector(`.swiper-slide[data-week-type-numeric="-1"][data-day-type-string=\"${currDate.weekday}\"]`)
        }

        const index = slide.getAttribute('data-swiper-slide-index')
        swiper.slideToLoop(Number.parseInt(index), 0)
    }

    const swiperSlide = (index: number) => {
        if (isRapidly) {
            isRapidly = false
            swiper.slideToLoop(index, 0)
            return
        }

        swiper.slideToLoop(index)
    }

    const onSwiperInit = (swiperInst: SwiperType) => {
        setSwiper(swiperInst)
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
                        onInit={onSwiperInit}
                        initialSlide={2}
                    >
                        {
                            getFullWeek(above_week, 'above_week')
                        }
                        {
                            getFullWeek(below_week, 'below_week')
                        }
                    </Swiper>
                }
            </div>
        </div>
    );
};

export default SwiperSchedule;