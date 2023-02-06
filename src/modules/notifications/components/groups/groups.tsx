import React from 'react';
import {useSelector} from "react-redux";
import {nanoid} from "nanoid";

import {getGroups} from "../../store/selector/notif.selector";

import Group from "../group/group";

import './style/groups.scss'

const Groups = () => {

    const groups = useSelector(getGroups)

    return (
        <div className={'notify-groups el_side_offset_m'}>
            {
                groups && groups?.map(group => (
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