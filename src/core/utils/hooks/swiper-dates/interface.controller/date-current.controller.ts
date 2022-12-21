import {Swiper as SwiperType} from "swiper";

import Dates from "../../../namespaces/dates";
import DateObj = Dates.DateObj;

import {IControllerBase} from "./controller.base";
import {TranslateData, TranslateFrom} from "../controller/date-current.controller";
import {DateWeeks} from "../interface/date-weeks.interface";
import {DateSpecState} from "../interface/date-spec-state.interface";

export interface IDateCurrentController extends IControllerBase{
    toCurrentDate(
        currentDate: DateObj,
        dateNow: DateObj,
        swiper: SwiperType,
    ): TranslateData | undefined


    toDateFrom(
        from: TranslateFrom,
        activeIndex: number,
        nowDate: Date,
        nowWeek: Date[],
        weeks: DateWeeks
    ): TranslateData
    toDateFromFut(
        activeIndex: number,
        weeks: DateWeeks
    ):DateSpecState
    toDateFromPast(
        activeIndex: number,
        weeks: DateWeeks
    ):DateSpecState

    getDateFromActiveCard(): Date

    toCurrentDateFromWeek(
        currDate: Date,
        nowDate: Date,
        weekOfActive: Date[]
    ): TranslateFrom

    toDateTo(
        nowDate: Date,
        nowWeek: Date[]
    ): DateSpecState
}