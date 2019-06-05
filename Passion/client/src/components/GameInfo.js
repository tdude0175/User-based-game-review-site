import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class ReviewGame extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                game: {gameInfo:{}},
                reviews: [],
                gameInfo:{}
            }
    };

    componentDidMount=()=> {
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
            .then(transferableData => this.setState({game:transferableData}))
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

    render() {
        console.log(this.state.gameInfo);
        let reviewList = this.state.reviews.map((review) => {
            return (
                <div className={"ReviewDisplay"} key={review._id}>
                    <h4>{review.title}</h4>
                    <p>{review.body}</p>
                    {review.gameReviewNumber}
                </div>
            )
        });

        if (this.props.isLoggedIn) {
            return (<div className={"singleGamePage"}>
                    <img className={"gameArtwork"} src={this.state.game.gameArtWork} alt="Missing ArkWork"/>
                    <h1 className={"gameInfoTitle"}>{this.state.game.gameTitle}</h1>
                    <div className={"displayGameInfo"}>
                        <p>Release Date: {this.state.game.gameInfo.gameReleaseDate}</p>
                        <p>Consoles: {this.state.game.gameInfo.gameConsoles}</p>
                        <p>Developers: {this.state.game.gameInfo.gameCreators}</p>
                        <p>{this.state.game.gameInfo.gameDescription}</p>
                    </div>
                    <Link to={"/AddAReview"}>Write a review?</Link>
                    {reviewList}
                </div>
            );
        } else {
            return (
                <div className={"singleGamePage"}>
                    <img className={"gameArtwork"} src={this.state.game.gameArtWork} alt="Missing ArkWork"/>
                    <h1 className={"gameInfoTitle"}>{this.state.game.gameTitle}</h1>
                    <div className={"displayGameInfo"}>
                        <p>Release Date: {this.state.game.gameInfo.gameReleaseDate}</p>
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