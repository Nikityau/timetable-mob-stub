import React from 'react';
import type {Swiper as SwiperType} from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react";
import {nanoid} from "nanoid";

import './_.scss'

const TimeSwiper = (
    {
        timeArr,
        onTimeChange
    }: {
        timeArr: Date[],
        onTimeChange: (time: string) => void
    }
) => {

    const getDoubleTimeStr = (time): string => {
        if (time < 10) return `0${time}`

        return time
    }

    const onSlideChange = (swiperInst: SwiperType) => {
        console.log(swiperInst)
    }

    return (
        <Swiper
            className={'notif-dates__timepicker-swiper'}
            direction={'vertical'}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            onSlideChange={onSlideChange}
        >
            {
                timeArr.map((hours, index) => (
                    <SwiperSlide key={nanoid()}>
                        <div className={'notif-dates__timepicker-time'}>
                            <span>{getDoubleTimeStr(index)}</span>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default TimeSwiper;