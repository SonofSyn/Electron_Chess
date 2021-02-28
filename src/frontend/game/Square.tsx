import React from "react";
interface Props {
    content: string
    pos: string
    color: string
    onClick: (st:string)=> ()=>void
}

export let Square = (props: Props): JSX.Element => {

    let click = props.onClick(props.pos)
    if (Number.parseInt(props.pos) < 10 || Number.parseInt(props.pos) > 88) click = () => { }
    return (

        <div className={"square" + " " + props.pos + " " + props.color} id={props.pos} onClick={click} key={"square" + props.pos}>
            <h1 key={"con" + props.pos}>{props.content}</h1>
        </div>
    )
}


