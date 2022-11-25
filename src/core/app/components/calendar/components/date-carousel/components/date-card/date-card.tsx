import React from 'react';

import {WeekdayShort} from "../../../../../../../redux/reducers/date/date.reducer";

interface IDateCard {
    weekday: WeekdayShort,
    day: string | number,
    isCurrent?: boolean,
    isWeekend?: boolean
}

import './style/common/date-card.scss'
import './style/common/date-card_weekend.scss'
import './style/common/date-card_current.scss'

const DateCard = ({ day, weekday, isCurrent, isWeekend }:IDateCard) => {
    return (
        <div className={[
            'date-card',
            isWeekend ? 'date-card_weekend' : '',
            isCurrent ? 'date-card_current' : ''
        ].join(' ')}>
            <div className={'date-card__container'}>
                <div className={'date-card__weekday'}>
                    <span>{ weekday }</span>
                </div>
                <div className={'date-card__day'}>
                    <span>{ day }</span>
                </div>
            </div>
        </div>
    );
};

export default DateCard;