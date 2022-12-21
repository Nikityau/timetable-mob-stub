import type {Swiper as SwiperType} from 'swiper'

import Dates from "../../namespaces/dates";

import {DateSpecState} from "./interface/date-spec-state.interface";

type TranslateData = {
    from: DateSpecState
    to: DateSpecState,
    slideTo: number
}

type TranslateFrom = 'future' | 'past' | 'unk'

export class DateCurrentController {

    _swiper: SwiperType

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
    ): TranslateData | undefined {
        this._swiper = swiper

        const currDate = new Date(currentDate.year, Dates.getMonthNum(currentDate.month), currentDate.date)
        const nowDate = new Date(dateNow.year, Dates.getMonthNum(dateNow.month), dateNow.date)

        const nowWeek = Dates.getDatesOfWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        const {activeIndex} = swiper

        let translateFrom: TranslateFrom = 'unk'

        if (Dates.isDatesCompare(currDate, nowDate)) {
            const date = this.getDateFromActiveCard()
            const weekOfActive = Dates.getDatesOfWeek(date.getFullYear(), date.getMonth(), date.getDate())

            translateFrom = this.toCurrentDateFromWeek(currDate, nowDate, weekOfActive)
            if (translateFrom == 'unk') return;

            if (translateFrom == 'future') {
                this.toCurrentDateFromFut(
                    activeIndex,
                    nowWeek,
                    nowDate,
                    {
                        week: weekOfActive,
                        prevWeek: nowWeek,
                        nextWeek: nowWeek
                    }
                )

                return
            }
            if (translateFrom == 'past') {
                this.toCurrentDateFromPast(
                    activeIndex,
                    nowWeek,
                    nowDate,
                    {
                        week: weekOfActive,
                        prevWeek: nowWeek,
                        nextWeek: nowWeek
                    }
                )

                return;
            }

            return;
        }


        if (Dates.isDateBelongs(currDate, nowWeek)) {
            return;
        }

        const week = Dates.getDatesOfWeek(currDate.getFullYear(), currDate.getMonth(), currDate.getDate())

        let prevWeek = nowWeek
        let nextWeek = nowWeek

        if (currDate > nowDate) {
            this.toCurrentDateFromFut(
                activeIndex,
                nowWeek,
                nowDate,
                {
                    prevWeek,
                    week,
                    nextWeek
                }
            )

            return
        }
        if (currDate < nowDate) {
            this.toCurrentDateFromPast(
                activeIndex,
                nowWeek,
                nowDate,
                {
                    week,
                    prevWeek,
                    nextWeek
                }
            )
        }
    }

    getDateFromActiveCard(): Date {
        const swiperDOM = document.querySelector('.swiper')
        const activeSlide = swiperDOM.querySelector('.swiper-slide-active')
        const dateCard = activeSlide.querySelector('.date-card')

        const dateDateCard = Number.parseInt(dateCard.getAttribute('data-date'))
        const monthDateCard = Number.parseInt(dateCard.getAttribute('data-month'))
        const yearDateCard = Number.parseInt(dateCard.getAttribute('data-year'))

        return new Date(yearDateCard, monthDateCard, dateDateCard)
    }

    toCurrentDateFromWeek(currDate, nowDate, weekOfActive: Date[]): TranslateFrom {
        const firstDay = weekOfActive[0]

        if (Dates.isDateBelongs(currDate, weekOfActive)) return 'unk';

        if (firstDay > nowDate) {
            return 'future'
        }
        if (firstDay < nowDate) {
            return 'past'
        }
    }

    toCurrentDateFromFut(activeIndex, nowWeek, nowDate, {week, prevWeek, nextWeek}): void {
        this.setIsCanChange(false)

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

        this.lasTransform(nowDate, nowWeek)
    }

    toCurrentDateFromPast(activeIndex, nowWeek, nowDate, {week, prevWeek, nextWeek}): void {
        this.setIsCanChange(false)

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

        this.lasTransform(nowDate, nowWeek)
    }

    lasTransform(nowDate: Date, nowWeek: Date[]) {
        this.swiperSlideTo(1)

        const nextWeek = Dates.getDatesOfNextWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
        const prevWeek = Dates.getDatesOfPrevWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        this.setWeeksDates({
            dates: [
                prevWeek,
                nowWeek,
                nextWeek,
            ],
            dateStart: 'prev'
        })

        this.setIsCanChange(true)
    }
}