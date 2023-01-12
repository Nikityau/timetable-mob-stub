import React, {useEffect} from 'react';
import {nanoid} from "nanoid";

import './style/common/schedule-day.scss'

import Lesson from "../lesson/lesson";

interface IScheduleDay {
    scheduleDay: any[]
}

const ScheduleDay = ({ scheduleDay }:IScheduleDay) => {

    return (
        <div className={'schedule-day'}>
            <div className={'schedule-day__stripe'}/>
            <div className={'schedule-day__container'}>
                {
                    scheduleDay && scheduleDay.length > 0 &&
                    scheduleDay.map((lesson) => (
                       <Lesson lesson={lesson} key={nanoid()}/>
                    ))
                }
            </div>
        </div>
    );
};

export default ScheduleDay;