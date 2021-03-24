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
import * as utility from './utility';


class ChessBoard extends Component {

    constructor(props) {
        super(props);

        /**
         * SetUp Board Array
         */
        let board = new Array(8);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(8);
        }
        console.log(board);
        for (let i = 0; i < initialBoard.length; i++) {
            let rowIndex = initialBoard[i].id[1];
            let colIndex = initialBoard[i].id[0];
            board[utility.rankIndex(rowIndex)][utility.fileIndex(colIndex)] = initialBoard[i].piece;

        }

        /**
         * Board State
         */
        this.state = {
            initialBoard: initialBoard,
            board: board,
            moveCount: 0,
            score: { white: 0, black: 0 },
            selectedTile: ""
        };
        this.startGame = this.startGame.bind(this);
        this.handleClick = this.handleClick.bind(this);
        console.log(this.state.initialBoard);
        console.log(this.state.board);
    }


    startGame() {
        console.log(this.state.board);
        document.querySelector('#boardContainer').style.filter = "none";


    }

    /**
     * 
     * @param {event} e 
     */
    handleClick(e) {
        let tile = e.currentTarget.id;
        const tileStatus = this.getTileStatus(tile);

        if (tileStatus === "unselectedTile") { /* Still choosing a piece */
            let colIndex = utility.fileIndex(tile[0]);
            let rowIndex = utility.rankIndex(tile[1]);
            let selectedPiece = this.state.board[rowIndex][colIndex];

            //console.log(colIndex + " " + rowIndex);

            this.resetHighLight();
            //console.log(this.state.board[rowIndex][colIndex]);
            if (selectedPiece !== "XX") { /* If tile is not empty */

                /** Opponent's piece touched*/
                if (this.state.moveCount % 2 === 0) { /* White's Move */
                    // console.log('Whites Move');
                    // console.log(selectedPiece);
                    if (selectedPiece[0] === 'B') {
                        alert(`That is opponent's piece!`);
                        return;
                    }
                } else { /* Black's Move */
                    //console.log('Blacks Move');
                    if (selectedPiece[0] === 'W') {
                        alert(`That is opponent's piece!`);
                        return
                    }
                }

                /** Highlight selected tile */
                this.validTile(tile);
                this.setState({ 'selectedTile': tile });

                let validTiles = null;
                switch (this.state.board[rowIndex][colIndex]) {
                    case "WP":
                        validTiles = this.pawnValidMoves(rowIndex, colIndex, "W");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "WN":
                        validTiles = this.knightValidMoves(rowIndex, colIndex, "W");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "WR":
                        validTiles = this.rookValidMoves(rowIndex, colIndex, "W");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "WB":
                        validTiles = this.bishopValidMoves(rowIndex, colIndex, "W");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "WQ":
                        validTiles = this.queenValidMoves(rowIndex, colIndex, "W");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "WK":
                        validTiles = this.kingValidMoves(rowIndex, colIndex, "W");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "BP":
                        validTiles = this.pawnValidMoves(rowIndex, colIndex, "B");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "BN":
                        validTiles = this.knightValidMoves(rowIndex, colIndex, "B");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "BR":
                        validTiles = this.rookValidMoves(rowIndex, colIndex, "B");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "BB":
                        validTiles = this.bishopValidMoves(rowIndex, colIndex, "B");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "BQ":
                        validTiles = this.queenValidMoves(rowIndex, colIndex, "B");
                        this.highlightValidTiles(validTiles);
                        break;
                    case "BK":
                        validTiles = this.kingValidMoves(rowIndex, colIndex, "B");
                        this.highlightValidTiles(validTiles);
                        break;

                }

            }
        } else if (tileStatus === "validMoveTile") {
            let destinationTile = tile;
            let sourceTile = this.state.selectedTile;
            let tileColor = this.getTileColor(destinationTile);

            let sourceTileColIndex = utility.fileIndex(sourceTile[0]);
            let sourceTileRowIndex = utility.rankIndex(sourceTile[1]);

            let destinationTileColIndex = utility.fileIndex(destinationTile[0]);
            let destinationTileRowIndex = utility.rankIndex(destinationTile[1]);

            let initialTile = {
                rowIndex: sourceTileRowIndex,
                colIndex: sourceTileColIndex
            };

            let finalTile = {
                rowIndex: destinationTileRowIndex,
                colIndex: destinationTileColIndex
            };

            this.updateBoard(initialTile, finalTile);

            this.resetHighLight();
        }
    }

    getTileStatus(tile) {

        console.log(`${tile}`);
        let selectedTile = document.getElementById(`${tile}`);
        let status = "";
        if (selectedTile.style.boxShadow === "")
            status = "unselectedTile";
        else if (selectedTile.style.boxShadow === "rgb(12, 112, 179) 0px 0px 40px inset" || selectedTile.style.boxShadow === "rgb(241, 58, 26) 0px 0px 40px inset")
            status = "validMoveTile";
        else if (selectedTile.style.boxShadow === "rgb(193, 231, 56) 0px 0px 40px inset")
            status = "selectedTile";

        console.log("Tile status =====> " + status);

        return status;

    }

    validTile = (tile) => {

        let selectedTile = document.getElementById(`${tile}`);
        selectedTile.style.boxShadow = "inset 0 0 40px  rgb(193, 231, 56)"; /** Green Tile */

    }

    highlightValidTiles = (validTiles) => {

        console.log("tiles to be highlighted => given below ");

        let validEmptyTiles = validTiles.validEmptyTiles;
        let captureTiles = validTiles.captureTiles;

        // console.log("capture tiles ====> " + captureTiles);

        /* HighLight Empty Tiles in Blue  */
        for (let tile of validEmptyTiles) {
            console.log("valid Tiles coordinates => " + tile.rowIndex + ", " + tile.colIndex);

            let file = utility.getFile(tile.colIndex);
            let rank = utility.getRank(tile.rowIndex);
            let id = file + rank;

            console.log("id to be updated => " + id);

            //blue color
            document.getElementById(id).style.boxShadow = "inset  0 0 40px  rgb(12, 112, 179)";


        }

        /* HighLight Pieces to be captured in Red */
        for (let tile of captureTiles) {
            console.log("valid Tiles coordinates => " + tile.rowIndex + ", " + tile.colIndex);

            let file = utility.getFile(tile.colIndex);
            let rank = utility.getRank(tile.rowIndex);
            let id = file + rank;

            console.log("id to be updated => " + id);

            //red color
            document.getElementById(id).style.boxShadow = "inset  0 0 40px  #f13a1a";


        }


    }

    resetHighLight = () => {

        /** reset previous selected tile */
        let blocks = document.getElementsByClassName('block');
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].style.boxShadow = "";
        }

    }
    getTileColor = (tile) => {

        let tileBoxShadow = document.getElementById(`${tile}`).style.boxShadow;
        let tileColor = "";

        /*!!!!! The dependency on css increases tight coupling. Needs to be refactored using board array instead!!!!! */
        switch (tileBoxShadow) {

            case 'rgb(241, 58, 26) 0px 0px 40px inset': tileColor = "red";
                break;

            case 'rgb(12, 112, 179) 0px 0px 40px inset': tileColor = "blue";
                break;

            case 'rgb(193, 231, 56) 0px 0px 40px inset': tileColor = "green";
                break;

            default: console.log("Alien Tile!");

        }

        //console.log("tile color => " + tileColor);
        return tileColor;
    }

    updateBoard = (initialTile, finalTile) => {

        console.log("==========inside updateBoard function ==================");

        let row1 = initialTile.rowIndex, col1 = initialTile.colIndex;
        let row2 = finalTile.rowIndex, col2 = finalTile.colIndex;

        // this.setState(prevState => ({ 'board': tile });
        let prevBoard = [...this.state.board];
        let updatedTile = [...prevBoard[row2][col2]];
        updatedTile = this.state.board[row1][col1];
        prevBoard[row2][col2] = updatedTile;
        this.setState({ 'board': prevBoard });


        //board[row2][col2] = this.state.board[row1][col1]; //file tile updated
        console.log("final tile after moving the piece => " + this.state.board[row2][col2]);

        prevBoard = [...this.state.board];
        updatedTile = [...prevBoard[row1][col1]];
        updatedTile = "XX";
        prevBoard[row1][col1] = updatedTile;
        this.setState({ 'board': prevBoard });

        // board[row1][col1] = "--";//initial tile is empty
        console.log("initial tile after moving => " + this.state.board[row1][col1]);


        let rank1 = utility.getRank(`${row1}`);
        let rank2 = utility.getRank(`${row2}`);


        let file1 = utility.getFile(`${col1}`);
        let file2 = utility.getFile(`${col2}`);

        //get the updated SVG for piece on finalTile
        //let location = SVGLocation(row2, col2);

        //console.log("upadted piece svg location => " + location);
        console.log(document.getElementById(`${file1}${rank1}`));
        //Move the piece to final tile
        //$(`#${file2}` + `${rank2}`).html(`<img src = '${location}' alt = "chess piece" />`);
        //$(`#${file2}` + `${rank2}`).html(`<img src = '${location}' alt = "chess piece" />`);


        //empty the initial tile
        //$(`#${file1}` + `${rank1}`).html("");


        console.log("==========end of updateBoard function ==================");

        return;
    }


    /** Valid Moves for pieces 
* 
* Use board array to check the current board configuration,
* and take current indexes i.e. rank, file and piece color and piece movement rules
* into account for selecting valid moves.
* 
*  Note: All the indexes are O based !
*   
*/




    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     * @param {*} color 
     */

    pawnValidMoves = (rowIndex, colIndex, color) => {

        /**
        * Move to Empty tiles => 
        *   Pawn can move one/two tiles for the first time and only once in subsequent moves 
        * 
        * Capture opponent's piece => 
        *   White Pawn can capture either left top-diagonal  or right top-diagonal Black pieces.
        *   Black Pawn can capture either left bottom-diagonal  or right bottom-diagonal White pieces.
        *   
        */


        let validTiles = [], captureTiles = [];
        let opponentPieceColor = (color === 'W') ? 'B' : 'W';

        /* If White pawn */
        if (color === "W") {
            /* Moves to empty tiles */

            if (rowIndex === 1) //if first move => 2 possible tiles
            {

                for (let i = rowIndex + 1; i < (rowIndex + 3) && i < 8; i++) {

                    if (this.state.board[i][colIndex] === "XX")
                        validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
                    else
                        break; //A piece present in the way

                }
            }
            else //single tile is possible
            {
                for (let i = rowIndex + 1; i < (rowIndex + 2) && i < 8; i++) {
                    if (this.state.board[i][colIndex] === "XX")
                        validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
                    else
                        break; //A piece present in the way

                }
            }

            /* End of Moves to empty tiles */

            /* Moves to capture opponent's piece */


            if (utility.isValidTile(rowIndex + 1)) {
                /* Left Diagonal capture */
                if (utility.isValidTile(colIndex - 1) && this.state.board[rowIndex + 1][colIndex - 1][0] === opponentPieceColor)
                    captureTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex - 1}` });

                /* Right Diagonal capture */
                if (utility.isValidTile(colIndex + 1) && this.state.board[rowIndex + 1][colIndex + 1][0] === opponentPieceColor)
                    captureTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex + 1}` });
            }

            /* End of Moves to capture opponent's piece */

        }
        else if (color === "B") {
            /* Moves to empty Tile */

            if (rowIndex === 6) //if first move => 2 possible moves
            {

                for (let i = rowIndex - 1; i > (rowIndex - 3) && i >= 0; i--) {

                    if (this.state.board[i][colIndex] === "XX")
                        validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
                    else
                        break; //A piece present in the way

                }
            }
            else // only a single tile is possible
            {
                for (let i = rowIndex - 1; i > (rowIndex - 2) && i >= 0; i++) {
                    if (this.state.board[i][colIndex] === "XX")
                        validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
                    else
                        break; //A piece present in the way

                }
            }

            /* End of Moves to empty Tiles */


            /* Moves to capture opponent's piece */

            if (utility.isValidTile(rowIndex - 1)) {
                /* Left Diagonal capture */
                if (utility.isValidTile(colIndex - 1) && this.state.board[rowIndex - 1][colIndex - 1][0] === opponentPieceColor)
                    captureTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex - 1}` });

                /* Right Diagonal capture */
                if (utility.isValidTile(colIndex + 1) && this.state.board[rowIndex - 1][colIndex + 1][0] === opponentPieceColor)
                    captureTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex + 1}` });
            }

            /* End of Moves to capture opponent's piece */

        }

        return { "validEmptyTiles": validTiles, "captureTiles": captureTiles };
    }



    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     * @param {*} color 
     */
    knightValidMoves = (rowIndex, colIndex, color) => {

        /**
         * Knight Valid Moves
         * Knight can jump over pieces, so no need to check blocking pieces like the way we did for pawns
         */

        let validTiles = [], captureTiles = [];
        let opponentPieceColor = (color === "W") ? "B" : "W";

        console.log("rowIndex ===> " + rowIndex + " | colIndex ===> " + colIndex);
        try {
            if (!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7)) {
                /** There are 8 possible moves for Knight. The 4 pairs are as followed  */

                //top half moves
                if (utility.isValidTile(rowIndex + 2) && utility.isValidTile(colIndex + 1))
                    if (this.state.board[rowIndex + 2][colIndex + 1] === "XX")                         /* Empty Tile */
                        validTiles.push({ "rowIndex": `${rowIndex + 2}`, "colIndex": `${colIndex + 1}` });
                    else if (this.state.board[rowIndex + 2][colIndex + 1][0] === opponentPieceColor) /* Opponent's piece */
                        captureTiles.push({ "rowIndex": `${rowIndex + 2}`, "colIndex": `${colIndex + 1}` });

                if (utility.isValidTile(rowIndex + 2) && utility.isValidTile(colIndex - 1))
                    if (this.state.board[rowIndex + 2][colIndex - 1] === "XX")                         /* Empty Tile */
                        validTiles.push({ "rowIndex": `${rowIndex + 2}`, "colIndex": `${colIndex - 1}` });
                    else if (this.state.board[rowIndex + 2][colIndex - 1][0] === opponentPieceColor) /* Opponent's piece */
                        captureTiles.push({ "rowIndex": `${rowIndex + 2}`, "colIndex": `${colIndex - 1}` });

                if (utility.isValidTile(rowIndex + 1) && utility.isValidTile(colIndex + 2))
                    if (this.state.board[rowIndex + 1][colIndex + 2] === "XX")                         /* Empty Tile */
                        validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex + 2}` });
                    else if (this.state.board[rowIndex + 1][colIndex + 2][0] === opponentPieceColor) /* Opponent's piece */
                        captureTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex + 2}` });

                if (utility.isValidTile(rowIndex + 1) && utility.isValidTile(colIndex - 2))
                    if (this.state.board[rowIndex + 1][colIndex - 2] === "XX")                         /* Empty Tile */
                        validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex - 2}` });
                    else if (this.state.board[rowIndex + 1][colIndex - 2][0] === opponentPieceColor) /* Opponent's piece */
                        captureTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex - 2}` });



                //bottom half moves
                if (utility.isValidTile(rowIndex - 2) && utility.isValidTile(colIndex + 1))
                    if (this.state.board[rowIndex - 2][colIndex + 1] === "XX")                         /* Empty Tile */
                        validTiles.push({ "rowIndex": `${rowIndex - 2}`, "colIndex": `${colIndex + 1}` });
                    else if (this.state.board[rowIndex - 2][colIndex + 1][0] === opponentPieceColor) /* Opponent's piece */
                        captureTiles.push({ "rowIndex": `${rowIndex - 2}`, "colIndex": `${colIndex + 1}` });

                if (utility.isValidTile(rowIndex - 2) && utility.isValidTile(colIndex - 1))
                    if (this.state.board[rowIndex - 2][colIndex - 1] === "XX")                          /* Empty Tile */
                        validTiles.push({ "rowIndex": `${rowIndex - 2}`, "colIndex": `${colIndex - 1}` });
                    else if (this.state.board[rowIndex - 2][colIndex - 1][0] === opponentPieceColor) /* Opponent's piece */
                        captureTiles.push({ "rowIndex": `${rowIndex - 2}`, "colIndex": `${colIndex - 1}` });

                if (utility.isValidTile(rowIndex - 1) && utility.isValidTile(colIndex + 2))
                    if (this.state.board[rowIndex - 1][colIndex + 2] === "XX")                         /* Empty Tile */
                        validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex + 2}` });
                    else if (this.state.board[rowIndex - 1][colIndex + 2][0] === opponentPieceColor) /* Opponent's piece */
                        captureTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex + 2}` });

                if (utility.isValidTile(rowIndex - 1) && utility.isValidTile(colIndex - 2))
                    if (this.state.board[rowIndex - 1][colIndex - 2] === "XX")                         /* Empty Tile */
                        validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex - 2}` });
                    else if (this.state.board[rowIndex - 1][colIndex - 2][0] === opponentPieceColor) /* Opponent's piece */
                        captureTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex - 2}` });

            }
        } catch (e) {

            if (e.name !== 'SyntaxError') {
                throw "Selected Tile is out of bound!";
            }
        }


        return { "validEmptyTiles": validTiles, "captureTiles": captureTiles };


    }





    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     * @param {*} color 
     */

    rookValidMoves = (rowIndex, colIndex, color) => {

        /**
         * Rook Valid Moves
         * Rook can move horizontally and vertically in straight line.
         */

        let validTiles = [], captureTiles = [];
        let opponentPieceColor = ("W") ? "B" : "W";

        try {
            if (!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7)) {
                //top 
                for (let i = rowIndex + 1; i < 8; i++) {
                    if (this.state.board[i][colIndex] != "XX") {
                        if (this.state.board[i][colIndex][0] == opponentPieceColor)
                            captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` }); /* Opponent's piece */
                        break;

                    }

                    validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` }); /* Empty Tile */
                }

                //bottom
                for (let i = rowIndex - 1; i >= 0; i--) {
                    if (this.state.board[i][colIndex] != "XX") {
                        if (this.state.board[i][colIndex][0] == opponentPieceColor)
                            captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` }); /* Opponent's piece */
                        break;

                    }

                    validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
                }

                //left
                for (let j = colIndex - 1; j >= 0; j--) {
                    if (this.state.board[rowIndex][j] != "XX") {
                        if (this.state.board[rowIndex][j][0] == opponentPieceColor)
                            captureTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` }); /* Opponent's piece */
                        break;

                    }


                    validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
                }

                //right
                for (let j = colIndex + 1; j < 8; j++) {
                    if (this.state.board[rowIndex][j] != "XX") {
                        if (this.state.board[rowIndex][j][0] == opponentPieceColor)
                            captureTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` }); /* Opponent's piece */
                        break;

                    }


                    validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
                }





            }
        } catch (e) {

            if (e.name != 'SyntaxError') {
                throw "Selected Tile is out of bound!";
            }
        }

        return { "validEmptyTiles": validTiles, "captureTiles": captureTiles };
    }




    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     * @param {*} color 
     */
    bishopValidMoves = (rowIndex, colIndex, color) => {

        /**
         * Bishop Valid Moves
         * Bishop can move diagonally. 
         */

        let validTiles = [];
        let captureTiles = [];

        let opponentPieceColor = (color == "W") ? "B" : "W";

        try {

            if (!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7)) {



                /* Top Left Diagonal */

                for (let i = rowIndex + 1, j = colIndex - 1; i < 8 && j >= 0; i++, j--) {
                    if (utility.isValidTile(i) && utility.isValidTile(j)) {

                        if (this.state.board[i][j] == "XX") /* Empty Tile */
                            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                        else {
                            if (this.state.board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                            break;

                        }
                    }

                }

                /* Bottom Left Diagonal */

                for (let i = rowIndex - 1, j = colIndex - 1; i >= 0 && j >= 0; i--, j--) {
                    if (utility.isValidTile(i) && utility.isValidTile(j)) {

                        if (this.state.board[i][j] == "XX") /* Empty Tile */
                            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                        else {
                            if (this.state.board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                            break;

                        }
                    }

                }


                /* Top Right Diagonal */

                for (let i = rowIndex + 1, j = colIndex + 1; i < 8 && j < 8; i++, j++) {
                    if (utility.isValidTile(i) && utility.isValidTile(j)) {

                        if (this.state.board[i][j] == "XX") /* Empty Tile */
                            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                        else {
                            if (this.state.board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                            break;

                        }
                    }

                }


                /* Bottom Right Diagonal */

                for (let i = rowIndex - 1, j = colIndex + 1; i >= 0 && j < 8; i--, j++) {
                    if (utility.isValidTile(i) && utility.isValidTile(j)) {

                        if (this.state.board[i][j] == "XX") /* Empty Tile */
                            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                        else {
                            if (this.state.board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                            break;

                        }
                    }

                }

            }
        } catch (e) {


            if (e.name != 'SyntaxError') {
                throw "Selected Tile is out of bound!";
            }
        }

        return { "validEmptyTiles": validTiles, "captureTiles": captureTiles };
    }

    /* End of Valid Bishop Move */

    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     * @param {*} color 
     */
    queenValidMoves = (rowIndex, colIndex, color) => {

        let validTiles = [];
        let captureTiles = [];

        let opponentPieceColor = (color == "W") ? "B" : "W";


        /* Queen can move like rook as well as bishop */

        try {

            if (!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7)) {
                /* Rook-like moves for Queen */

                //top 
                for (let i = rowIndex + 1; i < 8; i++) {
                    if (this.state.board[i][colIndex] != "XX") {
                        if (this.state.board[i][colIndex][0] == opponentPieceColor)
                            captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
                        break;

                    }

                    validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
                }

                //bottom
                for (let i = rowIndex - 1; i >= 0; i--) {
                    if (this.state.board[i][colIndex] != "XX") {
                        if (this.state.board[i][colIndex][0] == opponentPieceColor)
                            captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
                        break;

                    }


                    validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
                }

                //left
                for (let j = colIndex - 1; j >= 0; j--) {
                    if (this.state.board[rowIndex][j] != "XX") {
                        if (this.state.board[rowIndex][j][0] == opponentPieceColor)
                            captureTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
                        break;

                    }


                    validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
                }

                //right
                for (let j = colIndex + 1; j < 8; j++) {
                    if (this.state.board[rowIndex][j] != "XX") {
                        if (this.state.board[rowIndex][j][0] == opponentPieceColor)
                            captureTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
                        break;

                    }


                    validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
                }

                /* Bishop-like moves for Queen */

                /* Top Left Diagonal */

                for (let i = rowIndex + 1, j = colIndex - 1; i < 8 && j >= 0; i++, j--) {
                    if (utility.isValidTile(i) && utility.isValidTile(j)) {

                        if (this.state.board[i][j] == "XX")
                            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                        else {
                            if (this.state.board[i][j][0] == opponentPieceColor)
                                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                            break;

                        }

                    }

                }

                /* Bottom Left Diagonal */

                for (let i = rowIndex - 1, j = colIndex - 1; i >= 0 && j >= 0; i--, j--) {
                    if (utility.isValidTile(i) && utility.isValidTile(j)) {

                        if (this.state.board[i][j] == "XX")
                            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                        else {
                            if (this.state.board[i][j][0] == opponentPieceColor)
                                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                            break;

                        }

                    }

                }


                /* Top Right Diagonal */

                for (let i = rowIndex + 1, j = colIndex + 1; i < 8 && j < 8; i++, j++) {
                    if (utility.isValidTile(i) && utility.isValidTile(j)) {

                        if (this.state.board[i][j] == "XX")
                            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                        else {
                            if (this.state.board[i][j][0] == opponentPieceColor)
                                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                            break;

                        }

                    }

                }


                /* Bottom Right Diagonal */

                for (let i = rowIndex - 1, j = colIndex + 1; i >= 0 && j < 8; i--, j++) {
                    if (utility.isValidTile(i) && utility.isValidTile(j)) {

                        if (this.state.board[i][j] == "XX")
                            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                        else {
                            if (this.state.board[i][j][0] == opponentPieceColor)
                                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                            break;

                        }

                    }

                }


            }

        } catch (error) {

            if (error.name != "SyntaxError")
                throw ("Index out of bound!");
        }

        return { "validEmptyTiles": validTiles, "captureTiles": captureTiles };
    }

    /* End of Queen Valid Moves */


    /* King Valid Moves */

    /**
     * 
     * @param {*} rowIndex 
     * @param {*} colIndex 
     * @param {*} color 
     */
    kingValidMoves = (rowIndex, colIndex, color) => {

        /**
         * King moves 1 tile in any direction viz, top, bottom, left, right, diagonal
         * !!!! Current implementation of this method is not valid in all cases !!!!
         * Need to check if King is under attack by moving to any empty tile or
         * by capturing opponent's piece.
         */
        let validTiles = [], captureTiles = [];


        try {

            /* top tile */
            if (utility.isValidTile(rowIndex + 1))
                if (this.state.board[rowIndex + 1][colIndex] == "XX" && !this.isKingChecked({ "rowIndex": rowIndex + 1, "colIndex": colIndex }, color))
                    validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex}` });

            /* bottom tile */
            if (utility.isValidTile(rowIndex - 1))
                if (this.state.board[rowIndex - 1][colIndex] == "XX" && !this.isKingChecked({ "rowIndex": rowIndex - 1, "colIndex": colIndex }, color))
                    validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex}` });

            /* left tile */
            if (utility.isValidTile(colIndex - 1))
                if (this.state.board[rowIndex][colIndex - 1] == "XX" && !this.isKingChecked({ "rowIndex": rowIndex, "colIndex": colIndex - 1 }, color))
                    validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${colIndex - 1}` });

            /* right tile */
            if (utility.isValidTile(colIndex + 1))
                if (this.state.board[rowIndex][colIndex + 1] == "XX" && !this.isKingChecked({ "rowIndex": rowIndex, "colIndex": colIndex + 1 }, color))
                    validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${colIndex + 1}` });

            /* top left diagonal */
            if (utility.isValidTile(rowIndex + 1) && utility.isValidTile(colIndex - 1))
                if (this.state.board[rowIndex + 1][colIndex - 1] == "XX" && !this.isKingChecked({ "rowIndex": rowIndex + 1, "colIndex": colIndex - 1 }, color))
                    validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex - 1}` });

            /* bottom left diagonal */
            if (utility.isValidTile(rowIndex - 1) && utility.isValidTile(colIndex - 1))
                if (this.state.board[rowIndex - 1][colIndex - 1] == "XX" && !this.isKingChecked({ "rowIndex": rowIndex - 1, "colIndex": colIndex - 1 }, color))
                    validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex - 1}` });

            /* top right diagonal */
            if (utility.isValidTile(rowIndex + 1) && utility.isValidTile(colIndex + 1))
                if (this.state.board[rowIndex + 1][colIndex + 1] == "XX" && !this.isKingChecked({ "rowIndex": rowIndex + 1, "colIndex": colIndex + 1 }, color))
                    validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex + 1}` });

            /* bottom right diagonal */
            if (utility.isValidTile(rowIndex - 1) && utility.isValidTile(colIndex + 1))
                if (this.state.board[rowIndex - 1][colIndex + 1] == "XX" && !this.isKingChecked({ "rowIndex": rowIndex - 1, "colIndex": colIndex + 1 }, color))
                    validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex + 1}` });

        } catch (error) {
            if (error.name != 'SyntaxError')
                throw 'Index out of bound!';
        }

        return { "validEmptyTiles": validTiles, "captureTiles": captureTiles };
    }

    /* End of King Valid Moves */

    /* Check if King is under check */


    /**
     * Check if the King can come under check by movement of other pieces of the same player (called as discovery in normal chess terms)
     * This function needs to be called for every piece movement! `validKingTile` parameter is the coordinates of the valid king tile likewise `color` indicates king's color.
     */

    /**
     * 
     * @param {*} kingTile 
     * @param {*} color 
     */

    isKingChecked = (validKingTile, color) => {
        console.log("color of the king ==== > " + color);

        let opponentPieceColor = (color == 'W') ? 'B' : 'W';
        let isChecked = false;
        let rowIndex = validKingTile.rowIndex;
        let colIndex = validKingTile.colIndex;
        console.log("rowIndex = " + rowIndex + " | colIndex = " + colIndex);

        /**
         * Check for threats from possible opponent pieces
         */

        /* Linear Attacks from Rook/Queen */

        // Attack by Rook/Queen from Top
        for (let row = rowIndex + 1; row < 8; row++) {
            console.log("attack by rook/Queen top");

            if (this.state.board[row][colIndex] != "XX" && this.state.board[row][colIndex][0] != opponentPieceColor) /* same color so no threat */ {

                break;
            }

            if (this.state.board[row][colIndex][1] == 'R' || this.state.board[row][colIndex][1] == 'Q') {
                isChecked = true;
                return isChecked;
            }

        }

        //Attack by Rook/Queen from bottom
        for (let row = rowIndex - 1; row >= 0; row--) {
            console.log("attack by rook/Queen bottom");
            if (this.state.board[row][colIndex] != "XX" && this.state.board[row][colIndex][0] != opponentPieceColor) /* same color so no threat */ {

                break;
            }

            if (this.state.board[row][colIndex][1] == 'R' || this.state.board[row][colIndex][1] == 'Q') {
                isChecked = true;
                return isChecked;
            }

        }


        //Attack by Rook/Queen from Left
        for (let col = colIndex - 1; col >= 0; col--) {
            console.log("attack by rook/Queen Left");
            if (this.state.board[rowIndex][col] != "XX" && this.state.board[rowIndex][col][0] !== opponentPieceColor) /* same color so no threat */ {

                break;
            }

            if (this.state.board[rowIndex][col][1] === 'R' || this.state.board[rowIndex][col][1] === 'Q') {
                isChecked = true;
                return isChecked;
            }
        }


        //Attacks by Rook/Queen from Right
        for (let col = colIndex + 1; col < 8; col++) {
            console.log("attack by rook/Queen Right");
            if (this.state.board[rowIndex][col] != "XX" && this.state.board[rowIndex][col][0] !== opponentPieceColor) /* same color so no threat */
                break;

            if (this.state.board[rowIndex][col][1] === 'R' || this.state.board[rowIndex][col][1] === 'Q') {
                isChecked = true;
                return isChecked;
            }
        }



        /* Diagonal Attacks by Bishops and Queen */

        //top left diagonal
        for (let row = rowIndex + 1, col = colIndex - 1; row < 8 && col >= 0; row++, col--) {
            console.log("Bishop/Queen top left Diagonal");

            if (this.state.board[row][col] != "XX" && this.state.board[row][col][0] != opponentPieceColor) /* same color so no threat */
                break;

            if (this.state.board[row][col][1] === 'Q' || this.state.board[row][col][1] === 'B') {
                isChecked = true;
                console.log("ischecked ===> " + isChecked);
                return isChecked;
            }
            else
                console.log(this.state.board[row][col] + " is not a threat!");
        }

        //top right diagonal
        for (let row = rowIndex + 1, col = colIndex + 1; row < 8 && col < 8; row++, col++) {
            console.log("attack by Bishop/Queen top right diagonal");
            if (this.state.board[row][col] != "XX" && this.state.board[row][col][0] !== opponentPieceColor) /* same color so no threat */
                break;

            if (this.state.board[row][col][1] === 'Q' || this.state.board[row][col][1] === 'B') {
                isChecked = true;
                return isChecked;
            }
        }

        //bottom left diagonal
        for (let row = rowIndex - 1, col = colIndex - 1; row >= 0 && col >= 0; row--, col--) {
            console.log("attack by Bishop/Queen bottom-left Diagonal");
            if (this.state.board[row][col] != "XX" && this.state.board[row][col][0] !== opponentPieceColor) /* same color so no threat */
                break;

            if (this.state.board[row][col][1] === 'Q' || this.state.board[row][col][1] === 'B') {
                isChecked = true;
                return isChecked;
            }
        }

        //bottom right diagonal
        for (let row = rowIndex - 1, col = colIndex + 1; row >= 0 && col < 8; row--, col++) {
            console.log("attack by Bishop/Queen bottom-right diagonal");
            if (this.state.board[row][col] != "XX" && this.state.board[row][col][0] !== opponentPieceColor) /* same color so no threat */
                break;

            if (this.state.board[row][col][1] === 'Q' || this.state.board[row][col][1] === 'B') {
                isChecked = true;
                return isChecked;
            }
        }




        /* Attacks by pawn */
        if (color == 'W')  //White King is being attcked
        {

            // Attack by top-left diagonal pawn
            if (utility.isValidTile(rowIndex + 1) && utility.isValidTile(colIndex - 1)) {
                console.log("attack on white king by top-left black pawn");
                if (this.state.board[rowIndex + 1][colIndex - 1][0] === opponentPieceColor && this.state.board[rowIndex + 1][colIndex - 1][1] === 'P') {
                    isChecked = true;
                    return isChecked;
                }
            }


            // Attack by top-right diagonal pawn
            if (utility.isValidTile(rowIndex + 1) && utility.isValidTile(colIndex + 1)) {
                console.log("attack on white king by top-right black pawn");
                if (this.state.board[rowIndex + 1][colIndex + 1][0] === opponentPieceColor && this.state.board[rowIndex + 1][colIndex + 1][1] === 'P') {
                    isChecked = true;
                    return isChecked;
                }
            }

        }
        else if (color == 'B') //Black King is being attacked
        {

            // Attack by bottom-left diagonal pawn
            if (utility.isValidTile(rowIndex - 1) && utility.isValidTile(colIndex - 1)) {
                console.log("attack on black King by bottom-left diagonal white pawn");
                if (this.state.board[rowIndex - 1][colIndex - 1][0] === opponentPieceColor && this.state.board[rowIndex - 1][colIndex - 1][1] === 'P') {
                    isChecked = true;
                    return isChecked;
                }
            }


            //Attack by bottom-right diagonal pawn
            if (utility.isValidTile(rowIndex - 1) && utility.isValidTile(colIndex + 1)) {
                console.log("attack on black king by bottom-right diagonal white pawn");
                if (this.state.board[rowIndex - 1][colIndex + 1][0] === opponentPieceColor && this.state.board[rowIndex - 1][colIndex + 1][1] === 'P') {
                    isChecked = true;
                    return isChecked;
                }
            }

        }




        //console.log("ischecked => " + isChecked);

        return isChecked;

    }



    /**
     * 
     * @returns chess board
     */
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
                                    this.state.board.slice(0).reverse().map((row, rowIndex) => {
                                        let tileCounter = rowIndex % 2 === 0 ? 0 : 1;
                                        return (
                                            row.map((tile, colIndex) => {
                                                let id = utility.getFile(colIndex.toString()) + (8 - rowIndex).toString();
                                                let color = tileCounter % 2 === 0 ? "white" : "black";
                                                let piece = tile;
                                                let pieceClass = "XX";

                                                console.log(`id = ${id} color = ${color} piece = ${piece} pieceClass = ${pieceClass} tileCounter ${tileCounter}`);
                                                tileCounter = tileCounter === 0 ? 1 : 0;
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

                                                return (
                                                    <div className={`block ${color}`} id={id} key={id} onClick={this.handleClick}>
                                                        {!(piece === "XX") ? <img src={pieceClass} alt={piece} /> : ""}
                                                    </div>
                                                );

                                            }))


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