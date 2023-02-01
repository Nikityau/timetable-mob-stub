export type SlideDirection = 'left' | 'right'
export type SlidePos = 'prev' | 'curr' | 'next'
export type TranslateFrom = 'future' | 'past' | 'unk'

export type DateSpecState = {
    dates: Date[][],
    dateStart: SlidePos,
}

export type DateWeeks = {
    prevWeek: Date[],
    week: Date[],
    nextWeek: Date[]
}


export type TranslateData = {
    from: DateSpecState
    to: DateSpecState,
    slideTo: number,
    isActiveIndexCurrent: boolean,
    translateFrom: TranslateFrom
}