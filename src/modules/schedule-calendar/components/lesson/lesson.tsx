import React from 'react';

import LessonCard from '../lesson-card/lesson-card'

import {parseTimeString} from "../../helpers/parseTimeString";

import './style/lesson.scss'

type LessonProps = {
    lesson: any
}

const Lesson = ({lesson}: LessonProps) => {
    return (
        <div className={'lesson'}>
            <div className={'lesson__time'}>
                <div className={'lesson__start-time'}>
                    <span>{parseTimeString(lesson?.['time_period']).start}</span>
                </div>
                <div className={'lesson__end-time'}>
                    <span>{parseTimeString(lesson?.['time_period']).end}</span>
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