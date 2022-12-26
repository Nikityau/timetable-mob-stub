import React, {useState} from 'react';
import {nanoid} from "nanoid";

import Tumbler from "../tumbler/tumbler";

import './style/common/notify.scss'

import {notifyTime} from "./data/notify-time";
import Repeat from "../repeat/repeat";

type TimeBefore =
    '5m' | '15m' |
    '30m' | '1h' | '1d' |
    'unk'

const Notify = () => {

    const [isActive, setIsActive] = useState<boolean>(false)

    const [timeActive, setTime] = useState<TimeBefore>('unk')

    const onChange = (value: boolean) => {
        setIsActive(value)
    }

    const onTimeClick = (time: TimeBefore) => {
        setTime(time)
    }

    const onRepeatChange = (value: boolean) => {

    }

    return (
        <div className={'notify-notify'}>
            <div className={'notify-notify__tumbler-wrapper'}>
                <Tumbler
                    type={'time'}
                    text={'Добавить уведомление:'}
                    onChange={onChange}
                />
            </div>
            <div className={[
                'notify-notify__container el_side_offset_m',
                !isActive
                    ? 'el_disable el_disable_visual'
                    : ''
            ].join(' ')}>
                <div className={'notify-notify__before'}>
                    {
                        notifyTime.map((time, index, arr) => (
                            <React.Fragment
                                key={nanoid()}
                            >
                                <div className={[
                                    'notify-notify__before-time',
                                    timeActive == time.state
                                        ? 'notify-notify__before-time_active'
                                        : ''
                                ].join(' ')}
                                     onClick={() => {
                                         onTimeClick(time.state as TimeBefore)
                                     }}
                                >
                                    <span> {time.notifyBefore} </span>
                                </div>
                                {
                                    index < arr.length - 1
                                        ? <div className={'notify-notify__line'}>
                                        </div>
                                        : ''
                                }
                            </React.Fragment>
                        ))
                    }
                </div>
                <Repeat
                    text={'Повтор'}
                    onChange={onRepeatChange}
                />
            </div>
        </div>
    );
};

export default Notify;