import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import './ChessBoard.css';

import crownSolid from '../../images/crown-solid.svg';
import startPlay from '../../images/startPlay.svg';
import restartGame from '../../images/restartGame.svg';
import chessBishopBlack from '../../images/chess-bishop-black.svg';
import chessBishopWhite from '../../images/chess-bishop-white.svg';
import chessKingBlack from '../../images/chess-king-black.svg';
import chessKingWhite from '../../images/chess-king-white.svg';
import chessKnightBlack from '../../images/chess-knight-black.svg';
import chessKnightWhite from '../../images/chess-knight-white.svg';
import chessPawnBlack from '../../images/chess-pawn-black.svg';
import chessPawnWhite from '../../images/chess-pawn-white.svg';
import chessQueenBlack from '../../images/chess-queen-black.svg';
import chessQueenWhite from '../../images/chess-queen-white.svg';
import chessRookBlack from '../../images/chess-rook-black.svg';
import chessRookWhite from '../../images/chess-rook-white.svg';

//import chessSolid from '../../images/chess-solid.svg';

class ChessBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.startGame = this.startGame.bind(this);
        //this.closeModal = this.closeModal.bind(this);
    }


    startGame() {
        console.log('test');
        document.querySelector('#boardContainer').style.filter = "none";

        //Cconfirm Game Modal Logic is pending
        // document.querySelector('#confirmStartGame').classList.remove("hidden");

        // document.querySelector('#confirmStartGame').addEventListener('click', function (e) {

        //     //hide confirm start modal
        //     //document.querySelector('#confirmStartGame').style.display = "none";

        //     //reveal the board by removing the blur




        // });
    }

    render() {
        return (
            <div className="container">
                <div className="row" id="mainContainer">
                    {/* Modal for Game Controls */}

                    <div
                        className="modal fade"
                        id="confirmStartGame"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"

                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <span>
                                        <img
                                            id="crownLogo"
                                            src={crownSolid}
                                            alt="chess crown"
                                        />
                                    </span>
                                    <h5 className="modal-title" id="confirmStartGameTitle">
                                        Ready to Battle ?
                </h5>

                +
              </div>

                                <div className="modal-body">
                                    <div className="row">
                                        <button
                                            id="confirmStartButton"
                                            type="button"
                                            className="btn btn-info offset-2 col-3"
                                        >
                                            Start Game!
                  </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary offset-1 col-3"
                                            data-dismiss="modal"
                                        >
                                            Cancel
                  </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* End of Modal for Game Controls */}
                    {/* <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
          </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
          </Button>
                        </Modal.Footer>
                    </Modal> */}

                    {/* Game Controls */}
                    <div className="col-1" id="gameControls">
                        <div id="startGame" className="startGame">
                            <img
                                src={startPlay}
                                alt="startGame"
                                id="startButton"
                                className="gameControl"
                                onClick={this.startGame}
                            />
                        </div>

                        <div id="restartGame">
                            <a href="/"
                            ><img
                                    src={restartGame}
                                    id="restartButton"
                                    className="gameControl"
                                    alt="restartGame"
                                /></a>
                        </div>

                    </div>

                    {/* Board and Score */}

                    <div className="col-10 left-partition">
                        <div className="table-div">
                            {/*  Chess Board */}
                            <div id="boardContainer">
                                <div id="row1">
                                    <div className="white block" id="a8">
                                        <img src={chessRookBlack} />
                                    </div>

                                    <div className="black block" id="b8">
                                        <img src={chessKnightBlack} alt="" />
                                    </div>

                                    <div className="white block" id="c8">
                                        <img src={chessBishopBlack} alt="" />
                                    </div>

                                    <div className="black block" id="d8">
                                        <img src={chessQueenBlack} alt="" />
                                    </div>

                                    <div className="white block" id="e8">
                                        <img src={chessKingBlack} alt="" />
                                    </div>

                                    <div className="black block" id="f8">
                                        <img src={chessBishopBlack} alt="" />
                                    </div>

                                    <div className="white block" id="g8">
                                        <img src={chessKnightBlack} alt="" />
                                    </div>

                                    <div className="black block" id="h8">
                                        <img src={chessRookBlack} alt="" />
                                    </div>
                                </div>

                                <div id="row2">
                                    <div className="black block" id="a7">
                                        <img src={chessPawnBlack} alt="" />
                                    </div>

                                    <div className="white block" id="b7">
                                        <img src={chessPawnBlack} alt="" />
                                    </div>

                                    <div className="black block" id="c7">
                                        <img src={chessPawnBlack} alt="" />
                                    </div>

                                    <div className="white block" id="d7">
                                        <img src={chessPawnBlack} alt="" />
                                    </div>

                                    <div className="black block" id="e7">
                                        <img src={chessPawnBlack} alt="" />
                                    </div>

                                    <div className="white block" id="f7">
                                        <img src={chessPawnBlack} alt="" />
                                    </div>

                                    <div className="black block" id="g7">
                                        <img src={chessPawnBlack} alt="" />
                                    </div>

                                    <div className="white block" id="h7">
                                        <img src={chessPawnBlack} />
                                    </div>
                                </div>

                                <div id="row3">

                                    <div className="white block" id="a6"></div>
                                    <div className="black block" id="b6"></div>
                                    <div className="white block" id="c6"></div>
                                    <div className="black block" id="d6"></div>
                                    <div className="white block" id="e6"></div>
                                    <div className="black block" id="f6"></div>
                                    <div className="white block" id="g6"></div>
                                    <div className="black block" id="h6"></div>

                                </div>

                                <div id="row4">

                                    <div className="black block" id="a5"></div>
                                    <div className="white block" id="b5"></div>
                                    <div className="black block" id="c5"></div>
                                    <div className="white block" id="d5"></div>
                                    <div className="black block" id="e5"></div>
                                    <div className="white block" id="f5"></div>
                                    <div className="black block" id="g5"></div>
                                    <div className="white block" id="h5"></div>

                                </div>

                                <div id="row5">

                                    <div className="white block" id="a4"></div>
                                    <div className="black block" id="b4"></div>
                                    <div className="white block" id="c4"></div>
                                    <div className="black block" id="d4"></div>
                                    <div className="white block" id="e4"></div>
                                    <div className="black block" id="f4"></div>
                                    <div className="white block" id="g4"></div>
                                    <div className="black block" id="h4"></div>

                                </div>

                                <div id="row6">

                                    <div className="black block" id="a3"></div>
                                    <div className="white block" id="b3"></div>
                                    <div className="black block" id="c3"></div>
                                    <div className="white block" id="d3"></div>
                                    <div className="black block" id="e3"></div>
                                    <div className="white block" id="f3"></div>
                                    <div className="black block" id="g3"></div>
                                    <div className="white block" id="h3"></div>

                                </div>

                                <div id="row7">

                                    <div className="white block" id="a2">
                                        <img src={chessPawnWhite} alt="" />
                                    </div>
                                    <div className="black block" id="b2">
                                        <img src={chessPawnWhite} alt="" />
                                    </div>
                                    <div className="white block" id="c2">
                                        <img src={chessPawnWhite} alt="" />
                                    </div>
                                    <div className="black block" id="d2">
                                        <img src={chessPawnWhite} alt="" />
                                    </div>
                                    <div className="white block" id="e2">
                                        <img src={chessPawnWhite} alt="" />
                                    </div>
                                    <div className="black block" id="f2">
                                        <img src={chessPawnWhite} alt="" />
                                    </div>
                                    <div className="white block" id="g2">
                                        <img src={chessPawnWhite} alt="" />
                                    </div>
                                    <div className="black block" id="h2">
                                        <img src={chessPawnWhite} alt="" />
                                    </div>

                                </div>

                                <div id="row8">

                                    <div className="black block" id="a1">
                                        <img src={chessRookWhite} alt="" />
                                    </div>
                                    <div className="white block" id="b1">
                                        <img src={chessKnightWhite} alt="" />
                                    </div>
                                    <div className="black block" id="c1">
                                        <img src={chessBishopWhite} alt="" />
                                    </div>
                                    <div className="white block" id="d1">
                                        <img src={chessQueenWhite} alt="" />
                                    </div>
                                    <div className="black block" id="e1">
                                        <img src={chessKingWhite} alt="" />
                                    </div>
                                    <div className="white block" id="f1">
                                        <img src={chessBishopWhite} alt="" />
                                    </div>
                                    <div className="black block" id="g1">
                                        <img src={chessKnightWhite} alt="" />
                                    </div>
                                    <div className="white block" id="h1">
                                        <img src={chessRookWhite} alt="" />
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Timer and Score */}
                        <div className="row">

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
                            <div id="scoreContainer" className="col-6">
                                <div className="card ">
                                    <div className="card-header">
                                        Score
                </div>

                                    <div className="card-body" id="score"></div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        );
    }


}

export default ChessBoard;