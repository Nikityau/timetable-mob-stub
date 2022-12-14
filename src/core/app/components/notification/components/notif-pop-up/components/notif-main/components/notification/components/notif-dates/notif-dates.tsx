import React, {useState} from 'react';

import './style/common/notif-dates.scss'

type Tab = 'ring' | 'date' | 'time'

const NotifDates = () => {

    const [tab, setTab] = useState<Tab>('ring')

    return (
        <div className={'notif-pop-up__notif-dates notif-dates'}>
            <div className={'notif-dates__container'}>
                <div className={'notif-dates__tabs'}>
                    <div className={'notif-dates__tab'}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotifDates;