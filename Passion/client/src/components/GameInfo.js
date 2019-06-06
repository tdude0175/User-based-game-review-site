import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class ReviewGame extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                game: {gameInfo: {gameReleaseDate: ""}},
                reviews: [],
            }
    };

    componentDidMount = () => {
        this.gatherGame();
        this.getReviews();
    };

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
                    {_id: this.props._id}
                )
            })
            .then(data => data.json())
            .then(transferableData => this.setState({game: transferableData}))
    };

    deleteReview = (e) => {
        fetch("/reviews/deleteReview",
            {
                method: "DELETE",
                headers:
                    {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {_id: e.target.value}
                )
            })
            .then(alert("deleted"))
            .then(this.getReviews())
    };

    getReviews = () => {
        console.log("getting reviews");
        fetch("/reviews/listReviews",
            {
                method: "POST",
                headers:
                    {

                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {gameIdReferencePiece: this.props._id}
                )
            })
            .then(data => data.json())
            .then(transferableData => this.setState({reviews: transferableData}))
    };

    formatDate = (string) => {
        let makingAString = string.toString();
        let newString = makingAString.substring(0, 10);
        console.log(newString);
        let formattingString = newString.split("-");
        let dateString = formattingString.splice(1, 1);
        formattingString.push(dateString);
        console.log(formattingString);
        let returnString = formattingString.reverse().join(" ");
        console.log(returnString);
        return (
            <p> Release Date: {returnString}</p>
        )
    };

    render() {
        let formattedDate = this.formatDate(this.state.game.gameInfo.gameReleaseDate);
        console.log(this.state.gameInfo);
        let reviewList = this.state.reviews.map((review) => {
            if (this.props.isLoggedIn) {
                return (
                    <div key={review._id} className={"ReviewDisplay"} id={review._id}>
                        <h4>{review.title}</h4>
                        <p>{review.body}</p>
                        <p>Rating: {review.gameReviewNumber}/5</p>
                        <button onClick={this.deleteReview} value={review._id}>Delete</button>
                    </div>
                )
            } else {
                return (
                    <div className={"ReviewDisplay"} key={review._id}>
                        <h4>{review.title}</h4>
                        <p>{review.body}</p>
                        <p>Rating: {review.gameReviewNumber}/5</p>
                    </div>
                )
            }
        });

        if (this.props.isLoggedIn) {
            return (
                <div className={"singleGamePage"}>
                    <img className={"gameArtwork"} src={this.state.game.gameArtWork} alt="Missing ArkWork"/>
                    <div className={"gameInfoTitle"}>
                        <h1>{this.state.game.gameTitle}</h1>
                        <Link to={"/AddAReview"}><b>Write a review?</b></Link>
                    </div>

                    <div className={"displayGameInfo"}>
                        {formattedDate}
                        <p>Consoles: {this.state.game.gameInfo.gameConsoles}</p>
                        <p>Developers: {this.state.game.gameInfo.gameCreators}</p>
                        <p>{this.state.game.gameInfo.gameDescription}</p>
                    </div>
                    {reviewList}
                </div>
            );
        } else {
            return (
                <div className={"singleGamePage"}>
                    <img className={"gameArtwork"} src={this.state.game.gameArtWork} alt="Missing ArkWork"/>
                    <h1 className={"gameInfoTitle"}>{this.state.game.gameTitle}</h1>
                    <div className={"displayGameInfo"}>
                        {formattedDate}
                        <p>Consoles: {this.state.game.gameInfo.gameConsoles}</p>
                        <p>Developers: {this.state.game.gameInfo.gameCreators}</p>
                        <p>{this.state.game.gameInfo.gameDescription}</p>
                    </div>
                    {reviewList}
                </div>
            );
        }
    }
}