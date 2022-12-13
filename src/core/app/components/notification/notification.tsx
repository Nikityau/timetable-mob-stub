import React, {useContext, useEffect} from 'react';
import {useSelector} from "react-redux";

import './style/common/notification.scss'
import './style/common/_/notification_active.scss'
import './style/common/_/_notif_window.scss'

import {AppContext} from "../../app";
import {useToggler} from "../../../utils/hooks/useToggler";
import NotifPopUp from "./style/components/notif-pop-up/notif-pop-up";

const Notification = () => {

    const appContext = useContext(AppContext)

    const [toggle, toggleOpt] = useToggler(false)

    const notifPopUpState = useSelector(appContext.reduxApi.getNotifPopUpState())

    useEffect(() => {
        setTimeout(() => {
            if(notifPopUpState) {
                toggleOpt.on()
            } else {
                toggleOpt.off()
            }
        }, 500)
    }, [notifPopUpState])

    return (
        <div className={[
            'notification',
            notifPopUpState
                ? 'notification_active el_enable'
                : 'el_disable'
        ].join(' ')}>
           <NotifPopUp isOpen={toggle}/>
        </div>
    );
};

export default Notification;