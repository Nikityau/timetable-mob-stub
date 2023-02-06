import React, {useEffect} from 'react';

import Dates from "../../../../helpers/date/date";

import {useCheckDate} from "../../helpers/hooks/useCheckDate";

import './style/date-card.scss'
import './style/date-card_current.scss'
import './style/date-card_weekend.scss'

type DateCardProps = {
    weekday: Dates.WeekdayShort,
    date: string | number,
    fullDate: Date
}

const DateCard =({fullDate, date, weekday}: DateCardProps) => {
    const isCurrent = useCheckDate(fullDate)

    return (
        <div className={[
            'date-card',
            Dates.isWeekend(weekday) ? 'date-card_weekend' : '',
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
}

export default DateCard;