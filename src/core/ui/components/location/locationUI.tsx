import React from 'react';

import {ILocation} from "./interface/location";

import './style/common/location.scss'

const LocationUI = ({location, color, className}:ILocation) => {
    return (
        <div className={['location-ui', className].join(' ')}>
            <div className={'location-ui__container'}>
                <div className={'location-ui__icon'}
                    style={{
                        color: `${color}`
                    }}
                >
                </div>
                <div className={'location-ui__location'}
                    style={{
                        color: `${color}`
                    }}
                >
                    <span>{ location }</span>
                </div>
            </div>
        </div>
    );
};

export default LocationUI;