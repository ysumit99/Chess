
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
