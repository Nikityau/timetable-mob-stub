import {INotificationsState} from "../interface/notifications.state";

export const notificationsState: INotificationsState = {
    isNotifyOpen: false,
    inputData: {
        lessonType: "nothing",
        lessonTitle: "nothing",
        groups:[]
    },
    notificationData: {
    },
    unsaved: {
    }
}