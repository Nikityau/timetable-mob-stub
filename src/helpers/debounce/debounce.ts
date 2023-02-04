export function debounce(cb, timer) {
    let tId = null

    return (...args: any[]) => {
        if(tId) {
            clearTimeout(tId)
            tId = setTimeout(() => {
                cb(...args)
                tId = null
            }, timer)

            return
        }

        tId = setTimeout(() => {
            cb(...args)
            tId = null
        }, timer)
    }
}