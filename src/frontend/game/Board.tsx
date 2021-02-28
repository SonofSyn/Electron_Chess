import React from "react";
import '../css/Board.css';
import '../css/Square.css';
import { Square } from "./Square";
import { BoardHash, Position } from "../interface";
import { ipcRenderer } from "electron";
interface Props {
    turn: number,
    board: BoardHash,
}

interface State {
    turn: number,
    board: BoardHash,
    possibleMoves: Position[],
    currentPos: string
}

export class Board extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = Board.createState(props)
    }
    static createState(props: Props): State {
        return {
            turn: props.turn,
            board: props.board,
            possibleMoves: [],
            currentPos: ""
        }
    }
    componentDidMount() {
        ipcRenderer.on('tryMove-reply', (event, arg: Position[]) => {
            this.setState({ possibleMoves: arg })
        })
    }
    static getDerivedStateFromProps(props: Props, state: State): State | null {
        if (state.turn === props.turn) return null
        return Board.createState(props)
    }
    onClick = (st: string) => {
        let makeMoveFlag: boolean = false
        let turnPlayer = (this.state.turn % 2 === 0 ? "weiss" : "schwarz")
        if (Number.parseInt(st) < 10 || Number.parseInt(st) > 88) return () => { }
        if (this.state.board[st] !== undefined) {
            if (turnPlayer !== this.state.board[st].player) {
                if (this.state.possibleMoves !== []) {
                    this.state.possibleMoves.forEach(move => {
                        if (st === move.x + "" + move.y) {
                            makeMoveFlag = true
                        }
                    })
                } else return () => { }
                if (!makeMoveFlag) return () => { }
            }

        }
        return (
            () => {
                if (makeMoveFlag) ipcRenderer.send('makeMove', [this.state.currentPos, st])
                else {
                    this.setState({ currentPos: st })
                    ipcRenderer.send('tryMove', st)
                }
            }
        )
    }
    renderSquare = (content: string, pos: string, color: string): JSX.Element => {
        let highlightFlag = false
        if (this.state.possibleMoves !== []) {
            this.state.possibleMoves.forEach(move => {
                if (pos === move.x + "" + move.y) highlightFlag = true
            })
        }
        return (
            <Square content={content} pos={pos} color={color} onClick={this.onClick} key={pos + content} highlight={highlightFlag} />
        )
    }
    createBoard = (): JSX.Element[] => {
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
