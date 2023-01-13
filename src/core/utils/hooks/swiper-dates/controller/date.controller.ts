import type {Swiper as SwiperType} from 'swiper'

import Dates from "../../../namespaces/dates";
import DateObj = Dates.DateObj;

import {IDateController} from "../interface.controller/date.controller";

import {SlideDirection} from "../interface/slide-direction.type";
import {DateSpecState} from "../interface/date-spec-state.interface";

import {IDateChangeController} from "../interface.controller/date-change.controller";
import {IDateCurrentController} from "../interface.controller/date-current.controller";

export class DateController implements IDateController {
    private _swiper: SwiperType
    _setSwiper: (swiper: SwiperType) => void

    private _sliderActiveIndex: number
    _setSliderActiveIndex: (number) => void

    private _slideDirection: SlideDirection
    _setSlideDirection: (slideDirection: SlideDirection) => void

    private _weeksDates: DateSpecState
    _setWeeksDates: (weeksDates: DateSpecState) => void

    private _isCanChangeDate: boolean = true
    private _isChangeRapidly = false
    public _isDayChange:boolean = false

    private _dateCurrentController: IDateCurrentController
    private _dateChangeController: IDateChangeController

    constructor(
        dateChangeController: IDateChangeController,
        dateCurrentController: IDateCurrentController
    ) {
        this._dateChangeController = dateChangeController
        this._dateCurrentController = dateCurrentController

        this._dateChangeController.onInit(
            this.setSliderActiveIndex.bind(this),
            this.setSlideDirection.bind(this),
            this.getIsCanChangeDate.bind(this),
            this.getIsChangeRapidly.bind(this)
        )
        this._dateCurrentController.onInit()
    }

    setIsCanChangeDate(value: boolean): boolean {
        this._isCanChangeDate = value
        return this._isCanChangeDate
    }

    getIsCanChangeDate(): boolean {
        return this._isCanChangeDate
    }

    setIsChangeRapidly(value: boolean): boolean {
        this._isChangeRapidly = value
        return this._isChangeRapidly
    }

    getIsChangeRapidly(): boolean {
        return this._isChangeRapidly
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

        if (this.getIsChangeRapidly()) {
            this.setIsChangeRapidly(false)
        }

        this._setWeeksDates(weeksDates)
    }

    toCurrentDate(currentDate: DateObj, dateNow: DateObj) {
        if (!this._setSwiper) return

        const translateData = this._dateCurrentController.toCurrentDate(
            currentDate,
            dateNow,
            this._swiper
        )

        if (!translateData) return;

        this.setIsCanChangeDate(false)

        this.setWeeksDates(translateData.from)
        this.swiperSlideTo(translateData.slideTo)
        this.setWeeksDates(translateData.to)

        this.setIsCanChangeDate(true)
    }

    onSlideChange() {
        const weeksState = this._dateChangeController.onSlideChange(
            this._swiper,
            this._sliderActiveIndex,
            this._slideDirection,
            this._weeksDates,
        )

        if (!weeksState) return

        this.setWeeksDates(weeksState)
    }

    onDayChange(date: DateObj) {
        if(!this._isDayChange) return

        this._isDayChange = false

        const dateNormal = new Date(date.timestamp)

        const swiperDOM = this._swiper.el
        const activeSlide = swiperDOM.querySelector('.swiper-slide-active')
        const prevSlide = swiperDOM.querySelector('.swiper-slide-prev')
        const nextSlide = swiperDOM.querySelector('.swiper-slide-next')

        if(activeSlide.querySelector(`[data-date="${dateNormal.getDate()}"][data-month="${dateNormal.getMonth()}"][data-year="${dateNormal.getFullYear()}"]`)) {
            return
        }
        if(prevSlide.querySelector(`[data-date="${dateNormal.getDate()}"][data-month="${dateNormal.getMonth()}"][data-year="${dateNormal.getFullYear()}"]`)) {
            this._swiper.slidePrev()
            return;
        }
        if(nextSlide.querySelector(`[data-date="${dateNormal.getDate()}"][data-month="${dateNormal.getMonth()}"][data-year="${dateNormal.getFullYear()}"]`)) {
            this._swiper.slideNext()
        }
    }

    swiperSlideTo(index: number, isRapidly = false) {
        if (!this._swiper) return

        if (isRapidly) {
            this._swiper.slideToLoop(index, 0)

            return
        }

        this._swiper.slideToLoop(index)
    }

    whenSwiperBegin(swiper: SwiperType) {
        if (swiper.activeIndex == 0) {
            this._isChangeRapidly = true
            swiper.slideToLoop(1, 0)
        }
    }

    whenSwiperEnd(swiper: SwiperType) {
        if (swiper.activeIndex == 4) {
            this._isChangeRapidly = true
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
        this._swiper?.once('slideNextTransitionEnd', (swiper: SwiperType) => {
            this.whenSwiperEnd(swiper)
        })
        this._swiper?.once('slidePrevTransitionEnd', (swiper) => {
            this.whenSwiperBegin(swiper)
        })
    }
}