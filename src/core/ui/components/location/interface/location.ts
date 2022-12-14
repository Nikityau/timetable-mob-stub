import {HexColor} from "./hex.type";
import {ClassName} from "./class-name.type";

export interface ILocation {
    location: string,
    color?: HexColor,
    className?: ClassName
}