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

type Index = number

const SwiperSchedule = ({schedule, below_week, above_week}: ISwiperSchedule) => {

    const appContext = useContext(AppContext)

    const nowDate = useSelector(appContext.reduxApi.getDateNow())
    const currDate = useSelector(appContext.reduxApi.getDateCurrent())

    const [swiper, setSwiper] = useState<SwiperType>()

    useEffect(() => {
        if(isInitSwipe) return

        changeSlide()
    }, [currDate])

    useEffect(() => {
        initSlideChange()
    }, [currDate, swiper])

    const changeSlide = () => {
        if (!swiper) return

        const weekType = Dates.getWeekType(new Date(currDate.dateString))

        const slideType = weekType == 1 ? "above_week" : "below_week"
        console.log("main",slideType)

        const reverseSlideType = weekType == 1 ? "below_week" : "above_week"
        console.log("reverse",reverseSlideType)

        if(new Date(currDate.dateString) > new Date(nowDate.dateString)) {
            // right

            const index = getElIndexByAttributes(
                [
                    `[data-week-type-numeric="${weekType}"]`,
                    `[data-day-type-string="${currDate.weekday}"]`,
                    `[data-type-slide="${slideType + "_main"}"]`
                ]
            )

            const indexOfReverseWeekType = getElIndexByAttributes(
                [
                    `[data-week-type-numeric="${-weekType}"]`,
                    `[data-day-type-string="${currDate.weekday}"]`,
                    `[data-type-slide="${reverseSlideType + "_copy"}"]`
                ]
            )

            isRapidly = true
            swiperSlide(indexOfReverseWeekType)

            setTimeout(() => {
                swiperSlide(index)
            }, 200)
        } else {
            // left

            const index = getElIndexByAttributes(
                [
                    `[data-week-type-numeric="${weekType}"]`,
                    `[data-day-type-string="${currDate.weekday}"]`,
                    `[data-type-slide="${slideType + "_main"}"]`
                ]
            )

            setTimeout(() => {
                swiperSlide(index)
            }, 200)
        }





       /* if(nowWeekType == weekType) {
            swiperSlide(index)

            return;
        }*/

        /*setTimeout(() => {
            swiperSlide(index)
        }, 200)*/
    }

    const getElIndexByAttributes = (attributes: string[]):Index => {
        const swiperDOMEl = swiper.el
        const slide = swiperDOMEl.querySelector(`.swiper-slide${attributes.join('')}`)
        const index = slide.getAttribute('data-swiper-slide-index')

        return Number.parseInt(index)
    }


    const initSlideChange = () => {
        if (!swiper) return;
        if (!currDate.dateString) return;

        if (!isInitSwipe) return

        isInitSwipe = false

        const weekType = Dates.getWeekType(new Date(currDate.dateString))

        let index: Index = getElIndexByAttributes(
            [
                `[data-week-type-numeric="${weekType}"]`,
                `[data-day-type-string=\"${currDate.weekday}\"]`,
                `[data-type-slide="below_week_main"]`
            ]
        )

        isRapidly = true

        swiperSlide(index)
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