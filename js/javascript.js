// Factory function to create player objects
const Player = function(position, symbol, role) {

    return {
        position, // 1 , 2
        symbol, // "X" , "O"
        role, // "human", "ai-easy", "ai-normal", "ai-impossible"
    }
}

// Module to store the gameboard as an array and to manage it as well as the game AI.
const gameController = (function() {

    let counter = 0;
    let _gameGrid = []

    // Empties the gameGrid array and fills it with nine empty strings ""
    function resetGameGrid() {
        _gameGrid = [];
        for (let i = 0; i < 9; i++) {
            _gameGrid.push("");
        }
    }

    // Function to return _gameGrid array for external use
    function getGameGrid() {
        return _gameGrid
    }

    // Function to update gameGRid array with "X" or "O"
    function updateGameGrid(gridSpaceId, symbol) {
        _gameGrid[gridSpaceId] = symbol;
    }

    // Function to return an array filled with the index of the remaining playable spaces in the gamegrid
    function getPlayableGameSpaces(gameGrid = _gameGrid) {
        let playableSpaces = []
        for (let i = 0; i < gameGrid.length; i++) {
            if (gameGrid[i] === "") {
                playableSpaces.push(i);
            }
        }
        return playableSpaces;
    }

    // Easy AI function, random legal moves, returns a _gameGrid index which is a grid space div ID#
    function easyAI(playableSpaces = getPlayableGameSpaces()) {
        return playableSpaces[Math.floor(Math.random() * playableSpaces.length)];
    }

    // Normal AI function, returns a _gameGrid index which is a grid space div ID#
    function normalAI(playableSpaces = getPlayableGameSpaces()) {
        if (counter % 2 === 1) {
            return easyAI();
        } else if (counter % 2 === 0) {
            return impossibleAI().index
        }
    }

    // It is possible to create an unbeatable AI using the minimax algorithm

    // Impossible AI function, returns a _gameGrid index which is a grid space div ID#
    function impossibleAI(gameGrid = _gameGrid, playableSpaces = getPlayableGameSpaces(), gameDepth = 0) {
        // Checks for the terminal results such as win, lose, and tie and returning a corresponding object
        if (checkGameOver(gameGrid) === "draw") {
            return {score: 0};
        } else if (checkGameOver(gameGrid) === "yes" && gameDepth % 2 === 1) {
            return {score: 10};
        } else if (checkGameOver(gameGrid) === "yes" && gameDepth % 2 === 0) {
            return {score: -10};
        } else {
            // Increment for recursive checks
            gameDepth += 1;

            // Array that collects all the moves objects
            let playableMoves = [];
            
            // Check available moves 1 by one taking into account gameDepth (currentPlayer turn vs nextPlayer turn)
            for (let playableSpace of playableSpaces) {    
                // Editable deep copy of gameGrid to avoid altering _gameGrid
                let tempGameGrid = JSON.parse(JSON.stringify(gameGrid));        
                
                if (gameDepth % 2 === 1) {                
                    tempGameGrid[playableSpace] = displayController.gamePlayers.currentPlayer.symbol;
                } else if (gameDepth % 2 === 0) {                
                    tempGameGrid[playableSpace] = displayController.gamePlayers.nextPlayer.symbol;
                }

                let tempPlayableSpaces = getPlayableGameSpaces(tempGameGrid);

                // Declare a playableMove object
                let playableMove = {};
                playableMove.index = playableSpace;
                // Recursive result
                let result = impossibleAI(tempGameGrid, tempPlayableSpaces, gameDepth);
                playableMove.score = result.score;
                // Push playableMove to array of playableMoves
                playableMoves.push(playableMove);
            }

            let bestMove = 0;
            let bestScore = 0;

            // Get index for largest or lowest score of objects in playMoves
            for (let i = 0; i < playableMoves.length; i++) {
                if (gameDepth % 2 === 1 && playableMoves[i].score >= bestScore) {
                    bestScore = playableMoves[i].score;
                    bestMove = i;
                } else if (gameDepth % 2 === 0 && playableMoves[i].score <= bestScore) {
                    bestScore = playableMoves[i].score;
                    bestMove = i;
                }
            }
            return playableMoves[bestMove];
        }
    }

    // Function to manage which AI to play
    function aiPlay(aiRole) {
        if (aiRole === "ai-easy") {
            return easyAI();
        } else if (aiRole === "ai-normal") {
            return normalAI();
        } else if (aiRole === "ai-impossible") {
            return impossibleAI().index;
        }
    }

    // Function to check if game over:
    // 3 straight or diagonal consecutive symbols (8 cases) = Win
    // Board filled & no consecutive symbols = Draw
    // Returns "yes" or "draw" or "no"
    function checkGameOver(gameGrid = _gameGrid) {

        if (
            (gameGrid[0] !== "" && gameGrid[0] === gameGrid[1] && gameGrid[1] === gameGrid[2]) ||
            (gameGrid[3] !== "" && gameGrid[3] === gameGrid[4] && gameGrid[4] === gameGrid[5]) ||
            (gameGrid[6] !== "" && gameGrid[6] === gameGrid[7] && gameGrid[7] === gameGrid[8]) ||
            (gameGrid[0] !== "" && gameGrid[0] === gameGrid[3] && gameGrid[3] === gameGrid[6]) ||
            (gameGrid[1] !== "" && gameGrid[1] === gameGrid[4] && gameGrid[4] === gameGrid[7]) ||
            (gameGrid[2] !== "" && gameGrid[2] === gameGrid[5] && gameGrid[5] === gameGrid[8]) ||
            (gameGrid[0] !== "" && gameGrid[0] === gameGrid[4] && gameGrid[4] === gameGrid[8]) ||
            (gameGrid[2] !== "" && gameGrid[2] === gameGrid[4] && gameGrid[4] === gameGrid[6])
            ) {
                return "yes";
            } else if (gameGrid.includes("")) {
                return "no";
            } else {
                return "draw";
            }
    }

    resetGameGrid();

    return {
        counter,
        resetGameGrid,
        getGameGrid,
        updateGameGrid,
        checkGameOver,
        aiPlay,
    };

})();

