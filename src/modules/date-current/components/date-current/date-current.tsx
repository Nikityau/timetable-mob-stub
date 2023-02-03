import React from 'react';
import {useSelector} from "react-redux";

import {getDateNow} from "../../../date-calendar";

import Date from "../../../../ui/components/date/date";

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