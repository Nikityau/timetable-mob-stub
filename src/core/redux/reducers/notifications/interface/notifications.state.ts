import {ILesson} from "../../timetable/interface/lesson";

export interface INotificationsState {
    isNotifyOpen: boolean,
    inputData: ILesson | null
    notificationData: INote
    unsaved: INote
}

//"dotw:wt:ln"

interface INote {
    [format: string]: {
        notify: {
            isNotify: boolean
            type?: "date" | "time" | "before",
            value?: string,
            isRepeat?: boolean
        },
        note: {
            isNote: boolean,
            text?: string,
            isRemind?: boolean
        }
    }
}
