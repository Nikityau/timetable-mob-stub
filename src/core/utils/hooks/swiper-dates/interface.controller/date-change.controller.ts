import type {Swiper as SwiperType} from 'swiper'

import {IControllerBase} from "./controller.base";

import {DateSpecState} from "../interface/date-spec-state.interface";
import {SlideDirection} from "../interface/slide-direction.type";
import {DateWeeks} from "../interface/date-weeks.interface";
import {SlidePos} from "../interface/slide-pos.type";

export interface IDateChangeController extends IControllerBase {
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