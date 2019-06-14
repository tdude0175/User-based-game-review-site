import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import './App.css';
import GameList from "./components/GameList";
import ReviewGame from "./components/ReviewGame";
import AddGame from "./components/AddGame";
import GameInfo from "./components/GameInfo"
import UserAccount from "./components/UserAccount";


class App extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                gameId: "",
                isLoggedIn: false,
                username:"",
                userId:"",
            }
    }

    loggingIn= (name,status,idToFeedUser)=>
    {
        this.setState({username:name,isLoggedIn:status,userId:idToFeedUser});
    };


    logOut = () =>
    {
        fetch("/users/logout")
            .then(this.loggingIn("",false,""))
    };

    useGameId = (title) =>
    {
        this.setState({gameId:title});
        console.log(this.state.gameId);
    };

    render() {
        if(this.state.isLoggedIn) {
            return (
                <div className="App">
                    <Router>

                        <header className={"NavBar"}>
                            <Link to={"/"}><h1>Games lounge</h1></Link>
                            {/*<Link className={"navPadding"} to={"/YourAccount"}><h3>Account</h3></Link>*/}
                            <Link className={"navPadding"} to={"/AddGame"}><h3>Add a game?</h3></Link>
                            <div>
                            <h3>Welcome {this.state.username}</h3>
                                <button onClick={this.logOut}>LogOut</button>
                            </div>
                        </header>

                        <Route exact path={"/"} component={() => <GameList redirect={this.props.redirect} useGameId={this.useGameId}/>}/>
                        <Route path={"/YourAccount"} component={() => <UserAccount loggingIn={this.loggingIn}
                                                                                   isLoggedIn={this.state.isLoggedIn}
                                                                                   username={this.state.username}/>}/>
                        <Route path={"/GameReviewPage"} component={() => <ReviewGame/>}/>
                        <Route path={"/AddGame"} component={() => <AddGame/>}/>
                        <Route path={"/GameInfo"} component={() => <GameInfo isLoggedIn={this.state.isLoggedIn}
                                                                             _id={this.state.gameId}/>}/>
                        <Route path={"/AddAReview"} component={() => <ReviewGame userId={this.state.userId}
                                                                                 isLoggedIn={this.state.isLoggedIn}
                                                                                 gameId={this.state.gameId}/>}/>
                    </Router>


                </div>
            );
        }else{
            return (
                <div className="App">
                    <Router>

                        <header className={"NavBar"}>
                            <Link to={"/"}><h1>Games lounge</h1></Link>
                            <Link className={"navPadding"} to={"/YourAccount"}><h3>Account</h3></Link>
                            {/*<Link className={"navPadding"} to={"/AddGame"}><h3>Add a game?</h3></Link>*/}
                        </header>

                        <Route exact path={"/"} component={() => <GameList useGameId={this.useGameId}/>}/>
                        <Route path={"/YourAccount"} component={() => <UserAccount loggingIn={this.loggingIn}
                                                                                   isLoggedIn={this.state.isLoggedIn}
                                                                                   username={this.state.username}/>}/>
                        <Route path={"/GameReviewPage"} component={() => <ReviewGame/>}/>
                        <Route path={"/AddGame"} component={() => <AddGame/>}/>
                        <Route path={"/GameInfo"} component={() => <GameInfo isLoggedIn={this.state.isLoggedIn}
                                                                             _id={this.state.gameId} userId={this.state.userId}/>}/>
                        <Route path={"/AddAReview"} component={() => <ReviewGame userId={this.state.userId}
                                                                                 isLoggedIn={this.state.isLoggedIn}
                                                                                 gameId={this.state.gameId}/>}/>
                    </Router>
                </div>
            )
        }
    }
}

export default App;
