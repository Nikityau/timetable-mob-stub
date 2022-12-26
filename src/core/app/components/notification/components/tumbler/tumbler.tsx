import React from 'react';

import {ITumbler} from "./interface/tumbler";

import TumblerUI from "../../../../../ui/components/tumbler/tumbler";

import './style/common/tumbler.scss'

const Tumbler = ({ text, type, onChange }:ITumbler) => {
    return (
        <div className={'tumbler'}>
            <div className={[
                'tumbler__icon',
                type == 'time'
                    ? 'tumbler__icon_time'
                    : 'tumbler__icon_note'
            ].join(' ')}>
            </div>
            <div className={'tumbler__text'}>
                <span>{ text }</span>
            </div>
            <div className={'tumbler__toggler'}>
                <TumblerUI
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default Tumbler;