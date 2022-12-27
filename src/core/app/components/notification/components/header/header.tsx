import React, {useContext} from 'react';
import {useSelector} from "react-redux";

import {ReduxNotificationSelector} from "../../../../../redux/reducers/notifications/selector/notification.selector";

import './style/common/header.scss'

import {NotifyContext} from "../../notification";

const Header = () => {

    const notifyContext = useContext(NotifyContext)

    const headData = useSelector(ReduxNotificationSelector.getLessonTypeNDiscipline)

    const onSave = () => {
        notifyContext.notify.save()
    }

    return (
        <div className={'notify-header'}>
            <div className={'notify-header__container el_side_offset_m'}>
                <div className={'notify-header__lesson-info'}>
                    <div className={'notify-header__lesson-type'}>
                        <span>{ headData.lessonType }</span>
                    </div>
                    <div className={'notify-header__lesson-title'}>
                        <span>{ headData.discipline }</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;