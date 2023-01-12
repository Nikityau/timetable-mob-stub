import type {Swiper as SwiperType} from 'swiper'
import Dates from "../../../../../../utils/namespaces/dates";
import DateObj = Dates.DateObj;

type Index = number

export class SlideChangeController {
    private _prevDate!: Date
    private _nowDate!: DateObj
    private _currDate!: DateObj

    private _swiper: SwiperType

    private _isRapidly: boolean = false
    private _isInitSwipe: boolean = true

    constructor() {
        this.onSwiperInit = this.onSwiperInit.bind(this)
    }

    toCurrentDay() {
        if (!this._swiper) return
        if (this._isInitSwipe) return

        const date: Date = new Date(this._currDate.timestamp)

        const weekType = Dates.getWeekType(date)
        const weekTypePrev = Dates.getWeekType(this._prevDate)

        const slideType = weekType == 1 ? "above_week" : "below_week"
        const slideTypePrev = weekTypePrev == 1 ? "above_week" : "below_week"

        if (Dates.isDateBelongs(date, Dates.getDatesOfWeek(this._prevDate))) {
            const index = this.getElIndexByAttributes([
                `[data-week-type-numeric="${weekType}"]`,
                `[data-day-type-string="${this._currDate.weekday}"]`,
                `[data-type-slide="${slideType}_main"]`
            ])

            this.swiperSlideTo(index)
        } else {
            const index = this.getElIndexByAttributes([
                `[data-week-type-numeric="${weekType}"]`,
                `[data-day-type-string="${this._currDate.weekday}"]`,
                `[data-type-slide="${slideType}_main"]`
            ])

            const prevDateObj = Dates.createDateObj(this._prevDate)


            const copyReverseIndex = this.getElIndexByAttributes([
                `[data-week-type-numeric="${weekTypePrev}"]`,
                `[data-day-type-string="${prevDateObj.weekday}"]`,
                `[data-type-slide="${slideTypePrev}_copy"]`
            ])

            if (date > this._prevDate) {
                if (weekTypePrev == 1) {
                    this.swiperSlideTo(index)
                } else {
                    this._isRapidly = true
                    this.swiperSlideTo(copyReverseIndex)

                    setTimeout(() => {
                        this.swiperSlideTo(index)
                    }, 0)
                }
            } else {
                if (weekTypePrev == -1) {
                    this.swiperSlideTo(index)
                } else {
                    this._isRapidly = true
                    this.swiperSlideTo(copyReverseIndex)

                    setTimeout(() => {
                        this.swiperSlideTo(index)
                    }, 0)
                }
            }
        }

        this._prevDate = new Date(this._currDate.timestamp)
    }

    swiperSlideTo(index: Index) {
        if (this._isRapidly) {
            this._isRapidly = false
            this._swiper.slideToLoop(index, 0)
            return
        }

        this._swiper.slideToLoop(index)
    }

    getElIndexByAttributes(attributes: string[]): Index {
        const swiperDOMEl = this._swiper.el
        const slide = swiperDOMEl.querySelector(`.swiper-slide${attributes.join('')}`)
        const index = slide.getAttribute('data-swiper-slide-index')

        return Number.parseInt(index)
    }

    initSlideChange() {
        if (!this._swiper) return;
        if (!this._currDate.string) return;
        if (!this._isInitSwipe) return

        this._isInitSwipe = false

        const weekType = Dates.getWeekType(new Date(this._currDate.timestamp))
        const slideType = weekType == 1 ? "above_week" : "below_week"

        let index: Index = this.getElIndexByAttributes(
            [
                `[data-week-type-numeric="${weekType}"]`,
                `[data-day-type-string=\"${this._currDate.weekday}\"]`,
                `[data-type-slide="${slideType}_main"]`
            ]
        )

        this._isRapidly = true

        this.swiperSlideTo(index)
    }

    public onSwiperInit(swiper: SwiperType) {
        this._swiper = swiper
    }

    public set swiper(swiper: SwiperType) {
        this._swiper = swiper
    }

    public set nowDate(date: DateObj) {
        this._nowDate = date
        this._prevDate = new Date(date.timestamp)
    }

    public set currDate(date: DateObj) {
        this._currDate = date
    }
}