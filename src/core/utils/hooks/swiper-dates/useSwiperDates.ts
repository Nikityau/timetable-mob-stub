import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Swiper as SwiperType} from "swiper";

import {CalendarContext} from "../../../app/components/calendar/calendar";

import Dates from "../../namespaces/dates";

import {DateController} from "./date-controller";

import {SlideDirection} from "./interface/slide-direction.type";
import {UseSwiperDates} from "./interface/use-swiper-dates";
import {DateSpecState} from "./interface/date-spec-state.interface";

const dateController = new DateController()

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
        dateController._setSwiper = setSwiper
        dateController._setSliderActiveIndex = setSlideActiveIndex
        dateController._setSlideDirection = setPrevDirection
        dateController._setWeeksDates = setWeeksDates
    }, [])
    useEffect(() => {
        dateController.swiper = swiper
    }, [swiper])
    useEffect(() => {
        dateController.sliderActiveIndex = slideActiveIndex
    }, [slideActiveIndex])
    useEffect(() => {
        dateController.slideDirection = prevDirection
    }, [prevDirection])
    useEffect(() => {
        dateController.weeksDates = weeksDates
    }, [weeksDates])

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

    const toCurrentDate = () => {
        //const currDate = new Date(currentDate.year, Dates.getMonthNum(currentDate.month), currentDate.date)
        //const nowDate = new Date(dateNow.year, Dates.getMonthNum(dateNow.month), dateNow.date)

        ///const nowWeek = Dates.getDatesOfWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        dateController.toCurrentDate(currentDate, dateNow)

       /* if (Dates.isDatesCompare(currDate, nowDate)) {
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
        }*/
    }

    const onSlideChange = (swiper: SwiperType) => {
        dateController.swiper = swiper

        dateController.onSlideChange()
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