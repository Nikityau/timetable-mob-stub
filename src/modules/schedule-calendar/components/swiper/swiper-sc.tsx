import React, {useEffect} from 'react';
import {Swiper} from "swiper/react";

import './style/swiper-sc.scss'

const SwiperSc = () => {

    const schedule = [
    ]

    return (
        <>
            {
                schedule && schedule.length > 0 &&
                <Swiper
                    className={'swiper-schedule__swiper'}
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    navigation={false}
                    slidesPerGroup={1}
                    initialSlide={2}
                    onInit={() => {}}
                    onSlideChange={() => {}}
                >

                </Swiper>
            }
        </>
    );
};

export default SwiperSc;