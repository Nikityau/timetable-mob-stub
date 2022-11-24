import {Action} from "redux";

const notificationsState = [
    {
        lesson: 'Lab',
        is_notify: true,
        is_repeat: true,
        is_every_time: true,
        date: "",
        time: "",
        notify_before: {
            time: '',
            period: ''
        },
        note: '',
    }
]

export const notifications = (state = notificationsState, action: Action) => {
    switch (action.type) {
        default:
            return state
    }
}