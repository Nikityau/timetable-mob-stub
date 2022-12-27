import React, {useContext} from 'react';
import {useDispatch} from "react-redux";

import './style/common/tabber.scss'

import {AppContext} from "../../../../app";
import {ReduxNotificationsAction} from "../../../../../redux/reducers/notifications/action/notification.action";

const Tabber = () => {

    const appContext = useContext(AppContext)

    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(ReduxNotificationsAction.deleteInputData())
        dispatch(appContext.reduxApi.setNotificationState(false))
    }

    return (
        <div className={'tabber'} onClick={onClick}>
            <div className={'tabber__tab-block'}></div>
        </div>
    );
};

export default Tabber;