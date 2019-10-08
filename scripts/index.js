/* Initialize a 2d array to store pieces */
let board = new Array(8);

for (let i = 0; i < board.length; i++) board[i] = new Array(8);

let moveCount = 0; //To keep track of whose move it is

/* Moving a piece is a two step process => select a valid piece and then move it to a valid tile */
let selectedTiles = []; /* This helps in first step. */

//Exceution starts from here
resetBoard();
printBoard();
turnIndicator(moveCount);

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
        
        let thisTile = tile;
        let selectedTile = selectedTiles[0];

        /* get index for currently previously selected tile */
        let selectedTileColIndex = fileIndex(selectedTile[0]);
        let selectedTileRowIndex = rankIndex(selectedTile[1]);

        /* get index for tile where piece is moved */
        let thisTileColIndex = fileIndex(thisTile[0]);
        let thisTileRowIndex = rankIndex(thisTile[1]);

        /* piece selected */
        let piece = board[selectedTileRowIndex][selectedTileColIndex][1];

        let initialTile = {
          rowIndex: selectedTileRowIndex,
          colIndex: selectedTileColIndex
        };

        let finalTile = { 
          rowIndex: thisTileRowIndex, 
          colIndex: thisTileColIndex 
        };

        /* update board */
        updateBoard(initialTile, finalTile);

        resetHighLight();

        /* Update Move History */

        piece = (piece == "P") ? "" : piece; /* Algebraic notation ignores 'p' for pawn in history */

        addToMoveHistory(thisTile, piece);

        /* Reprint the updated board */
        printBoard();

        /* prepare for next move */
        moveCount++;
        selectedTiles.length = 0;

        turnIndicator(moveCount);

      } else if (tileStatus == "selectedTile") /* toggle selected tile */
          resetHighLight(); 
          
});
