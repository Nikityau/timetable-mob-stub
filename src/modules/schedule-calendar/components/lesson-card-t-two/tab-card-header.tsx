import React from 'react';

type TabCardHeaderProps = {
    classNames: string[],
    onClick: () => void,
    tabTitle: string
}

const TabCardHeader = ({ tabTitle, classNames, onClick }:TabCardHeaderProps) => {
    return (
        <div className={['tabpen__tab-header', classNames.join(' ')].join(' ')}
             onClick={onClick}
        >
            <span>{ tabTitle }</span>
        </div>
    );
};

export default TabCardHeader;