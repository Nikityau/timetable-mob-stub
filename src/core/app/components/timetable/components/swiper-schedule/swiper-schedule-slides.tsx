import React from "react";
import {SwiperSlide} from "swiper/react";
import {nanoid} from "nanoid";

import Dates from "../../../../../utils/namespaces/dates";

import ScheduleDay from "../schedule-day/schedule-day";
import Weekend from "../weekend/weekend";

export const getDayType = (day: number): string => {
    switch (day) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            return Dates.Day[day]
        case 7:
            return Dates.Day[0]
        default:
            return "undef"
    }
}

export const getFullWeek = (week: any[], weekType: string, attr: string): JSX.Element => {
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
                            data-day-type-string={getDayType(day[0]?.['week_day'])}
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
                            data-day-type-string={getDayType(index + 1)}
                            data-day-type-number={index + 1}
                            data-type-slide={attr}
                        >
                            <Weekend/>
                        </SwiperSlide>
                ))
            }
        </>
    )
}
