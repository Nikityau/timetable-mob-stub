import React from "react";

import Scroll from "./interfcase/scroll.interface";

class ScrollController implements Scroll {

    canTouch: (v: boolean) => void
    up: () => void

    constructor(canTouch: (v: boolean) => void, up: () => void) {
        this.canTouch= canTouch
        this.up = up

        this.onScroll = this.onScroll.bind(this)
    }

    onScroll(e: React.UIEvent) {
        const y = (e.target as HTMLElement).scrollTop

        if(y <= 2) {
            this.canTouch(true)
        } else {
            this.canTouch(false)
            this.up()
        }
    }
}

export default ScrollController