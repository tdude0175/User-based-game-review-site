import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state=
            {

            }
    }

    logIn = (name,status,id)=>
    {
        this.props.loggingIn(name,status,id)
    };

    logPersonIn = (e) =>
    {
        let username = e.target.username.value;
        console.log(e.target.username.value);
        e.preventDefault();
        fetch("/users/login",
            {
                method:"POST",
                headers:
                    {

                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {
                        username:e.target.username.value,
                        password:e.target.password.value
                    }
                )
            })
            .then(data => data.json())
            .then(idnumber => this.logIn(username,true,idnumber))
    };

    render() {
        if(this.props.isLoggedIn) {
            return (
                <div>
                    welcome {this.props.username}
                </div>
            );
        }
        else
            {
                return (
                    <div>
                        Please log in
                        <form onSubmit={this.logPersonIn}>
                            <p>
                                <label htmlFor={"username"}>Username:</label>
                                <input name={"username"} id={"username"} type="text"/>
                            </p>
                            <p>
                                <label htmlFor={"password"}>Password:</label>
                                <input name={"password"} id={"password"} type="password"/>
                            </p>
                            <button>Submit</button>
                        </form>
                    </div>
                )
            }
    }
}