import React, {useContext} from 'react';
import {useDispatch} from "react-redux";

import CurrentDate from "./components/current-date/current-date";
import DateCarousel from "./components/date-carousel/date-carousel";
import InfoColumns from "./components/info-columns/info-columns";

import Button from "../../../ui/components/button/button";

import './styles/common/calendar.scss'

import {AppContext} from "../../app";

const Calendar = () => {

    const appContext = useContext(AppContext)

    const dispatch = useDispatch()

    const onTodayClick = () => {
        dispatch(appContext.reduxApi.setDateCurrentByNow())
        appContext.calendar.emit('toCurrentDate')
    }

    return (
        <header className={'calendar'}>
            <div className={'calendar__container'}>
                <div className={'calendar__current-date el_side_offset_m'}>
                    <CurrentDate/>
                    <Button
                        text={'сегодня'}
                        onClickHandler={onTodayClick}
                    />
                </div>
                <div className={'calendar__date-carousel'}>
                    <DateCarousel/>
                </div>
                <div className={'calendar__info-columns el_side_offset_m'}>
                    <InfoColumns/>
                </div>
            </div>
        </header>
    );
};

export default Calendar;