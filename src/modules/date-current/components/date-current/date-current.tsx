import React from 'react';
import {useSelector} from "react-redux";
import cn from 'classnames'

import {getPage} from "../../../addon-page";
import {getDateNow} from "../../../date-calendar";

import Date from "../../../../ui/components/date/date";

const DateCurrent = () => {
    const date = useSelector(getDateNow)

    const page = useSelector(getPage)

    return (
        <>
            <Date
                classnames={cn(
                    {
                        'addon-page': page == 'ADDON'
                    }
                )}
                date={date.date}
                day={date.weekday}
                month={date.month}
                year={date.year}
            />
        </>
    );
};

export default DateCurrent;