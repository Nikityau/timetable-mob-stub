import React, {useContext} from 'react';
import {useSelector} from "react-redux";

import bg_dark from '../../../../../assets/images/weekend/boilerplate-1-dark.png'
import bg_light from '../../../../../assets/images/weekend/boilerplate-1-light.png'

import './style/common/weekend.scss'

import {AppContext} from "../../../../app";

const Weekend = () => {

    const appContext = useContext(AppContext)

    const theme = useSelector(appContext.reduxApi.getTheme())

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