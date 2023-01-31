import React, { PropsWithChildren } from 'react';

type RingScheduleProps = {

} & PropsWithChildren

const RingScheduleIcon = ({children}: RingScheduleProps) => {
    return (
        <div onClick={() => {

        }}>
            { children }
        </div>
    );
};

export default RingScheduleIcon;