import React, {Component} from "react"

export default class ReviewGame extends Component {
    constructor(props) {
        super(props);
        this.state=
            {
                game:{gameInfo:{}},
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
            .then(transferableData => this.setState({game:transferableData}))
    };
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
            <div className={"ReviewGamePage"}>
                <img className={"reviewGameArtwork"} src={this.state.game.gameArtWork} alt="Missing Picture"/>
                <div className={"reviewGameInfo"}>
                    <h2>{this.state.game.gameTitle}</h2>
                    <p>Release Date: {this.state.game.gameInfo.gameReleaseDate}</p>
                    <p> Consoles: {this.state.game.gameInfo.gameConsoles}</p>
                    <p> Developers: {this.state.game.gameInfo.gameCreators}</p>
                    <p>{this.state.game.gameInfo.gameDescription}</p>
                </div>
                <form className={"ReviewForm"} onSubmit={this.saveReview}>
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