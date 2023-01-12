import {nanoid} from "nanoid";

export const rings = [
    {
        id: nanoid(),
        lessonNumber: 1,
        lessonTimeStart: '8:20',
        lessonTimeEnd: '9:50',
        breakTime: '15',
        breakTimeId: nanoid()
    },
    {
        id:nanoid(),
        breakTimeId: nanoid(),
        lessonNumber: 2,
        lessonTimeStart: '10:05',
        lessonTimeEnd: '11:35',
        breakTime: '30',
    },
    {
        id:nanoid(),
        breakTimeId: nanoid(),
        lessonNumber: 3,
        lessonTimeStart: '12:05',
        lessonTimeEnd: '13:35',
        breakTime: '15',
    },
    {
        id:nanoid(),
        breakTimeId: nanoid(),
        lessonNumber: 4,
        lessonTimeStart: '13:50',
        lessonTimeEnd: '15:20',
        breakTime: '10',
    },
    {
        id:nanoid(),
        breakTimeId: nanoid(),
        lessonNumber: 5,
        lessonTimeStart: '15:30',
        lessonTimeEnd: '17:00',
        breakTime: '10',
    },
    {
        id:nanoid(),
        breakTimeId: nanoid(),
        lessonNumber: 6,
        lessonTimeStart: '15:10',
        lessonTimeEnd: '18:40',
        breakTime: '10',
    },
    {
        id:nanoid(),
        breakTimeId: nanoid(),
        lessonNumber: 7,
        lessonTimeStart: '18:50',
        lessonTimeEnd: '20:20',
        breakTime: '10',
    },
    {
        id:nanoid(),
        breakTimeId:nanoid(),
        lessonNumber: 8,
        lessonTimeStart: '20:30',
        lessonTimeEnd: '22:00',
        breakTime: null,
    },
]