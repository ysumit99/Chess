
let mainApp = {};
let mobileDevice = $(window).width() < 991;
let ipad = $(window).width() < 800 && $(window).width() > 400;
let desktopDevice = $(window).width() > 992;
/* Initialize a 2d array to store pieces */
let board = new Array(8);

for (let i = 0; i < board.length; i++)
  board[i] = new Array(8);

let moveCount = 0; //To keep track of whose move it is
let score = { "whiteScore": 0, "blackScore": 0 };

/* Moving a piece is a two step process => select a valid piece and then move it to a valid tile */
let selectedTiles = []; /* This helps in first step. */

$(function () {
  mainApp = {
    /* Declare globals here */

    _isMobile: "",
    init: function () {

      this.initiate();

    },
    fileIndex: function (file) {
      let index = -1;


      switch (file) {


        case 'a':
          index = 0;
          break;
        case 'b':
          index = 1;
          break;
        case 'c':
          index = 2;
          break;
        case 'd':
          index = 3;
          break;
        case 'e':
          index = 4;
          break;
        case 'f':
          index = 5;
          break;
        case 'g':
          index = 6;
          break;
        case 'h':
          index = 7;
          break;
        default:
          console.log("file not found!");


      }

      return index;


    },

    rankIndex: function (rank) {

      let index = -1;

      switch (rank) {

        case '1':
          index = 0;
          break;
        case '2':
          index = 1;
          break;
        case '3':
          index = 2;
          break;
        case '4':
          index = 3;
          break;
        case '5':
          index = 4;
          break;
        case '6':
          index = 5;
          break;
        case '7':
          index = 6;
          break;
        case '8':
          index = 7;
          break;
        default:
          console.log("rank not found!");

      }

      return index;

      //}
    },

    getRank: function (rowIndex) {


      console.log("rowIndex in gerRank function => " + rowIndex);

      let rank = "";

      switch (rowIndex) {

        case "0":
          rank = "1";
          break;
        case "1":
          rank = "2";
          break;
        case "2":
          rank = "3";
          break;
        case "3":
          rank = "4";
          break;
        case "4":
          rank = "5";
          break;
        case "5":
          rank = "6";
          break;
        case "6":
          rank = "7";
          break;
        case "7":
          rank = "8";
          break;
        default:
          console.log("rowIndex doesn't exist!");

      }

      return rank;

    },

    getFile: function (colIndex) {


      console.log("colIndex in getFile function => " + colIndex);

      let file = "";

      switch (colIndex) {

        case "0":
          file = "a";
          break;
        case "1":
          file = "b";
          break;
        case "2":
          file = "c";
          break;
        case "3":
          file = "d";
          break;
        case "4":
          file = "e";
          break;
        case "5":
          file = "f";
          break;
        case "6":
          file = "g";
          break;
        case "7":
          file = "h";
          break;
        default:
          console.log("colIndex doesn't exist!");

      }

      return file;

    },

    SVGLocation: function (row, col) {


      let location = "";

      switch (board[row][col]) {


        case "WP":

          location = "./images/chess-pawn-white.svg";
          break;

        case "BP":
          location = "./images/chess-pawn-black.svg";
          break;

        case "WR":
          location = "./images/chess-rook-white.svg";
          break;

        case "BR":
          location = "./images/chess-rook-black.svg";
          break;
        case "WN":
          location = "./images/chess-knight-white.svg";
          break;

        case "BN":
          location = "./images/chess-knight-black.svg";
          break;

        case "WB":
          location = "./images/chess-bishop-white.svg";
          break;

        case "BB":
          location = "./images/chess-bishop-black.svg";
          break;

        case "WQ":
          location = "./images/chess-queen-white.svg";
          break;
        case "BQ":
          location = "./images/chess-queen-black.svg";
          break;

        case "WK":
          location = "./images/chess-king-white.svg";
          break;

        case "BK":
          location = "./images/chess-king-black.svg";
          break;
        case "--":
          location = "Empty tile!";
          break;

        default:
          console.log("Piece Not Found!");

      }

      return location;

    },

    isValidTile: function (index) {


      let isValid = true;

      if (index < 0 || index > 7)
        isValid = false;

      return isValid;


    },
    getTileColor: function (tile) {


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

    },

    addToMoveHistory: function (tile, piece) {
      /* Add to move history */

      $('#moveContainer').css({ "display": "block" });

      if (moveCount % 2 == 0)
        $('#history-container').append(`<span class="badge badge-pill badge-light">${piece + tile}</span> : `);
      else
        $('#history-container').append(`<span class="badge badge-pill badge-dark">${piece + tile}</span><br />`);


    },

    highlightValidTiles: function (validTiles) {


      console.log("tiles to be highlighted => given below ");

      let validEmptyTiles = validTiles.validEmptyTiles;
      let captureTiles = validTiles.captureTiles;

      // console.log("capture tiles ====> " + captureTiles);

      /* HighLight Empty Tiles in Blue  */
      for (tile of validEmptyTiles) {
        console.log("valid Tiles coordinates => " + tile.rowIndex + ", " + tile.colIndex);

        let file = mainApp.getFile(tile.colIndex);
        let rank = mainApp.getRank(tile.rowIndex);
        let id = file + rank;

        console.log("id to be updated => " + id);

        //blue color
        $(`#${id}`).css("box-shadow", "inset  0 0 40px  rgb(12, 112, 179)");


      }

      /* HighLight Pieces to be captured in Red */
      for (tile of captureTiles) {
        console.log("valid Tiles coordinates => " + tile.rowIndex + ", " + tile.colIndex);

        let file = mainApp.getFile(tile.colIndex);
        let rank = mainApp.getRank(tile.rowIndex);
        let id = file + rank;

        console.log("id to be updated => " + id);

        //red color
        $(`#${id}`).css("box-shadow", "inset  0 0 40px  #f13a1a");


      }



    },

    resetHighLight: function () {
      $('.block').css("box-shadow", "");
      $('.block').css("border", "");
    },

    validSelection: function (tile) {
      let selectedTile = document.getElementById(`${tile}`);

      //valid so green shadow
      selectedTile.style.boxShadow = "inset 0 0 40px  rgb(193, 231, 56)";

    },

    invalidSelection: function (tile) {
      let selectedTile = document.getElementById(`${tile}`);

      /* popup  an alert indicating opponent's piece touched! */
      alert(`That's opponent's piece!`);
    },

    turnIndicator: function (moveCount) {
      if (moveCount % 2 == 0) {
        $('.turnBlack').css('box-shadow', '');
        $('.turnWhite').css('box-shadow', '0px 0px 10px 10px rgb(248, 225, 19)');


      } else {


        $('.turnWhite').css('box-shadow', '');
        $('.turnBlack').css('box-shadow', '0px 0px 10px 10px rgb(112, 111, 101)');

      }
    },

    pawnValidMoves: function (rowIndex, colIndex, color) {

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
      let opponentPieceColor = (color == 'W') ? 'B' : 'W';

      /* If White pawn */
      if (color == "W") {
        /* Moves to empty tiles */

        if (rowIndex == 1) //if first move => 2 possible tiles
        {

          for (let i = rowIndex + 1; i < (rowIndex + 3) && i < 8; i++) {

            if (board[i][colIndex] == '--')
              validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
            else
              break; //A piece present in the way

          }
        }
        else //single tile is possible
        {
          for (let i = rowIndex + 1; i < (rowIndex + 2) && i < 8; i++) {
            if (board[i][colIndex] == '--')
              validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
            else
              break; //A piece present in the way

          }
        }

        /* End of Moves to empty tiles */

        /* Moves to capture opponent's piece */


        if (mainApp.isValidTile(rowIndex + 1)) {
          /* Left Diagonal capture */
          if (mainApp.isValidTile(colIndex - 1) && board[rowIndex + 1][colIndex - 1][0] == opponentPieceColor)
            captureTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex - 1}` });

          /* Right Diagonal capture */
          if (mainApp.isValidTile(colIndex + 1) && board[rowIndex + 1][colIndex + 1][0] == opponentPieceColor)
            captureTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex + 1}` });
        }

        /* End of Moves to capture opponent's piece */

      }
      else if (color == "B") {
        /* Moves to empty Tile */

        if (rowIndex == 6) //if first move => 2 possible moves
        {

          for (let i = rowIndex - 1; i > (rowIndex - 3) && i >= 0; i--) {

            if (board[i][colIndex] == '--')
              validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
            else
              break; //A piece present in the way

          }
        }
        else // only a single tile is possible
        {
          for (let i = rowIndex - 1; i > (rowIndex - 2) && i >= 0; i++) {
            if (board[i][colIndex] == '--')
              validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
            else
              break; //A piece present in the way

          }
        }

        /* End of Moves to empty Tiles */


        /* Moves to capture opponent's piece */

        if (mainApp.isValidTile(rowIndex - 1)) {
          /* Left Diagonal capture */
          if (mainApp.isValidTile(colIndex - 1) && board[rowIndex - 1][colIndex - 1][0] == opponentPieceColor)
            captureTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex - 1}` });

          /* Right Diagonal capture */
          if (mainApp.isValidTile(colIndex + 1) && board[rowIndex - 1][colIndex + 1][0] == opponentPieceColor)
            captureTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex + 1}` });
        }

        /* End of Moves to capture opponent's piece */

      }

      return { "validEmptyTiles": validTiles, "captureTiles": captureTiles };
    },

    knightValidMoves: function (rowIndex, colIndex, color) {

      /**
       * Knight Valid Moves
       * Knight can jump over pieces, so no need to check blocking pieces like the way we did for pawns
       */

      let validTiles = [], captureTiles = [];
      let opponentPieceColor = (color == "W") ? "B" : "W";

      console.log("rowIndex ===> " + rowIndex + " | colIndex ===> " + colIndex);
      try {
        if (!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7)) {
          /** There are 8 possible moves for Knight. The 4 pairs are as followed  */

          //top half moves
          if (mainApp.isValidTile(rowIndex + 2) && mainApp.isValidTile(colIndex + 1))
            if (board[rowIndex + 2][colIndex + 1] == "--")                         /* Empty Tile */
              validTiles.push({ "rowIndex": `${rowIndex + 2}`, "colIndex": `${colIndex + 1}` });
            else if (board[rowIndex + 2][colIndex + 1][0] == opponentPieceColor) /* Opponent's piece */
              captureTiles.push({ "rowIndex": `${rowIndex + 2}`, "colIndex": `${colIndex + 1}` });

          if (mainApp.isValidTile(rowIndex + 2) && mainApp.isValidTile(colIndex - 1))
            if (board[rowIndex + 2][colIndex - 1] == "--")                         /* Empty Tile */
              validTiles.push({ "rowIndex": `${rowIndex + 2}`, "colIndex": `${colIndex - 1}` });
            else if (board[rowIndex + 2][colIndex - 1][0] == opponentPieceColor) /* Opponent's piece */
              captureTiles.push({ "rowIndex": `${rowIndex + 2}`, "colIndex": `${colIndex - 1}` });

          if (mainApp.isValidTile(rowIndex + 1) && mainApp.isValidTile(colIndex + 2))
            if (board[rowIndex + 1][colIndex + 2] == "--")                         /* Empty Tile */
              validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex + 2}` });
            else if (board[rowIndex + 1][colIndex + 2][0] == opponentPieceColor) /* Opponent's piece */
              captureTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex + 2}` });

          if (mainApp.isValidTile(rowIndex + 1) && mainApp.isValidTile(colIndex - 2))
            if (board[rowIndex + 1][colIndex - 2] == "--")                         /* Empty Tile */
              validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex - 2}` });
            else if (board[rowIndex + 1][colIndex - 2][0] == opponentPieceColor) /* Opponent's piece */
              captureTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex - 2}` });



          //bottom half moves
          if (mainApp.isValidTile(rowIndex - 2) && mainApp.isValidTile(colIndex + 1))
            if (board[rowIndex - 2][colIndex + 1] == "--")                         /* Empty Tile */
              validTiles.push({ "rowIndex": `${rowIndex - 2}`, "colIndex": `${colIndex + 1}` });
            else if (board[rowIndex - 2][colIndex + 1][0] == opponentPieceColor) /* Opponent's piece */
              captureTiles.push({ "rowIndex": `${rowIndex - 2}`, "colIndex": `${colIndex + 1}` });

          if (mainApp.isValidTile(rowIndex - 2) && mainApp.isValidTile(colIndex - 1))
            if (board[rowIndex - 2][colIndex - 1] == "--")                          /* Empty Tile */
              validTiles.push({ "rowIndex": `${rowIndex - 2}`, "colIndex": `${colIndex - 1}` });
            else if (board[rowIndex - 2][colIndex - 1][0] == opponentPieceColor) /* Opponent's piece */
              captureTiles.push({ "rowIndex": `${rowIndex - 2}`, "colIndex": `${colIndex - 1}` });

          if (mainApp.isValidTile(rowIndex - 1) && mainApp.isValidTile(colIndex + 2))
            if (board[rowIndex - 1][colIndex + 2] == "--")                         /* Empty Tile */
              validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex + 2}` });
            else if (board[rowIndex - 1][colIndex + 2][0] == opponentPieceColor) /* Opponent's piece */
              captureTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex + 2}` });

          if (mainApp.isValidTile(rowIndex - 1) && mainApp.isValidTile(colIndex - 2))
            if (board[rowIndex - 1][colIndex - 2] == "--")                         /* Empty Tile */
              validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex - 2}` });
            else if (board[rowIndex - 1][colIndex - 2][0] == opponentPieceColor) /* Opponent's piece */
              captureTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex - 2}` });

        }
      } catch (e) {

        if (e.name != 'SyntaxError') {
          throw "Selected Tile is out of bound!";
        }
      }


      return { "validEmptyTiles": validTiles, "captureTiles": captureTiles };


    },

    rookValidMoves: function (rowIndex, colIndex, color) {

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
            if (board[i][colIndex] != "--") {
              if (board[i][colIndex][0] == opponentPieceColor)
                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` }); /* Opponent's piece */
              break;

            }

            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` }); /* Empty Tile */
          }

          //bottom
          for (let i = rowIndex - 1; i >= 0; i--) {
            if (board[i][colIndex] != "--") {
              if (board[i][colIndex][0] == opponentPieceColor)
                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` }); /* Opponent's piece */
              break;

            }

            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
          }

          //left
          for (let j = colIndex - 1; j >= 0; j--) {
            if (board[rowIndex][j] != "--") {
              if (board[rowIndex][j][0] == opponentPieceColor)
                captureTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` }); /* Opponent's piece */
              break;

            }


            validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
          }

          //right
          for (let j = colIndex + 1; j < 8; j++) {
            if (board[rowIndex][j] != "--") {
              if (board[rowIndex][j][0] == opponentPieceColor)
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
    },

    bishopValidMoves: function (rowIndex, colIndex, color) {

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
            if (mainApp.isValidTile(i) && mainApp.isValidTile(j)) {

              if (board[i][j] == "--") /* Empty Tile */
                validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
              else {
                if (board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                  captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                break;

              }
            }

          }

          /* Bottom Left Diagonal */

          for (let i = rowIndex - 1, j = colIndex - 1; i >= 0 && j >= 0; i--, j--) {
            if (mainApp.isValidTile(i) && mainApp.isValidTile(j)) {

              if (board[i][j] == "--") /* Empty Tile */
                validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
              else {
                if (board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                  captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                break;

              }
            }

          }


          /* Top Right Diagonal */

          for (let i = rowIndex + 1, j = colIndex + 1; i < 8 && j < 8; i++, j++) {
            if (mainApp.isValidTile(i) && mainApp.isValidTile(j)) {

              if (board[i][j] == "--") /* Empty Tile */
                validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
              else {
                if (board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                  captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                break;

              }
            }

          }


          /* Bottom Right Diagonal */

          for (let i = rowIndex - 1, j = colIndex + 1; i >= 0 && j < 8; i--, j++) {
            if (mainApp.isValidTile(i) && mainApp.isValidTile(j)) {

              if (board[i][j] == "--") /* Empty Tile */
                validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
              else {
                if (board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
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
    },

    queenValidMoves: function (rowIndex, colIndex, color) {

      let validTiles = [];
      let captureTiles = [];

      let opponentPieceColor = (color == "W") ? "B" : "W";


      /* Queen can move like rook as well as bishop */

      try {

        if (!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7)) {
          /* Rook-like moves for Queen */

          //top 
          for (let i = rowIndex + 1; i < 8; i++) {
            if (board[i][colIndex] != "--") {
              if (board[i][colIndex][0] == opponentPieceColor)
                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
              break;

            }

            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
          }

          //bottom
          for (let i = rowIndex - 1; i >= 0; i--) {
            if (board[i][colIndex] != "--") {
              if (board[i][colIndex][0] == opponentPieceColor)
                captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
              break;

            }


            validTiles.push({ "rowIndex": `${i}`, "colIndex": `${colIndex}` });
          }

          //left
          for (let j = colIndex - 1; j >= 0; j--) {
            if (board[rowIndex][j] != "--") {
              if (board[rowIndex][j][0] == opponentPieceColor)
                captureTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
              break;

            }


            validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
          }

          //right
          for (let j = colIndex + 1; j < 8; j++) {
            if (board[rowIndex][j] != "--") {
              if (board[rowIndex][j][0] == opponentPieceColor)
                captureTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
              break;

            }


            validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${j}` });
          }

          /* Bishop-like moves for Queen */

          /* Top Left Diagonal */

          for (let i = rowIndex + 1, j = colIndex - 1; i < 8 && j >= 0; i++, j--) {
            if (mainApp.isValidTile(i) && mainApp.isValidTile(j)) {

              if (board[i][j] == "--")
                validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
              else {
                if (board[i][j][0] == opponentPieceColor)
                  captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                break;

              }

            }

          }

          /* Bottom Left Diagonal */

          for (let i = rowIndex - 1, j = colIndex - 1; i >= 0 && j >= 0; i--, j--) {
            if (mainApp.isValidTile(i) && mainApp.isValidTile(j)) {

              if (board[i][j] == "--")
                validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
              else {
                if (board[i][j][0] == opponentPieceColor)
                  captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                break;

              }

            }

          }


          /* Top Right Diagonal */

          for (let i = rowIndex + 1, j = colIndex + 1; i < 8 && j < 8; i++, j++) {
            if (mainApp.isValidTile(i) && mainApp.isValidTile(j)) {

              if (board[i][j] == "--")
                validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
              else {
                if (board[i][j][0] == opponentPieceColor)
                  captureTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
                break;

              }

            }

          }


          /* Bottom Right Diagonal */

          for (let i = rowIndex - 1, j = colIndex + 1; i >= 0 && j < 8; i--, j++) {
            if (mainApp.isValidTile(i) && mainApp.isValidTile(j)) {

              if (board[i][j] == "--")
                validTiles.push({ "rowIndex": `${i}`, "colIndex": `${j}` });
              else {
                if (board[i][j][0] == opponentPieceColor)
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
    },

    kingValidMoves: function (rowIndex, colIndex, color) {

      /**
       * King moves 1 tile in any direction viz, top, bottom, left, right, diagonal
       * !!!! Current implementation of this method is not valid in all cases !!!!
       * Need to check if King is under attack by moving to any empty tile or
       * by capturing opponent's piece.
       */
      let validTiles = [], captureTiles = [];


      try {

        /* top tile */
        if (mainApp.isValidTile(rowIndex + 1))
          if (board[rowIndex + 1][colIndex] == "--" && !mainApp.isKingChecked({ "rowIndex": rowIndex + 1, "colIndex": colIndex }, color))
            validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex}` });

        /* bottom tile */
        if (mainApp.isValidTile(rowIndex - 1))
          if (board[rowIndex - 1][colIndex] == "--" && !mainApp.isKingChecked({ "rowIndex": rowIndex - 1, "colIndex": colIndex }, color))
            validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex}` });

        /* left tile */
        if (mainApp.isValidTile(colIndex - 1))
          if (board[rowIndex][colIndex - 1] == "--" && !mainApp.isKingChecked({ "rowIndex": rowIndex, "colIndex": colIndex - 1 }, color))
            validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${colIndex - 1}` });

        /* right tile */
        if (mainApp.isValidTile(colIndex + 1))
          if (board[rowIndex][colIndex + 1] == "--" && !mainApp.isKingChecked({ "rowIndex": rowIndex, "colIndex": colIndex + 1 }, color))
            validTiles.push({ "rowIndex": `${rowIndex}`, "colIndex": `${colIndex + 1}` });

        /* top left diagonal */
        if (mainApp.isValidTile(rowIndex + 1) && mainApp.isValidTile(colIndex - 1))
          if (board[rowIndex + 1][colIndex - 1] == "--" && !mainApp.isKingChecked({ "rowIndex": rowIndex + 1, "colIndex": colIndex - 1 }, color))
            validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex - 1}` });

        /* bottom left diagonal */
        if (mainApp.isValidTile(rowIndex - 1) && mainApp.isValidTile(colIndex - 1))
          if (board[rowIndex - 1][colIndex - 1] == "--" && !mainApp.isKingChecked({ "rowIndex": rowIndex - 1, "colIndex": colIndex - 1 }, color))
            validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex - 1}` });

        /* top right diagonal */
        if (mainApp.isValidTile(rowIndex + 1) && mainApp.isValidTile(colIndex + 1))
          if (board[rowIndex + 1][colIndex + 1] == "--" && !mainApp.isKingChecked({ "rowIndex": rowIndex + 1, "colIndex": colIndex + 1 }, color))
            validTiles.push({ "rowIndex": `${rowIndex + 1}`, "colIndex": `${colIndex + 1}` });

        /* bottom right diagonal */
        if (mainApp.isValidTile(rowIndex - 1) && mainApp.isValidTile(colIndex + 1))
          if (board[rowIndex - 1][colIndex + 1] == "--" && !mainApp.isKingChecked({ "rowIndex": rowIndex - 1, "colIndex": colIndex + 1 }, color))
            validTiles.push({ "rowIndex": `${rowIndex - 1}`, "colIndex": `${colIndex + 1}` });

      } catch (error) {
        if (error.name != 'SyntaxError')
          throw 'Index out of bound!';
      }

      return { "validEmptyTiles": validTiles, "captureTiles": captureTiles };
    },

    isKingChecked: function (validKingTile, color) {
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

        if (board[row][colIndex] != "--" && board[row][colIndex][0] != opponentPieceColor) /* same color so no threat */ {

          break;
        }

        if (board[row][colIndex][1] == 'R' || board[row][colIndex][1] == 'Q') {
          isChecked = true;
          return isChecked;
        }

      }

      //Attack by Rook/Queen from bottom
      for (let row = rowIndex - 1; row >= 0; row--) {
        console.log("attack by rook/Queen bottom");
        if (board[row][colIndex] != "--" && board[row][colIndex][0] != opponentPieceColor) /* same color so no threat */ {

          break;
        }

        if (board[row][colIndex][1] == 'R' || board[row][colIndex][1] == 'Q') {
          isChecked = true;
          return isChecked;
        }

      }


      //Attack by Rook/Queen from Left
      for (let col = colIndex - 1; col >= 0; col--) {
        console.log("attack by rook/Queen Left");
        if (board[rowIndex][col] != "--" && board[rowIndex][col][0] !== opponentPieceColor) /* same color so no threat */ {

          break;
        }

        if (board[rowIndex][col][1] === 'R' || board[rowIndex][col][1] === 'Q') {
          isChecked = true;
          return isChecked;
        }
      }


      //Attacks by Rook/Queen from Right
      for (let col = colIndex + 1; col < 8; col++) {
        console.log("attack by rook/Queen Right");
        if (board[rowIndex][col] != "--" && board[rowIndex][col][0] !== opponentPieceColor) /* same color so no threat */
          break;

        if (board[rowIndex][col][1] === 'R' || board[rowIndex][col][1] === 'Q') {
          isChecked = true;
          return isChecked;
        }
      }



      /* Diagonal Attacks by Bishops and Queen */

      //top left diagonal
      for (let row = rowIndex + 1, col = colIndex - 1; row < 8 && col >= 0; row++, col--) {
        console.log("Bishop/Queen top left Diagonal");

        if (board[row][col] != "--" && board[row][col][0] != opponentPieceColor) /* same color so no threat */
          break;

        if (board[row][col][1] === 'Q' || board[row][col][1] === 'B') {
          isChecked = true;
          console.log("ischecked ===> " + isChecked);
          return isChecked;
        }
        else
          console.log(board[row][col] + " is not a threat!");
      }

      //top right diagonal
      for (let row = rowIndex + 1, col = colIndex + 1; row < 8 && col < 8; row++, col++) {
        console.log("attack by Bishop/Queen top right diagonal");
        if (board[row][col] != "--" && board[row][col][0] !== opponentPieceColor) /* same color so no threat */
          break;

        if (board[row][col][1] === 'Q' || board[row][col][1] === 'B') {
          isChecked = true;
          return isChecked;
        }
      }

      //bottom left diagonal
      for (let row = rowIndex - 1, col = colIndex - 1; row >= 0 && col >= 0; row--, col--) {
        console.log("attack by Bishop/Queen bottom-left Diagonal");
        if (board[row][col] != "--" && board[row][col][0] !== opponentPieceColor) /* same color so no threat */
          break;

        if (board[row][col][1] === 'Q' || board[row][col][1] === 'B') {
          isChecked = true;
          return isChecked;
        }
      }

      //bottom right diagonal
      for (let row = rowIndex - 1, col = colIndex + 1; row >= 0 && col < 8; row--, col++) {
        console.log("attack by Bishop/Queen bottom-right diagonal");
        if (board[row][col] != "--" && board[row][col][0] !== opponentPieceColor) /* same color so no threat */
          break;

        if (board[row][col][1] === 'Q' || board[row][col][1] === 'B') {
          isChecked = true;
          return isChecked;
        }
      }




      /* Attacks by pawn */
      if (color == 'W')  //White King is being attcked
      {

        // Attack by top-left diagonal pawn
        if (mainApp.isValidTile(rowIndex + 1) && mainApp.isValidTile(colIndex - 1)) {
          console.log("attack on white king by top-left black pawn");
          if (board[rowIndex + 1][colIndex - 1][0] === opponentPieceColor && board[rowIndex + 1][colIndex - 1][1] === 'P') {
            isChecked = true;
            return isChecked;
          }
        }


        // Attack by top-right diagonal pawn
        if (mainApp.isValidTile(rowIndex + 1) && mainApp.isValidTile(colIndex + 1)) {
          console.log("attack on white king by top-right black pawn");
          if (board[rowIndex + 1][colIndex + 1][0] === opponentPieceColor && board[rowIndex + 1][colIndex + 1][1] === 'P') {
            isChecked = true;
            return isChecked;
          }
        }

      }
      else if (color == 'B') //Black King is being attacked
      {

        // Attack by bottom-left diagonal pawn
        if (mainApp.isValidTile(rowIndex - 1) && mainApp.isValidTile(colIndex - 1)) {
          console.log("attack on black King by bottom-left diagonal white pawn");
          if (board[rowIndex - 1][colIndex - 1][0] === opponentPieceColor && board[rowIndex - 1][colIndex - 1][1] === 'P') {
            isChecked = true;
            return isChecked;
          }
        }


        //Attack by bottom-right diagonal pawn
        if (mainApp.isValidTile(rowIndex - 1) && mainApp.isValidTile(colIndex + 1)) {
          console.log("attack on black king by bottom-right diagonal white pawn");
          if (board[rowIndex - 1][colIndex + 1][0] === opponentPieceColor && board[rowIndex - 1][colIndex + 1][1] === 'P') {
            isChecked = true;
            return isChecked;
          }
        }

      }




      //console.log("ischecked => " + isChecked);

      return isChecked;

    },


    resetBoard: function () {

      /* White Pieces */

      //Pawns
      for (let rank = 0; rank < 8; rank++)
        board[1][rank] = "WP";

      //Rooks 
      board[0][0] = "WR";
      board[0][7] = "WR";

      //Knights
      board[0][1] = "WN";
      board[0][6] = "WN";

      //Bishops
      board[0][2] = "WB";
      board[0][5] = "WB";

      //Queen and King
      board[0][3] = "WQ";
      board[0][4] = "WK";

      /* Black Pieces */

      //Pawns
      for (let rank = 0; rank < 8; rank++)
        board[6][rank] = "BP";

      //Rooks 
      board[7][0] = "BR";
      board[7][7] = "BR";

      //Knights
      board[7][1] = "BN";
      board[7][6] = "BN";

      //Bishops
      board[7][2] = "BB";
      board[7][5] = "BB";

      //Queen and King
      board[7][3] = "BQ";
      board[7][4] = "BK";

      /* Empty Tiles  */
      for (let rank = 2; rank < 6; rank++)
        for (let file = 0; file < 8; file++)
          board[rank][file] = "--";

    },

    printBoard: function () {

      for (rank of board)
        for (file of rank)
          console.log("piece = " + file);



    },
    updateBoard: function (initialTile, finalTile) {

      console.log("==========inside mainApp.updateBoard function ==================");

      let row1 = initialTile.rowIndex, col1 = initialTile.colIndex;
      let row2 = finalTile.rowIndex, col2 = finalTile.colIndex;

      board[row2][col2] = board[row1][col1]; //file tile updated
      console.log("final tile after moving the piece => " + board[row2][col2]);

      board[row1][col1] = "--";//initial tile is empty
      console.log("initial tile after moving => " + board[row1][col1]);


      let rank1 = mainApp.getRank(`${row1}`);
      let rank2 = mainApp.getRank(`${row2}`);


      let file1 = mainApp.getFile(`${col1}`);
      let file2 = mainApp.getFile(`${col2}`);

      //get the updated SVG for piece on finalTile
      let location = mainApp.SVGLocation(row2, col2);

      console.log("upadted piece svg location => " + location);

      //Move the piece to final tile
      $(`#${file2}` + `${rank2}`).html(`<img src = '${location}' alt = "chess piece" />`);

      //empty the initial tile
      $(`#${file1}` + `${rank1}`).html("");


      console.log("==========end of mainApp.updateBoard function ==================");

      return;
    },

    getTileStatus: function (tile) {
      //console.log("inside mainApp.getTileStatus =====> tile = " + tile);

      let status = "";

      let selectedTile = document.getElementById(`${tile}`);

      if (selectedTile.style.boxShadow == "")
        status = "unselectedTile";
      else if (selectedTile.style.boxShadow == "rgb(12, 112, 179) 0px 0px 40px inset" || selectedTile.style.boxShadow == "rgb(241, 58, 26) 0px 0px 40px inset")
        status = "validMoveTile";
      else if (selectedTile.style.boxShadow == "rgb(193, 231, 56) 0px 0px 40px inset")
        status = "selectedTile";

      console.log("Tile status =====> " + status);

      return status;

    },

    updateScore: function () {

      if (score.whiteScore || score.blackScore)
        document.getElementById('scoreContainer').style.display = 'block';

      $('#score').html(`
            <div class = 'row'>
                <button type="button" class="btn btn-lg btn-light col-6">W : ${score.whiteScore}</button>
                <button type="button" class="btn btn-lg btn-dark col-6">B : ${score.blackScore}</button>
            </div>
    `)
    },
    prepareBoard: function () {

      //score and history section must be hidden by default

      document.getElementById('moveContainer').style.display = 'none';
      document.getElementById('scoreContainer').style.display = 'none';

    },


    startTimer: function () {

      /* Reveal timer */
      document.getElementById('turnContainer').style.display = 'block';


      /* Countdown timer starts */
      let count = parseInt($("#time").text());
      let myCounter = setInterval(function () {

        count -= 1;
        $("#time").html(count);

        if (count == 0)
          clearInterval(myCounter);
      }, 1000);

    },
    initiate: function () {


      //Exceution starts from here
      mainApp.prepareBoard();
      mainApp.resetBoard();
      mainApp.printBoard();
      mainApp.turnIndicator(moveCount);

      /* Timer for Game  */


      /** Highlight tiles and show valid moves  */
      $(".block").click(function () {



        let tile = $(this)[0].id;
        const tileStatus = mainApp.getTileStatus(tile);

        if (tileStatus == "unselectedTile") { /* First step in moving a tile */

          selectedTiles.length = 0;
          console.log("selected tile = " + tile);

          let colIndex = mainApp.fileIndex(tile[0]);
          let rowIndex = mainApp.rankIndex(tile[1]);

          //Remove shadow and border from previously selected tile
          mainApp.resetHighLight();

          if (board[rowIndex][colIndex] == "--") /* Empty Tile */
            highlightEmpty(tile);
          else { /* Tile has some piece */

            if (moveCount % 2 == 0) {  /* White's Move */

              console.log("moveCount = " + moveCount);

              if (board[rowIndex][colIndex][0] == "W") { /* A valid tile selected */

                mainApp.validSelection(tile);

                //this will be useful when moving the piece;
                selectedTiles.push(tile);

                if (board[rowIndex][colIndex] == "WP") {

                  /* piece == White Pawn */
                  let validTiles = mainApp.pawnValidMoves(rowIndex, colIndex, "W");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "WN") {

                  /* piece == White Knight */
                  let validTiles = mainApp.knightValidMoves(rowIndex, colIndex, "W");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "WR") {

                  /* piece == White Rook */
                  let validTiles = mainApp.rookValidMoves(rowIndex, colIndex, "W");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "WB") {

                  /* piece == White Bishop */
                  let validTiles = mainApp.bishopValidMoves(rowIndex, colIndex, "W");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "WQ") {

                  /* piece == White Queen */
                  let validTiles = mainApp.queenValidMoves(rowIndex, colIndex, "W");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "WK") {

                  /* piece == White King */
                  let validTiles = mainApp.kingValidMoves(rowIndex, colIndex, "W");
                  mainApp.highlightValidTiles(validTiles);

                }

              } else mainApp.invalidSelection(tile); /* opponent's piece */

            } else { /* black's move */

              if (board[rowIndex][colIndex][0] == "B") {

                /* A valid tile having black piece */
                mainApp.validSelection(tile);

                //this will be useful when moving the piece;
                selectedTiles.push(tile);

                if (board[rowIndex][colIndex] == "BP") {

                  /* if(piece == Black Pawn) */
                  let validTiles = mainApp.pawnValidMoves(rowIndex, colIndex, "B");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BN") {

                  /*piece == Black Knight */
                  let validTiles = mainApp.knightValidMoves(rowIndex, colIndex, "B");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BR") {

                  /* piece == Black Rook */
                  let validTiles = mainApp.rookValidMoves(rowIndex, colIndex, "B");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BB") {

                  /* piece == Black Bishop */
                  let validTiles = mainApp.bishopValidMoves(rowIndex, colIndex, "B");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BQ") {

                  /* piece == Black Queen */
                  let validTiles = mainApp.queenValidMoves(rowIndex, colIndex, "B");
                  mainApp.highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BK") {

                  /* piece == Black King */
                  let validTiles = mainApp.kingValidMoves(rowIndex, colIndex, "B");
                  mainApp.highlightValidTiles(validTiles);

                }

              } else mainApp.invalidSelection(tile); /* opponent's piece */

            }
          }
        } else if (tileStatus == "validMoveTile") { /*  If this tile is selected as second step in moving  */

          let thisTile = tile; /* Tile where piece has been moved */
          let selectedTile = selectedTiles[0]; /* Tile selected for moving */

          let tileColor = mainApp.getTileColor(thisTile);


          /* get index for previously selected tile */
          let selectedTileColIndex = mainApp.fileIndex(selectedTile[0]);
          let selectedTileRowIndex = mainApp.rankIndex(selectedTile[1]);

          /* get index for tile where piece is moved */
          let thisTileColIndex = mainApp.fileIndex(thisTile[0]);
          let thisTileRowIndex = mainApp.rankIndex(thisTile[1]);

          /* piece selected */
          let piece = board[selectedTileRowIndex][selectedTileColIndex][1];

          /* piece to be captured/empty tile */
          let pieceOnFinalTile = board[thisTileRowIndex][thisTileColIndex][1];

          let initialTile = {
            rowIndex: selectedTileRowIndex,
            colIndex: selectedTileColIndex
          };

          let finalTile = {
            rowIndex: thisTileRowIndex,
            colIndex: thisTileColIndex
          };

          /* get piece captured */

          /* update board */
          mainApp.updateBoard(initialTile, finalTile);

          mainApp.resetHighLight();

          /* Update Score on piece capture */
          if (tileColor == "red") {
            if (moveCount % 2 == 0) {
              if (pieceOnFinalTile == 'P')
                score.whiteScore += 1;
              else if (pieceOnFinalTile == 'N' || pieceOnFinalTile == 'B')
                score.whiteScore += 3;
              else if (pieceOnFinalTile == 'R')
                score.whiteScore += 5;
              else if (pieceOnFinalTile == 'Q')
                score.whiteScore += 9;

            }
            else {
              if (pieceOnFinalTile == 'P')
                score.blackScore += 1;
              else if (pieceOnFinalTile == 'N' || pieceOnFinalTile == 'B')
                score.blackScore += 3;
              else if (pieceOnFinalTile == 'R')
                score.blackScore += 5;
              else if (pieceOnFinalTile == 'Q')
                score.blackScore += 9;
            }


          }


          /* Update Move History */

          piece = (piece == "P") ? "" : piece; /* Algebraic notation ignores 'p' for pawn in history */

          mainApp.addToMoveHistory(thisTile, piece);

          /* Update the Score */
          mainApp.updateScore();

          /* Reprint the updated board */
          mainApp.printBoard();

          /* prepare for next move */
          moveCount++;
          selectedTiles.length = 0;

          mainApp.turnIndicator(moveCount);

        } else if (tileStatus == "selectedTile") /* toggle selected tile */
          mainApp.resetHighLight();

      });


      /* Game Controls */
      $('#startButton').click(function () {

        //modal for confirm start game
        $('#confirmStartGame').modal('show');

        $('#confirmStartGame').on('click', '#confirmStartButton', function (e) {

          //hide confirm start modal
          $('#confirmStartGame').modal('hide');

          //reveal the board by removing the blur
          $('#boardContainer').css("filter", "none");

          // //start the timer for white
          // startTimer();

        });

      });
    }


  };

  mainApp.init();
});