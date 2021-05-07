
import './App.css';
import ChessBoard from './components/battle/ChessBoard';
import Nav from './components/navbar/Nav';
import Login from './components/authentication/Login';
import Home from './components/authentication/Home';

import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

function App() {



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
          <Route path="/">
            <Home />
          </Route>


        </Switch>
      </BrowserRouter>



    </div>
  );
}

export default App;
