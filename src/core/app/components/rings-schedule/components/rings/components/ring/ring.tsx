import React from 'react';

import {IRing} from "./interface/ring";

import './style/common/ring.scss'

const Ring = ({lessonNumber, timeEnd, timeStart}:IRing) => {
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