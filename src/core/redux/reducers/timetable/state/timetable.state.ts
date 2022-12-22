import {ITimetableSlice} from "../interface/timetable.slice";

export const timetableState: ITimetableSlice = {
    id: "",
    full_title: "",
    title: "",
    number: "",
    course: "",
    faculty_id: "",
    update_date: "",
    lessons: {
        original: [],
        parsed: {
            above_week: [],
            below_week: []
        }
    }
}