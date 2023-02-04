import React from "react";

import Swipe from "./interfcase/swipe.interface";
import Scroll from "./interfcase/scroll.interface";

import ScrollController from "./scroll.controller";

type Percent = number

class SwipeController implements Swipe {
    scrollController!: Scroll

    closeHandler: () => void

    private _element!: HTMLDivElement

    private _touchStart: React.Touch = undefined

    private _canTouch: boolean = true
    private _isTouch: boolean = false

    private readonly _closePoint: number = 0

    constructor(closePoint: Percent = 20) {
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.canTouch = this.canTouch.bind(this)
        this.up = this.up.bind(this)

        this._closePoint = window.screen.availHeight * (closePoint / 100)

        this.scrollController = new ScrollController(this.canTouch, this.up)
    }

    onTouchStart(e: React.TouchEvent): void {
        if(!this._canTouch) return;
        this._isTouch = true

        this._touchStart = e.touches[0]
    }
    onTouchMove(e: React.TouchEvent): void {
        if(!this._canTouch) return;
        if(!this._isTouch) return

        const lastTouch = e.touches[e.touches.length - 1]
        const diff = lastTouch.pageY - this._touchStart.pageY

        this._element.style.transform = `translate(0px, ${diff}px)`

        const matrix = new DOMMatrixReadOnly(this._element.style.transform)

        if(matrix.f < 0) {
            this.up()
        }

        if(matrix.f >= this._closePoint) {
            this.close()

            return;
        }
    }
    onTouchEnd(e: React.TouchEvent): void {
        this._isTouch = false
        if(!this._canTouch) return;

        this._element.style.transform = 'translate(0,0)'
    }

    close() {
        this.canTouch(false)

        this._element.style.transform = 'translate(0,100%)'

        this?.closeHandler()
    }

    open() {
        this.canTouch(true)

        this.up()
    }

    setElement(el: HTMLDivElement) {
        this._element = el
    }

    up() {
        this._element.style.transform = 'translate(0,0)'
    }

    canTouch(value: boolean) {
        this._canTouch = value
    }
}


export default SwipeController