import React from "react";
import Bauer from './../content/pieces/white/Bauer.jpg'
interface Props {
    content: string
    pos: string
    color: string
    highlight: boolean
    onClick: (st: string) => () => void
}

export let Square = (props: Props): JSX.Element => {
    let path = './src/frontend/content/pieces/' + (props.color === "Schwarz" ? "black/" : "white/") + props.content + ".jpg"
    let element: JSX.Element = props.content === "Bauer" || props.content === "Turm" || props.content === "Springer"|| props.content === "Laeufer" || props.content === "Koenigin" || props.content === "Koenig" ? <img src={path}></img> : <h1 key={"con" + props.pos}>{props.content}</h1>
    return (

        <div className={"square" + " " + props.pos + " " + (props.highlight ? "green" : props.color)} id={props.pos} onClick={props.onClick(props.pos)} key={"square" + props.pos}>
            {props.content !== "" ? <h1 key={"con" + props.pos}>{props.content}</h1> : ""}
        </div>
    )
}


