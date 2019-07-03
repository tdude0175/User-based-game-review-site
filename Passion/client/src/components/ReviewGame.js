import React, {Component} from "react"
import {Redirect} from "react-router-dom";
import Tooltip from 'react-tooltip-lite';
export default class ReviewGame extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                game: {gameInfo: {gameReleaseDate:""}},
                redirectstate: false
            }
    }

    componentDidMount() {
        this.gatherGame();
    }

    gatherGame = () => {

        console.log("getting the game");
        fetch("/games/getGame",
            {
                method: "POST",
                headers:
                    {

                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {_id: this.props.gameId}
                )
            })
            .then(data => data.json())
            .then(transferableData => this.setState({game: transferableData}))
    };
    saveReview = (e) => {
        console.log(this.props.gameId);
        e.preventDefault();
        console.log("Reviewing game");
        fetch("/reviews/addReview",
            {
                method: "POST",
                headers:
                    {

                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {
                        gameIdReferencePiece: this.props.gameId,
                        title: e.target.title.value,
                        body: e.target.body.value,
                        creatorIdReferencePiece: this.props.userId,
                        gameReviewNumber: e.target.gameRating.value,
                    }
                )
            })
            .then(this.setState({redirectstate:true}))

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
        if(this.state.redirectstate)
        {
            return(<Redirect to={"/GameInfo"}/>)
        }
        let formattedDate = this.formatDate(this.state.game.gameInfo.gameReleaseDate);
        return (
            <div className={"ReviewGamePage"}>
                <img className={"reviewGameArtwork"} src={this.state.game.gameArtWork} alt=""/>
                <div className={"reviewGameInfo"}>
                    {formattedDate}
                    <p> Consoles: {this.state.game.gameInfo.gameConsoles}</p>
                    <p> Developers: {this.state.game.gameInfo.gameCreators}</p>
                    <p>{this.state.game.gameInfo.gameDescription}</p>
                </div>
                <form className={"ReviewForm"} onSubmit={this.saveReview}>
                    <h1 className={"reviewGameTitle"}>{this.state.game.gameTitle}</h1>
                    <p>
                        <label htmlFor={'title'}>Title: </label>
                    </p>
                    <p>
                        <input name={'title'} id={'title'} type="text" max={250}/>
                    </p>
                    <p>
                        <textarea name={"body"} id={"body"} placeholder={"What did you think?"}rows={5} cols={50} maxLength={5000}/>
                    </p>
                    <p><label htmlFor={"gameRating"}>Your Rating:</label>
                        <Tooltip content={" from 0-5"}>
                        <input name={"gameRating"} id={"gameRating"}  type="number" min={0} max={5}/>
                        </Tooltip>
                    </p>
                    <p>
                        <button>Submit</button>
                    </p>
                </form>
            </div>
        )
    }
}