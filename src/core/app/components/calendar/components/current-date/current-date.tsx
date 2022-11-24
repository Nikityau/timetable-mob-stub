import React from 'react';
import type { DatePickerProps } from 'antd'
import {Space, DatePicker} from "antd";

import 'antd/dist/antd.css'
import './styles/common/current-date.scss'

const CurrentDate = () => {

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div className={'current-date'}>
            <div className={'current-date__container'}>
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
               <Space direction={'vertical'}>
                   <DatePicker picker={'date'} onChange={onChange}/>
               </Space>
            </div>
        </div>
    );
};

export default CurrentDate;