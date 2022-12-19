import type {Swiper as SwiperType} from 'swiper'

import Dates from "../../namespaces/dates";

import {SlideDirection} from "./interface/slide-direction.type";
import {SlidePos} from "./interface/slide-pos.type";
import {DateSpecState} from "./interface/date-spec-state.interface";
import {DateWeeks} from "./interface/date-weeks.interface";


type Week = { week: Date[] }

export class DateChangeController {

    getIsCanChange: () => boolean
    getIsChangeRapidly: () => boolean
    setActiveIndex: (index: number) => void
    setSlideDirection: (direction: SlideDirection) => void

    constructor(
        setActiveIndex: (index: number) => void,
        setSlideDirection: (direction: SlideDirection) => void,
        getIsCanChange: () => boolean,
        getIsChangeRapidly: () => boolean
    ) {
        this.getIsCanChange = getIsCanChange
        this.setActiveIndex = setActiveIndex
        this.setSlideDirection = setSlideDirection
        this.getIsChangeRapidly = getIsChangeRapidly
    }

    onSlideChange(
        swiper: SwiperType,
        slideActiveIndex: number,
        prevDirection: SlideDirection,
        weeksDates: DateSpecState,
    ): DateSpecState | undefined {
        if(!weeksDates) return;
        if (!this.getIsCanChange()) return

        this.setActiveIndex(swiper.activeIndex)

        if (Math.abs(swiper.activeIndex - slideActiveIndex) > 1 && !this.getIsChangeRapidly()) return

        let direction: SlideDirection = 'left'

        if (swiper.activeIndex > slideActiveIndex) {
            this.setSlideDirection('right')

            direction = 'right'
        }
        if (swiper.activeIndex < slideActiveIndex) {
            this.setSlideDirection('left')

            direction = 'left'
        }

        if(this.getIsChangeRapidly()) {
            console.log('rapidly')
        }

        if(this.getIsChangeRapidly()) {
            return
        }

        const {week} = this.getWeekFrom(direction, weeksDates.dates, weeksDates.dateStart)

        if(!week) return;

        const day = this.getFirstDayInWeek(week)

        const weeks = this.getNewWeeks(day)
        const weekState = this.getWeeksStateFrom(direction,weeks, weeksDates.dateStart)

        return weekState
    }

    getNewWeeks(date: Date): DateWeeks {
        const week = Dates.getDatesOfWeek(date.getFullYear(), date.getMonth(), date.getDate())
        const prevWeek = Dates.getDatesOfPrevWeek(date.getFullYear(), date.getMonth(), date.getDate())
        const nextWeek = Dates.getDatesOfNextWeek(date.getFullYear(), date.getMonth(), date.getDate())

        return {
            week,
            nextWeek,
            prevWeek
        }
    }

    getWeeksStateFrom(direction: SlideDirection, weeks: DateWeeks, weekStart: SlidePos):DateSpecState {
        if(direction == 'left') {
            return this.getWeeksStateFromLeftBranch(weeks, weekStart)
        }
        if(direction == 'right') {
            return this.getWeeksStateFromRightBranch(weeks, weekStart)
        }
    }
    getWeeksStateFromLeftBranch(weeks: DateWeeks, weekStart: SlidePos): DateSpecState {
        if (weekStart == 'curr') {
            return {
                dates: [
                    weeks.nextWeek,
                    weeks.prevWeek,
                    weeks.week,
                ],
                dateStart: 'next'
            }
        }
        if (weekStart == 'next') {
            return {
                dates: [
                    weeks.prevWeek,
                    weeks.week,
                    weeks.nextWeek,
                ],
                dateStart: 'prev'
            }
        }
        if (weekStart == 'prev') {
            return {
                dates: [
                    weeks.week,
                    weeks.nextWeek,
                    weeks.prevWeek,
                ],
                dateStart: 'curr'
            }
        }
    }
    getWeeksStateFromRightBranch(weeks: DateWeeks, weekStart: SlidePos): DateSpecState {
        if (weekStart == 'curr') {
            return {
                dates: [
                    weeks.prevWeek,
                    weeks.week,
                    weeks.nextWeek
                ],
                dateStart: 'prev'
            }
        }
        if (weekStart == 'prev') {
            return {
                dates: [
                    weeks.nextWeek,
                    weeks.prevWeek,
                    weeks.week,
                ],
                dateStart: 'next'
            }
        }
        if (weekStart == 'next') {
            return {
                dates: [
                    weeks.week,
                    weeks.nextWeek,
                    weeks.prevWeek,
                ],
                dateStart: 'curr'
            }
        }
    }

    getFirstDayInWeek(week: Date[]): Date {
        return week[0]
    }

    getWeekFrom(direction: SlideDirection, weeks: Date[][], dateStart: SlidePos): Week {
        if(direction == 'left') {
            return {
                week: this.getWeekFromLeftBranch(weeks, dateStart)
            }
        }
        if(direction == 'right') {
            return {
                week: this.getWeekFromRightBranch(weeks, dateStart)
            }
        }
    }
    getWeekFromLeftBranch(weeks: Date[][], dateStart: SlidePos): Date[] {
        if (dateStart == 'next') {
            return weeks[1]
        }
        if (dateStart == 'curr') {
            return weeks[2]
        }
        if (dateStart == 'prev') {
            return weeks[0]
        }
    }
    getWeekFromRightBranch(weeks: Date[][], dateStart: SlidePos): Date[] {
        if (dateStart == 'next') {
            return weeks[0]
        }
        if (dateStart == 'curr') {
            return weeks[1]
        }
        if (dateStart == 'prev') {
            return weeks[2]
        }
    }
}