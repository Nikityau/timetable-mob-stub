import React, {useEffect, useState} from 'react';
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

const DateCarousel = () => {

    const currentDate = useSelector(getDateCurrent)

    const [dates, setDate] = useState<Date[]>([])
    const [weeks, setWeeks] = useState<WeeksDate>({ nextWeek: [], prevWeek: [], week: [] })
    const [weeksDates, setWeeksDates] = useState<Array<Array<Date>>>([])

    /*useEffect(() => {
        (() => {
            const week = Dates.getDatesOfWeek(currentDate.year, Dates.getMonthNum(currentDate.month), currentDate.date)
            const prevWeek = Dates.getDatesOfPrevWeek(week[0].getFullYear(), week[0].getMonth(), week[0].getDate())
            const nextWeek = Dates.getDatesOfNextWeek(week[0].getFullYear(), week[0].getMonth(), week[0].getDate())
            setDate([
                ...prevWeek,
                ...week,
                ...nextWeek
            ])
        })()
    }, [currentDate])
    useEffect(() => {
        (() => {
            const week = Dates.getDatesOfWeek(currentDate.year, Dates.getMonthNum(currentDate.month), currentDate.date)
            const prevWeek = Dates.getDatesOfPrevWeek(week[0].getFullYear(), week[0].getMonth(), week[0].getDate())
            const nextWeek = Dates.getDatesOfNextWeek(week[0].getFullYear(), week[0].getMonth(), week[0].getDate())

            setWeeks({
                week,
                prevWeek,
                nextWeek
            })
        })()
    }, [currentDate])*/

    useEffect(() => {
        (() => {
            const week = Dates.getDatesOfWeek(currentDate.year, Dates.getMonthNum(currentDate.month), currentDate.date)
            const prevWeek = Dates.getDatesOfPrevWeek(week[0].getFullYear(), week[0].getMonth(), week[0].getDate())
            const nextWeek = Dates.getDatesOfNextWeek(week[0].getFullYear(), week[0].getMonth(), week[0].getDate())
            setWeeksDates([
                prevWeek,
                week,
                nextWeek
            ])
        })()
    }, [currentDate])

    const changeDates = (y: number, m: number, d: number) => {
       /* const week = Dates.getDatesOfWeek(y, m, d)
        const prevWeek = Dates.getDatesOfPrevWeek(y, m, d)
        const nextWeek = Dates.getDatesOfWeek(y, m, d)

        setDate([
            ...prevWeek,
            ...week,
            ...nextWeek
        ])*/
    }

    return (
        <div className={'date-carousel'}>
            <div className={'date-carousel__container'}>
                <SwiperDates
                    dates={dates}
                    weeks={weeks}
                    weeksDates={weeksDates}
                    currentDate={currentDate}
                    changeDates={changeDates}
                />
            </div>
        </div>
    );
};

export default DateCarousel;