// Module that controls html elements and the flow of the game itself
const displayController = (function() {
    const radioInputs = document.querySelectorAll(".radio-buttons");
    const gridSpaceDivs = document.querySelectorAll(".grid-space");
    const messageDiv = document.querySelector(".game-over-message");
    const playButton = document.getElementById("play-button")
    const restartButton = document.getElementById("restart-button");


    let player1 = Player(1, "X", "pending", true);
    let player2 = Player(2, "O", "pending", false);
    let gamePlayers = {
        currentPlayer: player1,
        nextPlayer: player2,
    }
    let gameplayIsActive = false;

    // Function to disable unselected player types radio buttons
    function disablePlayerSelection() {
        for (let radioInput of radioInputs) {
            if (radioInput.checked === false) {
                radioInput.disabled = true;
            }
        }
    }

    // Function to enable all player types radio buttons
    function enablePlayerSelection() {
        for (let radioInput of radioInputs) {
            radioInput.disabled = false;
        }
    }

    // Function to get selected player roles
    function getSelectedPlayerRoles() {
        const selectedPlayerRoles = [];
        for (let radioInput of radioInputs) {
            if(radioInput.checked === true) {
                selectedPlayerRoles.push(radioInput);
            }
        }
        return selectedPlayerRoles
    }

    // Function to switch current player
    function switchThenGetCurrentPlayer() {
        if (gamePlayers.currentPlayer === player1) {
            gamePlayers.currentPlayer = player2;
            gamePlayers.nextPlayer = player1;
        } else {
            gamePlayers.currentPlayer = player1;
            gamePlayers.nextPlayer = player2;
        }
        return gamePlayers.currentPlayer
    }

    // Function to display the _gameGrid array contents to the corresponding gridSpaceDivs
    function displayGameGrid (gameGridArray) {
        for (let i = 0; i < gameGridArray.length; i++) {
            gridSpaceDivs[i].textContent = gameGridArray[i];
        }
    }

     // Function that triggers an AI play from gameController then displays the AI move
    function aiDisplay(aiRole) {
        let aiGridSpaceDivId = gameController.aiPlay(aiRole)
        gameController.updateGameGrid(aiGridSpaceDivId, gamePlayers.currentPlayer.symbol);


        gridSpaceDivs[aiGridSpaceDivId].textContent = gamePlayers.currentPlayer.symbol;
        if (gameController.checkGameOver() === "no") {
            gamePlayers.currentPlayer = switchThenGetCurrentPlayer();
            messageDiv.textContent = `It's Player ${gamePlayers.currentPlayer.position}'s turn. Mark your ${gamePlayers.currentPlayer.symbol} !`
        } else if (gameController.checkGameOver() === "draw") {
            gameplayIsActive = false;
            messageDiv.textContent = `Game Over! It's A Draw!`
        } else {
            gameplayIsActive = false;
            messageDiv.textContent = `Game Over! Player ${gamePlayers.currentPlayer.position} - ${gamePlayers.currentPlayer.role.toUpperCase()} wins!`
        }
    }

    // Play button click event listener to:
    // Lock player selection
    // Lock play button
    // Create player 1 and 2 based on player role selection
    // Activate gameplay
    // If P1 is AI play first move
    playButton.addEventListener("click", function () {
        disablePlayerSelection();
        playButton.disabled = true;

        let selectedPlayerRoles = getSelectedPlayerRoles();
        
        // Assign player roles
        player1.role = selectedPlayerRoles[0].value;
        player2.role = selectedPlayerRoles[1].value;

        messageDiv.textContent = `It's Player ${gamePlayers.currentPlayer.position}'s turn. Mark your ${gamePlayers.currentPlayer.symbol} !`

        gameplayIsActive = true;


        console.log(player1)
        console.log(player2)
        // test to be deleted once infinite loop is solved (case where time delay is to be implemented)
        let test = 0
        while (gamePlayers.currentPlayer.role !== "human" && gameplayIsActive && test < 20) {
            console.log(gamePlayers.currentPlayer.position)
            aiDisplay(gamePlayers.currentPlayer.role);

            test += 1;
        }
    })

    // Add event listeners at each gridSpaceDiv to enable player marking functionality
    for (let gridSpaceDiv of gridSpaceDivs) {
        gridSpaceDiv.addEventListener("click", function (e) {
            let gridSpaceDivId = Number(e.target.dataset.gridSpace);

            if (gameplayIsActive && gridSpaceDiv.textContent === "" && gamePlayers.currentPlayer.role === "human") {
                // Mark the play symbol
                gridSpaceDiv.textContent = gamePlayers.currentPlayer.symbol;
                // Update the _gameGrid array in gameController
                gameController.updateGameGrid(gridSpaceDivId, gamePlayers.currentPlayer.symbol);
                // Check game over and if yes deactivate game
                if (gameController.checkGameOver() === "no") {
                    // Change current player
                    gamePlayers.currentPlayer = switchThenGetCurrentPlayer();
                    messageDiv.textContent = `It's Player ${gamePlayers.currentPlayer.position}'s turn. Mark your ${gamePlayers.currentPlayer.symbol} !`

                    if (gamePlayers.currentPlayer.role !== "human") {
                        aiDisplay(gamePlayers.currentPlayer.role);
                    }
                } else if (gameController.checkGameOver() === "draw") {
                    gameplayIsActive = false;
                    messageDiv.textContent = `Game Over! It's A Draw!`
                } else {
                    gameplayIsActive = false;
                    messageDiv.textContent = `Gaem Over! Player ${gamePlayers.currentPlayer.position} - ${gamePlayers.currentPlayer.role.toUpperCase()} wins!`
                }
            }
        })
    }
    
    // Restart button event listener to:
    // Revert player selection to TO HUMAN v HUMAN
    // Unlock player selection
    // Unlock play button
    // Reset gameGrid then display
    // Reset game message
    // Deactivate gameplay
    restartButton.addEventListener("click", function () {
        radioInputs[0].checked = true;
        radioInputs[4].checked = true;

        enablePlayerSelection();
        playButton.disabled = false;

        gameController.resetGameGrid();
        displayGameGrid(gameController.getGameGrid());
        
        messageDiv.textContent = "Please select players' roles then press PLAY!"

        gameplayIsActive = false;

        gameController.counter = 0;
    })

    return {
        gamePlayers,
    }
})();
