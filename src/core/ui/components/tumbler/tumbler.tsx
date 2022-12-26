import React, {useEffect} from 'react';
import {useToggler} from "../../../utils/hooks/useToggler";

import './style/common/tumbler.scss'

const TumblerUI = ({ onChange }:{ onChange(value: boolean):void }) => {

    const [toggler, setToggler] = useToggler(false)

    useEffect(() => {
        onChange(toggler)
    }, [toggler])

    const toggle = () => {
        setToggler.toggle()
    }

    return (
        <div className={'tumbler-ui'} onClick={toggle}>
            <div className={[
                'tumbler-ui__tumbler',
                toggler
                    ? 'tumbler-ui__tumbler_active'
                    : ''
            ].join(' ')}>
                <div className={[
                    'tumbler-ui__circle',
                    toggler
                        ? 'tumbler-ui__circle_active'
                        : ''
                ].join(' ')}>

                </div>
            </div>
        </div>
    );
};

export default TumblerUI;