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

/* get Tile status */
let getTileStatus = (tile) => {
    //console.log("inside getTilestatus =====> tile = " + tile);

    let status = "";

    let selectedTile = document.getElementById(`${tile}`);

    if(selectedTile.style.border == "")
        status = "unselected";
    else if(selectedTile.style.border == "1px solid blue")
        status = "validMoveTile";

    console.log("Tile status =====> " + status);

    return status;

}


