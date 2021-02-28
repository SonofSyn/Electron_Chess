
import React from 'react';
import './css/App.css';
import Page from './Page';
import ReactDOM from 'react-dom'


interface Props {

}

interface State {

}

export class MainAppWindow extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = MainAppWindow.createState(props)
    }
    static createState(props: Props): State {
        return {}
    }
    render(): JSX.Element {
        return (
            <div className="App">
          <Page></Page>
          </div>
        )
    }


}

ReactDOM.render(<MainAppWindow/>,document.getElementById("root"))
