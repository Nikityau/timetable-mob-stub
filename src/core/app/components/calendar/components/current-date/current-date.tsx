import React, {useContext, useEffect} from 'react';
import {useSelector} from "react-redux";

import {AppContext} from "../../../../app";

import './styles/common/current-date.scss'

import store from "../../../../../redux/store/store";
import ReduxThemeAction from "../../../../../redux/reducers/theme/action/theme.action";

const CurrentDate = () => {

    const appContext = useContext(AppContext)

    const dateNow = useSelector(appContext.reduxApi.getDateNow())
    const isAddonPage = useSelector(appContext.reduxApi.getIsAddonPage())

    const switchTheme = () => {
        const theme = store.getState().theme

        if(theme['state'] == 'DARK') {
            store.dispatch(ReduxThemeAction.setLight())
        }
        if(theme['state'] == 'LIGHT') {
            store.dispatch(ReduxThemeAction.setDark())
        }
    }

    return (
        <div className={[
            'current-date',
            isAddonPage
                ? 'current-date__container_left_offset'
                : ''
        ].join(' ')}>
            <div className={'current-date__container'} >
                <div className={'current-date__day'}>
                    <span>{dateNow?.date || '00'}</span>
                </div>
                <div className={'current-date__remain-date'}>
                    <div className={'current-date__weekday'}>
                        <span>{dateNow?.weekday || 'unk'}</span>
                    </div>
                    <div className={'current-date__month-year'}>
                        <div className={'current-date__month'}>
                            <span>{dateNow?.month || 'unk'}</span>
                        </div>
                        <div className={'current-date__year'}>
                            <span>{dateNow?.year || 'unk'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentDate;