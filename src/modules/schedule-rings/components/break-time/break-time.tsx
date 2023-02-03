import React from 'react';

import './style/break-time.scss'

type BreakTimeProps = {
    breakTime: string | number
}

const BreakTime = ({ breakTime }:BreakTimeProps) => {
    return (
        <div className={'break-time'}>
            <span>перерыв { breakTime } минут</span>
        </div>
    );
};

export default BreakTime;