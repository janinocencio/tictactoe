const gameboard = (function () {    
    const board = new Array(9);
    const create = function (location) {
        boardDiv = document.querySelector(".board");
        const cellDiv = document.createElement("div");
        board[location] = location;
        cellDiv.textContent = location;
        cellDiv.classList.add("cell");
        cellDiv.classList.add("blank");
        boardDiv.appendChild(cellDiv);
        cellDiv.addEventListener('click', () => {
            update(board, "X", location);
            cellDiv.textContent = "X";
            cellDiv.classList.replace("blank", "marked");
            console.log(location);
            console.log(board);
            console.log(play.isThereAWinner(board));
        });
    };
    const update = function (board, marker, location) {
        board[location] = marker;
               
    };
    return { create, update };
})();

const player = (function () {
    let marker = ""
    const setMarker = function (markerInput) {
        if (markerInput === "x" || markerInput === "X") {marker = "X"}
        else if (markerInput === "o" || markerInput === "O") {marker = "O"}
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

for (i=0; i<9; i++){
    gameboard.create(i);
};