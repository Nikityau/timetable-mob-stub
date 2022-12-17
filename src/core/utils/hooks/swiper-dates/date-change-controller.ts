import type {Swiper as SwiperType} from 'swiper'

import Dates from "../../namespaces/dates";

import {SlideDirection} from "./interface/slide-direction.type";
import {SlidePos} from "./interface/slide-pos.type";
import {DateSpecState} from "./interface/date-spec-state.interface";
import {DateWeeks} from "./interface/date-weeks.interface";

export class DateChangeController {
    weeksDates: DateSpecState

    getIsCanChange: () => boolean
    setActiveIndex: (index: number) => void
    setSlideDirection: (direction: SlideDirection) => void
    setWeeksDates: (weeksDates: DateSpecState) => void

    constructor(
        setActiveIndex: (index: number) => void,
        setSlideDirection: (direction: SlideDirection) => void,
        getIsCanChange: () => boolean,
        setWeeksDates: (weeksDates: DateSpecState) => void
    ) {
        this.getIsCanChange = getIsCanChange
        this.setActiveIndex = setActiveIndex
        this.setSlideDirection = setSlideDirection
        this.setWeeksDates = setWeeksDates
    }

    onSlideChange(
        swiper: SwiperType,
        slideActiveIndex,
        prevDirection,
        weeksDates: DateSpecState,
    ):void {
        this.setActiveIndex(swiper.activeIndex)

        this.weeksDates = weeksDates

        let objEl = undefined

        if (Math.abs(swiper.activeIndex - slideActiveIndex) > 1) {
            if (prevDirection == 'left') {
                objEl = this.slideChangeLeft(prevDirection, weeksDates)
            }
            if (prevDirection == 'right') {
                objEl = this.slideChangeRight(prevDirection, weeksDates)
            }

            this.preChangesDates(objEl.firstEl, objEl.direction, weeksDates, swiper.activeIndex)

            return
        }

        if (swiper.activeIndex > slideActiveIndex) {
            this.setSlideDirection('right')

            let {firstEl, direction} = this.slideChangeRight('right', weeksDates)
            this.preChangesDates(firstEl, direction, weeksDates, swiper.activeIndex)

            return;
        }
        if (swiper.activeIndex < slideActiveIndex) {
            this.setSlideDirection('left')

            let {firstEl, direction} = this.slideChangeLeft('left', weeksDates)
            this.preChangesDates(firstEl, direction, weeksDates, swiper.activeIndex)
        }
    }

    changeDates(y: number, m: number, d: number, spec: SlidePos, activeIndexPrev: number | 'undef', direction: 'left' | 'right'): void {
        if(!this.getIsCanChange()) return

        const week = Dates.getDatesOfWeek(y, m, d)
        const prevWeek = Dates.getDatesOfPrevWeek(y, m, d)
        const nextWeek = Dates.getDatesOfNextWeek(y, m, d)

        if (activeIndexPrev == 0 || activeIndexPrev == 4) return

        if (direction == 'right') {
            this.changeDatesRightBranch({week, prevWeek, nextWeek}, this.weeksDates)

            return;
        }
        if (direction == 'left') {
            this.changeDatesLeftBranch({prevWeek, week, nextWeek}, this.weeksDates)
        }
    }
    changeDatesLeftBranch({prevWeek, week, nextWeek}: DateWeeks, weeksDates: DateSpecState):void {
        if (weeksDates.dateStart == 'curr') {
            this.setWeeksDates({
                dates: [
                    nextWeek,
                    prevWeek,
                    week,
                ],
                dateStart: 'next'
            })
            return
        }
        if (weeksDates.dateStart == 'next') {
            this.setWeeksDates({
                dates: [
                    prevWeek,
                    week,
                    nextWeek,
                ],
                dateStart: 'prev'
            })

            return;
        }
        if (weeksDates.dateStart == 'prev') {
            this.setWeeksDates({
                dates: [
                    week,
                    nextWeek,
                    prevWeek,
                ],
                dateStart: 'curr'
            })
        }
    }
    changeDatesRightBranch({prevWeek, week, nextWeek}: DateWeeks, weeksDates: DateSpecState):void {
        if (weeksDates.dateStart == 'curr') {
            this.setWeeksDates({
                dates: [
                    prevWeek,
                    week,
                    nextWeek,
                ],
                dateStart: 'prev'
            })

            return
        }
        if (weeksDates.dateStart == 'next') {
            this.setWeeksDates({
                dates: [
                    week,
                    nextWeek,
                    prevWeek,
                ],
                dateStart: 'curr'
            })

            return;
        }
        if (weeksDates.dateStart == 'prev') {
            this.setWeeksDates({
                dates: [
                    nextWeek,
                    prevWeek,
                    week,
                ],
                dateStart: 'next'
            })
        }
    }

    preChangesDates(array: Date[], direction: SlideDirection, weeksDates: DateSpecState, activeIndex):void {
        let firstEl = array
        let firstOfFirstEl = undefined

        if (!firstEl) return
        firstOfFirstEl = firstEl[0]
        if (!firstOfFirstEl) return;
        this.changeDates(firstOfFirstEl.getFullYear(), firstOfFirstEl.getMonth(), firstOfFirstEl.getDate(), weeksDates.dateStart, activeIndex, direction)
    }

    slideChangeLeft(direction: SlideDirection, weeksDates: DateSpecState): { firstEl: any, direction: any } {
        let firstEl = undefined
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
    slideChangeRight(direction: SlideDirection, weeksDates:DateSpecState): { firstEl: any, direction: any } {
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
}