import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {eachDayOfInterval} from 'date-fns'

import {getDateCurrent} from "../../../../../redux/reducers/date/date.selector";

import SwiperDates from "./components/swiper/swiper-dates";

import 'swiper/css'
import './styles/common/date-carousel.scss'

function getDaysInCurrentMonth(year, month) {
    return new Date(year, month, 0).getDate()
}

const DateCarousel = () => {

    const currentDate = useSelector(getDateCurrent)

    const [dates, setDate] = useState([])

    useEffect(() => {
        (() => {
            const days = getDaysInCurrentMonth(2022, 11)
            const datesRes = eachDayOfInterval({
                start: new Date(2022, 10, 1),
                end: new Date(2022, 10, days)
            })
            setDate(datesRes)
        })()
    }, [])

    return (
        <div className={'date-carousel'}>
            <div className={'date-carousel__container'}>
                <SwiperDates dates={dates} currentDate={currentDate}/>
            </div>
        </div>
    );
};

export default DateCarousel;