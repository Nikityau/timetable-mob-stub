import React from 'react';
import {useSelector} from "react-redux";

import ReduxDateSelector from "../../../../../redux/reducers/date/date.selector";

import './styles/common/current-date.scss'

const CurrentDate = () => {

    const dateNow = useSelector(ReduxDateSelector.getDateNow)

    return (
        <div className={'current-date'}>
            <div className={'current-date__container'}>
                <div className={'current-date__day'}>
                    <span>{dateNow?.date || '00'}</span>
                </div>
                <div className={'current-date__remain-date'}>
                    <div className={'current-date__weekday'}>
                        <span>{dateNow?.weekday || 'unk'}</span>
                    </div>
                    <div className={'current-date__month-year'}>
                        <div className={'current-date__month'}>
                            <span>{dateNow?.month || 'unk'}</span>
                        </div>
                        <div className={'current-date__year'}>
                            <span>{dateNow?.year || 'unk'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentDate;