export interface ITumbler {
    type: "time" | "note"
    text: string,
    onChange: (value: boolean) => void
}