import React from 'react';

import './style/tumbler-ui.scss'

type TumblerUiProps = {
    value:boolean ,
    onChange(value: boolean):void
}

const TumblerUi = ({ onChange, value }:TumblerUiProps) => {
    const toggle = () => {
        onChange(!value)
    }

    return (
        <div className={'tumbler-ui'} onClick={toggle}>
            <div className={[
                'tumbler-ui__tumbler',
                value
                    ? 'tumbler-ui__tumbler_active'
                    : ''
            ].join(' ')}>
                <div className={[
                    'tumbler-ui__circle',
                    value
                        ? 'tumbler-ui__circle_active'
                        : ''
                ].join(' ')}>

                </div>
            </div>
        </div>
    );
};

export default TumblerUi;