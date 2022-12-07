export const parseTimeString = (time:string): { startTime:string, endTime:string } => {
    const [start, end] = time.replace(/\./g, ':').split('-')
    return {
        startTime: start,
        endTime: end
    }
}