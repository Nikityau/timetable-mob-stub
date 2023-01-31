import React from 'react';

import './style/button.scss'

type ButtonProps = {
    text: string,
    onClick: () => void
}

const Button = ({text, onClick}: ButtonProps) => {
    return (
        <button className={'button-ui'} onClick={onClick}>
            <span>{text}</span>
        </button>
    );
};

export default Button;