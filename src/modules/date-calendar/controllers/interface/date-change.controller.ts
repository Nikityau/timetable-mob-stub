import {Swiper as SwiperType} from 'swiper'

import {ControllerBase} from './controller.base'

import {SlideDirection, SlidePos, DateSpecState, DateWeeks} from "../type/controll.type";

export interface DateChangeController extends ControllerBase {
    onSlideChange(
        swiper: SwiperType,
        sliderActiveIndex: number,
        prevSliderDirection: SlideDirection,
        weeksDates: DateSpecState
    ): DateSpecState | undefined


    createNewWeeks(date: Date): DateWeeks

    getFirstDayInWeek(week: Date[]): Date

    getWeeksStateFrom(
        direction: SlideDirection,
        weeks: DateWeeks,
        weekStart: SlidePos
    ): DateSpecState

    getWeeksStateFromLeftBranch(
        weeks: DateWeeks,
        weekStart: SlidePos
    ): DateSpecState

    getWeeksStateFromRightBranch(
        weeks: DateWeeks,
        weekStart: SlidePos
    ): DateSpecState

    getWeekFrom(
        direction: SlideDirection,
        weeks: Date[][],
        dateStart: SlidePos
    ): Date[]

    getWeekFromLeftBranch(
        weeks: Date[][],
        dateStart: SlidePos
    ): Date[]

    getWeekFromRightBranch(
        weeks: Date[][],
        dateStart: SlidePos
    ): Date[]


    onInit(
        setActiveIndex: (index: number) => void,
        setSlideDirection: (direction: SlideDirection) => void,
        getIsCanChange: () => boolean,
        getIsChangeRapidly: () => boolean
    ): void
}