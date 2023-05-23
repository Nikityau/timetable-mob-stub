import React, {useContext} from 'react';

import Tumbler from "../tumbler/tumbler";
import Repeat from "../repeat/repeat";

import {NotifyContext} from "../../notification";
import {NotifActionsType} from "../../reducer/interface/notif.state";

import './style/common/note.scss'

const Note = () => {

    const notifyContext =  useContext(NotifyContext)

    const onChangeActive = (value: boolean) => {
        notifyContext.dispatch({
            type: NotifActionsType.IS_NOTE_ACTIVE,
            payload: value
        })
    }

    const onChangeRemind = (value:boolean) => {
        notifyContext.dispatch({
            type: NotifActionsType.IS_NOTE_REPEAT,
            payload: value
        })
    }

    const onTextChange = (e) => {
        notifyContext.dispatch({
            type: NotifActionsType.NOTE_TEXT,
            payload: e.target.value
        })
    }

    const onFocus = () => {

    }

    const onBlur = () => {

    }

    return (
        <div className={'notify-note'}>
            <div className={'notify-note__tumbler-wrapper'}>
                <Tumbler
                    value={notifyContext.notif.isNoteActive}
                    type={'note'}
                    text={'Добавить заметку:'}
                    onChange={onChangeActive}
                />
            </div>
            <div className={[
                'notify-note__container el_side_offset_m',
                !notifyContext.notif.isNoteActive
                    ? 'el_disable el_disable_visual'
                    : ''
            ].join(' ')}>
                <div className={'notify-note__note'}>
                    <textarea
                        value={notifyContext.notif.noteText}
                        onChange={onTextChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    ></textarea>
                </div>
                <Repeat
                    value={notifyContext.notif.isNoteRepeat}
                    text={'Напоминать каждый раз'}
                    onChange={onChangeRemind}
                />
            </div>
        </div>
    );
};

export default Note;