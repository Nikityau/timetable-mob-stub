import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Swiper as SwiperType} from "swiper";
import {hoursToMilliseconds} from "date-fns";

import Dates from "../../namespaces/dates";

import {DateController} from "./controller/date.controller";
import {DateChangeController} from "./controller/date-change.controller";
import {DateCurrentController} from "./controller/date-current.controller";

import {SlideDirection} from "./interface/slide-direction.type";
import {UseSwiperDates} from "./interface/use-swiper-dates";
import {DateSpecState} from "./interface/date-spec-state.interface";

import {AppContext} from "../../../app/app";

const dateController = new DateController(
    new DateChangeController(),
    new DateCurrentController()
)

export const useSwiperDates = (
    getDateCurrent: (any) => any,
    getDateNow: (any) => any,
    dateCurrentAction: (any) => any
): UseSwiperDates => {
    const currentDate = useSelector(getDateCurrent)
    const dateNow = useSelector(getDateNow)

    const dispatch = useDispatch()

    const appContext = useContext(AppContext)

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
        dateController.onDayChange(currentDate)
    }, [currentDate])

    useEffect(() => {
        const unsub = appContext.calendar.on('changeDay', onDayChange)

        return () => {
            unsub()
        }
    }, [currentDate])

    useEffect(() => {
        appContext.calendar.emit('toCurrentDay', currentDate)
    }, [currentDate])
    useEffect(() => {
        const unsub = appContext.calendar.pullOn('currentDate', currentDate)
        return () => {
            unsub()
        }
    }, [currentDate])
    useEffect(() => {
        const unsub = appContext.calendar.pullOn('nowDate', dateNow)
        return () => {
            unsub()
        }
    }, [dateNow])

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
        const unsub = appContext.calendar.on('toCurrentDate', toCurrentDate)

        return () => {
            unsub()
        }
    }, [swiper, currentDate])

    const toCurrentDate = () => {
        dateController.toCurrentDate(currentDate, dateNow)
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

        dispatch(dateCurrentAction(Dates.createDateObj(cDate)))
    }

    const onDayChange = (dateIncrease: "next" | "prev") => {
        let timestamp = currentDate.timestamp

        if (dateIncrease === "next") {
            timestamp = timestamp + hoursToMilliseconds(24)
        } else {
            timestamp = timestamp - hoursToMilliseconds(24)
        }

        let newDate: Date = new Date(timestamp)

        dateController._isDayChange = true

        dispatch(dateCurrentAction(Dates.createDateObj(newDate)))
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