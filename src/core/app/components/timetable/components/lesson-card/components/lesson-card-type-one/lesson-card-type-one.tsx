import React from 'react';

import LessonLocation from "../lesson-location/lesson-location";

import {parseStrByLength} from "../../../../../../utils/parseStrByLength";

const LessonCardTypeOne = ({lessonType, discipline, offices, teachers, onCardClick}: {
    discipline: string,
    lessonType: string,
    teachers: any[],
    offices: any[],
    onCardClick: () => void
}) => {

    const getTeachersJsx = (teachers: any[]): JSX.Element => {
        if (teachers.length > 2) {
            return <>
                <span>{teachers[0]}</span>
                <span>{teachers[1]}</span>
                <span>...</span>
            </>
        }

        return <>
            {
                teachers.map((teacher, index) => (
                    <span key={index}>{teacher || 'unk'}</span>
                ))
            }
        </>
    }
    const getOfficesJsx = (offices: any[]): JSX.Element => {
        if (offices[0] == 'unk') {
            return <>
            </>
        }


        if (offices.length > 2) {
            if (offices[0] == offices[1]) {
                return (
                    <LessonLocation offices={[offices[0]]}/>
                )
            }

            return (
                <LessonLocation offices={[offices[0], offices[1]]}/>
            )
        }

        return (
            <LessonLocation offices={offices}/>
        )
    }

    return (
        <>
            <div className={'lesson-card__tab-header'}>
                <span> {lessonType || 'unk'} </span>
            </div>
            <div className={'lesson-card__main-info'}
                 onClick={() => onCardClick()}
            >
                <div className={'lesson-card__lesson'}>
                    <div className={'lesson-card__lesson-title'}>
                        <span>{parseStrByLength(discipline) || 'unk'}</span>
                    </div>
                    <div className={'lesson-card__lesson-teacher'}>
                        {
                            getTeachersJsx(teachers)
                        }
                    </div>
                </div>
                <div className={'lesson-card__lesson-locations'}>
                    {
                        getOfficesJsx(offices)
                    }
                </div>
            </div>
        </>
    );
};

export default LessonCardTypeOne;