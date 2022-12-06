import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Swiper as SwiperType} from "swiper";

import {CalendarContext} from "../../../app/components/calendar/calendar";

import Dates from "../../namespaces/dates";

import {SlidePos} from "./interface/slide-pos.type";
import {SlideDirection} from "./interface/slide-direction.type";
import {UseSwiperDates} from "./interface/use-swiper-dates";
import {DateSpecState} from "./interface/date-spec-state.interface";
import {DateWeeks} from "./interface/date-weeks.interface";

let isCanChangeDate = true

export const useSwiperDates = (
    getDateCurrent: (any) => any,
    getDateNow: (any) => any,
    dateCurrentAction: (any) => any
): UseSwiperDates => {
    const currentDate = useSelector(getDateCurrent)
    const dateNow = useSelector(getDateNow)

    const dispatch = useDispatch()

    const calendarContext = useContext(CalendarContext)

    const [swiper, setSwiper] = useState<SwiperType>()
    const [slideActiveIndex, setSlideActiveIndex] = useState<number>(2)
    const [prevDirection, setPrevDirection] = useState<SlideDirection>()
    const [weeksDates, setWeeksDates] = useState<DateSpecState>({dateStart: 'curr', dates: []})

    useEffect(() => {
        (() => {
            const week = Dates.getDatesOfWeek(dateNow.year, Dates.getMonthNum(dateNow.month), dateNow.date)
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
    }, [dateNow])
    useEffect(() => {
        const unsub = calendarContext.co.subscribe(toCurrentDate)

        return () => {
            unsub()
        }
    }, [swiper, currentDate])

    const setWeeksDatesFunction = (dates: Date[][], dateStart: SlidePos) => {
        setWeeksDates({
            dates,
            dateStart
        })
    }

    const toCurrentDate = () => {
        const currDate = new Date(currentDate.year, Dates.getMonthNum(currentDate.month), currentDate.date)
        const nowDate = new Date(dateNow.year, Dates.getMonthNum(dateNow.month), dateNow.date)

        const nowWeek = Dates.getDatesOfWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        if (Dates.isDatesCompare(currDate, nowDate)) {
            toCurrentDateFromWeek(currDate, nowWeek, nowDate)

            return;
        }

        if (Dates.isDateBelongs(currDate, nowWeek)) return;

        const week = Dates.getDatesOfWeek(currDate.getFullYear(), currDate.getMonth(), currDate.getDate())

        let prevWeek = nowWeek
        let nextWeek = nowWeek

        isCanChangeDate = false

        const {activeIndex} = swiper

        if (currDate > nowDate) {
            toCurrentDateFromFut(activeIndex, nowWeek, nowDate, { prevWeek, week, nextWeek })

            return;
        }
        if (currDate < nowDate) {
            toCurrentDateFromPast(activeIndex, nowWeek, nowDate, { week, prevWeek, nextWeek })

            return;
        }
    }
    const toCurrentDateFromWeek = (currDate, nowWeek, nowDate) => {
        const swiperDOM = document.querySelector('.swiper')
        const activeSlide = swiperDOM.querySelector('.swiper-slide-active')
        const dateCard = activeSlide.querySelector('.date-card')

        const dateDateCard = Number.parseInt(dateCard.getAttribute('data-date'))
        const monthDateCard = Number.parseInt(dateCard.getAttribute('data-month'))
        const yearDateCard = Number.parseInt(dateCard.getAttribute('data-year'))

        const weekOfActive = Dates.getDatesOfWeek(yearDateCard, monthDateCard, dateDateCard)
        const tempDate = weekOfActive[0]

        if(Dates.isDateBelongs(currDate,weekOfActive)) return;

        if(tempDate > nowDate) {
            toCurrentDateFromFut(swiper.activeIndex, nowWeek, nowDate, {
                week: weekOfActive,
                prevWeek: nowWeek,
                nextWeek: nowWeek
            })

            swiper.slideToLoop(1)
        }
        if(tempDate < nowDate) {
            toCurrentDateFromPast(swiper.activeIndex, nowWeek, nowDate, {
                week: weekOfActive,
                prevWeek: nowWeek,
                nextWeek: nowWeek
            })
        }
    }
    const toCurrentDateFromFut = (activeIndex, nowWeek, nowDate,{ week, prevWeek, nextWeek }:DateWeeks) => {
        if (activeIndex == 3) {
            setWeeksDatesFunction([prevWeek, nextWeek, week], 'prev')
        }
        if (activeIndex == 4) {
            setWeeksDatesFunction([week, prevWeek, nextWeek], 'curr')
        }
        if (activeIndex == 2) {
            setWeeksDatesFunction([prevWeek, week, nextWeek], 'prev')
        }

        if (activeIndex == 4 || activeIndex == 3) {
            swiper.slideToLoop(1)
        }
        if (activeIndex == 2) {
            swiper.slideToLoop(0)
        }

        nextWeek = Dates.getDatesOfNextWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
        prevWeek = Dates.getDatesOfPrevWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        if (activeIndex == 4 || activeIndex == 3) {
            setWeeksDatesFunction([prevWeek, nowWeek, nextWeek], 'prev')
        }
        if (activeIndex == 2) {
            setWeeksDatesFunction([nowWeek, nextWeek, prevWeek], 'curr')
        }

        isCanChangeDate = true
    }
    const toCurrentDateFromPast = (activeIndex, nowWeek, nowDate,{ week, prevWeek, nextWeek }:DateWeeks) => {
        if(activeIndex == 1) {
            setWeeksDatesFunction([week, prevWeek, nextWeek], 'curr')
        }
        if(activeIndex == 0) {
            setWeeksDatesFunction([prevWeek, nextWeek, week], 'prev')
        }
        if(activeIndex == 2) {
            setWeeksDatesFunction([prevWeek, week, nextWeek], 'prev')
        }

        if(activeIndex == 1) {
            swiper.slideToLoop(1)
        }
        if(activeIndex == 0) {
            swiper.slideToLoop(0)
        }
        if(activeIndex == 2) {
            swiper.slideToLoop(2)
        }

        nextWeek = Dates.getDatesOfNextWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
        prevWeek = Dates.getDatesOfPrevWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        if(activeIndex == 1) {
            setWeeksDatesFunction([prevWeek, nowWeek, nextWeek], 'prev')
        }
        if(activeIndex == 0) {
            setWeeksDatesFunction([nowWeek, nextWeek, prevWeek], 'curr')
        }
        if(activeIndex == 2) {
            setWeeksDatesFunction([nextWeek, prevWeek, nowWeek], 'next')
        }

        isCanChangeDate = true
    }

    const changeDates = (y: number, m: number, d: number, spec: SlidePos, activeIndexPrev: number | 'undef', direction: 'left' | 'right') => {
        if (!isCanChangeDate) return;

        const week = Dates.getDatesOfWeek(y, m, d)
        const prevWeek = Dates.getDatesOfPrevWeek(y, m, d)
        const nextWeek = Dates.getDatesOfNextWeek(y, m, d)

        if (activeIndexPrev == 0 || activeIndexPrev == 4) return

        if (direction == 'right') {
            changeDatesRightBranch({week, prevWeek, nextWeek})
            return;
        }
        if (direction == 'left') {
            changeDatesLeftBranch({prevWeek, week, nextWeek})
            return;
        }
    }
    const changeDatesLeftBranch = ({prevWeek, week, nextWeek}: DateWeeks) => {
        if (weeksDates.dateStart == 'curr') {
            setWeeksDatesFunction([
                nextWeek,
                prevWeek,
                week,
            ], 'next')
        }
        if (weeksDates.dateStart == 'next') {
            setWeeksDatesFunction([
                prevWeek,
                week,
                nextWeek,
            ], 'prev')
        }
        if (weeksDates.dateStart == 'prev') {
            setWeeksDatesFunction([
                week,
                nextWeek,
                prevWeek,
            ], 'curr')
        }
    }
    const changeDatesRightBranch = ({prevWeek, week, nextWeek}: DateWeeks) => {
        if (weeksDates.dateStart == 'curr') {
            setWeeksDatesFunction([
                prevWeek,
                week,
                nextWeek,
            ], 'prev')
        }
        if (weeksDates.dateStart == 'next') {
            setWeeksDatesFunction([
                week,
                nextWeek,
                prevWeek,
            ], 'curr')
        }
        if (weeksDates.dateStart == 'prev') {
            setWeeksDatesFunction([
                nextWeek,
                prevWeek,
                week,
            ], 'next')
        }
    }

    const onSlideChange = (swiper: SwiperType) => {
        setSlideActiveIndex(swiper.activeIndex)

        let objEl = undefined

        if (Math.abs(swiper.activeIndex - slideActiveIndex) > 1) {
            if (prevDirection == 'left') {
                objEl = slideChangeLeft(prevDirection)
            }
            if (prevDirection == 'right') {
                objEl = slideChangeRight(prevDirection)
            }

            preChangesDates(objEl.firstEl, objEl.direction)

            return;
        }

        if (swiper.activeIndex > slideActiveIndex) {
            setPrevDirection('right')

            let {firstEl, direction} = slideChangeRight('right')
            preChangesDates(firstEl, direction)

            return;
        }
        if (swiper.activeIndex < slideActiveIndex) {
            setPrevDirection('left')

            let {firstEl, direction} = slideChangeLeft('left')
            preChangesDates(firstEl, direction)
        }
    }
    const preChangesDates = (array: Date[], direction: SlideDirection) => {
        let firstEl = array
        let firstOfFirstEl = undefined

        if (!firstEl) return
        firstOfFirstEl = firstEl[0]
        if (!firstOfFirstEl) return;
        changeDates(firstOfFirstEl.getFullYear(), firstOfFirstEl.getMonth(), firstOfFirstEl.getDate(), weeksDates.dateStart, swiper.activeIndex, direction)
    }
    const slideChangeLeft = (direction: SlideDirection) => {
        let firstEl
        if (weeksDates.dateStart == 'next') {
            firstEl = weeksDates.dates[1]
        }
        if (weeksDates.dateStart == 'curr') {
            firstEl = weeksDates.dates[2]
        }
        if (weeksDates.dateStart == 'prev') {
            firstEl = weeksDates.dates[0]
        }
        return {
            firstEl,
            direction
        }
    }
    const slideChangeRight = (direction: SlideDirection) => {
        let firstEl = undefined
        if (weeksDates.dateStart == 'next') {
            firstEl = weeksDates.dates[0]
        }
        if (weeksDates.dateStart == 'curr') {
            firstEl = weeksDates.dates[1]
        }
        if (weeksDates.dateStart == 'prev') {
            firstEl = weeksDates.dates[2]
        }
        return {
            firstEl,
            direction
        }
    }

    const onSwiperInit = (swiper: SwiperType) => {
        setSwiper(swiper)
    }

    const onSlideClick = (e: React.MouseEvent) => {
        const dateCard = e.target as HTMLElement

        if (!dateCard.classList.contains('date-card')) return

        const date = Number.parseInt(dateCard.getAttribute('data-date'))
        const month = Number.parseInt(dateCard.getAttribute('data-month'))
        const year = Number.parseInt(dateCard.getAttribute('data-year'))

        const cDate = new Date(year, month, date)

        dispatch(dateCurrentAction(Dates.getDateObj(cDate)))
    }

    return [
        {
            swiper,
            weeksDates: weeksDates.dates,
        },
        {
            onSwiperInit,
            onSlideChange,
            onSlideClick
        }
    ]
}