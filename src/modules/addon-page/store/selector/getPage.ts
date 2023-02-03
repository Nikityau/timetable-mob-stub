import {Page, Pages} from "../type/page";

export const getPage = (state: any): Pages => {
    return (state['page'] as Page).type
}