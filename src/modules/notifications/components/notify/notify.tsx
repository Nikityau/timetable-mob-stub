import React, {useContext} from 'react';
import {nanoid} from "nanoid";

import {TimeBefore} from "../../helpers/parseTime";

import {NotifyContext} from "../notification/notification";
import {NotifyActionsType} from "../notification/reducer/action/notify.action";

import {notifyTime} from "./data/time";

import Repeat from "../repeat/repeat";
import Tumbler from "../tumbler/tumbler";

import './style/notify.scss'

const Notify = () => {

    const notifyContext = useContext(NotifyContext)


    const onInteractiveChange = (value: boolean) => {
        notifyContext.dispatch({
            type: NotifyActionsType.IS_NOTIFY_ACTIVE,
            payload: value
        })
    }

    const onTimeClick = (time: TimeBefore) => {
        notifyContext.dispatch({
            type: NotifyActionsType.TIME_BEFORE,
            payload: time
        })
    }

    const onRepeatChange = (value: boolean) => {
        notifyContext.dispatch({
            type: NotifyActionsType.IS_NOTIFY_REPEAT,
            payload: value
        })
    }

    return (
        <div className={'notify-notify'}>
            <div className={'notify-notify__tumbler-wrapper'}>
                <Tumbler
                    value={notifyContext.notif.isNotifyActive}
                    type={'time'}
                    text={'Добавить уведомление:'}
                    onChange={onInteractiveChange}
                />
            </div>
            <div className={[
                'notify-notify__container el_side_offset_m',
                !notifyContext.notif.isNotifyActive
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
                                    notifyContext.notif.timeBefore == time.state
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
                    value={notifyContext.notif.isNotifyRepeat}
                    onChange={onRepeatChange}
                />
            </div>
        </div>
    );
};

export default Notify;