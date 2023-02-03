import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {getDateCurrent} from "../../store/selector/getDate";

import Dates from "../../../../helpers/date/date";
import Event from "../../../../helpers/event/event";

export const useCheckDate = (date: Date): boolean => {
    const [is, setIs] = useState<boolean>(false)

    const currentDate = useSelector(getDateCurrent)

    useEffect(() => {
        if(Dates.isDatesCompare(date, new Date(currentDate.timestamp))) {
            setIs(true)

            Event.emit('changeCurrentDate', currentDate)

            return
        }

        if(is) {
            setIs(false)
        }
    }, [date, currentDate])

    return is
}