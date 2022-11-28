import React, {useContext, useEffect, useState} from 'react';
import type {Swiper as SwiperType} from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react";

import {ISwiperDates} from "./interface/swiper-dates.interface";

import {CalendarContext} from "../../../../calendar";

import Dates from "../../../../../../../utils/namespaces/dates";

import DateCard from "../date-card/date-card";

import 'swiper/css'

const SwiperDates = ({dates, currentDate, changeDates, weeksDates}: ISwiperDates) => {

    const calendarContext = useContext(CalendarContext)

    const [swiper, setSwiper] = useState<SwiperType>()

    const toCurrentDate = (additIndex: number = 0) => {
        swiper.slideToLoop(1)
        /*setTimeout(() => {
            //swiper.animating = true
        }, 0)*/
    }

    useEffect(() => {
        console.log('dates change')
        if (swiper) {
            //toCurrentDate()
        }
    }, [dates, weeksDates])

    useEffect(() => {
        const unsub = calendarContext.co.subscribe(toCurrentDate)

        return () => {
            unsub()
        }
    }, [swiper])

    const onSlideChange = (swiper: SwiperType) => {
        console.log(swiper)
        /* if(!dates[0]) return;

         if(swiper.isBeginning) {
             changeDates(dates[0]?.getFullYear(), dates[0]?.getMonth(), dates[0]?.getDate())
             return;
         }
         if(swiper.isEnd) {
             const lastIndex = dates.length - 1
             changeDates(dates[lastIndex]?.getFullYear(), dates[lastIndex]?.getMonth(), dates[lastIndex]?.getDate())
         }

         return*/
    }

    const onSwiperInit = (swiper: SwiperType) => {
        setSwiper(swiper)
    }

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
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
            {/*<SwiperSlide>
                <div className={'swiper__week'}>
                    {
                        weeks.prevWeek.map((date, index) => (
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
            <SwiperSlide>
                <div className={'swiper__week'}>
                    {
                        weeks.week.map((date, index) => (
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
            <SwiperSlide>
                <div className={'swiper__week'}>
                    {
                        weeks.nextWeek.map((date, index) => (
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
            </SwiperSlide>*/}
            {/* {
                dates.map((date, index) => (
                    <SwiperSlide key={index}>
                        <DateCard
                            weekday={Dates.castToWeekdayShort(Dates.Days[date.getDay()])}
                            day={date.getDate()}
                            isCurrent={currentDate.date == date.getDate()}
                            isWeekend={Dates.isWeekend(date.getDay())}
                        />
                    </SwiperSlide>
                ))
            }*/}
        </Swiper>
    );
};

export default SwiperDates;