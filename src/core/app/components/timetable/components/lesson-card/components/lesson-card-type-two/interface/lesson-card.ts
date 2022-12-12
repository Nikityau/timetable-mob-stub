export interface ILessonCard {
    onCardClick: () => void,
    subgroupOne: {
        lessonType: string,
        discipline: string,
        teachers: any[],
        offices: any[]
    },
    subgroupTwo: {
        lessonType: string,
        discipline: string,
        teachers: any[],
        offices: any[]
    }
}