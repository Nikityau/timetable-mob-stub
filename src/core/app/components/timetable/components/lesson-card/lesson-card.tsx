import React from 'react';

import LessonCardTypeOne from "./components/lesson-card-type-one/lesson-card-type-one";

import './style/common/lesson-card.scss'
import LessonCardTypeTwo from "./components/lesson-card-type-two/lesson-card-type-two";

interface ILessonCard {
    lesson: any
}


const LessonCard = ({lesson}: ILessonCard) => {

    const getLessonsBySubGroup = () => {
        const subgroups = lesson.subgroups

        if (!subgroups) {
            return <LessonCardTypeOne
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

            return <LessonCardTypeOne
                lessonType={subgroups[0]?.['lesson_type'] || 'unk'}
                discipline={subgroups[0]?.['discipline'] || 'unk'}
                teachers={teachers}
                offices={offices}
            />

        }

        console.log(subgroups)


        return (
            <LessonCardTypeTwo
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