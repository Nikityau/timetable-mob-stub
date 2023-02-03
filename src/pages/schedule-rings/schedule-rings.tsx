import React from 'react';
import {useSelector} from "react-redux";
import cn from 'classnames'

import {Rings, getOpenStateValue} from "../../modules/schedule-rings";

import './style/schedule-rings.scss'

const ScheduleRings = () => {

    const isOpen = useSelector(getOpenStateValue)

    return (
        <div className={cn(
            'schedule-rings',
            isOpen
                ? 'schedule-rings_open el_enable'
                : 'schedule-rings_close el_disable'
        )}>
            <Rings isOpen={isOpen}/>
        </div>
    );
};

export default ScheduleRings;