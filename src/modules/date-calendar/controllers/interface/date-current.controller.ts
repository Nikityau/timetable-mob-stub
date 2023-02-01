import { Swiper as SwiperType } from 'swiper'

import {DateSpecState, DateWeeks, TranslateData, TranslateFrom} from "../type/controll.type";

import Dates from "../../../../helpers/date/date";
import DateObj = Dates.DateObj;

import {ControllerBase} from "./controller.base";

export interface DateCurrentController extends ControllerBase{
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