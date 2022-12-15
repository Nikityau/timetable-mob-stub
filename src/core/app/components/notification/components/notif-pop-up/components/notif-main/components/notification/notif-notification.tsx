import React, {useState} from 'react';

import NotifRepeater from "../notif-repeater/notif-repeater";
import NotifSwitcher from "../notif-switcher/notif-switcher";

import './style/common/notif-notification.scss'
import NotifDates from "./components/notif-dates/notif-dates";

const NotifNotification = () => {

    const [isAddNotification, setIsAddNotification] = useState<boolean>(false)
    const [isRepeat, setIsRepeat] = useState<boolean>(false)

    const onSwitchChange = (switchState) => {
        setIsAddNotification(switchState)
    }

    const onRepeaterChange = (repeaterState) => {
        setIsRepeat(repeaterState)
    }

    return (
        <div className={'notif-pop-up__notification'}>
            <div className={'notif-pop-up__notification-container'}>
               <div className={'notif-pop-up__notif-switcher'}>
                   <NotifSwitcher
                       type={'clock'}
                       text={'Добавить уведомление:'}
                       onSwitchChange={onSwitchChange}
                   />
               </div>
                <div className={[
                    'notif-pop-up__notification-data el_side_offset_m',
                    isAddNotification
                        ? 'el_enable el_enable_view'
                        : 'el_disable el_disable_view'
                ].join(' ')}>
                    <NotifDates/>
                    <NotifRepeater
                        text={'Повтор'}
                        onSwitchChange={onRepeaterChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotifNotification;