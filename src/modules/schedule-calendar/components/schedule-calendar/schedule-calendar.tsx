import React from 'react';

import SwiperSc from "../swiper/swiper-sc";

import './style/schedule-calendar.css'

type ScheduleCalendarProps = {
    height: number
}

const ScheduleCalendar = ({ height }: ScheduleCalendarProps) => {
    return (
        <div className={'schedule-calendar'}
            style={{
                height: `${height}px`
            }}
        >
            <SwiperSc/>
        </div>
    );
};

export default ScheduleCalendar;