import React, {useContext} from 'react';
import {useSelector} from "react-redux";

import {AppContext} from "../../../../app";

import './styles/common/info-columns.scss'

const InfoColumns = () => {

    const appContext = useContext(AppContext)

    const theme = useSelector(state => state['theme'])
    const groupName = useSelector(appContext.reduxApi.getGroupTitle())

    return (
        <div className={'info-columns'}>
            <div className={'info-columns__decoration info-columns__decoration_top info-columns_gradient_grey'}></div>
            <div className={'info-columns__container'}>
                <div className={'info-columns__time'}>
                    <span>Время</span>
                </div>
                <div className={'info-columns__group'}>
                    <span>{ groupName || 'unk' }</span>
                </div>
                <div className={'info-columns__schedule'}>
                    {/*<img src={theme == 'LIGHT' ? schedule_dark_img : schedule_light_img} alt={'img'}/>*/}

                </div>
            </div>
            <div className={'info-columns__decoration info-columns__decoration_bottom info-columns_gradient_grey'}></div>
        </div>
    );
};

export default InfoColumns;