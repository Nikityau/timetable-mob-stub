import React from 'react';

import {DateCurrent} from "../../../../micro-modules/date-current";

import CurrentDateButton from "../../../../components/current-date-button/current-date-button";

import './style/current-date.scss'

const CurrentDate = () => {
    return (
        <div className={'current-date'}>
            <DateCurrent/>
            <CurrentDateButton/>
        </div>
    );
};

export default CurrentDate;