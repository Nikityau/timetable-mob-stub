import store from "../../../../../redux/store/store";


export class NotifyController {
    save() {
        /*const currentFormat = this.getCurrentFormat()
        console.log(currentFormat)*/
    }



    createState(format: string) {

    }

    getCurrentFormat():string {
        const notify = store.getState().notifications

        if(!notify.isNotifyOpen) return ""

        const weekType = notify.inputData.week_type == "обе недели"
            ? 0
            : notify.inputData.week_type == "над чертой"
                ? 1
                : -1

        return `${notify.inputData.week_day}:${notify.inputData.lesson_number}:${weekType}`
    }

    onCreateCheck(format: string):boolean {
        return false
    }

    notification(addRemove: boolean) {

    }
    setTimeNotification(time: string) {

    }
    repeatNotification(isRepeat: boolean) {

    }

    addNote(note: string) {

    }
    note(addRemove: boolean) {

    }
    noteRemind(isRemind: boolean) {

    }
}