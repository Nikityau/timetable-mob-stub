import React, {useContext, useEffect, useState} from 'react';
import type { Swiper as SwiperType } from 'swiper'
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";

import {DayByNum, WeekdayShort} from "../../../../../../../redux/reducers/date/date.reducer";

import DateCard from "../date-card/date-card";

import 'swiper/css'
import {CalendarContext} from "../../../../calendar";


function getDay(day): WeekdayShort {
    return day as WeekdayShort
}

function isWeekend(dayNum): boolean {
    return dayNum == 0 || dayNum == 6;
}

const SwiperDates = ({ dates, currentDate }: { dates:any[], currentDate: any }) => {

    const calendarContext = useContext(CalendarContext)

    const [swiper, setSwiper] = useState<SwiperType>()

    const toCurrentDate = () => {
        swiper.slideTo(currentDate.date + 3)
    }

    useEffect(() => {
        if(!swiper) return
        setTimeout(() => {
            swiper.slideTo(currentDate.date + 3)
        }, 0)
    }, [swiper])

    useEffect(() => {
        const unsub = calendarContext.co.subscribe(toCurrentDate)

        return () => {
            unsub()
        }
    }, [swiper])


    return (
        <Swiper
            slidesPerView={7}
            spaceBetween={10}
            loop={true}
            onSwiper={(swiper) => setSwiper(swiper)}
        >
            {
                dates.map((date, index) => (
                    <SwiperSlide key={index}>
                        <DateCard
                            weekday={getDay(DayByNum[date.getDay()])}
                            day={date.getDate()}
                            isCurrent={currentDate.date == date.getDate()}
                            isWeekend={isWeekend(date.getDay())}
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default SwiperDates;