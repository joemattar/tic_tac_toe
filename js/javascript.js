// Factory function to create player objects
const Player = function(position, symbol, role, playsNext) {

    return {
        position, // 1 , 2
        symbol, // "X" , "O"
        role, // "human", "ai-easy", "ai-normal", "ai-impossible"
        playsNext, // true , false
    }
}

// Module to store the gameboard as an array and to manage it.
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



    // ?????

    // Create an AI so that a player can play against the computer!

    // Start by just getting the computer to make a random legal move.

    // Easy AI function
    function easyAI() {

    }
    
    // Normal AI function
    function normalAI() {

    }

    // It is possible to create an unbeatable AI using the minimax algorithm

    // Impossible AI function
    function impossibleAI() {

    }

    // Function to manage which AI to play
    function aiPlay(aiRole) {

    }

    // ?????





    // Function to check if game over:
    // 3 straight or diagonal consecutive symbols = Win
    // Board filled & no consecutive symbols = Draw 
    // Return WINNING SYMBOL OR DRAW ????
    function checkGameOver() {
        let checkObject = {};
        for (let i = 0; i < _gameGrid.length; i++) {
            // Fill object with scenario 0 to 2 
            for (let j = 0; j <= 2; j++) {

            }
            // Fill object with scenario 3 to 5
            for (let k = 3; k <= 5; k++) {

            }
            // Fill object with scenario 6

            // Fill object with scenario 7

        }

        // Scenario 9 is a draw
        


        // UPDATE THE BELOW
        return false
    }

    resetGameGrid();

    return {
        resetGameGrid,
        getGameGrid,
        updateGameGrid,
        checkGameOver,
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

    // ?????
    // ?????

    // Function that displays an AI play / move
    function aiDisplay() {

    }

    // ?????
    // ?????


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


        // ADD FUNCTIONALITY IF P1 IS AI
        // ADD FUNCTIONALITY IF P1 IS AI

    })


    // Add event listeners at each gridSpaceDiv to enable player marking functionality
    for (let gridSpaceDiv of gridSpaceDivs) {
        gridSpaceDiv.addEventListener("click", function (e) {
            let gridSpaceDivId = Number(e.target.dataset.gridSpace);

            if (gameplayIsActive && gridSpaceDiv.textContent === "") {


                // WHAT IF CURRENT PLAYER IS AN AI ???
                // WHAT IF CURRENT PLAYER IS AN AI ???
                // WHAT IF CURRENT PLAYER IS AN AI ???

                gridSpaceDiv.textContent = currentPlayer.symbol;



                // Update the _gameGrid array in gameController
                gameController.updateGameGrid(gridSpaceDivId, currentPlayer.symbol);
                // Check game over and if yes deactivate game
                if (gameController.checkGameOver() === true) {
                    gameplayIsActive = false;


                    // DISPLAY END GAME MESSAGE???
                    // DISPLAY END GAME MESSAGE???
                    // DISPLAY END GAME MESSAGE???


                } else {
                    // Change current player
                    currentPlayer = switchThenGetCurrentPlayer();
                    messageDiv.textContent = `It's Player ${currentPlayer.position}'s turn. Mark your ${currentPlayer.symbol} !`

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

    return {

    }
})();








