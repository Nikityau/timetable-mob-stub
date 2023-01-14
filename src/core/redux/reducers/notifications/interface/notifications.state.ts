import {ILesson} from "../../timetable/interface/lesson";

export interface INotificationsState {
    isNotifyOpen: boolean,
    inputData: ILesson
    notifications: INote[]
}

export interface INotifNoteInput {
    id: number | string,
    dateRu: string
    dateEn: string
    lesson: ILesson,
}

export interface INote {
    id: number | string,
    dateRu: string
    dateEn: string
    lesson: ILesson,
    notify: INotifyNotification | null
    note: INoteNotification | null
}

 interface IRepeat {
    isRepeat: boolean
}

export interface INotifyNotification extends IRepeat {
    time: string | null | "nothing"
}

export interface INoteNotification extends IRepeat {
    text: string | null | "nothing"
}