import React from 'react';

import SwiperDC from "../swiper/swiper-dc";

import './style/date-calendar.scss'

const DateCalendar = () => {
    return (
        <div className={'date-calendar'}>
            <SwiperDC/>
        </div>
    );
};

export default DateCalendar;