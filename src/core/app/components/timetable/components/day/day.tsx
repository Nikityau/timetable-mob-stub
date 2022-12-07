import React from 'react';

import {parseTimeString} from "../../../../utils/parseTimeString";

import LessonCard from "../lesson-card/lesson-card";

import './style/common/day.scss'

interface IDay {
    day: any
}

const Day = ({ day }:IDay) => {
    return (
        <div className={'day'}>
            <div className={'day__time'}>
                <div className={'day__start-time'}>
                    <span>{ parseTimeString(day['time_period']).startTime }</span>
                </div>
                <div className={'day__end-time'}>
                    <span>{ parseTimeString(day['time_period']).endTime }</span>
                </div>
            </div>
            <div className={'day__lesson'}>
                <LessonCard
                    lesson={day}
                />
            </div>
        </div>
    );
};

export default Day;