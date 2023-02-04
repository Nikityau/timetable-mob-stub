import type {Lesson} from "../../../schedule-calendar";

export interface Notification {
    isOpen: boolean,
    inputData: NotificationInput | null,
    notifications: Note[]
}

export interface NotificationInput {
    id: number | string,
    dateRu: string,
    dateEn: string,
    lesson: Lesson
}

export interface Note {
    id: number | string,
    dateRu: string
    dateEn: string
    lesson: Lesson,
    notify: NotifNotification | null
    note: NoteNotification | null
}

export interface Repeat {
    isRepeat: boolean
}

export interface NotifNotification extends Repeat {
    time: string | null
}

export interface NoteNotification extends Repeat {
    text: string | null
}