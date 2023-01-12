import React, {useContext, useEffect} from 'react';
import {useSelector} from "react-redux";

import {ReduxNotificationSelector} from "../../../../../redux/reducers/notifications/selector/notification.selector";

import './style/common/header.scss'

const Header = () => {
    const headData = useSelector(ReduxNotificationSelector.getLessonTypeNDiscipline)

    /*useEffect(() => {
        console.log(headData)
    }, [headData])*/

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