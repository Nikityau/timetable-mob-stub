import React from 'react';
import {nanoid} from "nanoid";
import LessonLocation from "../../../lesson-location/lesson-location";

interface ITabCardContent {
    discipline: string,
    teachers: any[],
    offices: any[]
}

const TabCardContent = ({offices, teachers, discipline}: ITabCardContent) => {
    return (
        <div className={'tabpen__tab-content'}>
            <div className={'tabpen__tab-content-container'}>
                <div className={'tabpen__tab-content-lesson'}>
                    <div className={'tabpen__tab-content-discipline'}>
                        <span> { discipline } </span>
                    </div>
                    <div className={'tabpen__tab-content-teachers'}>
                        {
                            teachers.map(teacher => (
                                <span key={nanoid()}>{ teacher }</span>
                            ))
                        }
                    </div>
                </div>
                <LessonLocation
                    offices={offices}
                />
            </div>
        </div>
    );
};

export default TabCardContent;