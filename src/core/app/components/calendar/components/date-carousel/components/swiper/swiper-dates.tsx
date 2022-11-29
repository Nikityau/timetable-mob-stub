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

    const toCurrentDate = (additIndex: number = 0) => {
        swiper.slideToLoop(1)
    }

    useEffect(() => {
        const unsub = calendarContext.co.subscribe(toCurrentDate)

        return () => {
            unsub()
        }
    }, [swiper])

    useEffect(() => {
        if(!swiper) return
        swiper.animating = false
        toCurrentDate()
    }, [weeksDates])

    const onSlideChange = (swiper: SwiperType) => {
        console.log(swiper)
      /*  const swiperDomEl = document.querySelector('.swiper')
        const activeSlide = swiperDomEl.querySelector('.swiper-slide-active')
        if(!activeSlide) return
        const year = activeSlide.getAttribute('data-start-week-year')
        const month = activeSlide.getAttribute('data-start-week-month')
        const date = activeSlide.getAttribute('data-start-week-date')
        changeDates(Number.parseInt(year), Number.parseInt(month), Number.parseInt(date))*/
        /*
        * ai 1 current = a[0]
        * ai 0 prev = a[2]
        * ai 2 next = a[1]
        *
        * */

        if(dateSpec == 'next') {
            const first = weeksDates[1]
            if(!first) return
            const ff = first[0]
            if(!ff) return;
            changeDates(ff.getFullYear(),ff.getMonth(), ff.getDate(), dateSpec)
        }
        if(dateSpec == 'current') {
            const first = weeksDates[2]
            if(!first) return
            const ff = first[0]
            if(!ff) return;
            changeDates(ff.getFullYear(),ff.getMonth(), ff.getDate(), dateSpec)
        }
        if(dateSpec == 'prev') {
            const first = weeksDates[0]
            if(!first) return
            const ff = first[0]
            if(!ff) return;
            changeDates(ff.getFullYear(),ff.getMonth(), ff.getDate(), dateSpec)
        }

    }

    const onSwiperInit = (swiper: SwiperType) => {
        setSwiper(swiper)
    }

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={false}
            initialSlide={1}
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