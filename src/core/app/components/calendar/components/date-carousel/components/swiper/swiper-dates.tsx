import React, {useContext} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {useSelector} from "react-redux";
import {nanoid} from "nanoid";

import {useSwiperDates} from "../../../../../../../utils/hooks/swiper-dates/useSwiperDates";

import {ISwiperDates} from "./interface/swiper-dates.interface";

import Dates from "../../../../../../../utils/namespaces/dates";

import DateCard from "../date-card/date-card";

import 'swiper/css'

import {AppContext} from "../../../../../../app";

const SwiperDates = ({}: ISwiperDates) => {

    const appContext = useContext(AppContext)

    const currentDate = useSelector(appContext.reduxApi.getDateCurrent())

    const [state,methods] = useSwiperDates(
        appContext.reduxApi.getDateCurrent(),
        appContext.reduxApi.getDateNow(),
        appContext.reduxApi.setDateCurrent.bind(appContext.reduxApi)
    )

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
                state.weeksDates.map((weeks) => (
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
                                        isCurrent={Dates.isDatesCompare(new Date(currentDate.timestamp), date)}
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