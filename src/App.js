
import './App.css';
import ChessBoard from './components/battle/ChessBoard';
import Nav from './components/navbar/Nav';
import Login from './components/authentication/Login';
import Home from './components/authentication/Home';

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';





function App() {

  let url = window.location.pathname;

  return (
    <div className="App">

      <BrowserRouter>

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#"><Link to="/">Chess Master</Link></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" href="#"><Link to="/play">Play <span class="sr-only">(current)</span></Link></a>
              <a class="nav-link float-right" href="#">Learn</a>
              <a class="nav-link" href="#">Sign Up</a>
              <a class="nav-link" href="#"><Link to="/login">Login</Link></a>


            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/play">
            <ChessBoard />
          </Route>
          <Route path="/">
            <Home />
          </Route>


        </Switch>
      </BrowserRouter>

      <Nav />

    </div>
  );
}

export default App;
