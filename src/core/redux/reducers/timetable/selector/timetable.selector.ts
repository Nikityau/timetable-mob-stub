namespace ReduxTimeTableSelector {
    export const getGroupFullTitle = (state):string => {
        return state['timetable']['original']?.['full_title']
    }

    export const getParsedData = (state) => {
        return state['timetable']['parsed']
    }
}

export default ReduxTimeTableSelector