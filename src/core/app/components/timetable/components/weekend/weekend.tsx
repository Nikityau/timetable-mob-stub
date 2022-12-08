import React from 'react';

import bg_dark from '../../../../../assets/images/weekend/boilerplate-1-dark.png'

import './style/common/weekend.scss'

const Weekend = () => {
    return (
        <div className={'weekend'}
            style={{ backgroundImage: `url(${bg_dark})` }}
        >
        </div>
    );
};

export default Weekend;