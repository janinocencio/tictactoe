(function() {
    const gameboard = {
        board: new Array(9),
        playerMarker: "X",
        computerMarker: "O",

        init: function() {
            this.cacheDOM();
            this.render();
            this.cacheDOM(); //Re-called to capture cellDivs
            this.bindEvents();
        },
        
        cacheDOM: function() {
            boardDiv = document.querySelector(".board");
            cellDivs = document.querySelectorAll(".board > div");
            resetBtn = document.querySelector("#reset");
        },

        render: function() {
            //Initial render - empty array
            if (this.board.join("") === "") {
                for(let i=0; i<this.board.length; i++) {
                    this.board[i] = i;
                    const cellDiv = document.createElement("div");
                    cellDiv.classList.add("cell");
                    cellDiv.classList.add("blank");
                    boardDiv.appendChild(cellDiv);
                }
            //Subsequent renders    
            } else { 
                for(let i=0; i<this.board.length; i++) {
                    nthChild = i + 1;
                    cellDiv = document.querySelector(".board > div:nth-child(" + nthChild + ")");
                    cellDiv.textContent = this.board[i];
                    if (this.board[i] === "X" || this.board[i] === "O") { 
                        cellDiv.classList.replace("blank", "marked") 
                    };
                }
            }                    
        },

        bindEvents: function() {
            for(let i=0; i<this.board.length; i++) {
                cellDivs[i].addEventListener('click', () => { 
                    this.update(this.board, this.playerMarker, i); //Player plays
                    if (this.isThereAWinner()) this.gameEnds(this.playerMarker)
                    else {
                        this.update(this.board, this.computerMarker, this.getCompIndex()); //Computer plays
                        if (this.isThereAWinner()) this.gameEnds(this.computerMarker);
                    } 
                });
            };
            resetBtn.addEventListener('click', this.reset.bind(this));
        },

        update: function(board, marker, location) {
            board[location] = marker;
            this.render();
        },

        getCompIndex: function() {
            if (this.board.every(element => (element === "X" || element === "O"))) { return null }
            else {           
                do {
                    compIndex = Math.floor(Math.random() * this.board.length);
                } while (this.board[compIndex] === "X" || this.board[compIndex] === "O");
                return compIndex;
            }
        },

        isThereAWinner: function() {
            for (i=0; i<3; i++) {
                if (this.board[i*3] === this.board[(i*3)+1] && this.board[i*3] === this.board[(i*3)+2]) return true; //row
                else if (this.board[i] === this.board[i+3] && this.board[i] === this.board[i+6]) return true; //column
                else if (i < 2) {
                    if (this.board[i*2] === this.board[4] && this.board[i*2] === this.board[8-(i*2)]) return true; //diagonal
                }
            }
        },

        reset: function() {
            cellDivs.forEach(childDiv => childDiv.remove());
            boardDiv.style.pointerEvents = "auto";
            this.board = new Array(9);
            this.init();
        },

        gameEnds: function(marker) {
            if (marker === "X") alert("Player wins!")
            else if (marker === "O") alert("Computer wins!");
            boardDiv.style.pointerEvents = "none";
        },
    };

    gameboard.init();

})();