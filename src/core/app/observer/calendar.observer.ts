import {nanoid} from "nanoid";

type Handler = (...args: any[]) => any
type Params = any[]

export class CalendarObserver {
    private events!: Map<string, Handler[]>
    private eventsPull!: Map<string, Params>

    constructor() {
        this.events = new Map<string, Handler[]>()
        this.events.set('toCurrentDate', [])
        this.events.set('toCurrentDay', [])
        this.events.set('changeDay', [])

        this.eventsPull = new Map<string, Params>()
        this.eventsPull.set('currentDate', [])
        this.eventsPull.set('nowDate', [])
    }

    subscribe(eventName, handler: Handler) {
        const handler_id = nanoid()
        Object.defineProperty(handler, 'handler_id', {
            value: handler_id
        })

        if (this.events.has(eventName)) {
            this.events.get(eventName).push(handler)
        } else {
            this.events.set(eventName, [])
            this.events.get(eventName).push(handler)
        }

        return () => {
            let handlers = this.events.get(eventName)
            handlers = handlers.filter(el => el['handler_id'] != handler_id)
            this.events.set(eventName, handlers)
        }
    }

    async invoke(eventName, ...params: any[]) {
        const handlers = this.events.get(eventName)
        for (let handler of Array.from(handlers)) {
            await handler(...params)
        }
    }

    async pull(eventName, handler) {
        await handler(...this.eventsPull.get(eventName))
    }

    pullSubscribe(eventName, ...params: any[]) {
        if (this.eventsPull.has(eventName)) {
            const ev = this.eventsPull.get(eventName)
            for (let param of params) {
                ev.push(param)
            }
        } else {
            console.log('no pull event with this name', eventName)
        }

        return () => {
            this.events.set(eventName, [])
        }
    }
}