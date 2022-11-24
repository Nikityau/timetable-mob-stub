import React, {useEffect} from 'react';
import type { DatePickerProps } from 'antd'
import {Space, DatePicker} from "antd";

import {useToggler} from "../../../../../utils/hooks/useToggler";

import 'antd/dist/antd.css'
import './styles/common/current-date.scss'

const CurrentDate = () => {

    const [isClndrOpen, setIsClndrOpen] = useToggler(false)

    useEffect(() => {
        window.addEventListener('click', onWindowClick)

        console.log(isClndrOpen)

        return () => {
            window.removeEventListener('click', onWindowClick)
        }
    }, [isClndrOpen])

    const onWindowClick = (e:MouseEvent) => {
       /* const { target } = e
        const targetClass = (target as HTMLElement).className
        if(!targetClass.includes('ant') && isClndrOpen) {
            setIsClndrOpen.off()
        }*/
    }

    const onDateClick = () => {
        console.log('click')
        setIsClndrOpen.toggle()
    }

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);

        setIsClndrOpen.off()
    };

    return (
        <div className={'current-date'}>
            <div className={'current-date__container'} onClick={onDateClick}>
                <div className={'current-date__day'}>
                    <span>13</span>
                </div>
                <div className={'current-date__remain-date'}>
                    <div className={'current-date__weekday'}>
                        <span>чт</span>
                    </div>
                    <div className={'current-date__month-year'}>
                        <div className={'current-date__month'}>
                            <span>Октябрь</span>
                        </div>
                        <div className={'current-date__year'}>
                            <span>2022</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'current-date__date-picker'}>
               <Space className={'test'} direction={'vertical'}>
                   <DatePicker picker={'date'}
                               open={isClndrOpen}
                               onChange={onChange}/>
               </Space>
            </div>
        </div>
    );
};

export default CurrentDate;