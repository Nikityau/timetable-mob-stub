import React from 'react';

import Group from "./components/group/group";

import './style/common/groups.scss'

const Groups = () => {
    return (
        <div className={'notify-groups el_side_offset_m'}>
            <Group
                teacher={'Москат Н.А.'}
                group={'Подгруппа 1'}
                auditorium={'Г 302'}
            />
            <Group
                teacher={'Гальцева А.А.'}
                group={'Подгруппа 2'}
                auditorium={'Г 303'}
            />
        </div>
    );
};

export default Groups;