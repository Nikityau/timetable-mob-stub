import React from 'react';
import {useSelector, useDispatch} from "react-redux";

import {ReduxNotificationSelector} from "../../../../../redux/reducers/notifications/selector/notification.selector";
import {ReduxNotificationsAction} from "../../../../../redux/reducers/notifications/action/notification.action";

import Button from "../../../../../ui/components/button/button";

import './style/common/header.scss'

const Header = () => {
    const headData = useSelector(ReduxNotificationSelector.getLessonTypeNDiscipline)

    const dispatch = useDispatch()

    const onSave = () => {
        dispatch(ReduxNotificationsAction.notifyCloseAction())
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
                <div className={'notify-header__btn'}>
                    <Button
                        text={'Сохранить'}
                        onClickHandler={onSave}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;