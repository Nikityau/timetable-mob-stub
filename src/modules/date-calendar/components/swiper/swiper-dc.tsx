import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {nanoid} from "nanoid";

import { default as Dates } from "../../../../helpers/date/date";

import useSwiperDates from "../../helpers/hooks/useSwiperDates";

import DateCard from "../date-card/date-card";

import 'swiper/css'

const SwiperDC = () => {

    const [calendar, methods] = useSwiperDates()

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            navigation={false}
            initialSlide={2}
            slidesPerGroup={1}
            onSlideChange={methods.onSlideChange}
            onSwiper={methods.onSwiperInit}
        >
            {
                calendar.weeksDates.map((weeks) => (
                    <SwiperSlide
                        key={nanoid()}
                        onClick={methods.onSlideClick}
                    >
                        <div className={'swiper__week'}>
                            {
                                weeks.map((date) => (
                                    <DateCard
                                        key={nanoid()}
                                        weekday={Dates.castToWeekdayShort(Dates.Day[date.getDay()])}
                                        date={date.getDate()}
                                        fullDate={date}
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

export default SwiperDC;