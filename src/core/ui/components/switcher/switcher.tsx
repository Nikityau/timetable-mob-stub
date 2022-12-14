import React from 'react';
import {Switch} from "antd";

import {ISwitcherUI} from "./interface/switcher";

import './style/common/switcher.scss'

const SwitcherUI = ({ onSwitchChange }:ISwitcherUI) => {
    return (
        <div className={'switcher-ui'}>
            <Switch
                size={'small'}
                onChange={onSwitchChange}
            />
        </div>
    );
};

export default SwitcherUI;