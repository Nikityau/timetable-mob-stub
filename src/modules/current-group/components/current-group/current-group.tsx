import React from "react";
import {useSelector} from "react-redux";

import {getGroupFullTitle} from "../../../schedule-calendar";

const CurrentGroup = () => {

    const group = useSelector(getGroupFullTitle)

    return (
        <>
            <span> { group } </span>
        </>
    );
};

export default CurrentGroup;