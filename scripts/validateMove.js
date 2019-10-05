
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