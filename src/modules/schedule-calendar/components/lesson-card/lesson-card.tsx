import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Lesson} from "../../store/interface/lesson";

import LessonCardTOne from "../lesson-card-t-one/lesson-card-t-one";
import LessonCardTTwo from "../lesson-card-t-two/lesson-card-t-two";

import {getDateCurrent} from "../../../date-calendar";

import {getGroupId} from "../../store/selector/schedule.selector";

import {isNotify} from "../../../notifications/store/selector/isNotify";

import './style/lesson-card.scss'

import Event from "../../../../helpers/event/event";

type LessonCardProps = {
    lesson: Lesson
}

const LessonCard = ({lesson}: LessonCardProps) => {

    const currDate = useSelector(getDateCurrent)
    const groupId = useSelector(getGroupId)
    const hasNotification = useSelector(isNotify(lesson))


    const onCardClick = () => {
        Event.emit('notificationInputData', { lesson: lesson, id: groupId, date: currDate })
        Event.emit('openNotification')
    }

    const getLessonsBySubGroup = () => {
        const subgroups = lesson?.subgroups

        if (!subgroups) {
            return <LessonCardTOne
                onCardClick={onCardClick}
                lessonType={lesson?.['lesson_type'] || 'unk'}
                discipline={lesson?.['discipline'] || 'unk'}
                teachers={[lesson?.['teacher'] || 'unk']}
                offices={[lesson?.['auditorium_id'] || 'unk']}
            />
        }

        const isLessonTypeEvery = subgroups.every(lesson => lesson['lesson_type'] == lessonType)
        const lessonType = subgroups[0]['lesson_type']

        if (isLessonTypeEvery) {
            const teachers = []
            const offices = []
            for (let lesson of subgroups) {
                teachers.push(lesson['teacher'])
                offices.push(lesson['auditorium_id'])
            }

            return <LessonCardTOne
                onCardClick={onCardClick}
                lessonType={subgroups[0]?.['lesson_type'] || 'unk'}
                discipline={subgroups[0]?.['discipline'] || 'unk'}
                teachers={teachers}
                offices={offices}
            />

        }

        return (
            <LessonCardTTwo
                onCardClick={onCardClick}
                subgroupOne={{
                    discipline: subgroups[0]['discipline'],
                    lessonType: subgroups[0]['lesson_type'],
                    offices: [subgroups[0]['auditorium_id']],
                    teachers: [subgroups[0]['teacher']]
                }}
                subgroupTwo={{
                    discipline: subgroups[1]['discipline'],
                    lessonType: subgroups[1]['lesson_type'],
                    offices: [subgroups[1]['auditorium_id']],
                    teachers: [subgroups[1]['teacher']]
                }}
            />
        )
    };

    return (
        <div className={'lesson-card'}

        >
            <div className={'lesson-card__container'}>
                {
                    getLessonsBySubGroup()
                }
            </div>
            <div className={[
                'lesson-card__notification',
                hasNotification
                    ? 'lesson-card__notification_active'
                    : ''
            ].join(' ')}>
                <div className={[
                    'lesson-card__notification-icon',
                    hasNotification
                        ? 'lesson-card__notification-icon_notify'
                        : ''
                ].join(' ')}></div>
            </div>
        </div>
    );
}

export default LessonCard;