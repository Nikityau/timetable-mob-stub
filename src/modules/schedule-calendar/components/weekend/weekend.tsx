import React, {useState} from 'react';

import './style/weekend.scss'

import bg_dark from '../../assets/boilerplate-1-dark.png'
import bg_light from '../../assets/boilerplate-1-light.png'

const Weekend = () => {

    const [theme] = useState<'DARK' | 'LIGHT'>('DARK')

    return (
        <div className={'weekend'}
             style={{
                 backgroundImage: `url(${
                     theme == 'DARK'
                         ? bg_dark
                         : bg_light
                 })`
             }}
        >
            <div className={'weekend__title'}>
                <h2>Воу кажется сегодня нет занятий, можно провести время с друзьями или с пользой! :)</h2>
            </div>
        </div>
    );
};

export default Weekend;