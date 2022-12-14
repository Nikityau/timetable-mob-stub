import React from 'react';

import LocationUI from "../../../../../../../../../../../ui/components/location/locationUI";

import {INotifSubgroup} from "./interface/notif-subgroup";

import './style/common/notif-subgroup.scss'

const NotifSubgroup = ({subgroup, teacher, cabinet}:INotifSubgroup) => {
    return (
        <div className={'notif-pop-up__subgroup'}>
            <div className={'notif-pop-up__subgroup-container'}>
                <div className={'notif-pop-up__subgroup-teacher'}>
                    <span>{ teacher }</span>
                </div>
                <div className={'notif-pop-up__subgroup-group'}>
                    <span>{ subgroup }</span>
                </div>
               <LocationUI
                   location={cabinet}
               />
            </div>
        </div>
    );
};

export default NotifSubgroup;