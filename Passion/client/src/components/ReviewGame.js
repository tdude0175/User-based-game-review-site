import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class ReviewGame extends Component {
    constructor(props) {
        super(props);
    }

    saveReview = (e)=>
    {
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
                        body:e.target.body.value,
                        creatorIdReferencePiece:this.props.userId,
                        gameReviewNumber: e.target.gameRating.value,
                    }
                )
            })
    };

    render() {
        return(
            <div>
                <form onSubmit={this.saveReview}>
                    <p><label htmlFor={'title'}>Title</label>
                        <input name={'title'} id={'title'} type="text"/>
                    </p>
                    <p><label htmlFor={"body"}>Body</label>
                        <input name={"body"} id={"body"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameRating"}>Your Rating</label>
                        <input name={"gameRating"} id={"gameRating"} type="number" min={0} max={5}/>
                    </p>
                    <p><button>Submit</button></p>
                </form>

            </div>
        )
    }
}