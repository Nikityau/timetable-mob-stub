import React, {useEffect} from 'react';

import Button from "../../ui/components/button/button";
import {store} from "../../store";
import Event from "../../helpers/event/event";

const CurrentDateButton = () => {

    const toCurrentDate = () => {
        const date = store.getState().date
        Event.emit('currentDate', date.current)
    }

    return (
        <>
            <Button
                text={'сегодня'}
                onClick={toCurrentDate}
            />
        </>
    );
};

export default CurrentDateButton;