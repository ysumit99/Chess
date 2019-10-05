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
