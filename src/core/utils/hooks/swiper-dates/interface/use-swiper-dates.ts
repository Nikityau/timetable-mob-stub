import {Swiper as SwiperType} from "swiper";
import React from "react";

export type UseSwiperDates = [ state: UseSwiperState, methods: UseSwiperMethods ]

export interface UseSwiperState {
    weeksDates: Date[][],
    swiper:SwiperType
}
export interface UseSwiperMethods {
    onSlideChange: (swiper: SwiperType) => void,
    onSwiperInit: (swiper: SwiperType) => void,
    onSlideClick: (e:React.MouseEvent) => void,
}