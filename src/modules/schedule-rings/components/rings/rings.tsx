import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {nanoid} from "nanoid";
import cn from 'classnames'

import {getTheme} from "../../../theme";
import {closeRingsSchedule, openRingsSchedule} from "../../store/action/rings.action";

import Ring from "../ring/ring";
import BreakTime from "../break-time/break-time";

import './style/rings.scss'

import btn_img_dark from '../../assets/btn-back-dark.png'
import btn_img_light from '../../assets/btn-back-light.png'

import Event from "../../../../helpers/event/event";

import {rings} from "../../data/rings";

type RingsProps = {
    isOpen: boolean
}

const Rings = ({ isOpen }:RingsProps) => {
    const dispatch = useDispatch()

    const theme = useSelector(getTheme)

    const [scheduleHeight, setScheduleHeight] = useState<number>(0)

    useEffect(() => {
        const unsub = Event.on('openRingsSchedule', onOpen)

        return () => {
            unsub()
        }
    }, [])

    const onOpen = () => {
        dispatch(openRingsSchedule())
    }

    const onCloseClick = () => {
        dispatch(closeRingsSchedule())
    }

    useEffect(() => {
        const ringsHeader = document.querySelector('.rings__header')
        const ringsHHeight = ringsHeader.clientHeight
        const winHeight = window.screen.availHeight
        setScheduleHeight(winHeight - ringsHHeight)
    }, [])

    return (
        <div className={cn(
            'rings',
            isOpen
                ? 'rings_open'
                : 'rings_close'
            )}>
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