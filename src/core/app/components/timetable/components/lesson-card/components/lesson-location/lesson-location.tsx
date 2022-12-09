import React from 'react';

const LessonLocation = ({ offices }: { offices: any[] }) => {
    return (
        <>
            {
                offices.map((office, index) => (
                    <div className={'lesson-card__lesson-location'}
                        key={index}
                    >
                        <div className={'lesson-card__location-icon'}>
                        </div>
                        <div className={'lesson-card__location'}>
                            <span>{office || 'unk'}</span>
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default LessonLocation;