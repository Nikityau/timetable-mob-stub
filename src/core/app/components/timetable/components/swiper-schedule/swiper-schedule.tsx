import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css'
import ScheduleDay from "../schedule-day/schedule-day";

interface ISwiperSchedule {
    schedule: any[]
}

const SwiperSchedule = ({ schedule }: ISwiperSchedule) => {

    return (
        <div className={'swiper-schedule'}>
            <div className={'swiper-schedule__container'}>
                {
                    schedule && schedule.length > 0 &&
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                        navigation={false}
                        slidesPerGroup={1}
                    >
                        {
                            schedule.map((week, index) => {
                                return week.map((day, index) => (
                                    <SwiperSlide key={index}>
                                        <ScheduleDay scheduleDay={day}/>
                                    </SwiperSlide>
                                ))
                            })
                        }
                    </Swiper>
                }
            </div>
        </div>
    );
};

export default SwiperSchedule;