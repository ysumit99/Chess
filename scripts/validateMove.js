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
     * Pawn can move one/two tiles for the first time and only once in subsequent moves.
     */


    console.log("rowIndex = " + rowIndex + " | colIndex = " + colIndex + "  color = " + color);

    
    let validTiles = [];
    
    /* If White pawn */
    if(color == "W")
    {
       
        if(rowIndex == 1) //if first move => 2 possible moves
        {
        
            for(let i = rowIndex+1 ; i < (rowIndex + 3) && i < 8; i++)
            {
               
                if(board[i][colIndex] == '--')
                    validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                else
                    break; //A piece present in the way

            }
        }
        else //else only a single move possible
        {
            for(let i = rowIndex+1 ; i < (rowIndex + 2) && i < 8; i++)
            {
                if(board[i][colIndex] == '--')
                    validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                else
                    break; //A piece present in the way

            }
        }
    }
    else if(color == "B")
    {
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
        else //else only a single move possible
        {
            for(let i = rowIndex-1 ; i > (rowIndex - 2) && i >= 0; i++)
            {
                if(board[i][colIndex] == '--')
                    validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                else
                    break; //A piece present in the way

            }
        }
    }

      

        


    return validTiles;
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

    let validTiles = [];
    
    console.log("rowIndex ===> " + rowIndex + " | colIndex ===> " + colIndex);
    try {
            if(!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7))
            {
                /** There are 8 possible moves for Knight. The 4 pairs are as followed  */

                //top half moves
                if(isValidTile(rowIndex+2) && isValidTile(colIndex+1))
                    if(board[rowIndex+2][colIndex+1]=="--")
                        validTiles.push({"rowIndex":`${rowIndex+2}`, "colIndex":`${colIndex+1}`});

                if(isValidTile(rowIndex+2) && isValidTile(colIndex-1))
                    if(board[rowIndex+2][colIndex-1]=="--")
                        validTiles.push({"rowIndex":`${rowIndex+2}`, "colIndex":`${colIndex-1}`});
                
                if(isValidTile(rowIndex+1) && isValidTile(colIndex+2))
                    if(board[rowIndex+1][colIndex+2]=="--")
                        validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex+2}`});

                if(isValidTile(rowIndex+1) && isValidTile(colIndex-2))
                    if(board[rowIndex+1][colIndex-2]=="--")
                        validTiles.push({"rowIndex":`${rowIndex+1}`, "colIndex":`${colIndex-2}`});

                //bottom half moves
                if(isValidTile(rowIndex-2) && isValidTile(colIndex+1))
                    if(board[rowIndex-2][colIndex+1]=="--")
                        validTiles.push({"rowIndex":`${rowIndex-2}`, "colIndex":`${colIndex+1}`});

                if(isValidTile(rowIndex-2) && isValidTile(colIndex-1))
                    if(board[rowIndex-2][colIndex-1]=="--")
                        validTiles.push({"rowIndex":`${rowIndex-2}`, "colIndex":`${colIndex-1}`});

                if(isValidTile(rowIndex-1) && isValidTile(colIndex+2))
                    if(board[rowIndex-1][colIndex+2]=="--")
                        validTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex+2}`});

                if(isValidTile(rowIndex-1) && isValidTile(colIndex-2))
                    if(board[rowIndex-1][colIndex-2]=="--")
                        validTiles.push({"rowIndex":`${rowIndex-1}`, "colIndex":`${colIndex-2}`});

            }
      } catch (e) {
        
        if (e.name != 'SyntaxError') {
          throw "Selected Tile is out of bound!";
        }
    }
    

   
    console.log(validTiles.length);
   return validTiles;
   

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

    let validTiles = [];

    try {
            if(!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7))
            {
                //top 
                for(let i = rowIndex + 1; i < 8; i++)
                    {
                        if(board[i][colIndex] != "--")
                            break;

                        validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                    }
                
                //bottom
                for(let i = rowIndex - 1; i >= 0; i--)
                {
                    if(board[i][colIndex] != "--")
                        break;

                    validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                }    

                //left
                for(let j = colIndex - 1; j >= 0; j--)
                {
                    if(board[rowIndex][j] != "--")
                        break;

                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});
                }

                //right
                for(let j = colIndex + 1; j < 8; j++)
                {
                    if(board[rowIndex][j] != "--")
                        break;

                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});
                }


                    


            }
        } catch (e) {
            
            if (e.name != 'SyntaxError') {
                throw "Selected Tile is out of bound!";
            }
        }

        return validTiles;
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

    try{

        if(!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7 ))
        {

           

            /* Top Left Diagonal */

            for(let i = rowIndex+1, j = colIndex-1; i < 8 && j >= 0 ; i++, j--)
            {
                if(isValidTile(i) && isValidTile(j))
                    {
                        // console.log("top left ===> " + board[i][j]);
                        if(board[i][j] == "--")
                            validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                        else
                            break;
                    }
                else
                    break;
            }
 
            /* Bottom Left Diagonal */
           
            for(let i = rowIndex-1, j = colIndex-1; i >= 0 && j >= 0; i--, j--)
                {
                    if(isValidTile(i) && isValidTile(j))
                        {
                            console.log("bottom left ===> " + board[i][j]);
                            if(board[i][j] == "--")
                                validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                            else
                                break;
                        }
                    else
                        break;
                }

            
            /* Top Right Diagonal */
            
            for(let i = rowIndex+1, j = colIndex+1; i < 8 &&  j < 8; i++, j++)
            {
                if(isValidTile(i) && isValidTile(j))
                    {
                        // console.log("top right ===> " + board[i][j]);
                        if(board[i][j] == "--")
                            validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                        else
                            break;
                    }
                else
                    break;
            }
           

            /* Bottom Right Diagonal */

            for(let i = rowIndex-1, j = colIndex+1; i >= 0 && j < 8; i--, j++)
            {
                if(isValidTile(i) && isValidTile(j))
                    {

                        console.log("bottom right ===> " + board[i][j]);
                        if(board[i][j] == "--")
                            validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                        else
                            break;
                    }
                else
                    break;
            }

        }
    }catch(e){


        if(e.name != 'SyntaxError') {
            throw "Selected Tile is out of bound!";
        }
    }

    return validTiles;
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

    /* Queen can move like rook as well as bishop */

    try {
        
        if(!(rowIndex < 0 || rowIndex > 7 || colIndex < 0 || colIndex > 7))
            {
                /* Rook-like moves for Queen */

                //top 
                for(let i = rowIndex + 1; i < 8; i++)
                    {
                        if(board[i][colIndex] != "--")
                            break;

                        validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                    }
                
                //bottom
                for(let i = rowIndex - 1; i >= 0; i--)
                {
                    if(board[i][colIndex] != "--")
                        break;

                    validTiles.push({"rowIndex":`${i}`, "colIndex":`${colIndex}`});
                }    

                //left
                for(let j = colIndex - 1; j >= 0; j--)
                {
                    if(board[rowIndex][j] != "--")
                        break;

                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});
                }

                //right
                for(let j = colIndex + 1; j < 8; j++)
                {
                    if(board[rowIndex][j] != "--")
                        break;

                    validTiles.push({"rowIndex":`${rowIndex}`, "colIndex":`${j}`});
                }

                /* Bishop-like moves for Queen */

                /* Top Left Diagonal */

                for(let i = rowIndex+1, j = colIndex-1; i < 8 && j >= 0 ; i++, j--)
                {
                    if(isValidTile(i) && isValidTile(j))
                        {
                            // console.log("top left ===> " + board[i][j]);
                            if(board[i][j] == "--")
                                validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                            else
                                break;
                        }
                    else
                        break;
                }
    
                /* Bottom Left Diagonal */
            
                for(let i = rowIndex-1, j = colIndex-1; i >= 0 && j >= 0; i--, j--)
                    {
                        if(isValidTile(i) && isValidTile(j))
                            {
                                console.log("bottom left ===> " + board[i][j]);
                                if(board[i][j] == "--")
                                    validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                                else
                                    break;
                            }
                        else
                            break;
                    }

                
                /* Top Right Diagonal */
                
                for(let i = rowIndex+1, j = colIndex+1; i < 8 &&  j < 8; i++, j++)
                {
                    if(isValidTile(i) && isValidTile(j))
                        {
                            // console.log("top right ===> " + board[i][j]);
                            if(board[i][j] == "--")
                                validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                            else
                                break;
                        }
                    else
                        break;
                }
            

                /* Bottom Right Diagonal */

                for(let i = rowIndex-1, j = colIndex+1; i >= 0 && j < 8; i--, j++)
                {
                    if(isValidTile(i) && isValidTile(j))
                        {

                            console.log("bottom right ===> " + board[i][j]);
                            if(board[i][j] == "--")
                                validTiles.push({"rowIndex":`${i}`, "colIndex":`${j}`});
                            else
                                break;
                        }
                    else
                        break;
                }    


            }

    } catch (error) {
        
        if(error.name != "SyntaxError")
            throw("Index out of bound!");
    }

    return validTiles;
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
         */
        let validTiles = [];

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

        return validTiles;
    }

  /* End of King Valid Moves */