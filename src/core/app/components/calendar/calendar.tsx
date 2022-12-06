import React, {useContext} from 'react';
import {useDispatch} from "react-redux";
import {nanoid} from "nanoid";

import CurrentDate from "./components/current-date/current-date";
import DateCarousel from "./components/date-carousel/date-carousel";
import InfoColumns from "./components/info-columns/info-columns";

import Button from "../../../ui/components/button/button";

import './styles/common/calendar.scss'

class CalendarObserver {
    handlers: any[] = []

    subscribe(ev) {
        const handler_id = nanoid()
        ev.handler_id = handler_id
        this.handlers.push(ev)

        return () => {
            this.handlers = this.handlers.filter(el => el.handler_id != handler_id)
        }
    }

    invoke() {
        for (let ev of this.handlers) {
            ev?.()
        }
    }

}

const calendarContext = {
    co: new CalendarObserver(),
}

import {AppContext} from "../../app";

export const CalendarContext = React.createContext(calendarContext)

const Calendar = () => {

    const appContext = useContext(AppContext)

    const dispatch = useDispatch()

    const context = useContext(CalendarContext)

    const onTodayClick = () => {
        dispatch(appContext.reduxApi.date.action.setCurrentByNow())
        context.co.invoke()
    }

    return (
        <CalendarContext.Provider value={calendarContext}>
            <header className={'calendar'}>
                <div className={'calendar__container'}>
                    <div className={'calendar__current-date el_side_offset_m'}>
                        <CurrentDate/>
                        <Button
                            text={'сегодня'}
                            onClickHandler={onTodayClick}
                        />
                    </div>
                    <div className={'calendar__date-carousel el_side_offset_m'}>
                        <DateCarousel/>
                    </div>
                    <div className={'calendar__info-columns el_side_offset_m'}>
                        <InfoColumns/>
                    </div>
                </div>
            </header>
        </CalendarContext.Provider>
    );
};

export default Calendar;