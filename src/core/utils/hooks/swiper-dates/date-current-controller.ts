import Dates from "../../namespaces/dates";

import {DateSpecState} from "./interface/date-spec-state.interface";

export class DateCurrentController {

    getIsCanChange: () => boolean
    setIsCanChange: (value: boolean) => boolean

    swiperSlideTo: (index: number) => void

    setWeeksDates: (weeksDates: DateSpecState) => void

    constructor(
        getIsCanChange: () => boolean,
        setIsCanChange: (value: boolean) => boolean,
        swiperSlideTo: (index: number) => void,
        setWeeksDates: (weeksDates: DateSpecState) => void
    ) {
        this.getIsCanChange = getIsCanChange
        this.setIsCanChange = setIsCanChange
        this.swiperSlideTo = swiperSlideTo
        this.setWeeksDates = setWeeksDates
    }

    toCurrentDate(
        currentDate,
        dateNow,
        swiper,
    ): void {
        const currDate = new Date(currentDate.year, Dates.getMonthNum(currentDate.month), currentDate.date)
        const nowDate = new Date(dateNow.year, Dates.getMonthNum(dateNow.month), dateNow.date)

        const nowWeek = Dates.getDatesOfWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        const {activeIndex} = swiper

        if (Dates.isDatesCompare(currDate, nowDate)) {
            this.toCurrentDateFromWeek(currDate, nowWeek, nowDate, activeIndex)

            return;
        }

        if (Dates.isDateBelongs(currDate, nowWeek)) return;

        const week = Dates.getDatesOfWeek(currDate.getFullYear(), currDate.getMonth(), currDate.getDate())

        let prevWeek = nowWeek
        let nextWeek = nowWeek

        this.setIsCanChange(false)

        if (currDate > nowDate) {
            this.toCurrentDateFromFut(activeIndex, nowWeek, nowDate, {prevWeek, week, nextWeek})

            return;
        }
        if (currDate < nowDate) {
            this.toCurrentDateFromPast(activeIndex, nowWeek, nowDate, {week, prevWeek, nextWeek})

            return;
        }
    }

    toCurrentDateFromWeek(currDate, nowWeek, nowDate, activeIndex): void {
        const swiperDOM = document.querySelector('.swiper')
        const activeSlide = swiperDOM.querySelector('.swiper-slide-active')
        const dateCard = activeSlide.querySelector('.date-card')

        const dateDateCard = Number.parseInt(dateCard.getAttribute('data-date'))
        const monthDateCard = Number.parseInt(dateCard.getAttribute('data-month'))
        const yearDateCard = Number.parseInt(dateCard.getAttribute('data-year'))

        const weekOfActive = Dates.getDatesOfWeek(yearDateCard, monthDateCard, dateDateCard)
        const tempDate = weekOfActive[0]

        if (Dates.isDateBelongs(currDate, weekOfActive)) return;

        if (tempDate > nowDate) {
            this.toCurrentDateFromFut(activeIndex, nowWeek, nowDate, {
                week: weekOfActive,
                prevWeek: nowWeek,
                nextWeek: nowWeek
            })

            this.swiperSlideTo(1)
        }
        if (tempDate < nowDate) {
            this.toCurrentDateFromPast(activeIndex, nowWeek, nowDate, {
                week: weekOfActive,
                prevWeek: nowWeek,
                nextWeek: nowWeek
            })
        }
    }

    toCurrentDateFromFut(activeIndex, nowWeek, nowDate, {week, prevWeek, nextWeek}): void {
        if (activeIndex == 3) {
            this.setWeeksDates({
                dates: [
                    prevWeek,
                    nextWeek,
                    week
                ],
                dateStart: 'prev'
            })
        }
        if (activeIndex == 4) {
            this.setWeeksDates({
                dates: [
                    week,
                    prevWeek,
                    nextWeek,
                ],
                dateStart: 'curr'
            })
        }
        if (activeIndex == 2) {
            this.setWeeksDates({
                dates: [
                    prevWeek,
                    week,
                    nextWeek,
                ],
                dateStart: 'prev'
            })
        }

        if (activeIndex == 4 || activeIndex == 3) {
            this.swiperSlideTo(1)
        }
        if (activeIndex == 2) {
            this.swiperSlideTo(0)
        }

        nextWeek = Dates.getDatesOfNextWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
        prevWeek = Dates.getDatesOfPrevWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        if (activeIndex == 4 || activeIndex == 3) {
            this.setWeeksDates({
                dates: [
                    prevWeek,
                    nowWeek,
                    nextWeek,
                ],
                dateStart: 'prev'
            })
        }
        if (activeIndex == 2) {
            this.setWeeksDates({
                dates: [
                    nowWeek,
                    nextWeek,
                    prevWeek,
                ],
                dateStart: 'curr'
            })
        }

        this.setIsCanChange(true)
    }

    toCurrentDateFromPast(activeIndex, nowWeek, nowDate, {week, prevWeek, nextWeek}): void {
        if (activeIndex == 1) {
            this.setWeeksDates({
                dates: [
                    week,
                    prevWeek,
                    nextWeek,
                ],
                dateStart: 'curr'
            })
        }
        if (activeIndex == 0) {
            this.setWeeksDates({
                dates: [
                    prevWeek,
                    nextWeek,
                    week,
                ],
                dateStart: 'prev'
            })
        }
        if (activeIndex == 2) {
            this.setWeeksDates({
                dates: [
                    prevWeek,
                    week,
                    nextWeek,
                ],
                dateStart: 'prev'
            })
        }

        if (activeIndex == 1) {
            this.swiperSlideTo(1)
        }
        if (activeIndex == 0) {
            this.swiperSlideTo(0)
        }
        if (activeIndex == 2) {
            this.swiperSlideTo(2)
        }

        nextWeek = Dates.getDatesOfNextWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
        prevWeek = Dates.getDatesOfPrevWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        if (activeIndex == 1) {
            this.setWeeksDates({
                dates: [
                    prevWeek,
                    nowWeek,
                    nextWeek,
                ],
                dateStart: 'prev'
            })
        }
        if (activeIndex == 0) {
            this.setWeeksDates({
                dates: [
                    nowWeek,
                    nextWeek,
                    prevWeek,
                ],
                dateStart: 'curr'
            })
        }
        if (activeIndex == 2) {
            this.setWeeksDates({
                dates: [
                    nextWeek,
                    prevWeek,
                    nowWeek,
                ],
                dateStart: 'next'
            })
        }

        this.setIsCanChange(true)
    }
}