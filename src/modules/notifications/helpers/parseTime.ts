
export type TimeBefore = '5m' | '15m' |
    '30m' | '1h' | '1d' |
    'unk'

export const parseTime = (time: TimeBefore): string => {
    switch (time) {
        case "5m":
            return "00:05"
        case "15m":
            return "00:15"
        case "30m":
            return "00:30"
        case "1h":
            return "01:00"
        case "1d":
            return "24:00"
        default:
            return "unk"
    }
}
export const parseTimeBack = (time: string): TimeBefore => {
    switch (time) {
        case "00:05":
            return '5m'
        case "00:15":
            return '15m'
        case "00:30":
            return '30m'
        case "01:00":
            return '1h'
        case "24:00":
            return '1d'
        default:
            return 'unk'
    }
}