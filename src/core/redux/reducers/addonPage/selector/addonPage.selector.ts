export namespace ReduxAddonPageSelector {
    export const getIsAddonPage = (state):boolean => {
        return state['addonPage']['isAddonPage']
    }
}