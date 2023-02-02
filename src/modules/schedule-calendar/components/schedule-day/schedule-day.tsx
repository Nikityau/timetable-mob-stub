import React from 'react';
import {nanoid} from "nanoid";

import Lesson from "../lesson/lesson";

import './style/schedule-day.scss'

type ScheduleDayProps = {
    scheduleDay: any[]
}

const ScheduleDay = ({ scheduleDay }: ScheduleDayProps) => {
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