/* Add to move history */
let addToMoveHistory = (tile, piece) => {

    if(moveCount % 2 == 0)
        $('#history-container').append(`<span class="badge badge-pill badge-light">${piece+tile}</span> : `);
    else    
    $('#history-container').append(`<span class="badge badge-pill badge-dark">${piece+tile}</span><br />`);

}
