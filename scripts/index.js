// require("./board");
// require("./highlightBoard");
// require("./validateMove");
// require("./moveHistory");
// require("./utility");

/* Initialize a 2d array to store pieces */
let board = new Array(8);

for(let i = 0; i < board.length; i++)
    board[i] = new Array(8);

let moveCount = 0; //To keep track of whose move it is


/* Moving a piece is a two step process => select a valid piece and then move it to a valid tile */
let selectedTiles = []; //This helps in first step.


//Exceution starts from here
resetBoard();
printBoard();





    /** Highlight tiles and show valid moves  */
    $('td').click(function(){

        let tile = $(this)[0].id;
        const tileStatus = getTileStatus(tile); 
     
            if(tileStatus == "unselected") //unselected tile
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

                                
                                //piece == White Pawn
                                if(board[rowIndex][colIndex] == "WP")
                                {
                                    let validTiles = pawnValidMoves(rowIndex, colIndex, "W");
                                    highlightValidTiles(validTiles);
            
                                }
                                else if(board[rowIndex][colIndex] == "WN")/*piece == White Knight */{
                                    
                                    let validTiles = knightValidMoves(rowIndex, colIndex, "W");
                                    console.log("validTiles for Knight => " + validTiles);
                                    
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
            else if(tileStatus == "validMoveTile")//one of the validMoves tiles is selected
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
           
            
    

    })

