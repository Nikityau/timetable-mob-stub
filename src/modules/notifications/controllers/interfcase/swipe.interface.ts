interface Swipe {
    scrollController: any

    closeHandler: (...args: any[]) => any

    onTouchStart(e:any): void
    onTouchMove(e:any):void
    onTouchEnd(e:any):void

    close(): void
    open(): void

    setElement(el: HTMLElement):void
}

export default Swipe