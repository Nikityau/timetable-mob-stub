export namespace ReduxAddonPage {
    export enum AddonPageAction {
        YES = 'addonPage/yes',
        NO = 'addonPage/no'
    }

    export interface IAddonAction {
        type: AddonPageAction
    }

    export function addonPageYes(): IAddonAction {
        return {
            type: AddonPageAction.YES
        }
    }
    export function addonPageNo(): IAddonAction {
        return {
            type: AddonPageAction.NO
        }
    }
}