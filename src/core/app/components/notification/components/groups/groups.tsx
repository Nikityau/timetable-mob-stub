import React from 'react';
import {useSelector} from "react-redux";
import {nanoid} from "nanoid";

import {ReduxNotificationSelector} from "../../../../../redux/reducers/notifications/selector/notification.selector";

import Group from "./components/group/group";

import './style/common/groups.scss'

const Groups = () => {

    const groups = useSelector(ReduxNotificationSelector.getGroups)

    return (
        <div className={'notify-groups el_side_offset_m'}>
            {
                groups?.map(group => (
                    <Group
                        key={nanoid()}
                        teacher={group.teacher}
                        group={group.subgroup}
                        auditorium={group.auditorium_id}
                    />
                ))
            }
        </div>
    );
};

export default Groups;