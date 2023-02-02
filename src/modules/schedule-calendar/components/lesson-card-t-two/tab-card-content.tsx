import React from 'react';
import {nanoid} from "nanoid";

import LessonLocation from "../lesson-location/lesson-location";

type TabCardContentProps = {
    discipline: string,
    teachers: any[],
    offices: any[],
    reverseColor: boolean,
    onCardClick: () => void
}

const TabCardContent = ({
    onCardClick,
    discipline,
    offices,
    reverseColor,
    teachers
}:TabCardContentProps) => {
    return (
        <div className={
            [
                'tabpen__tab-content',
                reverseColor
                    ? 'tabpen__tab-content_color_reverse'
                    : ''
            ].join(' ')
        }
             onClick={onCardClick}
        >
            <div className={'tabpen__tab-content-container'}>
                <div className={'tabpen__tab-content-lesson'}>
                    <div className={'tabpen__tab-content-discipline'}>
                        <span> {discipline} </span>
                    </div>
                    <div className={'tabpen__tab-content-teachers'}>
                        {
                            teachers.map(teacher => (
                                <span key={nanoid()}>{teacher}</span>
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