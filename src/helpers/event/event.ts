import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs'
type Unsubscribe = () => void

class Event {
    private event: Map<string, Subject<any>>
    private eventBehavior: Map<string, BehaviorSubject<any>>
    private eventObserver: Map<string, Observable<any>>

    constructor() {
        this.event = new Map<string, Subject<any>>()
        this.eventBehavior = new Map<string, BehaviorSubject<any>>()
        this.eventObserver = new Map<string, Observable<any>>()

        this.on = this.on.bind(this)
        this.emit = this.emit.bind(this)
    }

    private createEvent(eventName) {
        this.event.set(eventName, new Subject())
    }

    on(eventName: string, callback: (...args: any[]) => any): Unsubscribe {
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

    onBehavior(eventName, callback): Unsubscribe {
        let subscriber:Subscription = null
        if(this.eventBehavior.has(eventName)) {
            subscriber = this.eventBehavior.get(eventName).subscribe(callback)
        }

        return () => {
            subscriber.unsubscribe()
        }
    }

    async emitBehavior(eventName: string, ...args:any[]) {
        if(!this.eventBehavior.has(eventName)) {
            this.eventBehavior.set(eventName, new BehaviorSubject(null))
        }

        //@ts-ignore
        this.eventBehavior.get(eventName).next(...args)
    }
}

export default new Event();

