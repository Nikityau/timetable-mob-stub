import {Subject, Subscription} from 'rxjs'

class Event {
    private event: Map<string, Subject<any>>

    constructor() {
        this.on = this.on.bind(this)
        this.emit = this.emit.bind(this)
    }

    private createEvent(eventName) {
        this.event.set(eventName, new Subject())
    }

    on(eventName: string, callback: (...args: any[]) => any) {
        let subscription: Subscription = null

        if (!this.event.has(eventName)) {
            this.createEvent(eventName)
        }

        subscription = this.event.get(eventName).subscribe(callback)

        return () => {
            subscription.unsubscribe()
        }
    }

    async emit(eventName, ...args: any[]) {
        if(!this.event.has(eventName)) {
            throw new Error(`event with name ${eventName} does not exist`)
        }

        // @ts-ignore
        await this.event.get(eventName).next(...args)
    }

}

export default new Event();

