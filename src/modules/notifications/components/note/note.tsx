import React, {useContext} from 'react';

import {debounce} from "../../../../helpers/debounce/debounce";

import Tumbler from "../tumbler/tumbler";
import Repeat from "../repeat/repeat";

import {NotifyContext} from "../notification/notification";
import {NotifyActionsType} from "../notification/reducer/action/notify.action";

import './style/note.scss'

const Note = () => {
    const notifyContext = useContext(NotifyContext)

    const onChangeActive = (value: boolean) => {
        notifyContext.dispatch({
            type: NotifyActionsType.IS_NOTE_ACTIVE,
            payload: value
        })
    }

    const onChangeRemind = (value:boolean) => {
        notifyContext.dispatch({
            type: NotifyActionsType.IS_NOTE_REPEAT,
            payload: value
        })
    }

    const onTextChange = (e) => {
        notifyContext.dispatch({
            type: NotifyActionsType.NOTE_TEXT,
            payload: e.target.value
        })
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
                        defaultValue={notifyContext.notif.noteText}
                        onChange={debounce(onTextChange, 300)}
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