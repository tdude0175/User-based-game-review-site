import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

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
                 <div>
                     <img src={game.gameArtWork} alt="Missing ArtWork"/>
                     <h3>{game.gameTitle}</h3>
                     <p>{game.gameInfo.gameReleaseDate}</p>
                     <p>{game.gameInfo.gameDescription}</p>
                 </div>
             )
            }
        );
        return (
            <div>
                <h1>Showin games off</h1>
                {gamesList}
            </div>
        );
    }
}