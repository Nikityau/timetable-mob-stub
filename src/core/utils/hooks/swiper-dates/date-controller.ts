import type {Swiper as SwiperType} from 'swiper'

import {SlideDirection} from "./interface/slide-direction.type";
import {DateSpecState} from "./interface/date-spec-state.interface";

import {DateCurrentController} from "./date-current-controller";
import {DateChangeController} from "./date-change-controller";

export class DateController {
    private _swiper: SwiperType
    _setSwiper: (swiper: SwiperType) => void

    private _sliderActiveIndex: number
    _setSliderActiveIndex: (number) => void

    private _slideDirection: SlideDirection
    _setSlideDirection: (slideDirection: SlideDirection) => void

    private _weeksDates: DateSpecState
    _setWeeksDates: (weeksDates: DateSpecState) => void

    isCanChangeDate: boolean = true
    isChangeRapidly = false

    dateCurrentController = new DateCurrentController(
        this.getIsCanChangeDate.bind(this),
        this.setIsCanChangeDate.bind(this),
        this.swiperSlideTo.bind(this),
        this.setWeeksDates.bind(this)
    )
    dateChangeController = new DateChangeController(
        this.setSliderActiveIndex.bind(this),
        this.setSlideDirection.bind(this),
        this.getIsCanChangeDate.bind(this),
        this.setWeeksDates.bind(this),
        this.slidePosition.bind(this),
        this.swiperSlideTo.bind(this),
        this.getIsChangeRapidly.bind(this)
    )

    constructor() {
    }

    setIsCanChangeDate(value: boolean): boolean {
        this.isCanChangeDate = value
        return this.isCanChangeDate
    }

    getIsCanChangeDate(): boolean {
        return this.isCanChangeDate
    }
    getIsChangeRapidly(): boolean {
        return this.isChangeRapidly
    }

    setSliderActiveIndex(index: number) {
        if (!this._setSliderActiveIndex) return
        this._setSliderActiveIndex(index)
    }

    setSlideDirection(direction: SlideDirection) {
        if (!this._setSlideDirection) return
        this._setSlideDirection(direction)
    }

    setWeeksDates(weeksDates: DateSpecState) {
        if (!this._setWeeksDates) return

        console.log(weeksDates)
        if(this.isChangeRapidly) {
            this.isChangeRapidly = false
        }

        this._setWeeksDates(weeksDates)
    }

    toCurrentDate(currentDate, dateNow) {
        if (!this._setSwiper) return

        this.dateCurrentController.toCurrentDate(
            currentDate,
            dateNow,
            this._swiper
        )
    }

    onSlideChange() {
        this.dateChangeController.onSlideChange(
            this._swiper,
            this._sliderActiveIndex,
            this._slideDirection,
            this._weeksDates,
        )
    }

    slidePosition(): 'end' | 'begin' | '...' {
        if (this.isSlideEnd()) return 'end'
        if (this.isSlideBegin()) return 'begin'
        return '...'
    }

    isSlideEnd(): boolean {
        return this._swiper.isEnd
    }
    isSlideBegin(): boolean {
        return this._swiper.isBeginning
    }

    swiperSlideTo(index: number, isRapidly = false) {
        if (!this._swiper) return

        if (isRapidly) return;

        this._swiper.slideToLoop(index)
    }

    whenSwiperEnd(swiper: SwiperType) {
        if (swiper.activeIndex == 4) {
            this.isChangeRapidly = true
            swiper.slideToLoop(1, 0)
        }
    }

    public set weeksDates(weeksDates: DateSpecState) {
        this._weeksDates = weeksDates
    }

    public set slideDirection(slideDirection: SlideDirection) {
        this._slideDirection = slideDirection
    }

    public set sliderActiveIndex(index: number) {
        this._sliderActiveIndex = index
    }

    public set swiper(swiper: SwiperType) {
        this._swiper = swiper
        /* this._swiper?.once('activeIndexChange', (swiper:SwiperType) => {
             this.test(swiper)
         })*/
        this._swiper?.once('slideNextTransitionEnd', (swiper: SwiperType) => {
            this.whenSwiperEnd(swiper)
        })

    }
}