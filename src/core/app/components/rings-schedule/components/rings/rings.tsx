import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";

import Ring from "./components/ring/ring";
import BreakTime from "./components/break-time/break-time";

import {IRings} from "./interface/rings";

import './style/common/rings.scss'

import btn_img_dark from '../../../../../assets/icons/btn-back-dark.png'
import btn_img_light from '../../../../../assets/icons/btn-back-light.png'

import {rings} from './data/rings'
import {AppContext} from "../../../../app";

const Rings = ({isOpen}: IRings) => {

    const appContext = useContext(AppContext)

    const dispatch = useDispatch()

    const theme = useSelector(appContext.reduxApi.getTheme())

    const [scheduleHeight, setScheduleHeight] = useState<number>(0)

    const onCloseClick = () => {
        dispatch(appContext.reduxApi.setRingsState(false))
    }

    useEffect(() => {
        const ringsHeader = document.querySelector('.rings__header')
        const ringsHHeight = ringsHeader.clientHeight
        const winHeight = window.screen.availHeight
        setScheduleHeight(winHeight - ringsHHeight)
    }, [])

    return (
        <div className={[
            'rings',
            isOpen
                ? 'rings_open'
                : 'rings_close'
        ].join(' ')}>
            <div className={'rings__container'}>
                <div className={'rings__header'}>
                    <div className={'rings__btn'}
                         onClick={onCloseClick}
                    >
                        <img src={
                            theme == "DARK"
                                ? btn_img_dark
                                : btn_img_light
                        } alt={'btn'}/>
                    </div>
                    <div className={'rings__text'}>
                        <span>Расписание звонков</span>
                    </div>
                    <div className={'rings__plug'}>
                    </div>
                </div>
                <div className={'rings__schedule'}
                     style={{
                         height: `${scheduleHeight}px`
                     }}
                >
                    <div className={'rings__schedule-container'}
                        key={nanoid()}
                    >
                        {
                            rings.map((data, index) => (
                                <React.Fragment
                                    key={data.id + data.breakTimeId}
                                >
                                    <Ring
                                        key={data.id}
                                        lessonNumber={data.lessonNumber}
                                        timeStart={data.lessonTimeStart}
                                        timeEnd={data.lessonTimeEnd}
                                    />
                                    {
                                        data.breakTime
                                            ? <BreakTime
                                                key={data.breakTimeId}
                                                breakTime={data.breakTime}
                                            />
                                            : <></>
                                    }
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rings;