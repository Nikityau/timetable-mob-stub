import React from 'react';

import {parseStrByLength} from "../../../../utils/parseStrByLength";

import LessonCardOneType from "./components/lesson-card-one-type";

import './style/common/lesson-card.scss'

interface ILessonCard {
    lesson: any
}


const LessonCard = ({lesson}: ILessonCard) => {

    const getLessonsBySubGroup = () => {
        const subgroups = lesson.subgroups

        if (!subgroups) {
            return <LessonCardOneType
                lessonType={lesson?.['lesson_type'] || 'unk'}
                discipline={lesson?.['discipline'] || 'unk'}
                teachers={[lesson?.['teacher'] || 'unk']}
                offices={[lesson?.['auditorium_id'] || 'unk']}
            />
        }

        let isLessonTypeEvery = true
        const lessonType = subgroups[0]['lesson_type']
        isLessonTypeEvery = subgroups.every(lesson => lesson['lesson_type'] == lessonType)

        if(isLessonTypeEvery) {
            const teachers = []
            const offices = []
            for(let lesson of subgroups) {
                teachers.push(lesson['teacher'])
                offices.push(lesson['auditorium_id'])
            }

            return <LessonCardOneType
                lessonType={subgroups[0]?.['lesson_type'] || 'unk'}
                discipline={subgroups[0]?.['discipline'] || 'unk'}
                teachers={teachers}
                offices={offices}
            />

        } else {

        }

        return <>NOTHING</>
    }

    const lessonJSX = (
        <>
            <div className={'lesson-card__tab-header'}>
                <span> {lesson?.['lesson_type'] || 'unk'} </span>
            </div>
            <div className={'lesson-card__main-info'}>
                <div className={'lesson-card__lesson'}>
                    <div className={'lesson-card__lesson-title'}>
                        <span>{parseStrByLength(lesson?.['discipline']) || 'unk'}</span>
                    </div>
                    <div className={'lesson-card__lesson-teacher'}>
                        <span>{lesson?.['teacher'] || 'unk'}</span>
                    </div>
                </div>
                <div className={'lesson-card__lesson-location'}>
                    <div className={'lesson-card__location-icon'}>
                    </div>
                    <div className={'lesson-card__location'}>
                        <span>{lesson['auditorium_id']}</span>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div className={'lesson-card'}>
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