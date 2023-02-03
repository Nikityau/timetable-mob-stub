import React, { PropsWithChildren } from 'react';

import Event from "../../helpers/event/event";

type RingScheduleProps = {

} & PropsWithChildren

const RingScheduleIcon = ({children}: RingScheduleProps) => {
    const onClick = () => {
        Event.emit('openRingsSchedule')
    }

    return (
        <div onClick={onClick}>
            { children }
        </div>
    );
};

export default RingScheduleIcon;