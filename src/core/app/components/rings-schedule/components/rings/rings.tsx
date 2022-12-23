import React, {useContext, useEffect, useState} from 'react';

import {IRings} from "./interface/rings";

import './style/common/rings.scss'

import btn_img from '../../../../../assets/icons/btn-back.png'

import {rings} from './data/rings'
import Ring from "./components/ring/ring";
import BreakTime from "./components/break-time/break-time";
import {useDispatch} from "react-redux";
import {AppContext} from "../../../../app";

const Rings = ({isOpen}: IRings) => {

    const appContext = useContext(AppContext)

    const dispatch = useDispatch()

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
                         <img src={btn_img} alt={'btn'}/>
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
                    <div className={'rings__schedule-container'}>
                        {
                            rings.map(data => (
                                <>
                                    <Ring
                                        lessonNumber={data.lessonNumber}
                                        timeStart={data.lessonTimeStart}
                                        timeEnd={data.lessonTimeEnd}
                                    />
                                    {
                                        data.breakTime
                                            ? <BreakTime
                                                breakTime={data.breakTime}
                                            />
                                            : ''
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rings;