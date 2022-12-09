import React from 'react';

import {ITabCardHeader} from "./interface/tab-card-header";

const TabCardHeader = ({classNames, tabTitle, onClick}:ITabCardHeader) => {
    return (
        <div className={['tabpen__tab-header', classNames.join(' ')].join(' ')}
            onClick={onClick}
        >
            <span>{ tabTitle }</span>
        </div>
    );
};

export default TabCardHeader;