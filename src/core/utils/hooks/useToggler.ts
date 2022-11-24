import {useState} from "react";

type toggleRet = [
    state: boolean,
    cb: {
        on: () => void, off: () => void, toggle: () => void
    }
]

export const useToggler = (defState: boolean = false): toggleRet => {
    const [state, setState] = useState(defState)

    const on = () => setState(true)
    const off = () => setState(false)
    const toggle = () => setState(prev => !prev)

    return [
        state,
        {
            on,
            off,
            toggle
        }
    ]
}