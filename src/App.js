
import './App.css';
import ChessBoard from './components/battle/ChessBoard';
import Nav from './components/navbar/Nav';
import Login from './components/authentication/Login';
import Home from './components/authentication/Home';
import SignUp from './components/authentication/SignUp';
import firebase from "firebase";
import firebaseConfig from "./config.js";

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

function App() {


  //firebase.initializeApp(firebaseConfig);
  return (
    <div className="App">

      <BrowserRouter>

        <Nav />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/play">
            <ChessBoard />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>




        </Switch>
      </BrowserRouter>



    </div>
  );
}

export default App;
