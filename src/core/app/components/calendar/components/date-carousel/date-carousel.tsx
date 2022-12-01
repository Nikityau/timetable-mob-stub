import React from 'react';

import SwiperDates from "./components/swiper/swiper-dates";

import 'swiper/css'
import './styles/common/date-carousel.scss'

const DateCarousel = () => {
    return (
        <div className={'date-carousel'}>
            <div className={'date-carousel__container'}>
                <SwiperDates/>
            </div>
        </div>
    );
};

export default DateCarousel;