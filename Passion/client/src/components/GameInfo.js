import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class ReviewGame extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                game: {},
                reviews: []
            }
    };

    componentDidMount() {
        this.gatherGameInfo();
        this.getReviews();
    }

    gatherGameInfo = () => {

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
        let reviewList = this.state.reviews.map((review) => {
            return (
                <div key={review._id}>
                    <h4>{review.title}</h4>
                    <p>{review.body}</p>
                    {review.gameReviewNumber}
                </div>
            )
        });
        return (
            <div>
                <h1>{this.state.game.gameTitle}</h1>
                <Link to={"/AddAReview"}>Write a review?</Link>
                {reviewList}
            </div>
        );
    }
}