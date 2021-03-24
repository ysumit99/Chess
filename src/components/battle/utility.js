let fileIndex = (file) => {


    let index = -1;


    switch (file) {


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

    switch (rank) {

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

let isValidTile = (index) => {

    let isValid = true;

    if (index < 0 || index > 7)
        isValid = false;

    return isValid;

}

/* get Rank for RowIndex */
let getRank = (rowIndex) => {

    console.log("rowIndex in gerRank function => " + rowIndex);

    let rank = "";

    switch (rowIndex) {

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

    //console.log("colIndex in getFile function => " + colIndex);

    let file = "";

    switch (colIndex) {

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


export { rankIndex, fileIndex, isValidTile, getRank, getFile };