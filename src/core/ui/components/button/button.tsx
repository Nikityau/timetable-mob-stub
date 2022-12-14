import React from 'react';

import {IButtonUI} from "./interface/button.interface";

import './styles/common/button.scss'
import './styles/common/_/shadow.scss'

const Button = (
    {text, onClickHandler, isShadowOn}: IButtonUI = {
        isShadowOn: false,
        text: 'text',
        onClickHandler: () => {}
    }
) => {
    return (
        <button className={[
            'btn-ui',
            isShadowOn
                ? 'btn-ui_shadow'
                : ''
        ].join(' ')} onClick={onClickHandler}>
            <div className={'btn-ui__container'}>
                <div className={'btn-ui__btn'}>
                    <span>{text}</span>
                </div>
            </div>
        </button>
    );
};

export default Button;