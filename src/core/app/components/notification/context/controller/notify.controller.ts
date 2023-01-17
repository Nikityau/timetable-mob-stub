export class NotifyController {

    private clearHandlers: any[] = []

    save() {

    }

    addClearHandler(handler) {
        this.clearHandlers.push(handler)
    }

    clearBeforeClose() {
        for(let handler of this.clearHandlers) {
            handler()
        }
    }
}