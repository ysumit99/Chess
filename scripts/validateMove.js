
    /** Valid Moves for pieces 
    * 
    * Use board array to check the current board configuration,
    * and take current indexes i.e. rank, file and piece color  into account for selecting valid moves.
    * Note: All the indexes are O based !
    *   
    */
    

//Pawn ValidMoves
let pawnValidMoves = (rowIndex,colIndex,color) => {

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

//Knight ValidMoves
/**
 * Knight can jump over pieces, so no need to check blocking pieces like the way we did for pawns
 */
let knightValidMoves = (rowIndex, colIndex, color) => {

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


//Rook ValidMoves
/**
 * Rook can move horizontally and vertically in straight line.
 */

 let rookValidMoves = (rowIndex, colIndex, color) => {

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