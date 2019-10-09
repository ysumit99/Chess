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

let pawnValidMoves = (rowIndex,colIndex,color) => {

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
    if(color == "W")
    {
        /* Moves to empty tiles */

            if(rowIndex == 1) //if first move => 2 possible tiles
            {
            
                for(let i = rowIndex+1 ; i < (rowIndex + 3) && i < 8; i++)
                {
                
                    if(board[i][colIndex] == '--')
                        validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                    else
                        break; //A piece present in the way

                }
            }
            else //single tile is possible
            {
                for(let i = rowIndex+1 ; i < (rowIndex + 2) && i < 8; i++)
                {
                    if(board[i][colIndex] == '--')
                        validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                    else
                        break; //A piece present in the way

                }
            }

        /* End of Moves to empty tiles */
         
        /* Moves to capture opponent's piece */

      
            if(isValidTile(rowIndex+1))
                {
                    /* Left Diagonal capture */
                    if(isValidTile(colIndex-1) && board[rowIndex+1][colIndex-1][0] == opponentPieceColor)
                        captureTiles.push({"rowIndex":`${rowIndex+1}`,"colIndex":`${colIndex-1}`});
                    
                    /* Right Diagonal capture */
                    if(isValidTile(colIndex+1) && board[rowIndex+1][colIndex+1][0] == opponentPieceColor)
                        captureTiles.push({"rowIndex":`${rowIndex+1}`,"colIndex":`${colIndex+1}`});
                }
                    
        /* End of Moves to capture opponent's piece */
       
    }
    else if(color == "B")
    {
        /* Moves to empty Tile */

            if(rowIndex == 6) //if first move => 2 possible moves
            {
            
                for(let i = rowIndex-1 ; i > (rowIndex - 3) && i >= 0; i--)
                {
                
                    if(board[i][colIndex] == '--')
                        validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                    else
                        break; //A piece present in the way

                }
            }
            else // only a single tile is possible
            {
                for(let i = rowIndex-1 ; i > (rowIndex - 2) && i >= 0; i++)
                {
                    if(board[i][colIndex] == '--')
                        validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                    else
                        break; //A piece present in the way

                }
            }
        
        /* End of Moves to empty Tiles */


        /* Moves to capture opponent's piece */
        
            if(isValidTile(rowIndex-1))
                {
                    /* Left Diagonal capture */
                    if(isValidTile(colIndex-1) && board[rowIndex-1][colIndex-1][0] == opponentPieceColor)
                        captureTiles.push({"rowIndex":`${rowIndex-1}`,"colIndex":`${colIndex-1}`});
                    
                    /* Right Diagonal capture */
                    if(isValidTile(colIndex+1) && board[rowIndex-1][colIndex+1][0] == opponentPieceColor)
                        captureTiles.push({"rowIndex":`${rowIndex-1}`,"colIndex":`${colIndex+1}`});
                }
        
        /* End of Moves to capture opponent's piece */
            
    }

    return {"validEmptyTiles":validTiles, "captureTiles": captureTiles};
}



/**
 * 
 * @param {*} rowIndex 
 * @param {*} colIndex 
 * @param {*} color 
 */
