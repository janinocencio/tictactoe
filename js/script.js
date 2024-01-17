const gameboard = (function () {
    const create = function () {
        return new Array(9);
    };
    const update = function (board, marker, location) {
        board[location] = marker;       
    };
    return { create, update };
})();
