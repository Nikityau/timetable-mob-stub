export const computeTimetableH = (searchAttr: string): number => {
    const domNode = document.querySelector(searchAttr)
    const domNodeH = domNode.clientHeight

    const windowScreenH = window.screen.height

    return windowScreenH - domNodeH
}