import React from "react";
import Board from "./game/Board";
import './css/Page.css';
import { Game } from "./interface";
interface Props {
    game: Game
}

interface State {
    game: Game
}

export class Page extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = Page.createState(props)
    }
    static createState(props: Props): State {
        return { game: props.game }
    }

    static getDerivedStateFromProps(props: Props, state: State): State | null {
        if (state.game.turn === props.game.turn) return null
        return Page.createState(props)
    }

    render(): JSX.Element {
        return (
            <div className="Page" >
                <p>Page</p>
                <div className="Game">
                    <p>Game</p>
                    <div className="Game-Info">
                        <p>Info Zug: {this.state.game.turn+1}</p>
                    </div>
                    <div className="Gameboard">
                        <Board board={this.state.game.gameBoard} turn={this.state.game.turn}></Board>
                    </div>
                </div>

            </div>
        )
    }


}

export default Page;
