import React, {useEffect, useState} from 'react';

import Dates from "../../../../helpers/date/date";
import Event from "../../../../helpers/event/event";

import './style/date-card.scss'
import './style/date-card_current.scss'
import './style/date-card_weekend.scss'

type DateCardProps = {
    weekday: Dates.WeekdayShort,
    date: string | number,
    fullDate: Date
}

const DateCard = React.memo(({fullDate, date, weekday}: DateCardProps) => {

    const [isCurrent, setIsCurrent] = useState<boolean>(false)

    useEffect(() => {
        /*const unsub = Event.onBehavior('changeDate', (date: Date) => {
            if (Dates.isDatesCompare(fullDate, date)) {
                setIsCurrent(true)
                return
            }
        })

        return () => {
            unsub()
        }*/

        console.log('rerender')
    }, [])

    useEffect(() => {
        /*const unsub = Event.on('checkDate', (date: Date) => {
            if (Dates.isDatesCompare(fullDate, date)) {
                setIsCurrent(true)
                return
            }

            if (!isCurrent) {
                return;
            }

            setIsCurrent(false)
        })

        return () => {
            unsub()
        }*/
    }, [isCurrent, fullDate])

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
})

export default DateCard;