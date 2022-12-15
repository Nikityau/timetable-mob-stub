import React from 'react';

import {INotifHeaderTab} from "./interface/notif-header-tab";

const NotifHeaderTab = (
    {
        text,
        className,
        isTabActive,
        onTabClick
    }: INotifHeaderTab) => {
    return (
        <div className={[
            'notif-dates__header-tab',
            className,
            isTabActive
                ? 'notif-dates__tab_active'
                : ''
        ].join(' ')}
        onClick={onTabClick}
        >
            <span> { text || '' } </span>
        </div>
    );
};

export default NotifHeaderTab;