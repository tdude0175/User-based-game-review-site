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

    formatDate = (string) =>
    {
        let makingAString= string.toString();
        let newString = makingAString.substring(0,10);
        console.log(newString);
        let formattingString = newString.split("-");
        let dateString = formattingString.splice(1,1);
        formattingString.push(dateString);
        console.log(formattingString);
        let returnString = formattingString.reverse().join(" ");
        console.log(returnString);
        return(
            <p> Release Date: {returnString}</p>
        )
    };

    render() {
        let formattedDate = this.formatDate(this.props.game.gameInfo.gameReleaseDate);
        return (
            <div className={"GameCard"}>
                <img className={"sampleArt"} src={this.props.game.gameArtWork} alt=""/>
                <Link to={"/gameInfo"} onClick={this.sendId}><h3>{this.props.game.gameTitle}</h3></Link>
                {formattedDate}
                <p>{this.props.game.gameInfo.gameDescription.substring(0,25)}</p>
            </div>
        );
    }
}