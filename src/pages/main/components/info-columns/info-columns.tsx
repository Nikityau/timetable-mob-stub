import React from 'react';
import cn from 'classnames'

import {CurrentGroup} from "../../../../micro-modules/current-group";

import RingScheduleIcon from "../../../../components/ring-schedule-icon/ring-schedule-icon";

import './style/info-columns.scss'

const InfoColumns = () => {
    return (
        <div className={'info-columns'}>
            <div className={cn(
                'info-columns__decoration',
                'info-columns__decoration_top',
                'info-columns_gradient_grey'
            )}></div>
            <div className={'info-columns__container'}>
                <div className={'info-columns__time'}>
                    <span>Время</span>
                </div>
                <div className={'info-columns__group'}>
                    <CurrentGroup/>
                </div>
                <RingScheduleIcon>
                    <div className={'info-columns__schedule'}>
                    </div>
                </RingScheduleIcon>
            </div>
            <div
                className={cn(
                    'info-columns__decoration',
                    'info-columns__decoration_bottom',
                    'info-columns_gradient_grey'
                )}></div>
        </div>
    );
};

export default InfoColumns;