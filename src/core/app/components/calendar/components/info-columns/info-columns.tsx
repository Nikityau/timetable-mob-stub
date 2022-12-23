import React, {useContext} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {AppContext} from "../../../../app";

import './styles/common/info-columns.scss'

const InfoColumns = () => {

    const appContext = useContext(AppContext)

    const dispatch = useDispatch()

    const groupName = useSelector(appContext.reduxApi.getGroupTitle())

    const onInfoClick = () => {
        dispatch(appContext.reduxApi.setRingsState(true))
    }

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
                <div className={'info-columns__schedule'}
                    onClick={onInfoClick}
                >
                </div>
            </div>
            <div className={'info-columns__decoration info-columns__decoration_bottom info-columns_gradient_grey'}></div>
        </div>
    );
};

export default InfoColumns;