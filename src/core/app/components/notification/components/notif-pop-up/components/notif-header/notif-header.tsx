import React from 'react';

import Button from "../../../../../../../ui/components/button/button";

import './style/common/notif-header.scss'

const NotifHeader = () => {

    const onClick = () => {}

    return (
        <div className={'notif-pop-up__header el_side_offset_m'}>
            <div className={'notif-pop-up__control-stripe'}>
                <div className={'notif-pop-up__stripe'}>
                </div>
            </div>
            <div className={'notif-pop-up__header-info'}>
                <div className={'notif-pop-up__lesson'}>
                    <div className={'notif-pop-up__lesson-type'}>
                        <span>Лабораторная</span>
                    </div>
                    <div className={'notif-pop-up__lesson-title'}>
                        <span>Операционные системы</span>
                    </div>
                </div>
                <div className={'notif-pop-up__save-btn'}>
                    <Button
                        text={'Сохранить'}
                        isShadowOn={true}
                        onClickHandler={onClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotifHeader;