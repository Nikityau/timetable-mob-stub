import {Observable, Subject, Subscription} from 'rxjs'

type Handler = (...args: any[]) => any
type Params = any[]

export class CalendarObserver {
    private subject!: Map<string, Subject<any>>
    private observable!: Map<string, Observable<any>>

    constructor() {
        this.subject = new Map<string, Subject<any>>()
        this.subject.set('toCurrentDate', new Subject())
        this.subject.set('toCurrentDay', new Subject())
        this.subject.set('changeDay', new Subject())

        this.observable = new Map<string, Observable<any>>()
    }

    on(eventName, handler: Handler) {
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

        } else {
            this.observable.set(eventName, new Observable((subscriber) => {
                for (let param of params) {
                    subscriber.next(param)
                }

                subscriber.complete()
            }))
        }

        return () => {
        }
    }
}