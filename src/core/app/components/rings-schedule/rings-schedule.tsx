import React, {useContext} from 'react';
import {useSelector} from "react-redux";

import Rings from "./components/rings/rings";

import './style/common/rings-schedule.scss'

import {AppContext} from "../../app";

const RingsSchedule = () => {

    const appContext = useContext(AppContext)

    const isOpen = useSelector(appContext.reduxApi.getRingsState())

    return (
        <div className={[
            'rings-schedule',
            isOpen
                ? 'rings-schedule_open el_enable'
                : 'rings-schedule_close el_disable'
        ].join(' ')}>
            <Rings isOpen={isOpen}/>
        </div>
    );
};

export default RingsSchedule;