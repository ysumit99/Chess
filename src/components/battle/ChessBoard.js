import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChessBoard.css';
import initialBoard from './initialBoard';
import startPlay from '../../images/startPlay.svg';
import restartGame from '../../images/restartGame.svg';
import BishopBlack from '../../images/bishop-black.svg';
import BishopWhite from '../../images/bishop-white.svg';
import KingBlack from '../../images/king-black.svg';
import KingWhite from '../../images/king-white.svg';
import KnightBlack from '../../images/knight-black.svg';
import KnightWhite from '../../images/knight-white.svg';
import PawnBlack from '../../images/pawn-black.svg';
import PawnWhite from '../../images/pawn-white.svg';
import QueenBlack from '../../images/queen-black.svg';
import QueenWhite from '../../images/queen-white.svg';
import RookBlack from '../../images/rook-black.svg';
import RookWhite from '../../images/rook-white.svg';


class ChessBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            board: initialBoard
        };
        this.startGame = this.startGame.bind(this);
        console.log(this.state.board);
    }


    startGame() {
        console.log(this.state.board);
        document.querySelector('#boardContainer').style.filter = "none";


    }

    render() {
        return (
            <div className="container-fluid" id="mainContainer">
                <div className="row no-gutters my-2 my-lg-4">

                    {/* Game Controls */}
                    <div className="col-12 col-lg-1" id="gameControls">


                        <img
                            src={startPlay}
                            alt="startGame"
                            id="startButton"
                            className="gameControl mx-3 my-2 my-lg-4"
                            onClick={this.startGame}
                        />



                        <img
                            src={restartGame}
                            id="restartButton"
                            className="gameControl mx-3 my-2 my-lg-4"
                            alt="restartGame"
                        />

                    </div>

                    {/* Board and Score */}

                    <div className="col-12 col-lg-10">

                        {/*  Chess Board */}
                        <div id="chessBoard">
                            <div id="boardContainer">

                                {
                                    this.state.board.map((tile) => {

                                        let id = tile.id;
                                        let color = tile.blockColor === "W" ? "white" : "black";
                                        let piece = tile.piece;
                                        let pieceClass = "XX";
                                        switch (piece) {
                                            case "WP":
                                                pieceClass = PawnWhite;
                                                break;
                                            case "BP":
                                                pieceClass = PawnBlack;
                                                break;
                                            case "WR":
                                                pieceClass = RookWhite;
                                                break;
                                            case "BR":
                                                pieceClass = RookBlack;
                                                break;
                                            case "WN":
                                                pieceClass = KnightWhite;
                                                break;
                                            case "BN":
                                                pieceClass = KnightBlack;
                                                break;
                                            case "WB":
                                                pieceClass = BishopWhite;
                                                break;
                                            case "BB":
                                                pieceClass = BishopBlack;
                                                break;
                                            case "WK":
                                                pieceClass = KingWhite;
                                                break;
                                            case "BK":
                                                pieceClass = KingBlack;
                                                break;
                                            case "WQ":
                                                pieceClass = QueenWhite;
                                                break;
                                            case "BQ":
                                                pieceClass = QueenBlack;
                                                break;
                                            default:
                                                pieceClass = "XX";

                                        }

                                        return (<div className={`block ${color}`} id={id} key={id}>
                                            {!(piece === "XX") ? <img src={pieceClass} alt="" /> : ""}
                                        </div>);
                                    })
                                }

                            </div>
                        </div>

                        {/* Timer and Score */}
                        <div className="row my-4">

                            {/* Move History */}
                            <div className="col-6">
                                {/* Move History*/}
                                <div className="card" id="moveContainer">
                                    <div className="card-header">
                                        Move History
                                    </div>
                                    <div className="card-body">
                                        <div id="history-container"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Score */}
                            <div className="col-6">
                                <div className="card" id="scoreContainer">
                                    <div className="card-header">
                                        Score
                                    </div>

                                    <div className="card-body" id="score"></div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div >
        );
    }


}

export default ChessBoard;