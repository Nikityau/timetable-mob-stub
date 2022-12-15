export interface INotifSwitcher {
    text: string,
    type: 'clock' | 'note',
    onSwitchChange: (...args) => void
}