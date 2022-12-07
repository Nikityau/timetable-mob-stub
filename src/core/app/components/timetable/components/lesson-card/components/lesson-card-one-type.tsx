import React from 'react';

import {parseStrByLength} from "../../../../../utils/parseStrByLength";

const LessonCardOneType = ({ lessonType, discipline, offices, teachers }: {
    discipline: string,
    lessonType: string,
    teachers: any[],
    offices: any[]
}) => {
    return (
        <>
            <div className={'lesson-card__tab-header'}>
                <span> { lessonType || 'unk' } </span>
            </div>
            <div className={'lesson-card__main-info'}>
                <div className={'lesson-card__lesson'}>
                    <div className={'lesson-card__lesson-title'}>
                        <span>{ parseStrByLength(discipline) || 'unk' }</span>
                    </div>
                    <div className={'lesson-card__lesson-teacher'}>
                        {
                            teachers.map((teacher, index) => (
                                <span key={index}>{ teacher || 'unk' }</span>
                            ))
                        }
                    </div>
                </div>
                <div className={'lesson-card__lesson-locations'}>
                    {
                        offices.map((office,index) => (
                            <div key={index} className={'lesson-card__lesson-location'}>
                                <div className={'lesson-card__location-icon'}>
                                </div>
                                <div className={'lesson-card__location'}>
                                    <span>{ office || 'unk' }</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default LessonCardOneType;