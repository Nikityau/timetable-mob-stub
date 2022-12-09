import React from 'react';

import {TabType} from "../../lesson-card-type-two";

interface ITabCardHeader {
    classNames: string[],
    onClick: () => void,
    tabTitle: string
}

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