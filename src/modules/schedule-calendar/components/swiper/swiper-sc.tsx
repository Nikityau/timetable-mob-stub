import React from 'react';
import {Swiper} from "swiper/react";

import fullWeek from "../full-week/full-week";

import {DayChangeController} from "../../controllers/day-change.controller";

import {useSwiperSC} from "../../helpers/hooks/useSwiperSC";

import './style/swiper-sc.scss'

const dayChangeController = new DayChangeController()

const SwiperSc = () => {
    const sc = useSwiperSC(dayChangeController)

    return (
        <>
            {
                sc.schedule &&
                sc.schedule.below_week &&
                sc.schedule.above_week &&
                <Swiper
                    className={'swiper-schedule__swiper'}
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    navigation={false}
                    slidesPerGroup={1}
                    initialSlide={2}
                    onInit={dayChangeController.onSwiperInit}
                    onSlideChange={dayChangeController.onSlideChange}
                    id={'schedule-calendar'}
                >
                    {
                        fullWeek({
                            week: sc.schedule.below_week,
                            weekType: 'below_week',
                            attr: 'below_week_copy'
                        })
                    }
                    {
                        fullWeek({
                            week: sc.schedule.above_week,
                            weekType: 'above_week',
                            attr: 'above_week_main'
                        })
                    }
                    {
                        fullWeek({
                            week: sc.schedule.below_week,
                            weekType: 'below_week',
                            attr: 'below_week_main'
                        })
                    }
                    {
                        fullWeek({
                            week: sc.schedule.above_week,
                            weekType: 'above_week',
                            attr: 'above_week_copy'
                        })
                    }
                </Swiper>
            }
        </>
    );
};

export default SwiperSc;