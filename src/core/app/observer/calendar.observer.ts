import {nanoid} from "nanoid";

export class CalendarObserver {
    handlers: any[] = []

    subscribe(ev) {
        const handler_id = nanoid()
        ev.handler_id = handler_id
        this.handlers.push(ev)

        return () => {
            this.handlers = this.handlers.filter(el => el.handler_id != handler_id)
        }
    }

    invoke() {
        for (let ev of this.handlers) {
            setTimeout(() => {
                ev?.()
            }, 0)
        }
    }
}