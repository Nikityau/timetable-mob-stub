import React, {useEffect} from 'react';
import {eachHourOfInterval, eachMinuteOfInterval} from "date-fns";

import './style/common/notif-tab-time.scss'
import TimeSwiper from "./components/time-swiper/time-swiper";

const dateNow = new Date(Date.now())

const hours = eachHourOfInterval({
    start: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0),
    end: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 23)
})
const minutes = eachMinuteOfInterval({
    start: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0),
    end: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 59),
})

const NotifTabTime = () => {

    const onChangeHour = (hours) => {

    }
    const onChangeMinute = (minutes) => {

    }

    return (
        <div className={'notif-dates__tab-timepicker'}>
            <div className={'notif-dates__timepicker-container'}>
                <div className={'notif-dates__timepicker-hours'}>
                    <TimeSwiper
                        timeArr={hours}
                        onTimeChange={onChangeHour}
                    />
                </div>
                <div className={'notif-dates__timepicker-middle'}>
                    <span>:</span>
                </div>
                <div className={'notif-dates__timepicker-minutes'}>
                    <TimeSwiper
                        timeArr={minutes}
                        onTimeChange={onChangeMinute}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotifTabTime;