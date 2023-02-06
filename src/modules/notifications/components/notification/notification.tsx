import React, {useEffect} from 'react';
import cn from 'classnames'

import {HeightHoc} from "../../../../helpers/height-hoc/height-hoc";
import {useNotification} from "../../helpers/hooks/useNotification";

import Notify from "../notify/notify";
import Tabber from "../tabber/tabber";
import Groups from "../groups/groups";
import Header from "../header/header";
import Note from "../note/note";

import './style/notification.scss'

export const NotifyContext = React.createContext(null)

const Notification = () => {

    const { isNotifyOpen ,notification, dispatchNotification, swipe, ref } = useNotification()

    return (
        <NotifyContext.Provider value={{
            notif: notification,
            dispatch: dispatchNotification
        }}>
            <div className={cn(
                'notification',
                isNotifyOpen
                    ? 'notification_open'
                    : 'el_disable'
            )}>
                <div className={cn(
                    'notification__main',
                    isNotifyOpen
                        ? 'notification__main_open'
                        : ''
                )}
                     ref={ref}
                     onTouchStart={swipe.onTouchStart}
                     onTouchMove={swipe.onTouchMove}
                     onTouchEnd={swipe.onTouchEnd}
                >
                    <div className={'notification__header'}>
                        <Tabber/>
                        <Header/>
                    </div>
                    <HeightHoc
                        classNames={['.notification__header']}
                        component={(h) => (
                            <div className={'notification__container'}
                                 style={{
                                     height: `${h}px`
                                 }}
                                 onScroll={swipe.scroll.onScroll}
                            >
                                <div className={'notification__groups'}>
                                    <Groups/>
                                </div>
                                <div className={'notification__notify'}>
                                    <Notify/>
                                </div>
                                <div className={'notification__note'}>
                                    <Note/>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </NotifyContext.Provider>
    );
};

export default Notification;
