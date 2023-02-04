interface Scroll {

    canTouch: (...args: any[]) => any
    up: (...args: any[]) => any

    onScroll(e: any): void
}

export default Scroll