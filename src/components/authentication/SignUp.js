import React, { Component } from 'react';
import './SignUp.css';
import Login from './Login';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
class SignUp extends Component {

    constructor(props) {
        super(props);


        this.state = {
            username: "",
            password: ""
        };

    }

    render() {
        return (

            <div class="signupContainer mt-5">
                <div class="container signupBox position-relative">
                    <div className="row">

                        <div className="col-12 pt-4">
                            <input type="text" name="username" class="form-control" placeholder="Username" />
                        </div>

                        <div className="col-12 pt-4">
                            <input type="text" name="email" class="form-control" placeholder="Email" />
                        </div>

                        <div className="col-12 pt-4">
                            <input type="password" class="form-control" placeholder="Password" />
                        </div>

                        <div className="col-12 pt-4">
                            <input type="password" class="form-control" placeholder="Confirm Password" />
                        </div>




                        <div className="col-12 pt-4">
                            <button class="signupBtn btn btn-success w-100">Sign Up</button>
                        </div>

                        <div className="col-12 py-2 loginDiv position-absolute">
                            Already have an account ? <a href="#"><Link to="/login">Login Now!</Link></a>
                        </div>
                    </div>

                </div >

                <BrowserRouter>
                    <Switch>

                        <Route path="/login">
                            <Login />
                        </Route>

                    </Switch>
                </BrowserRouter>
            </div >



        );
    }
}


export default SignUp;
