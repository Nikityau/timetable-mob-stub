import React from 'react';

import './style/date.scss'

type DateProps = {
    date: string | number,
    day: string,
    month: string,
    year: string | number
}

const Date = React.memo(({date, day,year, month}: DateProps) => {
    return (
        <div className={'date-ui'}>
            <div className={'date-ui__current-date'}>
                <span>{ date }</span>
            </div>
            <div className={'date-ui__remain-date-info'}>
                <div className={'date-ui__day'}>
                    <span>{ day }</span>
                </div>
                <div className={'date-ui__month-year'}>
                    <span>{ month }</span>
                    <span>{ year }</span>
                </div>
            </div>
        </div>
    );
})

export default Date;