export namespace ReduxRingsSelector {
    export const getRingsState = (state):boolean => {
        return state['ringsSchedule']['isOpen']
    }
}