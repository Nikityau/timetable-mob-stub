import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs'
type Unsubscribe = () => void
type Handler = (...args: any[]) => any

class Event {
    private subject!: Map<string, Subject<any>>
    private observable!: Map<string, BehaviorSubject<any>>

    constructor() {
        this.subject = new Map<string, Subject<any>>()
        this.subject.set('toCurrentDate', new Subject())
        this.subject.set('toCurrentDay', new Subject())
        this.subject.set('changeDay', new Subject())

        this.observable = new Map<string, BehaviorSubject<any>>()
    }

    on(eventName, handler: Handler): Unsubscribe {
        let observer: Subscription = null

        if (this.subject.has(eventName)) {
            observer = this.subject.get(eventName).subscribe(handler)
        } else {
            this.subject.set(eventName, new Subject())
            observer = this.subject.get(eventName).subscribe(handler)

        }

        return () => {
            observer.unsubscribe()
        }
    }

    async emit(eventName, ...params: any[]) {
        await this.subject.get(eventName).next(params[0])
    }

    async pullEmit(eventName, handler) {
        await this.observable.get(eventName).subscribe(handler)
    }

    pullOn(eventName, ...params: any[]) {
        if (this.observable.has(eventName)) {
            // @ts-ignore
            this.observable.get(eventName).next(...params)
        } else {
            this.observable.set(eventName, new BehaviorSubject((subscriber) => {
                subscriber.next(...params)
            }))
        }

        return () => {
        }
    }
}

export default new Event();

