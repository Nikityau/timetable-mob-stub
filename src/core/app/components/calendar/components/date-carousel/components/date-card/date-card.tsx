import React from 'react';

import {IDateCard} from "./interface/date-card.interface";

import './style/common/date-card.scss'
import './style/common/date-card_weekend.scss'
import './style/common/date-card_current.scss'

const DateCard = ({date, weekday, isCurrent, isWeekend, fullDate}: IDateCard) => {

    return (
        <div className={[
            'date-card',
            isWeekend ? 'date-card_weekend' : '',
            isCurrent ? 'date-card_current' : ''
        ].join(' ')}
             data-date={fullDate.getDate()}
             data-month={fullDate.getMonth()}
             data-year={fullDate.getFullYear()}
        >
            <div className={'date-card__container'}>
                <div className={'date-card__weekday'}>
                    <span>{weekday}</span>
                </div>
                <div className={'date-card__day'}>
                    <span>{date}</span>
                </div>
            </div>
        </div>
    );
};

export default DateCard;