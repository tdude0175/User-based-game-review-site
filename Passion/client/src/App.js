import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import './App.css';
import GameList from "./components/GameList";
import ReviewGame from "./components/ReviewGame";
import AddGame from "./components/AddGame";
import GamePage from "./components/GamePage";
import GameInfo from "./components/GameInfo"


class App extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                gameId: "",
            }
    }


    useGameId = (title) =>
    {
        this.setState({gameId:title});
        console.log(this.state.gameId);
    };

    render() {
        return (
            <div className="App">
                <Router>

                    <header>
                        <Link to={"/"}><h1>Games lounge</h1></Link>
                        {/*<Link to={"/YourAccount"}><h3>Account</h3></Link>*/}
                        <Link to={"/AddGame"}><h3>Add a game?</h3></Link>
                    </header>

                    <Route exact path={"/"} component={() => <GameList useGameId={this.useGameId}/>}/>
                    {/*<Route path={"/YourAccount"} component={}/>*/}
                    <Route path={"/GameReviewPage"} component={() => <ReviewGame/>}/>
                    <Route path={"/AddGame"} component={() => <AddGame/>}/>
                    <Route path={"/GameInfo"} component={()=> <GameInfo _id={this.state.gameId}/>}/>
                    <Route path={"/AddAReview"} component={()=><ReviewGame gameId={this.state.gameId}/>}/>
                </Router>


            </div>
        );
    }
}

export default App;
