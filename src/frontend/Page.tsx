import React from "react";
import Board from "./game/Board";
import './css/Page.css';
interface Props {

}

interface State {

}

export class Page extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = Page.createState(props)
    }
    static createState(props: Props): State {
        return {}
    }
    render(): JSX.Element {
        return (
            <div className="Page" >
                <p>Page</p>
                <div className="Game">
                    <p>Game</p>
                    <div className="Game-Info">
                        <p>Info</p>
                    </div>
                    <div className="Gameboard">
                        <Board></Board>
                    </div>
                </div>

            </div>
        )
    }


}

export default Page;
