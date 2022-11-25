import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {Splide as SplideReact, SplideSlide, SplideTrack} from "@splidejs/react-splide";
import {eachDayOfInterval} from 'date-fns'

import {DayByNum} from "../../../../../redux/reducers/date/date.reducer";

import {getDateCurrent} from "../../../../../redux/reducers/date/date.selector";

import DateCard from "./components/date-card/date-card";

import '@splidejs/splide/css';
import './styles/common/date-carousel.scss'

const date = new Date(Date.now())

function getDaysInCurrentMonth(year, month) {
    return new Date(year, month, 0).getDate()
}

function isWeekend(dayNum): boolean {
    return dayNum == 0 || dayNum == 6;
}

const DateCarousel = () => {

    const splideRef = useRef<SplideReact>()

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

    useEffect(() => {
        console.log(splideRef.current)
    }, [splideRef])

    return (
        <div className={'date-carousel'}>
            <div className={'date-carousel__container'}>
                {
                    dates && dates.length > 0 &&
                    <SplideReact
                        ref={splideRef}
                        hasTrack={false}
                        tag={'section'}
                        onClick={(e) => {
                            console.log(e)
                        }}
                        options={{
                            arrows: false,
                            pagination: false,
                            perPage: 7,
                            gap: 20,
                            type: 'loop',
                            focus: 'center'
                        }}

                    >
                        <SplideTrack>
                            {
                                dates.map((date, index) => (
                                    <SplideSlide key={index}>
                                        <DateCard
                                            weekday={DayByNum[date.getDay()]}
                                            day={date.getDate()}
                                            isCurrent={currentDate.date == date.getDate()}
                                            isWeekend={isWeekend(date.getDay())}
                                        />
                                    </SplideSlide>
                                ))
                            }
                        </SplideTrack>
                    </SplideReact>
                }
            </div>
        </div>
    );
};

export default DateCarousel;