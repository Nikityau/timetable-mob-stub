namespace ReduxTimeTableSelector {
    export const getGroupFullTitle = (state):string => {
        return state['timetable']['original']?.['full_title']
    }
}

export default ReduxTimeTableSelector