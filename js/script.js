const gameboard = (function () {    
    const board = new Array(9);
    const create = function (location) {
        boardDiv = document.querySelector(".board");
        board[location] = location;
        const cellDiv = document.createElement("div");
        cellDiv.textContent = location;
        cellDiv.classList.add("cell");
        cellDiv.classList.add("blank");
        boardDiv.appendChild(cellDiv);
        cellDiv.addEventListener('click', () => {
            update(board, cellDiv, "X", location);
            updateComp(board);
        });
    };
    const update = function (board, cellDiv, marker, location) {
        board[location] = marker;
        cellDiv.textContent = marker;
        cellDiv.classList.replace("blank", "marked");
        console.log(location); //test
        console.log(board); //test
        console.log(play.isThereAWinner(board));               
    };
    const updateComp = function (board) {
        compIndex = play.computerEasyLocation(board);
        nthChild = compIndex + 1;
        cellDivNth = document.querySelector(".board > .cell:nth-child(" + nthChild + ")");
        update(board, cellDivNth, "O", compIndex);
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
        return !(Number.isInteger(board[location]));
    };
    const computerEasyLocation = function (board) {
        compIndex = Math.floor(Math.random() * board.length);
        while (isCellOccupied(board, compIndex)) {
            computerEasyLocation(board);
        }
        return compIndex;
    };
    return { isThereAWinner, isCellOccupied, computerEasyLocation };
})();

for (i=0; i<9; i++){
    gameboard.create(i);
};