import React, {useEffect, useState} from 'react';

import date from "../../../../helpers/date/date";

import './style/date-card.scss'
import './style/date-card_current.scss'
import './style/date-card_weekend.scss'
import Dates from "../../../../helpers/date/date";

type DateCardProps = {
    weekday: date.WeekdayShort,
    date: string | number,
    fullDate: Date
}

const DateCard = React.memo(({fullDate, date,weekday}:DateCardProps) => {

    const [isCurrent, setIsCurrent] = useState<boolean>(false)
    const [isWeekend, setIsWeekend] = useState<boolean>(false)

    useEffect(() => {

    }, [])

    useEffect(() => {
        const isWknd = Dates.isWeekend(weekday)

        if(isWknd == isWeekend) return

        setIsWeekend(isWknd)
    }, [fullDate])

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
})

export default DateCard;