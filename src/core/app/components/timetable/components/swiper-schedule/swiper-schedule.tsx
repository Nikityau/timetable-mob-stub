import React, {useContext, useState} from 'react';
import type { Swiper as SwiperType } from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react";
import {useSelector} from "react-redux";
import {nanoid} from "nanoid";

import ScheduleDay from "../schedule-day/schedule-day";
import Weekend from "../weekend/weekend";

import Dates from "../../../../../utils/namespaces/dates";

import {ISwiperSchedule} from "./interface/swiper-schedule";

import 'swiper/css'
import './style/common/swiper-schedule.scss'

import {AppContext} from "../../../../app";

const SwiperSchedule = ({schedule, below_week, above_week}: ISwiperSchedule) => {

    const appContext = useContext(AppContext)

    const nowDate = useSelector(appContext.reduxApi.date.selector.getDateNow)
    const currDate = useSelector(appContext.reduxApi.date.selector.getDateCurrent)

    const [swiper, setSwiper] = useState<SwiperType>()

    const getDayType = (day: number): string => {
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

    const getFullWeek = (week: any[], weekType: string): JSX.Element => {
        if (week.length == 6) {
            return (
                <>
                    {
                        week?.map((day, index) => (
                            <SwiperSlide
                                key={nanoid()}
                                className={'swiper-schedule__slide'}
                                data-week-type={weekType}
                                data-day-type-string={getDayType(day[0]['week_day'])}
                                data-day-type-number={day[0]['week_day']}
                            >
                                <ScheduleDay scheduleDay={day}/>
                            </SwiperSlide>
                        ))
                    }
                   <SwiperSlide
                       key={nanoid()}
                       className={'swiper-schedule__slide'}
                       data-week-type={weekType}
                       data-day-type-string={getDayType(7)}
                       data-day-type-number={7}
                   >
                       <Weekend/>
                   </SwiperSlide>
                </>
            )
        }

        return (
            <>
                {
                    week?.map((day, index) => (
                        <SwiperSlide
                            key={nanoid()}
                            className={'swiper-schedule__slide'}
                            data-week-type={weekType}
                            data-day-type-string={getDayType(day[0]['week_day'])}
                            data-day-type-number={day[0]['week_day']}
                        >
                            <ScheduleDay scheduleDay={day}/>
                        </SwiperSlide>
                    ))
                }
                <SwiperSlide
                    key={nanoid()}
                    className={'swiper-schedule__slide'}
                    data-week-type={weekType}
                    data-day-type-string={getDayType(6)}
                    data-day-type-number={6}
                >
                    <Weekend/>
                </SwiperSlide>
                <SwiperSlide
                    key={nanoid()}
                    className={'swiper-schedule__slide'}
                    data-week-type={weekType}
                    data-day-type-string={getDayType(7)}
                    data-day-type-number={7}
                >
                    <Weekend/>
                </SwiperSlide>
            </>
        )
    }

    const onSwiperInit = (swiper: SwiperType) => {
        setSwiper(swiper)
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
                    >
                        {
                            getFullWeek(above_week, 'above_week')
                        }
                        {
                            getFullWeek(below_week, 'below_week')
                        }
                    </Swiper>
                }
            </div>
        </div>
    );
};

export default SwiperSchedule;