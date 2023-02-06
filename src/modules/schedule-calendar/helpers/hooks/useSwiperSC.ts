import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Event from "../../../../helpers/event/event";

import {store} from "../../../../store";

import Dates from "../../../../helpers/date/date";
import DateObj = Dates.DateObj;

import {parseSchedule, setSchedule} from "../../store/action/schedule.action";

import {ScheduleInput} from "../../store/interface/schedule";

import {timetableData} from "../../store/data/schedule";

import {getParsedSchedule} from "../../store/selector/schedule.selector";

export const useSwiperSC = (controller) => {
    const schedule = useSelector(getParsedSchedule)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSchedule(timetableData as ScheduleInput))
        dispatch(parseSchedule())
    }, [])

    useEffect(() => {
        const unsub = Event.on('toCurrentDay', toCurr)

        return () => {
            unsub()
        }
    }, [schedule])

    useEffect(() => {
        Event.pullEmit('nowDate', dateNow)
        Event.pullEmit('currentDate', initSlideChange)
    }, [schedule])

    const toCurr = () => {
        controller.currDate = store.getState().date.current
        controller.toCurrentDay()
    }

    const dateNow = (nowDate: DateObj) => {
        controller.nowDate = store.getState().date.now
    }

    const initSlideChange = () => {
        controller.currDate = store.getState().date.current
        controller.initSlideChange()
    }

    return {
        schedule
    }
}