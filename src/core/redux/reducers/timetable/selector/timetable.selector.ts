namespace ReduxTimeTableSelector {
    export const getGroupFullTitle = (state):string => {
        return state['timetable']['full_title']
    }

    export const getParsedData = (state) => {
        return state['timetable']['lessons']['parsed']
    }

    export const getId = (state) => {
        return state['timetable']['id']
    }
}

export default ReduxTimeTableSelector