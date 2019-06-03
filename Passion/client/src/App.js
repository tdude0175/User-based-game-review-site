import React from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import './App.css';
import GameList from "./components/GameList";
import ReviewGame from "./components/ReviewGame";
import AddGame from "./components/AddGame";
import GamePage from "./components/GamePage";


function App() {
    return (
        <div className="App">
            <Router>

                <header>
                    <Link to={"/"}><h1>Games lounge</h1></Link>
                    {/*<Link to={"/YourAccount"}><h3>Account</h3></Link>*/}
                    <Link to={"/AddGame"}><h3>Add a game?</h3></Link>
                </header>

                <Route exact path={"/"} component={() => <GameList/>}/>
                {/*<Route path={"/YourAccount"} component={}/>*/}
                <Route path={"/GameReviewPage"} component={() => <ReviewGame/>}/>
                <Route path={"/AddGame"} component={() => <AddGame/>}/>
                <Route path = "/gamePage" component={()=> <GamePage/>}/>
            </Router>


        </div>
    );
}

export default App;
