import React from "react";
import "./Box.css"

function Box({value, onClick}) {
    const style = value === 'X' ? "box X" : "box O";
    
    return(
        <div className="container">
            <button className={style} onClick={onClick}>{value}</button>
        </div>
    )
};

export default Box;