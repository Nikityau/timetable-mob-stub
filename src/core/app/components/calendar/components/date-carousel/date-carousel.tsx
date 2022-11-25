import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";

import {getDateCurrent} from "../../../../../redux/reducers/date/date.selector";
import DateCard from "./components/date-card/date-card";

import '@splidejs/splide/css';
import './styles/common/date-carousel.scss'

const DateCarousel = () => {

    const currentDate = useSelector(getDateCurrent)

    useEffect(() => {
        (() => {
        })()
    }, [])

    return (
        <div className={'date-carousel'}>
            <div className={'date-carousel__container'}>
                <Splide
                    options={{
                        arrows: false,
                        pagination: false,
                        perPage: 7,
                        gap: 20,
                        type: 'loop'
                    }}
                >
                    <SplideSlide>
                        <DateCard weekday={'пн'} day={1}/>
                    </SplideSlide>
                    <SplideSlide>
                        <DateCard weekday={'вт'} day={2}/>
                    </SplideSlide>
                    <SplideSlide>
                        <DateCard weekday={'ср'} day={3}/>
                    </SplideSlide>
                    <SplideSlide>
                        <DateCard weekday={'чт'} day={4}/>
                    </SplideSlide>
                    <SplideSlide>
                        <DateCard weekday={'пт'} day={5}/>
                    </SplideSlide>
                    <SplideSlide>
                        <DateCard weekday={'сб'} day={6}/>
                    </SplideSlide>
                    <SplideSlide>
                        <DateCard weekday={'вс'} day={7}/>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    );
};

export default DateCarousel;