import React, {useRef, useState} from 'react';

import './style/common/note.scss'
import Tumbler from "../tumbler/tumbler";
import Repeat from "../repeat/repeat";
import {useDispatch} from "react-redux";
import {ReduxNotificationsAction} from "../../../../../redux/reducers/notifications/action/notification.action";

const Note = () => {

    const [isActive, setIsActive] = useState<boolean>(false)
    const [isRepeat, setIsRepeat] = useState<boolean>(false)

    const [text, setText] = useState<string>("")

    const dispatch = useDispatch()

    const onChangeActive = (value: boolean) => {
        setIsActive(value)

        if(value) {
            dispatch(ReduxNotificationsAction.changeNotificationNote({
                isRepeat,
                text
            }))
        } else {
            dispatch(ReduxNotificationsAction.changeNotificationNote(null))
        }
    }

    const onChangeRemind = (value:boolean) => {
        setIsRepeat(value)

        dispatch(ReduxNotificationsAction.changeNotificationNote({
            isRepeat: value,
            text
        }))
    }

    const onTextChange = (e) => {
        setText(e.target.value)
    }

    const onBlur = () => {
        dispatch(ReduxNotificationsAction.changeNotificationNote({
            isRepeat,
            text
        }))
    }

    return (
        <div className={'notify-note'}>
            <div className={'notify-note__tumbler-wrapper'}>
                <Tumbler
                    type={'note'}
                    text={'Добавить заметку:'}
                    onChange={onChangeActive}
                />
            </div>
            <div className={[
                'notify-note__container el_side_offset_m',
                !isActive
                    ? 'el_disable el_disable_visual'
                    : ''
            ].join(' ')}>
                <div className={'notify-note__note'}>
                    <textarea
                        value={text}
                        onChange={onTextChange}
                        onBlur={onBlur}
                    ></textarea>
                </div>
                <Repeat
                    text={'Напоминать мкаждый раз'}
                    onChange={onChangeRemind}
                />
            </div>
        </div>
    );
};

export default Note;