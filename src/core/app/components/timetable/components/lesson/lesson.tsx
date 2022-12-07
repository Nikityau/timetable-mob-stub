import React from 'react';

import {parseTimeString} from "../../../../utils/parseTimeString";

import LessonCard from "../lesson-card/lesson-card";

import './style/common/lesson.scss'

interface ILesson {
    lesson: any
}

const Lesson = ({ lesson }:ILesson) => {
    return (
        <div className={'lesson'}>
            <div className={'lesson__time'}>
                <div className={'lesson__start-time'}>
                    <span>{ parseTimeString(lesson?.['time_period']).startTime }</span>
                </div>
                <div className={'lesson__end-time'}>
                    <span>{ parseTimeString(lesson?.['time_period']).endTime }</span>
                </div>
            </div>
            <div className={'lesson__lesson'}>
                <LessonCard
                    lesson={lesson}
                />
            </div>
        </div>
    );
};

export default Lesson;