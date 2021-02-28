
import React from 'react';
import './css/App.css';
import Page from './Page';
import ReactDOM from 'react-dom'
import { ipcRenderer } from 'electron';
import { Game } from './interface';


interface Props {

}

interface State {
    game: Game
}

export class MainAppWindow extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = MainAppWindow.createState(props)
    }
    static createState(props: Props): State {
        return {
            game: {
                gameId: "",
                turn: -1,
                winner: "",
                gameBoard: {},
                history: { movementLog: [], beatenLog: { white: [], black: [] } }
            }
        }
    }

    componentDidMount() {
        ipcRenderer.send('start-up', 'ready')
        ipcRenderer.on('start-up-reply', (event, arg: Game) => {
            this.setGame(arg)
        })
    }

    setGame(game: Game) {
        this.setState({
            game: {
                gameId: game.gameId,
                turn: game.turn,
                winner: game.winner,
                gameBoard: game.gameBoard,
                history: game.history
            }
        })
    }
    render(): JSX.Element {
        return (
            <div className="App">
                <Page game={this.state.game}></Page>
            </div>
        )
    }


}

ReactDOM.render(<MainAppWindow />, document.getElementById("root"))
