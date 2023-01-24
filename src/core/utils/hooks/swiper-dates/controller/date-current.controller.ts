import type {Swiper as SwiperType} from 'swiper'

import Dates from "../../../namespaces/dates";
import DateObj = Dates.DateObj;

import {DateSpecState} from "../interface/date-spec-state.interface";
import {DateWeeks} from "../interface/date-weeks.interface";
import {IDateCurrentController} from "../interface.controller/date-current.controller";

export type TranslateData = {
    from: DateSpecState
    to: DateSpecState,
    slideTo: number,
    isActiveIndexCurrent: boolean,
    translateFrom: TranslateFrom
}

export type TranslateFrom = 'future' | 'past' | 'unk'

export class DateCurrentController implements IDateCurrentController {
    toCurrentDate(
        currentDate: DateObj,
        dateNow: DateObj,
        swiper: SwiperType,
    ): TranslateData | undefined {
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

            return this.toDateFrom(translateFrom, activeIndex, nowDate, nowWeek, {
                week: weekOfActive,
                prevWeek: nowWeek,
                nextWeek: nowWeek
            })
        }

        if (Dates.isDateBelongs(currDate, nowWeek)) {
            return;
        }

        const week = Dates.getDatesOfWeek(currDate.getFullYear(), currDate.getMonth(), currDate.getDate())

        if (currDate > nowDate) {
            translateFrom = 'future'
        }
        if (currDate < nowDate) {
            translateFrom = 'past'
        }

        return this.toDateFrom(translateFrom, activeIndex, nowDate, nowWeek, {
            week,
            prevWeek: nowWeek,
            nextWeek: nowWeek
        })
    }

    toDateFrom(
        from: TranslateFrom,
        activeIndex: number,
        nowDate: Date,
        nowWeek: Date[], {
            week,
            prevWeek,
            nextWeek
        }: DateWeeks): TranslateData {

        const translateData: TranslateData = {
            from: undefined,
            to: undefined,
            slideTo: 1,
            isActiveIndexCurrent: activeIndex == 2,
            translateFrom: from
        }

        if (from == 'future') {
            translateData.from = this.toDateFromFut(activeIndex, {week, prevWeek, nextWeek})
        }
        if (from == 'past') {
            translateData.from = this.toDateFromPast(activeIndex, {week, prevWeek, nextWeek})
        }

        translateData.to = this.toDateTo(nowDate, nowWeek)

        return translateData
    }

    toDateFromFut(
        activeIndex: number, {
            week,
            prevWeek,
            nextWeek
        }: DateWeeks): DateSpecState {
        switch (activeIndex) {
            case 1:
                return {
                    dates: [
                        week,
                        prevWeek,
                        nextWeek,
                    ],
                    dateStart: 'curr'
                }
            case 2:
                return {
                    dates: [
                        prevWeek,
                        week,
                        nextWeek,
                    ],
                    dateStart: 'prev'
                }
            case 3:
                return {
                    dates: [
                        prevWeek,
                        nextWeek,
                        week
                    ],
                    dateStart: 'prev'
                }
            case 4:
                return {
                    dates: [
                        week,
                        prevWeek,
                        nextWeek,
                    ],
                    dateStart: 'curr'
                }
        }
    }

    toDateFromPast(
        activeIndex: number, {
            week,
            prevWeek,
            nextWeek
        }: DateWeeks): DateSpecState {
        switch (activeIndex) {
            case 0:
                return {
                    dates: [
                        prevWeek,
                        nextWeek,
                        week,
                    ],
                    dateStart: 'prev'
                }
            case 2:
                return {
                    dates: [
                        prevWeek,
                        week,
                        nextWeek,
                    ],
                    dateStart: 'prev'
                }
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

    toCurrentDateFromWeek(
        currDate: Date,
        nowDate: Date,
        weekOfActive: Date[]
    ): TranslateFrom {
        const firstDay = weekOfActive[0]

        if (Dates.isDateBelongs(currDate, weekOfActive)) return 'unk';

        if (firstDay > nowDate) {
            return 'future'
        }
        if (firstDay < nowDate) {
            return 'past'
        }
    }

    toDateTo(
        nowDate: Date,
        nowWeek: Date[]
    ): DateSpecState {
        const nextWeek = Dates.getDatesOfNextWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())
        const prevWeek = Dates.getDatesOfPrevWeek(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate())

        return {
            dates: [
                prevWeek,
                nowWeek,
                nextWeek,
            ],
            dateStart: 'prev'
        }
    }

    onInit(...args) {
    }
}