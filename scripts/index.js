/* Initialize a 2d array to store pieces */
   
let board = new Array(8);

for(let i = 0; i < board.length; i++)
    board[i] = new Array(8);


/* Reset Board */

let resetBoard = function(){
   
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

/** Print board contents */
let printBoard = () => {
   
    for(rank of board)
        for(file of rank )
            console.log("piece = " + file);

}

resetBoard();
printBoard();



/** Check which tile has been clicked */
$('td').click(function(){
   

    let tile = $(this)[0].id;
    console.log("selected tile = " + tile);

    let colIndex = fileIndex(tile[0]);
    let rowIndex = rankIndex(tile[1]);

    console.log("Tile with row " + rowIndex + " and column " + colIndex + " is selected!");

    //check what is present in board array at this index
    console.log("Piece at the given position => " + board[rowIndex][colIndex]);
  alert("Piece at the given position => " + board[rowIndex][colIndex]);
})

/* Index of a file in the board array */
let fileIndex = function(file){

   
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
let rankIndex = function(rank) {

    

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