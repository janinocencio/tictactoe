const gameboard = (function () {
    const create = function () {
        board = new Array(9);
        for (i=0; i<9; i++) {
            board[i] = "dummy-" + i;
        };
        return board;
    };
    const update = function (board, marker, location) {
        board[location] = marker;       
    };
    return { create, update };
})();

const player = (function () {
    let marker = ""
    const setMarker = function (markerInput) {
        if (markerInput === "x" || markerInput === "X") {marker = "x"}
        else if (markerInput === "o" || markerInput === "O") {marker = "o"}
        else {console.log("Enter 'x' or 'o' only.")};
    };
    const getMarker = function() {
        return marker;
    };
    return { setMarker, getMarker };
})();

const play = (function() {
    const isThereAWinner = function (board) {
        for (i=0; i<3; i++) {
            if (board[i*3] === board[(i*3)+1] && board[i*3] === board[(i*3)+2]) return true; //row
            else if (board[i] === board[i+3] && board[i] === board[i+6]) return true; //column
            else if (i < 2) {
                if (board[i*2] === board[4] && board[i*2] === board[8-(i*2)]) return true; //diagonal
            }
        }
    };
    const isCellOccupied = function (board, location) {
        return !(board[location].startsWith("dummy"));
    }

    return { isThereAWinner, isCellOccupied };
})();

// board = gameboard.create();
// player.setMarker("X");
// gameboard.update(board,player.getMarker(),0);
// gameboard.update(board,player.getMarker(),4);
// gameboard.update(board,player.getMarker(),8);
// play.isThereAWinner(board);
