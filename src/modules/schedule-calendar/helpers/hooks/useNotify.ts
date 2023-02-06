import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {Lesson} from "../../store/interface/lesson";

import {isNotify} from "../../../notifications/store/selector/isNotify";

import Event from "../../../../helpers/event/event";

import {store} from "../../../../store";

export const useNotify = (lesson: Lesson) => {
    const [is, setIs] = useState<boolean>(false)

    const has = useSelector(isNotify(lesson))

    useEffect(() => {
        if(has) {
            setIs(true)

            return
        }

        if(is) {
           setIs(false)
        }
    }, [has])

    const onCardClick = () => {
        const storeState = store.getState()
        const date = storeState.date.current
        const id = storeState.schedule.id

        Event.emit('notificationInputData', { lesson: lesson, id, date})
        Event.emit('openNotification')
    }

    return {
        is,
        onCardClick
    }
}