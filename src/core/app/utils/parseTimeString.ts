export const parseTimeString = (time:string): { startTime:string, endTime:string } => {
    if(!time) return { startTime: '00:00', endTime: '00:00' }
    const [start, end] = time.replace(/\./g, ':').split('-')
    return {
        startTime: start,
        endTime: end
    }
}