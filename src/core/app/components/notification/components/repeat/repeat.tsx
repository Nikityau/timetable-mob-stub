import React from 'react';

import TumblerUI from "../../../../../ui/components/tumbler/tumbler";

import './style/common/repeat.scss'

const Repeat = ({ value ,onChange, text }: {  value: boolean ,text: string ,onChange(value: boolean):void }) => {
    return (
        <div className={'repeat'}>
            <div className={'repeat__wrapper'}>
                <div className={'repeat__icon'}>
                </div>
                <div className={'repeat__text'}>
                    <span> { text } </span>
                </div>
            </div>
            <div className={'repeat__tumbler'}>
                <TumblerUI value={value} onChange={onChange}/>
            </div>
        </div>
    );
};

export default Repeat;