import React from 'react';

import TumblerUi from "../../../../ui/components/tumbler/tumbler-ui";

import './style/repeat.scss'

type RepeatProps = {
    value: boolean,
    text: string,
    onChange(value: boolean): void
}

const Repeat = ({ text, onChange, value }:RepeatProps) => {
    return (
        <div className={'repeat'}>
            <div className={'repeat__wrapper'}>
                <div className={'repeat__icon'}>
                </div>
                <div className={'repeat__text'}>
                    <span> {text} </span>
                </div>
            </div>
            <div className={'repeat__tumbler'}>
                <TumblerUi value={value} onChange={onChange}/>
            </div>
        </div>
    );
};

export default Repeat;