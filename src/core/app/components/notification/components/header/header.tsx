import React from 'react';

import './style/common/header.scss'
import Button from "../../../../../ui/components/button/button";

const Header = () => {

    const onSave = () => {

    }

    return (
        <div className={'notify-header'}>
            <div className={'notify-header__container el_side_offset_m'}>
                <div className={'notify-header__lesson-info'}>
                    <div className={'notify-header__lesson-type'}>
                        <span>Лабораторная</span>
                    </div>
                    <div className={'notify-header__lesson-title'}>
                        <span>Операционные системы</span>
                    </div>
                </div>
                <div className={'notify-header__btn'}>
                    <Button
                        text={'Сохранить'}
                        onClickHandler={onSave}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;