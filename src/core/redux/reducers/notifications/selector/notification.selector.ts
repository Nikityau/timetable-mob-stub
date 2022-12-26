export namespace ReduxNotificationSelector {
    export const getNotifPopUpState = (state):boolean => {
        return state['notifications']['isNotifyOpen']
    }
}