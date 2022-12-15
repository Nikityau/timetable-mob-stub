import React from 'react';

import {INotifSwitcher} from "./interface/notif-switcher";

import SwitcherUI from "../../../../../../../../../ui/components/switcher/switcher";

import './style/common/notif-switcher.scss'

const NotifSwitcher = (
    {
        text,
        type,
        onSwitchChange
    }: INotifSwitcher) => {
    return (
        <div className={'notif-pop-up__notification-choise'}>
            <div className={'notif-pop-up__notification-icon'}>
            </div>
            <div className={'notif-pop-up__notification-text'}>
                <span>{ text }</span>
            </div>
            <SwitcherUI
                onSwitchChange={onSwitchChange}
            />
        </div>
    );
};

export default NotifSwitcher;