import React, {useContext, useEffect, useState} from 'react';
import type {Swiper as SwiperType} from 'swiper'
import {Swiper, SwiperSlide} from "swiper/react";
import {useDispatch, useSelector} from "react-redux";

import {ISwiperDates} from "./interface/swiper-dates.interface";

import {CalendarContext} from "../../../../calendar";

import Dates from "../../../../../../../utils/namespaces/dates";

import DateCard from "../date-card/date-card";

import 'swiper/css'
import {dateCurrent} from "../../../../../../../redux/reducers/date/date.actions";
import {getDateCurrent} from "../../../../../../../redux/reducers/date/date.selector";

export interface WeeksDate {
    prevWeek: Date[]
    week: Date[]
    nextWeek: Date[]
}

interface DateSpecState {
    dates: Date[][],
    dateStart: 'prev' | 'current' | 'next',
}

const SwiperDates = ({}: ISwiperDates) => {

    const currentDate = useSelector(getDateCurrent)

    const dispatch = useDispatch()

    const [weeksDates, setWeeksDates] = useState<DateSpecState>({ dateStart: 'current', dates: []})

    useEffect(() => {
        console.log('upd')
        return () => {
            console.log('remove')
        }
    }, [weeksDates])

    const calendarContext = useContext(CalendarContext)

    const [swiper, setSwiper] = useState<SwiperType>()
    const [slideActiveIndex, setSlideActiveIndex] = useState<number>(2)
    const [prevDirection, setPrevDirection] = useState<'left' | 'right'>()

    const toCurrentDate = (additIndex: number = 0) => {
        //swiper.slideToLoop(1)
    }

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
    }, [])

    useEffect(() => {
        const unsub = calendarContext.co.subscribe(toCurrentDate)

        return () => {
            unsub()
        }
    }, [swiper])

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

    const onSlideChange = (swiper: SwiperType) => {
        console.log('change', swiper)

        if(Math.abs(swiper.activeIndex - slideActiveIndex) > 1) {
            console.log('here', prevDirection)
            setSlideActiveIndex(swiper.activeIndex)

            let firstEl = undefined
            let firstOfFirstEl = undefined
            if(prevDirection == 'left') {
                if (weeksDates.dateStart == 'next') {
                    firstEl = weeksDates.dates[1]
                }
                if (weeksDates.dateStart == 'current') {
                    firstEl = weeksDates.dates[2]
                }
                if (weeksDates.dateStart == 'prev') {
                    firstEl = weeksDates.dates[0]
                }
            }
            if(prevDirection == 'right') {
                if (weeksDates.dateStart == 'next') {
                    firstEl = weeksDates.dates[0]
                }
                if (weeksDates.dateStart == 'current') {
                    firstEl = weeksDates.dates[1]
                }
                if (weeksDates.dateStart == 'prev') {
                    firstEl = weeksDates.dates[2]
                }
            }

            if (!firstEl) return
            firstOfFirstEl = firstEl[0]
            if(!firstOfFirstEl) return;
            changeDates(firstOfFirstEl.getFullYear(), firstOfFirstEl.getMonth(), firstOfFirstEl.getDate(), weeksDates.dateStart, swiper.activeIndex, prevDirection)

            return;
        }

        if (swiper.activeIndex > slideActiveIndex) {
            console.log('right')
            setSlideActiveIndex(swiper.activeIndex)
            setPrevDirection('right')

            let firstEl = undefined
            let firstOfFirstEl = undefined
            if (weeksDates.dateStart == 'next') {
                firstEl = weeksDates.dates[0]
            }
            if (weeksDates.dateStart == 'current') {
                firstEl = weeksDates.dates[1]
            }
            if (weeksDates.dateStart == 'prev') {
                firstEl = weeksDates.dates[2]
            }
            if (!firstEl) return
            firstOfFirstEl = firstEl[0]
            if(!firstOfFirstEl) return;
            changeDates(firstOfFirstEl.getFullYear(), firstOfFirstEl.getMonth(), firstOfFirstEl.getDate(), weeksDates.dateStart, swiper.activeIndex, 'right')

            return;
        }
        if (swiper.activeIndex < slideActiveIndex) {
            console.log('left')
            setSlideActiveIndex(swiper.activeIndex)
            setPrevDirection('left')

            let firstEl = undefined
            let firstOfFirstEl = undefined
            if (weeksDates.dateStart == 'next') {
                firstEl = weeksDates.dates[1]
            }
            if (weeksDates.dateStart == 'current') {
                firstEl = weeksDates.dates[2]
            }
            if (weeksDates.dateStart == 'prev') {
                firstEl = weeksDates.dates[0]
            }
            if (!firstEl) return
            firstOfFirstEl = firstEl[0]
            if(!firstOfFirstEl) return;
            changeDates(firstOfFirstEl.getFullYear(), firstOfFirstEl.getMonth(), firstOfFirstEl.getDate(), weeksDates.dateStart, swiper.activeIndex, 'left')
        }

    }

    const onDateCardClick = (e:React.MouseEvent) => {
        /*const date: Dates.DateObj = {
            date: dateNew.getDate(),
            month: Dates.Month[dateNew.getMonth()],
            weekday: Dates.Day[dateNew.getDay()],
            year: dateNew.getFullYear(),
            full: 'TEST'
        }

        dispatch(dateCurrent(date))*/
        const dateCard = e.target as HTMLElement

        if(!dateCard.classList.contains('date-card')) return

        const date = Number.parseInt(dateCard.getAttribute('data-date'))
        const month = Number.parseInt(dateCard.getAttribute('data-month'))
        const year = Number.parseInt(dateCard.getAttribute('data-year'))

        console.log(date, month, year)

        const cDate = new Date(year, month, date)

        dispatch(dateCurrent({
            date: cDate.getDate(),
            year: cDate.getFullYear(),
            month: Dates.Month[cDate.getMonth()],
            weekday: Dates.Day[cDate.getDay()],
            full: 'TEST'
        }))
    }

    const onSwiperInit = (swiper: SwiperType) => {
        setSwiper(swiper)
    }

    const isCurrentDate = (date:Date):boolean => {
        if(date.getDate() != currentDate.date) return false
        if(date.getMonth() != Dates.getMonthNum(currentDate.month)) return false
        if(date.getFullYear() != currentDate.year) return false

        return true
    }

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            navigation={false}
            initialSlide={2}
            slidesPerGroup={1}
            onSlideChange={onSlideChange}
            onSwiper={onSwiperInit}
        >
            {
                weeksDates.dates.map((weeks, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={onDateCardClick}
                    >
                        <div className={'swiper__week'}>
                            {
                                weeks.map((date, index) => (
                                    <DateCard
                                        key={index}
                                        weekday={Dates.castToWeekdayShort(Dates.Day[date.getDay()])}
                                        day={date.getDate()}
                                        isCurrent={isCurrentDate(date)}
                                        isWeekend={Dates.isWeekend(date.getDay())}
                                        fullDate={date}
                                    />
                                ))
                            }
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default SwiperDates;