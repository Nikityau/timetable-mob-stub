import React from 'react';

import bg_dark from '../../../../../assets/images/weekend/boilerplate-1-dark.png'

import './style/common/weekend.scss'

const Weekend = () => {
    return (
        <div className={'weekend'}
            style={{ backgroundImage: `url(${bg_dark})` }}
        >
            <div className={'weekend__title'}>
                <h2>Воу кажется сегодня нет занятий, можно провести время с друзьями или с пользой! :)</h2>
            </div>
        </div>
    );
};

export default Weekend;