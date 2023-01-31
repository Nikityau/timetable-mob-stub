import React, {useEffect, useState} from "react";

type HeightHocProps = {
    classNames:string[],
    component: (height: number) => React.ReactElement
}

export const HeightHoc = ({ classNames, component}: HeightHocProps) => {

    const [height, setHeight] = useState<number>(0)

    useEffect(() => {
        if(classNames.length == 0) return

        const screenHeight = window.screen.availHeight
        let elsHeight = 0

        classNames.forEach(className => {
           const el = document.querySelector(className)
           if(!el) {
                return
           }

           elsHeight += el.clientHeight
        })

        setHeight(screenHeight - elsHeight)

    }, [classNames])

    return <>
        { component(height) }
    </>
}