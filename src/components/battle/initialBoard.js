let initialBoard = Array(8).fill().map(_ => Array(8).fill(null));
initialBoard[0] = ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"];
initialBoard[1] = ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"];
initialBoard[6] = ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"];
initialBoard[7] = ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"];

export default initialBoard;