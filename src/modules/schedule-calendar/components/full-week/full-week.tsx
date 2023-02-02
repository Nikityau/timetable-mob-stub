import React, {useEffect, useState} from 'react';
import {SwiperSlide} from "swiper/react";
import {nanoid} from "nanoid";

import Dates from "../../../../helpers/date/date";

import ScheduleDay from "../schedule-day/schedule-day";
import Weekend from "../weekend/weekend";

type FullWeekProps = {
    week: any[],
    weekType: string,
    attr: string
}

const FullWeek = ({weekType, week, attr}: FullWeekProps): JSX.Element => {
    return (
        <>
            {
                week?.map((day, index) => (
                    day
                        ? <SwiperSlide
                            key={nanoid(25)}
                            className={'swiper-schedule__slide'}
                            data-week-type-string={weekType}
                            data-week-type-numeric={weekType == "above_week" ? 1 : -1}
                            data-day-type-string={Dates.getDayType(day[0]?.['week_day'])}
                            data-day-type-number={day[0]?.['week_day']}
                            data-type-slide={attr}
                        >
                            <ScheduleDay scheduleDay={day}/>
                        </SwiperSlide>
                        : <SwiperSlide
                            key={nanoid(25)}
                            className={'swiper-schedule__slide'}
                            data-week-type={weekType}
                            data-week-type-numeric={weekType == "above_week" ? 1 : -1}
                            data-day-type-string={Dates.getDayType(index + 1)}
                            data-day-type-number={index + 1}
                            data-type-slide={attr}
                        >
                            <Weekend/>
                        </SwiperSlide>
                ))
            }
        </>
    );
};

export default FullWeek;