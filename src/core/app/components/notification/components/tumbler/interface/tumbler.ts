export interface ITumbler {
    value: boolean
    type: "time" | "note"
    text: string,
    onChange: (value: boolean) => void
}