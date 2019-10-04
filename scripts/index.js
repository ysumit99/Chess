/* Initialize a 2d array to store pieces */
   
let board = new Array(8);
let moveCount = 0; //To keep track of whose move it is


/* Moving a piece is a two step process => select a valid piece and then move it to a valid tile */
let selectedTiles = []; //This helps in first step.

for(let i = 0; i < board.length; i++)
    board[i] = new Array(8);


/* Reset Board */
let resetBoard = () => {
   
    /* White Pieces */

    //Pawns
    for(let rank = 0; rank < 8; rank++)
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
    for(let rank = 0; rank < 8; rank++)
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
    for(let rank = 2; rank < 6; rank++)
        for(let file = 0; file < 8; file++)
            board[rank][file] = "--";
        
}

/* Print board contents */
let printBoard = () => {
   
    for(rank of board)
        for(file of rank )
            console.log("piece = " + file);

    

}

/* Index of a file in the board array */
let fileIndex = (file) => {

   
    let index = -1;
   

    switch(file){
        
        
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

}

/* Index of a rank in the board array */
let rankIndex = (rank) => {

    

    let index = -1;

    switch(rank){
        
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

}

/* get Rank for RowIndex */
let getRank = (rowIndex) => {

    console.log("rowIndex in gerRank function => " + rowIndex);

    let rank = "";

    switch(rowIndex){
        
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
}


/* get file for ColIndex */
let getFile = (colIndex) => {
    
    console.log("colIndex in getFile function => " + colIndex);

    let file = "";

    switch(colIndex){
        
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
}


/* Highlight the valid Tiles in blue */
let highlightValidTiles = (validTiles) => {

    console.log("tiles to be highlighted => given below ");
     
    for(tile of validTiles)
       {
            console.log("valid Tiles coordinates => " + tile.rowIndex + ", " + tile.colIndex);

            let file = getFile(tile.colIndex);
            let rank = getRank(tile.rowIndex);
            let id = file+rank;

            console.log("id to be updated => " + id);
            //change box-shadow of these tiles to blue color

           
            $(`#${id}`).css("box-shadow", "inset  0 0 40px  rgb(12, 112, 179)");
            $(`#${id}`).css("border", "solid blue 1px");

       } 


}

/* Unselect the selected tile  */
let resetHighLight = () => {

    $('td').css("box-shadow", "");
    $('td').css("border", "");
}

/* Highlight Valid selection (Player doesn't touch opponent's piece ) */
let validSelection = (tile) => {
    
    let selectedTile = document.getElementById(`${tile}`);
    
    //valid so green border and shadow
    selectedTile.style.boxShadow = "inset 0 0 40px  rgb(193, 231, 56)";
    selectedTile.style.border = "solid green 1px";
    
    

}

/* HighLight Invalid selection (Player tries to touch opponent's piece ) */
let invalidSelection = (tile) => {

    let selectedTile = document.getElementById(`${tile}`);
    
    //Invalid so red box-shadow
    selectedTile.style.boxShadow = "inset 0 0 40px rgb(235, 42, 42)";
  
    
}


/* get Tile status */
let getTileStatus = (tile) => {
    //console.log("inside getTilestatus =====> tile = " + tile);

    let status = "";

    let selectedTile = document.getElementById(`${tile}`);

    if(selectedTile.style.border == "")
        status = "unselected";
    else if(selectedTile.style.border == "1px solid rgb(0, 0, 255)")
        status = "validMoveTile";

        console.log("Tile status =====> " + status);

    return status;

}

/* get svg location */
let SVGLocation = (row, col) => {

    let location = "";

    switch(board[row][col]){


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
}
/* Update Board */
let updateBoard = (initialTile, finalTile) => {

    console.log("==========inside updateBoard function ==================");

        let row1 = initialTile.rowIndex, col1 = initialTile.colIndex;
        let row2 = finalTile.rowIndex, col2 = finalTile.colIndex;

        board[row2][col2] = board[row1][col1]; //file tile updated
        console.log("final tile after moving the piece => " + board[row2][col2]);

        board[row1][col1] = "--";//initial tile is empty
        console.log("initial tile after moving => " + board[row1][col1]);


        let rank1 = getRank(`${row1}`);
        let rank2 = getRank(`${row2}`);
    
        
        let file1 = getFile(`${col1}`);
        let file2 = getFile(`${col2}`);
        
        //get the updated SVG for piece on finalTile
        let location = SVGLocation(row2, col2);
        
        console.log("upadted piece svg location => " + location);

        //Move the piece to final tile
        $(`#${file2}` + `${rank2}`).html(`<img src = '${location}' alt = "chess piece" />`);

        //empty the initial tile
        $(`#${file1}` + `${rank1}`).html("");

         
    console.log("==========end of updateBoard function ==================");

    return;
}

/* Add to move history */
let addToMoveHistory = (tile, piece) => {

    if(moveCount % 2 == 0)
        $('#history-container').append(`<span class="badge badge-pill badge-light">${piece+tile}</span> : `);
    else    
    $('#history-container').append(`<span class="badge badge-pill badge-dark">${piece+tile}</span><br />`);

}


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

//Exceution starts from here
resetBoard();
printBoard();





    /** Highlight tiles and show valid moves  */
    $('td').click(function(){

        let tile = $(this)[0].id;
        const tileStatus = getTileStatus(tile); 

        console.log("tileStatus ======= > " + tileStatus);
            
            if($(this).css('border') == '') //unselected tile
            {

                
                console.log("selected tile = " + tile);
            
                let colIndex = fileIndex(tile[0]);
                let rowIndex = rankIndex(tile[1]);
            
                console.log("Tile with row " + rowIndex + " and column " + colIndex + " is selected!");
            
                //check what is present in board array at this index
                console.log("Piece at the given position => " + board[rowIndex][colIndex]);
                //alert("Piece at the given position => " + board[rowIndex][colIndex]);
            
              
                //Remove shadow and border from previously selected tile
                resetHighLight();
            
            
                //Highlight empty tile in yellow color
                if(board[rowIndex][colIndex] == "--")
                    {
                    
                        //HighLight the current  tile
                        $(this).css("box-shadow","inset  0 0 40px rgb(193, 231, 56)");
            
                    }
                else // the selected tile has some piece
                {
            
                    //If white's move
                    if(moveCount % 2 == 0)
                    {
                        console.log("moveCount = " + moveCount);
            
                        //selected piece belongs to white
                        if(board[rowIndex][colIndex][0] == 'W') // A valid tile selected
                            {
                                
                                validSelection(tile);
                               
                                //this will be useful when moving the piece;
                                selectedTiles.push(tile);

                                
                                //if(piece == White Pawn)
                                if(board[rowIndex][colIndex] == "WP")
                                {
                                    let validTiles = pawnValidMoves(rowIndex, colIndex, "W");
                                    highlightValidTiles(validTiles);
            
                                }
            
                            }
                        else 
                            invalidSelection(tile);//opponent's piece
                    }
                    else //black's move
                    {

                        //selected piece belongs to black
                        if(board[rowIndex][colIndex][0] == 'B') // A valid tile selected
                        {
                            //A valid tile is selected
                            validSelection(tile);
                            
                             //this will be useful when moving the piece;
                             selectedTiles.push(tile);

                            
                            //if(piece == Black Pawn)
                            if(board[rowIndex][colIndex] == "BP")
                            {
                                let validTiles = pawnValidMoves(rowIndex, colIndex, "B");
                                highlightValidTiles(validTiles);
        
                            }
            
                        }
                        else
                            invalidSelection(tile);//opponent's piece
                    }
                }
            
                
            
        
            }
            else if($(this).css("border") == '1px solid rgb(0, 0, 255)')//one of the validMoves tiles is selected
            {
                //alert("this is a valid move! Now actually move the piece");

                let thisTile = tile;
                let selectedTile = selectedTiles[0];

                //move piece from previously selectedTile to this tile
                console.log("selectedTile = " + selectedTile + " | thisTile = " + thisTile);

                

                /* update board configuration */

                    //get index for selectedTile
                    let selectedTileColIndex = fileIndex(selectedTile[0]);
                    let selectedTileRowIndex = rankIndex(selectedTile[1]);

                    console.log("index for selectedTile = " + selectedTileRowIndex + ", " + selectedTileColIndex);

                    //get index for this tile
                    let thisTileColIndex = fileIndex(thisTile[0]);
                    let thisTileRowIndex = rankIndex(thisTile[1]);

                    console.log("index for thisTile = " + thisTileRowIndex + ", " + thisTileColIndex);

                    //piece selected
                    let piece = board[selectedTileRowIndex][selectedTileColIndex][1];

                    let initialTile = {"rowIndex":selectedTileRowIndex, "colIndex":selectedTileColIndex};//piece to be moved
                    let finalTile = {"rowIndex":thisTileRowIndex, "colIndex":thisTileColIndex};//move to this tile
               
                //this updates board array and page
                updateBoard(initialTile, finalTile);
                resetHighLight();
                
                
                
                //update the move history
                piece = (piece == "P") ? "" : piece; //Algebraic notation ignores Pawn

                addToMoveHistory(thisTile, piece);
                
                
                //reprint the updated Board!
                printBoard();

                //update moveCount
                moveCount++;

                //empty selectedTiles
                selectedTiles.length = 0;

               

              
            }
           
            // else if($(this)[0].id == selectedTiles[0])
            // {
            //     selectedTiles.length = 0;
            //     resetHighLight();
            // }
            // else{
                
            //     console.log("debug => " + $(this)[0].id);
            //     selectedTiles.length = 0;
            //     resetHighLight();

            //     //alert("Now the piece has to be moved!");
            //     console.log($(this)[0]);

            //     //alert($(this).css('box-shadow'));
            //     for(tile in selectedTiles)
            //         console.log(" => " + selectedTiles[tile]);

            // }
            
            //console.log("=> bjsdfj => " + selectedTiles[0]);

    

    })

