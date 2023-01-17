import React, {useState} from 'react';
import {nanoid} from "nanoid";

import Tumbler from "../tumbler/tumbler";

import './style/common/notify.scss'

import {notifyTime} from "./data/notify-time";
import Repeat from "../repeat/repeat";
import {useDispatch} from "react-redux";
import {ReduxNotificationsAction} from "../../../../../redux/reducers/notifications/action/notification.action";
import {ca} from "date-fns/locale";

type TimeBefore =
    '5m' | '15m' |
    '30m' | '1h' | '1d' |
    'unk'

const Notify = () => {

    const [isActive, setIsActive] = useState<boolean>(false)

    const [timeActive, setTime] = useState<TimeBefore>('unk')

    const dispatch = useDispatch()

    const onChange = (value: boolean) => {
        setIsActive(value)
        dispatch(ReduxNotificationsAction.changeNotificationNotify({
            isRepeat: value,
            time: timeActive
        }))
    }

    const parseTime = (time: TimeBefore): string => {
        switch (time) {
            case "5m": return "00:05"
            case "15m": return "00:15"
            case "30m": return "00:30"
            case "1h": return "01:00"
            case "1d": return "24:00"
            default: return "unk"
        }
    }

    const onTimeClick = (time: TimeBefore) => {
        setTime(time)

        const timeStr = parseTime(time)

        dispatch(ReduxNotificationsAction.changeNotificationNotify({
            isRepeat: isActive,
            time: timeStr
        }))
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