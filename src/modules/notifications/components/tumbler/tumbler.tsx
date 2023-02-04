import React from 'react';
import cn from 'classnames'

import TumblerUi from "../../../../ui/components/tumbler/tumbler-ui";

import './style/tumbler.scss'

type TumblerProps = {
    value: boolean
    type: "time" | "note"
    text: string,
    onChange: (value: boolean) => void
}

const Tumbler = ({ onChange,type,text, value }: TumblerProps) => {
    return (
        <div className={'tumbler'}>
            <div className={cn(
                'tumbler__icon',
                type == 'time'
                    ? 'tumbler__icon_time'
                    : 'tumbler__icon_note'
            )}>
            </div>
            <div className={'tumbler__text'}>
                <span>{text}</span>
            </div>
            <div className={'tumbler__toggler'}>
                <TumblerUi
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default Tumbler;