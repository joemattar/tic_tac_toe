// Factory function to create player objects
const Player = function(position, symbol, role, playsNext) {

    return {
        position, // 1 , 2
        symbol, // "X" , "O"
        role, // "human", "ai-easy", "ai-normal", "ai-impossible"
        playsNext, // true , false
    }
}

// Module to store the gameboard as an array and to manage it as well as the game AI.
const gameController = (function() {
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

    // Easy AI function, random legal moves, returns a _gameGrid index which is a grid space div ID#
    function easyAI() {
        let availableGameGrid = [];
        for (let i = 0; i < _gameGrid.length; i++) {
            if (_gameGrid[i] === "") {
                availableGameGrid.push(i);
            }
        }
        console.log(_gameGrid)
        console.log(availableGameGrid)
        return availableGameGrid[Math.floor(Math.random() * availableGameGrid.length)];
    }
    






    // Normal AI function, returns a _gameGrid index which is a grid space div ID#
    function normalAI() {

    }

    // It is possible to create an unbeatable AI using the minimax algorithm

    // Impossible AI function, returns a _gameGrid index which is a grid space div ID#
    function impossibleAI() {

    }








    // Function to manage which AI to play
    function aiPlay(aiRole) {
        if (aiRole === "ai-easy") {
            return easyAI();
        } else if (aiRole === "ai-normal") {
            return normalAI();
        } else if (aiRole === "ai-impossible") {
            return impossibleAI();
        }
    }

    // Function to check if game over:
    // 3 straight or diagonal consecutive symbols = Win
    // Board filled & no consecutive symbols = Draw 
    // Returns "X" or "O" or "draw" or "no"
    function checkGameOver() {
        let checkObject = {};
        for (let h = 0; h < 8; h++) {
            checkObject[h] = [];
        }

        for (let i = 0; i < _gameGrid.length; i++) {
            // Fill object with scenario 0 to 2 
            for (let j = 0; j <= 2; j++) {
                if (i % 3 === j && _gameGrid[i] !== "") {
                    checkObject[j].push(_gameGrid[i]);
                }
            }
            // Fill object with scenario 3 to 5
            for (let k = 3; k <= 5; k++) {
                if ((k-3)*3 <= i && i < (k-2)*3 && _gameGrid[i] !== "") {
                    checkObject[k].push(_gameGrid[i]);
                }
            }
            // Fill object with scenario 6
            if (_gameGrid[i] !== "" && (i === 0 || i === 4 || i === 8)){
                checkObject[6].push(_gameGrid[i]);
            }
            // Fill object with scenario 7
            if (_gameGrid[i] !== "" && (i === 2 || i === 4 || i === 6)){
                checkObject[7].push(_gameGrid[i]);
            }
        }

        for (let l = 0; l < 8; l++) {
            if (checkObject[l].length === 3 && checkObject[l].every((val, i, arr) => val === arr[0])) {
                console.log(checkObject[l][0]);
                return checkObject[l][0];
            }
        }

        if (_gameGrid.includes("")) {
            console.log("no");
            return "no";
        } else {
            console.log("draw")
            return "draw"
        }
    }

    resetGameGrid();

    return {
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
    let currentPlayer = player1;
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
        if (player1.playsNext === true) {
            player1.playsNext = false;
            player2.playsNext = true;
            return player2
        } else {
            player1.playsNext = true;
            player2.playsNext = false;
            return player1
        }
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
        gameController.updateGameGrid(aiGridSpaceDivId, currentPlayer.symbol);

        // TO REVIEW DEBUG ????
        setTimeout(function () {
            gameplayIsActive = false;

            gridSpaceDivs[aiGridSpaceDivId].textContent = currentPlayer.symbol;

    
            if (gameController.checkGameOver() === "no") {
                currentPlayer = switchThenGetCurrentPlayer();
                messageDiv.textContent = `It's Player ${currentPlayer.position}'s turn. Mark your ${currentPlayer.symbol} !`
            } else if (gameController.checkGameOver() === "draw") {
                gameplayIsActive = false;
                messageDiv.textContent = `Game Over! It's A Draw!`
            } else {
                gameplayIsActive = false;
                messageDiv.textContent = `Game Over! Player ${currentPlayer.position} - ${currentPlayer.role.toUpperCase()} wins!`
            }

            gameplayIsActive = true;
        }, 1000)


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

        messageDiv.textContent = `It's Player ${currentPlayer.position}'s turn. Mark your ${currentPlayer.symbol} !`

        gameplayIsActive = true;

        while (currentPlayer.role !== "human") {
            aiDisplay(currentPlayer.role);
        }
    })

    // Add event listeners at each gridSpaceDiv to enable player marking functionality
    for (let gridSpaceDiv of gridSpaceDivs) {
        gridSpaceDiv.addEventListener("click", function (e) {
            let gridSpaceDivId = Number(e.target.dataset.gridSpace);

            if (gameplayIsActive && gridSpaceDiv.textContent === "" && currentPlayer.role === "human") {
                // Mark the play symbol
                gridSpaceDiv.textContent = currentPlayer.symbol;
                // Update the _gameGrid array in gameController
                gameController.updateGameGrid(gridSpaceDivId, currentPlayer.symbol);
                // Check game over and if yes deactivate game
                if (gameController.checkGameOver() === "no") {
                    // Change current player
                    currentPlayer = switchThenGetCurrentPlayer();
                    messageDiv.textContent = `It's Player ${currentPlayer.position}'s turn. Mark your ${currentPlayer.symbol} !`

                    if (currentPlayer.role !== "human") {
                        aiDisplay(currentPlayer.role);
                    }
                } else if (gameController.checkGameOver() === "draw") {
                    gameplayIsActive = false;
                    messageDiv.textContent = `Game Over! It's A Draw!`
                } else {
                    gameplayIsActive = false;
                    messageDiv.textContent = `Gaem Over! Player ${currentPlayer.position} - ${currentPlayer.role.toUpperCase()} wins!`
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
    })
})();
