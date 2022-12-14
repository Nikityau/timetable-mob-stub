import React from 'react';

import SwitcherUI from "../../../../../../../../../../../ui/components/switcher/switcher";

import './style/common/notif-switcher.scss'

const NotifSwitcher = ({ onSwitchChange }: { onSwitchChange: (...args) => void }) => {
    return (
        <div className={'notif-pop-up__notification-choise'}>
            <div className={'notif-pop-up__notification-icon'}>
            </div>
            <div className={'notif-pop-up__notification-text'}>
                <span>Добавить уведомление:</span>
            </div>
            <SwitcherUI
                onSwitchChange={onSwitchChange}
            />
        </div>
    );
};

export default NotifSwitcher;