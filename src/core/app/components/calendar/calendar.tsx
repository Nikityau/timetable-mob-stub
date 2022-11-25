import React, {useEffect} from 'react';

import CurrentDate from "./components/current-date/current-date";
import DateCarousel from "./components/date-carousel/date-carousel";
import InfoColumns from "./components/info-columns/info-columns";

import Button from "../../../ui/components/button/button";

import './styles/common/calendar.scss'

const Calendar = () => {

    const onTodayClick = () => {
        console.log('now click')
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
                <div className={'calendar__date-carousel el_side_offset_m'}>
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