import React, {useContext} from 'react';

import './style/common/tabber.scss'

const Tabber = ({ onClose }: { onClose: () => void }) => {
    const onClick = () => {
        onClose()
    }

    return (
        <div className={'tabber'} onClick={onClick}>
            <div className={'tabber__tab-block'}></div>
        </div>
    );
};

export default Tabber;