export namespace ReduxRingsAction {
    export enum RingsAction {
        OPEN = 'ringsSchedule/open',
        CLOSE = 'ringsSchedule/close'
    }

    export interface IRingsAction {
        type: RingsAction
    }

    export function ringsScheduleOpen():IRingsAction {
        return {
            type: RingsAction.OPEN
        }
    }
    export function ringsScheduleClose():IRingsAction {
        return {
            type: RingsAction.CLOSE
        }
    }
}