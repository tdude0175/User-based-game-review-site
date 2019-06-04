import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import GamePage from "./GamePage";

export default class GameList extends Component {

    constructor(props) {
        super(props);
        this.state=
            {
                games:[],
            }

    }
    componentDidMount() {
        this.getGamesToDisplay();
    }

    getGamesToDisplay = () =>
    {
        console.log("Getting the games");
        fetch("/games/GameList")
            .then(data => data.json())
            .then(dataMadePreety => this.setState({games:dataMadePreety}))
    };
    render() {
        let gamesList = this.state.games.map((game)=>
            {
             return(
                 <div key={game._id}>
                     <GamePage game={game} useGameId={this.props.useGameId}/>
                 </div>
             )
            }
        );
        return (
            <div>
               {gamesList}
            </div>
        );
    }
}