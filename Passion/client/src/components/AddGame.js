import React, {Component} from "react"

export default class AddGame extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                message: ""
            }
    }


    addGameToDatabase = (e) => {
        e.preventDefault();
        fetch("/games/addGame",
            {
                method: "POST",
                headers:
                    {

                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {
                        gameArtWork: e.target.gameArtWork.value,
                        gameTitle: e.target.gameTitle.value,
                        gameReleaseDate: e.target.gameReleaseDate.value,
                        gameConsoles: e.target.gameConsole.value,
                        gameCreators: e.target.gameCreator.value,
                        gameDescription: e.target.gameDescription.value
                    }
                )
            })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.addGameToDatabase}>
                    <p><label htmlFor={"gameArtWork"}>ArtWork</label>
                        <input name={"gameArtWork"} id={"gameArtWork"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameTitle"}>Title</label>
                        <input name={"gameTitle"} id={"gameTitle"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameReleaseDate"}>Release Date</label>
                        <input name={"gameReleaseDate"} id={"gameReleaseDate"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameConsole"}>Primary Console</label>
                        <input name={"gameConsole"} id={"gameConsole"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameCreator"}>Creator</label>
                        <input name={"gameCreator"} id={"gameCreator"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameDescription"}>Description</label>
                        <input name={"gameDescription"} id={"gameDescription"} type="text"/>
                    </p>
                    <p>
                        <button>Submit</button>
                    </p>
                </form>
                {this.state.message}
            </div>
        )
    }
}