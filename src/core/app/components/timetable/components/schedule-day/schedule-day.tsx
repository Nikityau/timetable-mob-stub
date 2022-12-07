import React, {useEffect} from 'react';

import './style/common/schedule-day.scss'
import Day from "../day/day";

interface IScheduleDay {
    scheduleDay: any[]
}

const ScheduleDay = ({ scheduleDay }:IScheduleDay) => {

    useEffect(() => {
        console.log(scheduleDay)
    }, [scheduleDay])

    return (
        <div className={'schedule-day'}>
            <div className={'schedule-day__container'}>
                {
                    scheduleDay && scheduleDay.length > 0 &&
                    scheduleDay.map((day, index) => (
                       <Day day={day} key={index}/>
                    ))
                }
            </div>
        </div>
    );
};

export default ScheduleDay;