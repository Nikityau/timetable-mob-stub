import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Lesson} from "../../store/interface/lesson";

import LessonCardTOne from "../lesson-card-t-one/lesson-card-t-one";

import './style/lesson-card.scss'
import LessonCardTTwo from "../lesson-card-t-two/lesson-card-t-two";

type LessonCardProps = {
    lesson: Lesson
}

const LessonCard = ({lesson}: LessonCardProps) => {

    const [hasNotification] = useState<boolean>(false)

    //const currDate = useSelector(appContext.reduxApi.getDateCurrent())
    //const groupId = useSelector(ReduxTimeTableSelector.getId)
    //const hasNotification = useSelector(ReduxNotificationSelector.isNotify(lesson))

    //const dispatch = useDispatch()

    const onCardClick = () => {
        /*dispatch(setInputData({
            lesson: lesson,
            id: groupId,
            date: currDate
        }))
        dispatch(appContext.reduxApi.setNotificationState(true))
        dispatch(ReduxNotificationsAction.addNotification({
            lesson: lesson,
            date: new Date(currDate.timestamp),
            id: groupId
        }))*/
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

        let isLessonTypeEvery = true
        const lessonType = subgroups[0]['lesson_type']
        isLessonTypeEvery = subgroups.every(lesson => lesson['lesson_type'] == lessonType)

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