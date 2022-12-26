import React, {useState} from 'react';

import './style/common/note.scss'
import Tumbler from "../tumbler/tumbler";
import Repeat from "../repeat/repeat";

const Note = () => {

    const [isActive, setIsActive] = useState<boolean>(false)

    const onChangeActive = (value: boolean) => {
        setIsActive(value)
    }

    const onChangeRemind = (value:boolean) => {

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
                    <textarea></textarea>
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