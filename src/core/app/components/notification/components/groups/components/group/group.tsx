import React from 'react';

import {IGroup} from "./interface/group";

import './style/common/group.scss'

const Group = ({ group, teacher, auditorium }: IGroup) => {
    return (
        <div className={'group'}>
            <div className={'group__container'}>
                <div className={'group__teacher'}>
                    <span>{ teacher }</span>
                </div>
                {
                    group
                        ?  <div className={'group__group'}>
                            <span>{ 'Подгруппа ' + group } </span>
                        </div>
                        : ''
                }
                <div className={'group__auditorium'}>
                    <div className={'group__icon'}/><span> { auditorium } </span>
                </div>
            </div>
        </div>
    );
};

export default Group;