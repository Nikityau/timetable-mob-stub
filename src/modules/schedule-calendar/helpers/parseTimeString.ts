type ParsedTime = {
    start: string,
    end: string
}

export const parseTimeString = (time: string): ParsedTime => {
    if(!time || typeof time != 'string') return { start: '00:00', end: '00:00' }
    const [start, end] = time.replace(/\./g, ':').split('-')
    return {
        start,
        end
    }
}