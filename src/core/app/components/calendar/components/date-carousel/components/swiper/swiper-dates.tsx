import React, {useContext, useEffect, useState} from 'react';
import type {Swiper as SwiperType} from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react";

import {ISwiperDates} from "./interface/swiper-dates.interface";

import {CalendarContext} from "../../../../calendar";

import Dates from "../../../../../../../utils/namespaces/dates";

import DateCard from "../date-card/date-card";

import 'swiper/css'

const SwiperDates = ({currentDate, changeDates, weeksDates, dateSpec}: ISwiperDates) => {

    const calendarContext = useContext(CalendarContext)

    const [swiper, setSwiper] = useState<SwiperType>()
    const [slideActiveIndex, setSlideActiveIndex] = useState<number>(2)
    const [prevDirection, setPrevDirection] = useState<'left' | 'right'>()

    const toCurrentDate = (additIndex: number = 0) => {
        swiper.slideToLoop(1)
    }

    useEffect(() => {
        const unsub = calendarContext.co.subscribe(toCurrentDate)

        return () => {
            unsub()
        }
    }, [swiper])

    const onSlideChange = (swiper: SwiperType) => {
        console.log('change', swiper)

        if(Math.abs(swiper.activeIndex - slideActiveIndex) > 1) {
            console.log('here', prevDirection)
            setSlideActiveIndex(swiper.activeIndex)

            let firstEl = undefined
            let firstOfFirstEl = undefined
            if(prevDirection == 'left') {
                if (dateSpec == 'next') {
                    firstEl = weeksDates[1]
                }
                if (dateSpec == 'current') {
                    firstEl = weeksDates[2]
                }
                if (dateSpec == 'prev') {
                    firstEl = weeksDates[0]
                }
            }
            if(prevDirection == 'right') {
                if (dateSpec == 'next') {
                    firstEl = weeksDates[0]
                }
                if (dateSpec == 'current') {
                    firstEl = weeksDates[1]
                }
                if (dateSpec == 'prev') {
                    firstEl = weeksDates[2]
                }
            }

            if (!firstEl) return
            firstOfFirstEl = firstEl[0]
            if(!firstOfFirstEl) return;
            changeDates(firstOfFirstEl.getFullYear(), firstOfFirstEl.getMonth(), firstOfFirstEl.getDate(), dateSpec, swiper.activeIndex, prevDirection)

            return;
        }

        if (swiper.activeIndex > slideActiveIndex) {
            console.log('right')
            setSlideActiveIndex(swiper.activeIndex)
            setPrevDirection('right')

            let firstEl = undefined
            let firstOfFirstEl = undefined
            if (dateSpec == 'next') {
                firstEl = weeksDates[0]
            }
            if (dateSpec == 'current') {
                firstEl = weeksDates[1]
            }
            if (dateSpec == 'prev') {
                firstEl = weeksDates[2]
            }
            if (!firstEl) return
            firstOfFirstEl = firstEl[0]
            if(!firstOfFirstEl) return;
            changeDates(firstOfFirstEl.getFullYear(), firstOfFirstEl.getMonth(), firstOfFirstEl.getDate(), dateSpec, swiper.activeIndex, 'right')

            return;
        }
        if (swiper.activeIndex < slideActiveIndex) {
            console.log('left')
            setSlideActiveIndex(swiper.activeIndex)
            setPrevDirection('left')

            let firstEl = undefined
            let firstOfFirstEl = undefined
            if (dateSpec == 'next') {
                firstEl = weeksDates[1]
            }
            if (dateSpec == 'current') {
                firstEl = weeksDates[2]
            }
            if (dateSpec == 'prev') {
                firstEl = weeksDates[0]
            }
            if (!firstEl) return
            firstOfFirstEl = firstEl[0]
            if(!firstOfFirstEl) return;
            changeDates(firstOfFirstEl.getFullYear(), firstOfFirstEl.getMonth(), firstOfFirstEl.getDate(), dateSpec, swiper.activeIndex, 'left')
        }

    }

    const onSwiperInit = (swiper: SwiperType) => {
        setSwiper(swiper)
    }

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            initialSlide={2}
            slidesPerGroup={1}
            onSlideChange={onSlideChange}
            onSwiper={onSwiperInit}
        >
            {
                weeksDates.map((weeks, index) => (
                    <SwiperSlide
                        key={index}
                    >
                        <div className={'swiper__week'}>
                            {
                                weeks.map((date, index) => (
                                    <DateCard
                                        key={index}
                                        weekday={Dates.castToWeekdayShort(Dates.Days[date.getDay()])}
                                        day={date.getDate()}
                                        isCurrent={currentDate.date == date.getDate()}
                                        isWeekend={Dates.isWeekend(date.getDay())}
                                    />
                                ))
                            }
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default SwiperDates;