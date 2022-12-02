import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {useSelector} from "react-redux";

import {useSwiperDates} from "../../../../../../../utils/hooks/swiper-dates/useSwiperDates";

import {ISwiperDates} from "./interface/swiper-dates.interface";

import ReduxDateSelector from "../../../../../../../redux/reducers/date/date.selector";
import Dates from "../../../../../../../utils/namespaces/dates";

import DateCard from "../date-card/date-card";

import 'swiper/css'

const SwiperDates = ({}: ISwiperDates) => {

    const currentDate = useSelector(ReduxDateSelector.getDateCurrent)

    const [state,methods] = useSwiperDates()

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
                state.weeksDates.map((weeks, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={methods.onSlideClick}
                    >
                        <div className={'swiper__week'}>
                            {
                                weeks.map((date, index) => (
                                    <DateCard
                                        key={index}
                                        weekday={Dates.castToWeekdayShort(Dates.Day[date.getDay()])}
                                        date={date.getDate()}
                                        isCurrent={Dates.isDatesCompare(new Date(currentDate.year, Dates.getMonthNum(currentDate.month), currentDate.date), date)}
                                        isWeekend={Dates.isWeekend(date.getDay())}
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

export default SwiperDates;