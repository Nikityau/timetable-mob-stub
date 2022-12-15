import {ClassName} from "../../../../../../../../../../../../../../ui/components/location/interface/class-name.type";

export interface INotifHeaderTab {
    className: ClassName,
    text?: string,
    isTabActive: boolean,
    onTabClick: () => void
}