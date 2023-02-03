import {Rings} from "../type/rings";

export const getOpenStateValue = (state:any): boolean => {
    return (state['rings'] as Rings).isOpen
}