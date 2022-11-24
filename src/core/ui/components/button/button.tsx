import React from 'react';

import {IButtonUI} from "./interface/button.interface";

import './styles/common/button.scss'

const Button = ({ text, onClickHandler }:IButtonUI) => {
    return (
        <button className={'btn-ui'} onClick={onClickHandler}>
            <div className={'btn-ui__container'}>
                <div className={'btn-ui__btn'}>
                    <span>{ text }</span>
                </div>
            </div>
        </button>
    );
};

export default Button;