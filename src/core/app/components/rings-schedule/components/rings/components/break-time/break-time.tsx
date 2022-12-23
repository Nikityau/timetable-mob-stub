import React from 'react';

import {IBreakTime} from "./interface/break-time";

import './style/common/break-time.scss'

const BreakTime = ({ breakTime }:IBreakTime) => {
    return (
        <div className={'break-time'}>
            <span>перерыв { breakTime } минут</span>
        </div>
    );
};

export default BreakTime;