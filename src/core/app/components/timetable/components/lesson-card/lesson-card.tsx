import React, {useContext} from 'react';
import {useDispatch} from "react-redux";

import LessonCardTypeOne from "./components/lesson-card-type-one/lesson-card-type-one";
import LessonCardTypeTwo from "./components/lesson-card-type-two/lesson-card-type-two";

import {ILessonMainCard} from "./interface/lesson-card";

import './style/common/lesson-card.scss'

import {AppContext} from "../../../../app";
import {ReduxNotificationsAction} from "../../../../../redux/reducers/notifications/action/notification.action";
import setInputData = ReduxNotificationsAction.setInputData;

const LessonCard = ({lesson}: ILessonMainCard) => {

    const appContext = useContext(AppContext)

    const dispatch = useDispatch()

    const onCardClick = () => {
        dispatch(setInputData(lesson))
        dispatch(appContext.reduxApi.setNotificationState(true))
    }

    const getLessonsBySubGroup = () => {
        const subgroups = lesson?.subgroups

        if (!subgroups) {
            return <LessonCardTypeOne
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

            return <LessonCardTypeOne
                onCardClick={onCardClick}
                lessonType={subgroups[0]?.['lesson_type'] || 'unk'}
                discipline={subgroups[0]?.['discipline'] || 'unk'}
                teachers={teachers}
                offices={offices}
            />

        }


        return (
            <LessonCardTypeTwo
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
    }

    return (
        <div className={'lesson-card'}

        >
            <div className={'lesson-card__container'}>
                {
                    getLessonsBySubGroup()
                }
            </div>
            <div className={'lesson-card__notification'}>
                <div className={'lesson-card__notification-icon'}></div>
            </div>
        </div>
    );
};

export default LessonCard;