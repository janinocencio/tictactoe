const gameboard = (function () {
    const create = function () {
        return new Array(9);
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