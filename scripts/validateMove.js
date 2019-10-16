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
                    else if(board[rowIndex-1][colIndex+2][0] == opponentPieceColor ) /* Opponent's piece */
                        captureTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex+2}`});

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
                if(board[rowIndex+1][colIndex] == "--" && !isKingChecked( {"rowIndex":rowIndex+1, "colIndex":colIndex}, color))
                    validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex}`});

            /* bottom tile */
            if(isValidTile(rowIndex-1))
                if(board[rowIndex-1][colIndex] == "--" && !isKingChecked({"rowIndex":rowIndex-1, "colIndex":colIndex}, color))
                    validTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex}`});
            
            /* left tile */
            if(isValidTile(colIndex-1))
                if(board[rowIndex][colIndex-1] == "--" && !isKingChecked({"rowIndex":rowIndex, "colIndex":colIndex-1}, color))
                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex": `${colIndex-1}`});
            
            /* right tile */
            if(isValidTile(colIndex+1))
                if(board[rowIndex][colIndex+1] == "--" && !isKingChecked({"rowIndex":rowIndex, "colIndex":colIndex+1}, color))
                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${colIndex+1}`});
            
            /* top left diagonal */
            if(isValidTile(rowIndex+1) && isValidTile(colIndex-1))
                if(board[rowIndex+1][colIndex-1] == "--" && !isKingChecked({"rowIndex":rowIndex+1, "colIndex":colIndex-1}, color))
                    validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex-1}`});
            
            /* bottom left diagonal */
            if(isValidTile(rowIndex-1) && isValidTile(colIndex-1))
                if(board[rowIndex-1][colIndex-1] == "--" && !isKingChecked({"rowIndex":rowIndex-1, "colIndex":colIndex-1}, color))
                    validTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex-1}`});

            /* top right diagonal */
            if(isValidTile(rowIndex+1) && isValidTile(colIndex+1))
                if(board[rowIndex+1][colIndex+1] == "--" && !isKingChecked({"rowIndex":rowIndex+1, "colIndex":colIndex+1}, color))
                    validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex+1}`});

            /* bottom right diagonal */
            if(isValidTile(rowIndex-1) && isValidTile(colIndex+1))
                if(board[rowIndex-1][colIndex+1] == "--" && !isKingChecked({"rowIndex":rowIndex-1, "colIndex":colIndex+1}, color))
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
   * This function needs to be called for every piece movement! `validKingTile` parameter is the coordinates of the valid king tile likewise `color` indicates king's color.
   */

    /**
     * 
     * @param {*} kingTile 
     * @param {*} color 
     */

  let isKingChecked = (validKingTile, color) => {
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
        for(let row = rowIndex + 1; row < 8; row++)
            {
                console.log("attack by rook/Queen top");

                if(board[row][colIndex] != "--" && board[row][colIndex][0] != opponentPieceColor) /* same color so no threat */
                    {
                        
                        break;
                    }
                
                if(board[row][colIndex][1] == 'R' || board[row][colIndex][1] == 'Q') 
                    {
                        isChecked = true;
                        return isChecked;
                    } 
                
            }
        
        //Attack by Rook/Queen from bottom
        for(let row = rowIndex - 1; row >= 0; row--)
            {
                console.log("attack by rook/Queen bottom");
                if(board[row][colIndex] != "--" && board[row][colIndex][0] != opponentPieceColor) /* same color so no threat */
                    {
                       
                        break;
                    }
                
                if(board[row][colIndex][1] == 'R' || board[row][colIndex][1] == 'Q') 
                    {
                        isChecked = true;
                        return isChecked;
                    } 
                
            }
        
        
        //Attack by Rook/Queen from Left
        for(let col = colIndex-1; col >= 0; col--)
        {
            console.log("attack by rook/Queen Left");
            if(board[rowIndex][col] != "--" && board[rowIndex][col][0] !== opponentPieceColor) /* same color so no threat */
                {
                    
                    break;   
                }
            
            if(board[rowIndex][col][1] === 'R' || board[rowIndex][col][1] === 'Q')
                {
                    isChecked = true;
                    return isChecked;
                }
        }


        //Attacks by Rook/Queen from Right
        for(let col = colIndex+1; col < 8; col++)
        {
            console.log("attack by rook/Queen Right");
            if(board[rowIndex][col] != "--" && board[rowIndex][col][0] !== opponentPieceColor) /* same color so no threat */
                break; 
            
            if(board[rowIndex][col][1] === 'R' || board[rowIndex][col][1] === 'Q')
                {
                    isChecked = true;
                    return isChecked;
                }
        }



    /* Diagonal Attacks by Bishops and Queen */

        //top left diagonal
        for(let row = rowIndex + 1, col = colIndex-1; row < 8 && col >= 0; row++, col--)
        {
            console.log("Bishop/Queen top left Diagonal");
            
            if(board[row][col] != "--" && board[row][col][0] != opponentPieceColor) /* same color so no threat */
                break;

            if(board[row][col][1] === 'Q' || board[row][col][1] === 'B')
                {
                    isChecked = true;
                    console.log("ischecked ===> " + isChecked);
                    return isChecked;
                }
            else
                console.log(board[row][col] + " is not a threat!");
        }

        //top right diagonal
        for(let row = rowIndex + 1, col = colIndex + 1; row < 8 && col < 8; row++, col++)
        {
            console.log("attack by Bishop/Queen top right diagonal");
            if(board[row][col] != "--" && board[row][col][0] !== opponentPieceColor) /* same color so no threat */
                break;

            if(board[row][col][1] === 'Q' || board[row][col][1] === 'B')
                {
                    isChecked = true;
                    return isChecked;
                }
        }

        //bottom left diagonal
        for(let row = rowIndex - 1, col = colIndex - 1; row >= 0 && col >= 0; row--, col--)
        {
            console.log("attack by Bishop/Queen bottom-left Diagonal");
            if(board[row][col] != "--" && board[row][col][0] !== opponentPieceColor) /* same color so no threat */
                break;

            if(board[row][col][1] === 'Q' || board[row][col][1] === 'B')
                {
                    isChecked = true;
                    return isChecked;
                }
        }

        //bottom right diagonal
        for(let row = rowIndex-1, col = colIndex+1; row >= 0 && col < 8; row--, col++)
        {
            console.log("attack by Bishop/Queen bottom-right diagonal");
            if(board[row][col] != "--" && board[row][col][0] !== opponentPieceColor) /* same color so no threat */
                break;

            if(board[row][col][1] === 'Q' || board[row][col][1] === 'B')
                {
                    isChecked = true;
                    return isChecked;
                }
        }




    /* Attacks by pawn */
        if(color == 'W')  //White King is being attcked
        {

            // Attack by top-left diagonal pawn
            if(isValidTile(rowIndex+1) && isValidTile(colIndex-1))
            {
                console.log("attack on white king by top-left black pawn");
                if(board[rowIndex+1][colIndex-1][0] === opponentPieceColor && board[rowIndex+1][colIndex-1][1] === 'P')
                    {
                        isChecked = true;
                        return isChecked;
                    }
            }


            // Attack by top-right diagonal pawn
            if(isValidTile(rowIndex+1) && isValidTile(colIndex+1))
            {
                console.log("attack on white king by top-right black pawn");
                if(board[rowIndex+1][colIndex+1][0] === opponentPieceColor && board[rowIndex+1][colIndex+1][1] === 'P')
                    {
                        isChecked = true;
                        return isChecked;
                    }
            }

        }
        else if(color == 'B') //Black King is being attacked
        {

            // Attack by bottom-left diagonal pawn
            if(isValidTile(rowIndex-1) && isValidTile(colIndex-1))
            {
                console.log("attack on black King by bottom-left diagonal white pawn");
                if(board[rowIndex-1][colIndex-1][0] === opponentPieceColor && board[rowIndex-1][colIndex-1][1] === 'P')
                    {
                        isChecked = true;
                        return isChecked;
                    }
            }


            //Attack by bottom-right diagonal pawn
            if(isValidTile(rowIndex-1) && isValidTile(colIndex+1))
            {
                console.log("attack on black king by bottom-right diagonal white pawn");
                if(board[rowIndex-1][colIndex+1][0] === opponentPieceColor && board[rowIndex-1][colIndex+1][1] === 'P')
                    {
                        isChecked = true;
                        return isChecked;
                    }
            }

        }
    
   
    

    //console.log("ischecked => " + isChecked);

    return isChecked;

  }