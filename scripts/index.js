/* Initialize a 2d array to store pieces */
let board = new Array(8);

for (let i = 0; i < board.length; i++) 
    board[i] = new Array(8);

let moveCount = 0; //To keep track of whose move it is
let score = {"whiteScore":0, "blackScore":0};

/* Moving a piece is a two step process => select a valid piece and then move it to a valid tile */
let selectedTiles = []; /* This helps in first step. */

//Exceution starts from here
prepareBoard();
resetBoard();
printBoard();
turnIndicator(moveCount);

let startTimer = () => {

    document.getElementById('turnContainer').style.display = 'block';
    var seconds = 100,
      countDiv = document.getElementById('countdownWhite'),
      secondPass,
      countDown = setInterval(function () {
          "use strict";
          secondPass();
      }, 1000);
    function secondPass() {
      "use strict";
      var minutes = Math.floor((seconds / 60)),
          remSeconds = seconds % 60;
      if (seconds < 10) {
          remSeconds = "0" + remSeconds;
      }
      countDiv.innerHTML = minutes + ":" + remSeconds;
      if (seconds > 0) {
          seconds = seconds - 1;
      } else {
          clearInterval(countDown);
          countDiv.innerHTML = 'Done';
      }
    }
}


/** Highlight tiles and show valid moves  */
$("td").click(function() {

 
  let tile = $(this)[0].id;
  const tileStatus = getTileStatus(tile);

    if (tileStatus == "unselectedTile") { /* First step in moving a tile */

      selectedTiles.length = 0;
      console.log("selected tile = " + tile);

      let colIndex = fileIndex(tile[0]);
      let rowIndex = rankIndex(tile[1]);

      //Remove shadow and border from previously selected tile
      resetHighLight();

      if (board[rowIndex][colIndex] == "--") /* Empty Tile */
        highlightEmpty(tile);
      else { /* Tile has some piece */
        
            if (moveCount % 2 == 0) {  /* White's Move */
                
                console.log("moveCount = " + moveCount);
  
                if (board[rowIndex][colIndex][0] == "W") { /* A valid tile selected */
                
                  validSelection(tile);

                  //this will be useful when moving the piece;
                  selectedTiles.push(tile);

                  if (board[rowIndex][colIndex] == "WP") {
                  
                    /* piece == White Pawn */
                    let validTiles = pawnValidMoves(rowIndex, colIndex, "W");
                    highlightValidTiles(validTiles);

                  } else if (board[rowIndex][colIndex] == "WN") {

                    /* piece == White Knight */
                    let validTiles = knightValidMoves(rowIndex, colIndex, "W");
                    highlightValidTiles(validTiles);

                  } else if (board[rowIndex][colIndex] == "WR") {
                    
                    /* piece == White Rook */ 
                    let validTiles = rookValidMoves(rowIndex, colIndex, "W");
                    highlightValidTiles(validTiles);

                  } else if (board[rowIndex][colIndex] == "WB") {
                    
                    /* piece == White Bishop */ 
                    let validTiles = bishopValidMoves(rowIndex, colIndex, "W");
                    highlightValidTiles(validTiles);

                  } else if (board[rowIndex][colIndex] == "WQ") {

                    /* piece == White Queen */ 
                    let validTiles = queenValidMoves(rowIndex, colIndex, "W");
                    highlightValidTiles(validTiles);

                  } else if (board[rowIndex][colIndex] == "WK") {

                    /* piece == White King */ 
                    let validTiles = kingValidMoves(rowIndex, colIndex, "W");
                    highlightValidTiles(validTiles);
                    
                  }
                  
              } else invalidSelection(tile); /* opponent's piece */

            } else { /* black's move */

                if (board[rowIndex][colIndex][0] == "B") {

                /* A valid tile having black piece */
                validSelection(tile);

                //this will be useful when moving the piece;
                selectedTiles.push(tile);

                if (board[rowIndex][colIndex] == "BP") {

                  /* if(piece == Black Pawn) */
                  let validTiles = pawnValidMoves(rowIndex, colIndex, "B");
                  highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BN") {

                  /*piece == Black Knight */ 
                  let validTiles = knightValidMoves(rowIndex, colIndex, "B");
                  highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BR") {
                  
                  /* piece == Black Rook */ 
                  let validTiles = rookValidMoves(rowIndex,colIndex, "B");
                  highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BB") {
                  
                  /* piece == Black Bishop */ 
                  let validTiles = bishopValidMoves(rowIndex, colIndex, "B");
                  highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BQ") {
                  
                  /* piece == Black Queen */ 
                  let validTiles = queenValidMoves(rowIndex, colIndex, "B");
                  highlightValidTiles(validTiles);

                } else if (board[rowIndex][colIndex] == "BK") {
                  
                  /* piece == Black King */ 
                  let validTiles = kingValidMoves(rowIndex, colIndex, "B");
                  highlightValidTiles(validTiles);

                }

              } else invalidSelection(tile); /* opponent's piece */
              
            }
        }
    } else if (tileStatus == "validMoveTile") { /*  If this tile is selected as second step in moving  */
        
        //unhide move history container after first piece is moved
        document.getElementById('moveContainer').style.display = 'block';

        let thisTile = tile; /* Tile where piece has been moved */
        let selectedTile = selectedTiles[0]; /* Tile selected for moving */

        let tileColor = getTileColor(thisTile);
       

        /* get index for previously selected tile */
        let selectedTileColIndex = fileIndex(selectedTile[0]);
        let selectedTileRowIndex = rankIndex(selectedTile[1]);

        /* get index for tile where piece is moved */
        let thisTileColIndex = fileIndex(thisTile[0]);
        let thisTileRowIndex = rankIndex(thisTile[1]);

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
        updateBoard(initialTile, finalTile);

        resetHighLight();

        /* Update Score on piece capture */
        if(tileColor == "red")
            {
                if(moveCount % 2 == 0)
                    {
                        if(pieceOnFinalTile == 'P')
                            score.whiteScore += 1;
                        else if(pieceOnFinalTile == 'N' || pieceOnFinalTile == 'B')
                            score.whiteScore += 3;
                        else if(pieceOnFinalTile == 'R')
                            score.whiteScore += 5;
                        else if(pieceOnFinalTile == 'Q')
                            score.whiteScore += 9;

                    }
                else
                    {
                        if(pieceOnFinalTile == 'P')
                            score.blackScore += 1;
                        else if(pieceOnFinalTile == 'N' || pieceOnFinalTile == 'B')
                            score.blackScore += 3;
                        else if(pieceOnFinalTile == 'R')
                            score.blackScore += 5;
                        else if(pieceOnFinalTile == 'Q')
                            score.blackScore += 9;
                    }
                    
                    
            }
       

        /* Update Move History */

        piece = (piece == "P") ? "" : piece; /* Algebraic notation ignores 'p' for pawn in history */

        addToMoveHistory(thisTile, piece);

        /* Update the Score */
        updateScore();

        /* Reprint the updated board */
        printBoard();

        /* prepare for next move */
        moveCount++;
        selectedTiles.length = 0;

        turnIndicator(moveCount);

      } else if (tileStatus == "selectedTile") /* toggle selected tile */
          resetHighLight(); 
          
});


/* Game Controls */
$('#startButton').click(function(){

  //modal for confirm start game
  $('#confirmStartGame').modal('show');

  $('#confirmStartGame').on('click', '#confirmStartButton', function(e) {

      //hide this modal and start timer
      $('#confirmStartGame').modal('hide');
      
      startTimer();

      //unhide score section with timer 
      document.getElementById('scoreContainer').style.display = 'block';

  });
  
  
  

});