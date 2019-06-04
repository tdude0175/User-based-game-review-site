import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class ReviewGame extends Component {
    constructor(props) {
        super(props);
        this.state=
            {
                game: {},
            }
    };

    sendId = (e) =>
    {
        this.props.useGameId(this.props.game._id);
    };

    render() {
        return (
            <div>
                <img src={this.props.game.gameArtWork} alt="Missing Picture"/>
                <Link to={"/gameInfo"} onClick={this.sendId}><h3>{this.props.game.gameTitle}</h3></Link>
                {this.props.game.gameInfo.gameReleaseDate}
                {this.props.game.gameInfo.gameDescription.substring(0,25)}
            </div>
        );
    }
}