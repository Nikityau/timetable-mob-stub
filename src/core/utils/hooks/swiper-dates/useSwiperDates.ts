import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Swiper as SwiperType} from "swiper";

import {CalendarContext} from "../../../app/components/calendar/calendar";

import ReduxDateSelector from "../../../redux/reducers/date/date.selector";
import ReduxDateAction from "../../../redux/reducers/date/date.actions";

import Dates from "../../namespaces/dates";

import {SlidePos} from "./interface/slide-pos.type";
import {SlideDirection} from "./interface/slide-direction.type";

import {UseSwiperDates} from "./interface/use-swiper-dates";
import {DateSpecState} from "./interface/date-spec-state";

export const useSwiperDates = (): UseSwiperDates => {
    const currentDate = useSelector(ReduxDateSelector.getDateCurrent)

    const dispatch = useDispatch()

    const calendarContext = useContext(CalendarContext)


    const [swiper, setSwiper] = useState<SwiperType>()
    const [slideActiveIndex, setSlideActiveIndex] = useState<number>(2)
    const [prevDirection, setPrevDirection] = useState<SlideDirection>()
    const [weeksDates, setWeeksDates] = useState<DateSpecState>({dateStart: 'curr', dates: []})

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

    const toCurrentDate = (additIndex: number = 0) => {
        //swiper.slideToLoop(1)
    }

    const setWeeksDatesFunction = (dates: Date[][], dateStart: SlidePos) => {
        setWeeksDates({
            dates,
            dateStart
        })
    }

    const changeDates = (y: number, m: number, d: number, spec: SlidePos, activeIndexPrev: number | 'undef', direction: 'left' | 'right') => {
        const week = Dates.getDatesOfWeek(y, m, d)
        const prevWeek = Dates.getDatesOfPrevWeek(y, m, d)
        const nextWeek = Dates.getDatesOfNextWeek(y, m, d)

        if (activeIndexPrev == 0 || activeIndexPrev == 4) return

        if (direction == 'right') {
            changeDatesRightBranch({ week, prevWeek, nextWeek })
            return;
        }
        if (direction == 'left') {
            changeDatesLeftBranch({prevWeek, week, nextWeek})
            return;
        }
    }
    const changeDatesLeftBranch = ({ prevWeek, week, nextWeek }: { prevWeek:Date[], week: Date[], nextWeek: Date[] }) => {
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
    const changeDatesRightBranch = ({ prevWeek, week, nextWeek }: { prevWeek:Date[], week: Date[], nextWeek: Date[] }) => {
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

            let { firstEl, direction } = slideChangeRight('right')
            preChangesDates(firstEl, direction)

            return;
        }
        if (swiper.activeIndex < slideActiveIndex) {
            setPrevDirection('left')

            let { firstEl, direction } = slideChangeLeft('left')
            preChangesDates(firstEl, direction)
        }
    }

    const preChangesDates = (array:Date[], direction: SlideDirection) => {
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

        dispatch(ReduxDateAction.dateCurrent({
            date: cDate.getDate(),
            year: cDate.getFullYear(),
            month: Dates.Month[cDate.getMonth()],
            weekday: Dates.Day[cDate.getDay()],
            full: 'TEST'
        }))
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