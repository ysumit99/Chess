let highlightValidTiles = (validTiles) => {

    console.log("tiles to be highlighted => given below ");
     
    let validEmptyTiles = validTiles.validEmptyTiles;
    let captureTiles = validTiles.captureTiles;

    // console.log("capture tiles ====> " + captureTiles);

    /* HighLight Empty Tiles in Blue  */
    for(tile of validEmptyTiles)
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

    /* HighLight Pieces to be captured in Red */
    for(tile of captureTiles)
        {
            console.log("valid Tiles coordinates => " + tile.rowIndex + ", " + tile.colIndex);

            let file = getFile(tile.colIndex);
            let rank = getRank(tile.rowIndex);
            let id = file+rank;

            console.log("id to be updated => " + id);
            //change box-shadow of these tiles to blue color

            
            $(`#${id}`).css("box-shadow", "inset  0 0 40px  #f13a1a");
            $(`#${id}`).css("border", "solid red 1px");

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
    
    /* popup  an alert indicating opponent's piece touched! */
    alert(`That's opponent's piece!`);
    
}

/* Turn Indicator */
let turnIndicator = (moveCount) => {

    if(moveCount % 2 == 0)
        {
            $('.turnBlack').css('box-shadow','');
            $('.turnWhite').css('box-shadow', '0px 0px 10px 10px rgb(248, 225, 19)');
            
            
        }else{

            
            $('.turnWhite').css('box-shadow','');
            $('.turnBlack').css('box-shadow', '0px 0px 10px 10px rgb(112, 111, 101)');

    }
} 

