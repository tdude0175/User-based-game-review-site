import React, {Component} from "react"

export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state =
            {}
    }

    logIn = (name, status, id) => {
        this.props.loggingIn(name, status, id)
    };

    logPersonIn = (e) => {
        let username = e.target.username.value;
        console.log(e.target.username.value);
        e.preventDefault();
        fetch("/users/login",
            {
                method: "POST",
                headers:
                    {

                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {
                        username: e.target.username.value,
                        password: e.target.password.value
                    }
                )
            })
            .then(data => data.json())
            .then(idnumber => this.logIn(username, true, idnumber))
    };

    createNewUser = (e) => {
        e.preventDefault();
        let username = e.target.newusername.value;
        console.log(username);
        fetch("/users/addNewUser",
            {
                method: "POST",
                headers:
                    {

                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {
                        username: e.target.newusername.value,
                        password: e.target.newpassword.value
                    }
                )
            });
        fetch("/users/login",
            {
                method: "POST",
                headers:
                    {

                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(
                    {
                        username: e.target.newusername.value,
                        password: e.target.newpassword.value
                    }
                )
            })
            .then(data => data.json())
            .then(idnumber => this.logIn(username, true, idnumber));
    };

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div>
                    <h1>welcome {this.props.username}</h1>
                </div>
            );
        } else {
            return (
                <div>

                    <form onSubmit={this.logPersonIn}>
                        <h1>Please log in</h1>
                        <p>
                            <label htmlFor={"username"}>Username:</label>
                        </p>
                        <p>
                            <input name={"username"} id={"username"} type="text" maxLength={250}/>
                        </p>
                        <p>
                            <label htmlFor={"password"}>Password:</label>
                        </p>
                        <p>
                            <input name={"password"} id={"password"} type="password" maxLength={500}/>
                        </p>
                        <button>Submit</button>
                    </form>
                    <h2>Or</h2>
                    <h1>Create an account</h1>
                    <form onSubmit={this.createNewUser}>
                        <p>
                            <label htmlFor={"newusername"}>Username:</label>
                            <input name={"newusername"} id={"newusername"} type="text" maxLength={250}/>
                        </p>
                        <p>
                            <label htmlFor={"newpassword"}>Password:</label>
                            <input name={"newpassword"} id={"newpassword"} type="password" maxLength={500}/>
                        </p>
                        <button>Submit</button>
                    </form>
                </div>
            )
        }
    }
}