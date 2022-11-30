import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";

import {getDateCurrent} from "../../../../../redux/reducers/date/date.selector";

import Dates from "../../../../../utils/namespaces/dates";

import SwiperDates from "./components/swiper/swiper-dates";

import 'swiper/css'
import './styles/common/date-carousel.scss'

export interface WeeksDate {
    prevWeek: Date[]
    week: Date[]
    nextWeek: Date[]
}

interface DateSpecState {
    dates: Date[][],
    dateStart: 'prev' | 'current' | 'next',
}

const DateCarousel = () => {

    const dateCarouselRef = useRef<HTMLDivElement>()

    const currentDate = useSelector(getDateCurrent)

    const [weeksDates, setWeeksDates] = useState<DateSpecState>({ dateStart: 'current', dates: []})

    useEffect(() => {
        (() => {
            const week = Dates.getDatesOfWeek(currentDate.year, Dates.getMonthNum(currentDate.month), currentDate.date)
            const prevWeek = Dates.getDatesOfPrevWeek(week[0].getFullYear(), week[0].getMonth(), week[0].getDate())
            const nextWeek = Dates.getDatesOfNextWeek(week[0].getFullYear(), week[0].getMonth(), week[0].getDate())
            setWeeksDates({
                dates: [
                    prevWeek,
                    week,
                    nextWeek,
                ],
                dateStart: 'prev',
            })
        })()
    }, [currentDate])

    const changeDates = (y: number, m: number, d: number, spec: 'prev' | 'current' | 'next', activeIndexPrev: number | 'undef', direction: 'left' | 'right') => {
        const week = Dates.getDatesOfWeek(y, m, d)
        const prevWeek = Dates.getDatesOfPrevWeek(y, m, d)
        const nextWeek = Dates.getDatesOfNextWeek(y, m, d)

        console.log('active_index_prev',activeIndexPrev)
        if(activeIndexPrev == 0 || activeIndexPrev == 4) return

        if(direction == 'right') {
            if(weeksDates.dateStart == 'current') {
                console.log('current')
                setWeeksDates(prev => ({
                    dates: [
                        prevWeek,
                        week,
                        nextWeek,
                    ],
                    dateStart: 'prev',
                }))
                console.log('next')
            }
            if(weeksDates.dateStart == 'next') {
                console.log('next')
                setWeeksDates(prev => ({
                    dates: [
                        week,
                        nextWeek,
                        prevWeek,
                    ],
                    dateStart: 'current',
                }))
                console.log('current')
            }
            if(weeksDates.dateStart == 'prev') {
                console.log('prev')
                setWeeksDates(prev => ({
                    dates: [
                        nextWeek,
                        prevWeek,
                        week,
                    ],
                    dateStart: 'next',
                }))
                console.log('next')
            }
        }
        if(direction == 'left') {
            if(weeksDates.dateStart == 'current') {
                console.log('current')
                setWeeksDates(prev => ({
                    dates: [
                        nextWeek,
                        prevWeek,
                        week,
                    ],
                    dateStart: 'next',
                }))
                console.log('next')
            }
            if(weeksDates.dateStart == 'next') {
                console.log('next')
                setWeeksDates(prev => ({
                    dates: [
                        prevWeek,
                        week,
                        nextWeek,
                    ],
                    dateStart: 'prev',
                }))
                console.log('prev')
            }
            if(weeksDates.dateStart == 'prev') {
                console.log('prev')
                setWeeksDates(prev => ({
                    dates: [
                        week,
                        nextWeek,
                        prevWeek,
                    ],
                    dateStart: 'current',
                }))
                console.log('current')
            }
        }
    }

    return (
        <div className={'date-carousel'}>
            <div className={'date-carousel__container'}>
                <SwiperDates
                    weeksDates={weeksDates.dates}
                    currentDate={currentDate}
                    changeDates={changeDates}
                    dateSpec={weeksDates.dateStart}
                />
            </div>
        </div>
    );
};

export default DateCarousel;