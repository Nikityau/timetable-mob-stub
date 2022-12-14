import React from 'react';

import NotifSubgroup from "./components/subgroup/notif-subgroup";

import './style/common/notif-subgroups.scss'

const NotifSubgroups = () => {
    return (
        <div className={'notif-pop-up__subgroups'}>
            <div className={'notif-pop-up__subgroups-container el_side_offset_m'}>
                <NotifSubgroup
                    teacher={'Москат Н.А.'}
                    subgroup={'Подгруппа 1'}
                    cabinet={'Г302'}
                />
                <NotifSubgroup
                    teacher={'Гальцева А.А.'}
                    subgroup={'Подгруппа 2'}
                    cabinet={'Г303'}
                />
            </div>
        </div>
    );
};

export default NotifSubgroups;