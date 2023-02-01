import React, {useEffect, useState} from "react";
import {Swiper as SwiperType} from "swiper"
import {useSelector, useDispatch} from "react-redux";

import Dates from "../../../../helpers/date/date";

import {getDateNow} from "../../store/selector/getDate";
import {changeCurrentDate, changeCurrentDateEqNow} from '../../store/action/action'

import DateController from "../../controllers/date.controller";
import {DateChangeController} from "../../controllers/date-change.controller";
import {DateCurrentController} from "../../controllers/date-current.controller";

import Event from "../../../../helpers/event/event";

import {SlideDirection, DateSpecState} from "../../controllers/type/controll.type";

const dateController = new DateController(
    new DateChangeController(),
    new DateCurrentController()
)

const useSwiperDates = () => {
    const dateNow = useSelector(getDateNow)

    const dispatch = useDispatch()

    const [swiper, setSwiper] = useState<SwiperType>()
    const [slideActiveIndex, setSlideActiveIndex] = useState<number>(2)
    const [prevDirection, setPrevDirection] = useState<SlideDirection>()
    const [weeksDates, setWeeksDates] = useState<DateSpecState>({dateStart: 'curr', dates: []})

    useEffect(() => {
        const unsub = Event.on('currentDate', toCurrentDate)

        return () => {
            unsub()
        }
    }, [])

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

    const toCurrentDate = (date: Dates.DateObj) => {
        dispatch(changeCurrentDateEqNow())
        dateController.toCurrentDate(date, dateNow)
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

        dispatch(changeCurrentDate(cDate))
    }

    const onDayChange = (dateIncrease: "next" | "prev") => {
        /*let timestamp = currentDate.timestamp

        if (dateIncrease === "next") {
            timestamp = timestamp + hoursToMilliseconds(24)
        } else {
            timestamp = timestamp - hoursToMilliseconds(24)
        }

        let newDate: Date = new Date(timestamp)

        dateController._isDayChange = true

        dispatch(dateCurrentAction(Dates.createDateObj(newDate)))*/
    }

    return [
        {
            swiper: swiper,
            weeksDates: weeksDates.dates,
            dateNow,
            currentDate: dateNow
        },
        {
            onSwiperInit,
            onSlideChange,
            onSlideClick
        }
    ]
}

export default useSwiperDates