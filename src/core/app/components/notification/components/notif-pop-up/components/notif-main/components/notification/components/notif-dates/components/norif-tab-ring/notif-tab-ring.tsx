import React, {useState} from 'react';

import './style/common/notif-tab-ring.scss'

type CurrentTime =
    'before5M' |
    'before15M' |
    'before30M' |
    'before1H' |
    'before1D' |
    'undef'

const NotifTabRing = () => {

    const [currentTime, setCurrentTime] = useState<CurrentTime>('undef')

    const onTimeClick = (time: CurrentTime) => {
        return () => {
            setCurrentTime(time)
        }
    }

    const isCurrentTime = (time: CurrentTime): string => {
        if (currentTime == time) return 'notif-dates__tab-ring-time_current'

        return ''
    }

    return (
        <div className={'notif-dates__tab-rings'}>
            <div className={'notif-dates__tab-rings__container'}>
                <div className={[
                    'notif-dates__tab-ring-time',
                    isCurrentTime('before5M')
                ].join(' ')}
                     onClick={onTimeClick('before5M')}
                >
                    <span>За 5 мин.</span>
                </div>
                <div className={'notif-dates__tab-ring-stripe'}/>
                <div className={[
                    'notif-dates__tab-ring-time',
                    isCurrentTime('before15M')
                ].join(' ')}
                     onClick={onTimeClick('before15M')}
                >
                    <span>За 15 мин.</span>
                </div>
                <div className={'notif-dates__tab-ring-stripe'}/>
                <div className={[
                    'notif-dates__tab-ring-time',
                    isCurrentTime('before30M')
                ].join(' ')}
                     onClick={onTimeClick('before30M')}
                >
                    <span>За 30 мин.</span>
                </div>
                <div className={'notif-dates__tab-ring-stripe'}/>
                <div className={[
                    'notif-dates__tab-ring-time',
                    isCurrentTime('before1H')
                ].join(' ')}
                     onClick={onTimeClick('before1H')}
                >
                    <span>За 1 час</span>
                </div>
                <div className={'notif-dates__tab-ring-stripe'}/>
                <div className={[
                    'notif-dates__tab-ring-time',
                    isCurrentTime('before1D')
                ].join(' ')}
                     onClick={onTimeClick('before1D')}
                >
                    <span>За 1 день</span>
                </div>
            </div>
        </div>
    );
};

export default NotifTabRing;
