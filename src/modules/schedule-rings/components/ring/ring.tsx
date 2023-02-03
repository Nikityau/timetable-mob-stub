import React from 'react';

import './style/ring.scss'

type RingProps = {
    lessonNumber: string | number,
    timeStart: string,
    timeEnd: string
}

const Ring = ({lessonNumber, timeEnd,timeStart}:RingProps) => {
    return (
        <div className={'ring'}>
            <div className={'ring__lesson'}>
                <span>{lessonNumber} пара</span>
            </div>
            <div className={'ring__time'}>
                <span>{timeStart}-{timeEnd}</span>
            </div>
        </div>
    );
};

export default Ring;