import React from 'react';

import {INotifeRepeater} from "./interface/notife-repeater";

import SwitcherUI from "../../../../../../../../../../../ui/components/switcher/switcher";

import './style/common/notif-repeater.scss'

const NotifRepeater = ({ text, onSwitchChange }:INotifeRepeater) => {
    return (
        <div className={'notif-pop-up__repeater'}>
            <div className={'notif-pop-up__repeater-container'}>
                <div className={'notif-pop-up__repeater-info'}>
                    <div className={'notif-pop-up__repeater-icon'}>
                    </div>
                    <div className={'notif-pop-up__repeater-text'}>
                        <span>{ text }</span>
                    </div>
                </div>
                <div className={'notif-pop-up__repeater-switcher'}>
                    <SwitcherUI onSwitchChange={onSwitchChange}/>
                </div>
            </div>
        </div>
    );
};

export default NotifRepeater;