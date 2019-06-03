import React, {Component} from "react"
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

export default class ReviewGame extends Component {


    render() {
        return(
            <div>
                <form >
                    <p><label htmlFor={'title'}>Title</label>
                        <input name={'title'} id={'title'} type="text"/>
                    </p>
                    <p><label htmlFor={"body"}>Body</label>
                        <input name={"body"} id={"body"} type="text"/>
                    </p>
                    <p><label htmlFor={"Rating"}>Your Rating</label>
                        <input name={"Rating"} id={"Rating"} type="number" min={0} max={5}/>
                    </p>
                    <p><button>Submit</button></p>
                </form>

            </div>
        )
    }
}