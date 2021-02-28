import React from "react";
import { startSet } from "./const";
import '../css/Board.css';
import '../css/Square.css';
import { Square } from "./Square";
interface Props {

}

interface State {

}

export class Board extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = Board.createState(props)
    }
    static createState(props: Props): State {
        return {}
    }
    onClick = (st: string) => {
        return (
            () => console.log("Hallo hier ist " + st)
        )
    }
    renderSquare = (content: string, pos: string, color: string): JSX.Element => {
        return (
            <Square content={content} pos={pos} color={color} onClick={this.onClick} />
        )
    }
    createBoard = (): JSX.Element[] => {
        let board: JSX.Element[] = []
        let start: number | undefined
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
                    if (y === 1 || y === 8) rows.push(this.renderSquare(startSet[0][x - 1], x + "" + y, color))
                    else if (y === 2 || y === 7) rows.push(this.renderSquare(startSet[1][x - 1], x + "" + y, color))
                    else rows.push(this.renderSquare(" ", x + "" + y, color))

                }

            }
            start = start + 8
            board.push(<div className="board-row" key={y}>
                {rows}
            </div>)
        }
        board.reverse()
        return board
    }

    render(): JSX.Element {
        return (
            <div className="board">
                {this.createBoard()}
            </div>
        )
    }


}

export default Board;
