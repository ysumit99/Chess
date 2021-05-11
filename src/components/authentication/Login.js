import React, { Component } from 'react';
import './Login.css';
import SignUp from './SignUp';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';


class Login extends Component {

    constructor(props) {
        super(props);


        this.state = {
            username: "",
            password: ""
        };

    }

    render() {
        return (


            <div class="loginContainer mt-5">
                <div class="container loginBox position-relative">
                    <div className="row">

                        <div className="col-12 pt-4">
                            <input type="text" name="username" class="form-control" placeholder="Username or Email" />
                        </div>

                        <div className="col-12 pt-4">
                            <input type="password" class="form-control" placeholder="password" />
                        </div>

                        <div className="col-12 pt-4 text-left">
                            <a href="#" class="forgotText ">Forgot your Password ?</a>
                        </div>

                        <div className="col-12 pt-4">
                            <button class="loginBtn btn btn-success w-100">Log In</button>
                        </div>

                        <div className="col-12 py-2 signupDiv position-absolute">
                            Don't have an account yet? <a href="#"><Link to="/signup">Create Now!</Link></a>
                        </div>
                    </div>

                </div >

                <BrowserRouter>
                    <Switch>

                        <Route path="/signup">
                            <SignUp />
                        </Route>

                    </Switch>
                </BrowserRouter>
            </div >

        );
    }
}


export default Login;
