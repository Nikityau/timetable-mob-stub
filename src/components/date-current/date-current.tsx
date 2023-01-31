import React from 'react';
import {useSelector} from "react-redux";

import Date from "../../ui/components/date/date";

import {getDateNow} from "../../modules/date-calendar";

const DateCurrent = () => {

    const date = useSelector(getDateNow)

    return (
        <>
            <Date
                date={date.date}
                day={date.weekday}
                month={date.month}
                year={date.year}
            />
        </>
    );
};

export default DateCurrent;