let knightValidMoves = (rowIndex, colIndex, color) => {

    /**
     * Knight Valid Moves
     * Knight can jump over pieces, so no need to check blocking pieces like the way we did for pawns
     */

    let validTiles = [], captureTiles = [];
    let opponentPieceColor = (color == "W")? "B" : "W";
    
    console.log("rowIndex ===> " + rowIndex + " | colIndex ===> " + colIndex);
    try {
            if(!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7))
            {
                /** There are 8 possible moves for Knight. The 4 pairs are as followed  */

                //top half moves
                if(isValidTile(rowIndex+2) && isValidTile(colIndex+1))
                    if(board[rowIndex+2][colIndex+1]=="--")                         /* Empty Tile */
                        validTiles.push({"rowIndex":`${rowIndex+2}`, "colIndex":`${colIndex+1}`});
                    else if(board[rowIndex+2][colIndex+1][0] == opponentPieceColor) /* Opponent's piece */
                        captureTiles.push({"rowIndex":`${rowIndex+2}`, "colIndex":`${colIndex+1}`});

                if(isValidTile(rowIndex+2) && isValidTile(colIndex-1))
                    if(board[rowIndex+2][colIndex-1]=="--")                         /* Empty Tile */
                        validTiles.push({"rowIndex":`${rowIndex+2}`, "colIndex":`${colIndex-1}`});
                    else if(board[rowIndex+2][colIndex-1][0] == opponentPieceColor ) /* Opponent's piece */
                        captureTiles.push({"rowIndex":`${rowIndex+2}`, "colIndex":`${colIndex-1}`});
                
                if(isValidTile(rowIndex+1) && isValidTile(colIndex+2))
                    if(board[rowIndex+1][colIndex+2]=="--")                         /* Empty Tile */
                        validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex+2}`});
                    else if(board[rowIndex+1][colIndex+2][0] == opponentPieceColor ) /* Opponent's piece */
                        captureTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex+2}`});

                if(isValidTile(rowIndex+1) && isValidTile(colIndex-2))
                    if(board[rowIndex+1][colIndex-2]=="--")                         /* Empty Tile */
                        validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex-2}`});
                    else if(board[rowIndex+1][colIndex-2][0] == opponentPieceColor ) /* Opponent's piece */
                        captureTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex-2}`});



                //bottom half moves
                if(isValidTile(rowIndex-2) && isValidTile(colIndex+1))
                    if(board[rowIndex-2][colIndex+1]=="--")                         /* Empty Tile */
                        validTiles.push({"rowIndex":`${rowIndex-2}`, "colIndex":`${colIndex+1}`});
                    else if(board[rowIndex-2][colIndex+1][0] == opponentPieceColor ) /* Opponent's piece */
                        captureTiles.push({"rowIndex":`${rowIndex-2}`, "colIndex":`${colIndex+1}`});

                if(isValidTile(rowIndex-2) && isValidTile(colIndex-1))
                    if(board[rowIndex-2][colIndex-1]=="--")                          /* Empty Tile */
                        validTiles.push({"rowIndex":`${rowIndex-2}`, "colIndex":`${colIndex-1}`});
                    else if(board[rowIndex-2][colIndex-1][0] == opponentPieceColor ) /* Opponent's piece */
                        captureTiles.push({"rowIndex":`${rowIndex-2}`, "colIndex":`${colIndex-1}`});

                if(isValidTile(rowIndex-1) && isValidTile(colIndex+2))
                    if(board[rowIndex-1][colIndex+2]=="--")                         /* Empty Tile */
                        validTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex+2}`});
                    else if(board[rowIndex+2][colIndex-1][0] == opponentPieceColor ) /* Opponent's piece */
                        captureTiles.push({"rowIndex":`${rowIndex+2}`, "colIndex":`${colIndex-1}`});

                if(isValidTile(rowIndex-1) && isValidTile(colIndex-2))
                    if(board[rowIndex-1][colIndex-2]=="--")                         /* Empty Tile */
                        validTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex-2}`});
                    else if(board[rowIndex-1][colIndex-2][0] == opponentPieceColor ) /* Opponent's piece */
                        captureTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex-2}`});

            }
      } catch (e) {
        
        if (e.name != 'SyntaxError') {
          throw "Selected Tile is out of bound!";
        }
    }
    

   return {"validEmptyTiles" : validTiles, "captureTiles" : captureTiles};
   

}





 /**
  * 
  * @param {*} rowIndex 
  * @param {*} colIndex 
  * @param {*} color 
  */

 let rookValidMoves = (rowIndex, colIndex, color) => {

    /**
     * Rook Valid Moves
     * Rook can move horizontally and vertically in straight line.
     */

    let validTiles = [], captureTiles = [];
    let opponentPieceColor = ("W")? "B" : "W";

    try {
            if(!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7))
            {
                //top 
                for(let i = rowIndex + 1; i < 8; i++)
                    {
                        if(board[i][colIndex] != "--")
                            {
                                if(board[i][colIndex][0] == opponentPieceColor)
                                    captureTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`}); /* Opponent's piece */
                                break;

                            }

                        validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`}); /* Empty Tile */
                    }
                
                //bottom
                for(let i = rowIndex - 1; i >= 0; i--)
                    {
                        if(board[i][colIndex] != "--")
                        {
                            if(board[i][colIndex][0] == opponentPieceColor)
                                captureTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`}); /* Opponent's piece */
                            break;

                        }

                    validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                    }    

                //left
                for(let j = colIndex - 1; j >= 0; j--)
                    {
                        if(board[rowIndex][j] != "--")
                        {
                            if(board[rowIndex][j][0] == opponentPieceColor)
                                captureTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`}); /* Opponent's piece */
                            break;

                        }


                        validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});
                    }

                //right
                for(let j = colIndex + 1; j < 8; j++)
                    {
                        if(board[rowIndex][j] != "--")
                        {
                            if(board[rowIndex][j][0] == opponentPieceColor)
                                captureTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`}); /* Opponent's piece */
                            break;

                        }


                        validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});
                    }


                    


            }
        } catch (e) {
            
            if (e.name != 'SyntaxError') {
                throw "Selected Tile is out of bound!";
            }
        }

        return {"validEmptyTiles":validTiles, "captureTiles": captureTiles};
 }

 
 

  /**
   * 
   * @param {*} rowIndex 
   * @param {*} colIndex 
   * @param {*} color 
   */

  let bishopValidMoves = (rowIndex, colIndex, color) => {

    /**
     * Bishop Valid Moves
     * Bishop can move diagonally. 
     */

    let validTiles = [];
    let captureTiles = [];

    let opponentPieceColor = (color == "W") ? "B" : "W";

    try{

        if(!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7 ))
        {

           

            /* Top Left Diagonal */

            for(let i = rowIndex+1, j = colIndex-1; i < 8 && j >= 0 ; i++, j--)
            {
                if(isValidTile(i) && isValidTile(j))
                    {
                       
                        if(board[i][j] == "--") /* Empty Tile */
                            validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                        else
                            {
                                if(board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                                    captureTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                                break;

                            }
                    }
                
            }
 
            /* Bottom Left Diagonal */
           
            for(let i = rowIndex-1, j = colIndex-1; i >= 0 && j >= 0; i--, j--)
                {
                    if(isValidTile(i) && isValidTile(j))
                        {
                            
                            if(board[i][j] == "--") /* Empty Tile */
                                validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                            else
                                {
                                    if(board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                                        captureTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                                    break;

                                }
                        }
                    
                }

            
            /* Top Right Diagonal */
            
            for(let i = rowIndex+1, j = colIndex+1; i < 8 &&  j < 8; i++, j++)
            {
                if(isValidTile(i) && isValidTile(j))
                    {
                        
                        if(board[i][j] == "--") /* Empty Tile */
                            validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                        else
                            {
                                if(board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                                    captureTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                                break;

                            }
                    }
                
            }
           

            /* Bottom Right Diagonal */

            for(let i = rowIndex-1, j = colIndex+1; i >= 0 && j < 8; i--, j++)
            {
                if(isValidTile(i) && isValidTile(j))
                    {

                        if(board[i][j] == "--") /* Empty Tile */
                            validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                        else
                            {
                                if(board[i][j][0] == opponentPieceColor) /* Opponent's Piece */
                                    captureTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                                break;

                            }
                    }
                
            }

        }
    }catch(e){


        if(e.name != 'SyntaxError') {
            throw "Selected Tile is out of bound!";
        }
    }

    return {"validEmptyTiles":validTiles, "captureTiles":captureTiles};
  }

  /* End of Valid Bishop Move */

  /**
   * 
   * @param {*} rowIndex 
   * @param {*} colIndex 
   * @param {*} color 
   */
  let queenValidMoves = (rowIndex, colIndex, color) => {

    let validTiles = [];
    let captureTiles = [];

    let opponentPieceColor = (color == "W") ? "B" : "W";


    /* Queen can move like rook as well as bishop */

    try {
        
        if(!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7))
            {
                /* Rook-like moves for Queen */

                //top 
                for(let i = rowIndex + 1; i < 8; i++)
                    {
                        if(board[i][colIndex] != "--")
                            {
                                if(board[i][colIndex][0] == opponentPieceColor)
                                    captureTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});            
                                break;

                            }

                        validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                    }
                
                //bottom
                for(let i = rowIndex - 1; i >= 0; i--)
                {
                    if(board[i][colIndex] != "--")
                    {
                        if(board[i][colIndex][0] == opponentPieceColor)
                            captureTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});            
                        break;

                    }


                    validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                }    

                //left
                for(let j = colIndex - 1; j >= 0; j--)
                {
                    if(board[rowIndex][j] != "--")
                    {
                        if(board[rowIndex][j][0] == opponentPieceColor)
                            captureTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});            
                        break;

                    }


                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});
                }

                //right
                for(let j = colIndex + 1; j < 8; j++)
                {
                    if(board[rowIndex][j] != "--")
                    {
                        if(board[rowIndex][j][0] == opponentPieceColor)
                            captureTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});            
                        break;

                    }


                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});
                }

                /* Bishop-like moves for Queen */

                /* Top Left Diagonal */

                for(let i = rowIndex+1, j = colIndex-1; i < 8 && j >= 0 ; i++, j--)
                {
                    if(isValidTile(i) && isValidTile(j))
                        {
                            
                            if(board[i][j] == "--")
                                validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                            else
                            {
                                if(board[i][j][0] == opponentPieceColor)
                                    captureTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});            
                                break;
        
                            }
        
                        }
                   
                }
    
                /* Bottom Left Diagonal */
            
                for(let i = rowIndex-1, j = colIndex-1; i >= 0 && j >= 0; i--, j--)
                    {
                        if(isValidTile(i) && isValidTile(j))
                            {
                               
                                if(board[i][j] == "--")
                                    validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                                else
                                {
                                    if(board[i][j][0] == opponentPieceColor)
                                        captureTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});            
                                    break;
            
                                }
            
                            }
                       
                    }

                
                /* Top Right Diagonal */
                
                for(let i = rowIndex+1, j = colIndex+1; i < 8 &&  j < 8; i++, j++)
                {
                    if(isValidTile(i) && isValidTile(j))
                        {
                          
                            if(board[i][j] == "--")
                                validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                            else
                            {
                                if(board[i][j][0] == opponentPieceColor)
                                    captureTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});            
                                break;
        
                            }
        
                        }
                   
                }
            

                /* Bottom Right Diagonal */

                for(let i = rowIndex-1, j = colIndex+1; i >= 0 && j < 8; i--, j++)
                {
                    if(isValidTile(i) && isValidTile(j))
                        {

                            if(board[i][j] == "--")
                                validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                            else
                            {
                                if(board[i][j][0] == opponentPieceColor)
                                    captureTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});            
                                break;
        
                            }
        
                        }
                   
                }    


            }

    } catch (error) {
        
        if(error.name != "SyntaxError")
            throw("Index out of bound!");
    }

    return {"validEmptyTiles":validTiles, "captureTiles":captureTiles};
  }

  /* End of Queen Valid Moves */


  /* King Valid Moves */

  /**
   * 
   * @param {*} rowIndex 
   * @param {*} colIndex 
   * @param {*} color 
   */
    let kingValidMoves = (rowIndex, colIndex, color) => {

        /**
         * King moves 1 tile in any direction viz, top, bottom, left, right, diagonal
         * !!!! Current implementation of this method is not valid in all cases !!!!
         * Need to check if King is under attack by moving to any empty tile or
         * by capturing opponent's piece.
         */
        let validTiles = [], captureTiles = [];


        try {
            
            /* top tile */
            if(isValidTile(rowIndex+1))
                if(board[rowIndex+1][colIndex] == "--")
                    validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex}`});

            /* bottom tile */
            if(isValidTile(rowIndex-1))
                if(board[rowIndex-1][colIndex] == "--")
                    validTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex}`});
            
            /* left tile */
            if(isValidTile(colIndex-1))
                if(board[rowIndex][colIndex-1] == "--")
                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex": `${colIndex-1}`});
            
            /* right tile */
            if(isValidTile(colIndex+1))
                if(board[rowIndex][colIndex+1] == "--")
                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${colIndex+1}`});
            
            /* top left diagonal */
            if(isValidTile(rowIndex+1) && isValidTile(colIndex-1))
                if(board[rowIndex+1][colIndex-1] == "--")
                    validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex-1}`});
            
            /* bottom left diagonal */
            if(isValidTile(rowIndex-1) && isValidTile(colIndex-1))
                if(board[rowIndex-1][colIndex-1] == "--")
                    validTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex-1}`});

            /* top right diagonal */
            if(isValidTile(rowIndex+1) && isValidTile(colIndex+1))
                if(board[rowIndex+1][colIndex+1] == "--")
                    validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex+1}`});

            /* bottom right diagonal */
            if(isValidTile(rowIndex-1) && isValidTile(colIndex+1))
                if(board[rowIndex-1][colIndex+1] == "--")
                    validTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex+1}`});

        } catch (error) {
            if(error.name != 'SyntaxError')
                throw 'Index out of bound!';
        }

        return {"validEmptyTiles":validTiles, "captureTiles":captureTiles};
    }

  /* End of King Valid Moves */

  /* Check if King is under check */

 
  /**
   * Check if the King can come under check by movement of other pieces of the same player (called as discovery in normal chess terms)
   * This function needs to be called for every piece movement! `tile` parameter is the coordinates of the king `color` indicates the White/Black king
   */

   /**
    * 
    * @param {*} tile 
    */

  let isKingChecked = (tile, color) => {

    let opponentPieceColor = (color == 'W') ? 'B' : 'W';
    let isChecked = false;

    /* Check for threat from all the opponent pieces */

    for(let row = 0; row < 8; row++)
        {
            for(let col = 0; col < 8; col++)
            {
                if(tile[0] === opponentPieceColor) /* Possible threat for king */
                    {
                        let validMoveTiles = null; // has all possible valid moves for this opponent piece(including empty tiles and capture tiles)

                        switch(tile[1]){

                            case 'P': validMoveTiles = pawnValidMoves(row, col, opponentPieceColor);
                            break;

                            case 'N': validMoveTiles = knightValidMoves(row, col, opponentPieceColor);
                            break;

                            case 'B': validMoveTiles = bishopValidMoves(row, col, opponentPieceColor);
                            break;

                            case 'R': validMoveTiles = rookValidMoves(row, col, opponentPieceColor);
                            break;

                            case 'Q': validMoveTiles = queenValidMoves(row, col, opponentPieceColor);
                            break;

                            case 'K': validMoveTiles = kingValidMoves(row, col, opponentPieceColor);
                            break;

                            default: console.log('This is an alien piece!');

                        }

                        let tilesUnderAttack = validMoveTiles.captureTiles; //tiles that can be captured


                        for(tile of tilesUnderAttack)
                            if(tile.rowIndex == row && tile.colIndex == col) /* If this tile is under attack => King is under check */
                                {
                                    isChecked = true;
                                    break;
                                }
                    }
            }
            if(isChecked)
                break;
        }

    return isChecked;

  }