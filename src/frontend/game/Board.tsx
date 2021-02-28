import React from "react";
import '../css/Board.css';
import '../css/Square.css';
import { Square } from "./Square";
import { BoardHash } from "../interface";
interface Props {
    turn: number,
    board: BoardHash
}

interface State {
    turn: number
    board: BoardHash
}

export class Board extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = Board.createState(props)
    }
    static createState(props: Props): State {
        return {
            turn: props.turn,
            board: props.board
        }
    }

    static getDerivedStateFromProps(props: Props, state: State): State | null {
        if (state.turn === props.turn) return null
        return Board.createState(props)
    }
    onClick = (st: string) => {
        return (
            () => {
                console.log("Hallo hier ist " + st)
            }
        )
    }
    renderSquare = (content: string, pos: string, color: string): JSX.Element => {
        return (
            <Square content={content} pos={pos} color={color} onClick={this.onClick} key={pos + content} />
        )
    }
    createBoard = (): JSX.Element[] => {
        console.log(this.state.board)
        let board: JSX.Element[] = []
        let start: number | undefined
        if (this.state.board === undefined) return (board)
        for (let y = 0; y < 10; y++) {

            let rows: JSX.Element[] = []
            if (start === undefined) start = 0
            for (let x = 0; x < 10; x++) {
                let color = ""
                if (y === 0 || y === 9) {
                    if (x === 0 || x === 9) rows.push(this.renderSquare(" ", x + "" + y, "axis"))
                    else rows.push(this.renderSquare(String.fromCharCode(64 + x), x + "" + y, "axis"))
                }
                else if (x === 0 || x === 9) rows.push(this.renderSquare(y + "", x + "" + y, "axis"))
                else {
                    if (y % 2 === 1) color = x % 2 === 1 ? "black" : "white"
                    else color = x % 2 === 1 ? "white" : "black"
                    if (this.state.board[x + "" + y] === undefined) this.renderSquare(" ", x + "" + y, color)
                    else rows.push(this.renderSquare(this.state.board[x + "" + y].content, x + "" + y, color))
                }

            }
            start = start + 8
            board.push(<div className="board-row" key={"row" + y}>
                {rows}
            </div>)
        }
        board.reverse()
        return board
    }

    render(): JSX.Element {
        return (
            <div className="board" key="board">
                {this.createBoard()}
            </div>
        )
    }


}

export default Board;
