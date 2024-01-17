const gameboard = (function () {
    const create = new Array(9);
    const update = function (board, marker, location) {
        return board[location] = marker;       
    };
    return { create, update };
})();
