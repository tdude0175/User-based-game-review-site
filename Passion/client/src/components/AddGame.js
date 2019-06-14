import React, {Component} from "react"
import {Redirect} from "react-router-dom";
export default class AddGame extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                message: "",
                redirect: false
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
            .then(this.setState({redirectstate:true}))
    };

    render() {
        if(this.state.redirectstate)
        {
            return(<Redirect to={"/"} redirect={true}/>)
        }
        return (
            <div>
                <form className={"gameForm"} onSubmit={this.addGameToDatabase}>
                    <p><label htmlFor={"gameArtWork"}>ArtWork: </label>
                    </p>
                    <p>
                        <input name={"gameArtWork"} id={"gameArtWork"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameTitle"}>Title: </label>
                    </p>
                    <p>
                        <input name={"gameTitle"} id={"gameTitle"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameReleaseDate"}>Release Date: </label>
                    </p>
                    <p>
                        <input name={"gameReleaseDate"} id={"gameReleaseDate"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameConsole"}>Primary Console: </label>
                    </p>
                    <p>
                        <input name={"gameConsole"} id={"gameConsole"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameCreator"}>Creator: </label></p>
                    <p>
                        <input name={"gameCreator"} id={"gameCreator"} type="text"/>
                    </p>
                    <p><label htmlFor={"gameDescription"}>Description: </label>
                    </p>
                    <p>
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