import './Home.css';
import standardboard from '../../images/standardboard.webp';
import playLogo from '../../images/playLogo.png';
import ChessBoard from '../../components/battle/ChessBoard';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
function Login() {
    return (
        <div className="Home">
            <div class="container">
                <div className="row">

                    <div className="col-12 col-md-7 pt-4">
                        <img src={standardboard} className="chessBoard" alt="Chess Board" />
                    </div>
                    <div className="col col-lg-3 pt-5 d-flex flex-column">
                        <h1 class="header">Let your mind work!</h1>

                        <button class="d-flex text-center justify-content-center align-items-center playBtn">
                            <a><Link to="/play"><img src={playLogo} alt="" className="w-25" /> Play Chess Now!</Link></a>
                        </button>
                    </div>
                </div>
            </div>
            <BrowserRouter>
                <Switch>

                    <Route path="/play">
                        <ChessBoard />
                    </Route>



                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default Login;
