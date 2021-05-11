import React, { Component } from 'react';
import './Nav.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import chessSolid from '../../images/chess-solid.svg';


class Nav extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#"><Link to="/"><img src={chessSolid} height="50" width="50" alt="Chess Master" /></Link></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav align-items-start">
                        <a class="nav-link active" href="#"><Link to="/play">Play <span class="sr-only">(current)</span></Link></a>
                        <a class="nav-link" href="#"><Link to="/signup">Sign Up</Link></a>
                        <a class="nav-link" href="#"><Link to="/login">Login</Link></a>


                    </div>
                </div>
            </nav>
        );
    }

}

export default Nav;
