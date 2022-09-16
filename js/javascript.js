// Module to
// Store the gameboard as an array inside of a Gameboard object
// Aand you’re probably going to want an object to control the flow of the game itself.
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

    }

    resetGameGrid();

    return {
        resetGameGrid,
        getGameGrid,
        updateGameGrid,
        checkGameOver,
    };

})();

// Module that controls html elements
const displayController = (function() {
    const radioInputs = document.querySelectorAll(".radio-buttons");
    const radioLabels = document.querySelectorAll(".radio-labels");
    const gridSpaceDivs = document.querySelectorAll(".grid-space");
    const messageDiv = document.querySelector(".game-over-message");
    const playButton = document.getElementById("play-button")
    const restartButton = document.getElementById("restart-button");

    let currentPlayer

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
    function switchThenGetCurrentPlayer(firstPlayer, secondPlayer) {
        if (firstPlayer.playsNext === true) {
            firstPlayer.playsNext = false;
            secondPlayer.playsNext = true;
            return secondPlayer
        } else {
            firstPlayer.playsNext = true;
            secondPlayer.playsNext = false;
            return firstPlayer
        }
    }

    // Play button click event listener to:
    // Lock player selection
    // Lock play button
    // Create player 1 and 2 based on player role selection
    playButton.addEventListener("click", function () {
        disablePlayerSelection();
        playButton.disabled = true;

        let selectedPlayerRoles = getSelectedPlayerRoles();
        
        // call create players function
        const player1 = Player(1, "X", selectedPlayerRoles[0].value, true);
        const player2 = Player(2, "O", selectedPlayerRoles[1].value, false);

        currentPlayer = player1;
    })

    // Function to display the _gameGrid array contents to the corresponding gridSpaceDivs
    function displayGameGrid (gameGridArray) {
        for (let i = 0; i < gameGridArray.length; i++) {
            gridSpaceDivs[i].textContent = gameGridArray[i];
        }
    }


    // Build the functions that allow players to add marks to a specific spot on the board,
    // and then tie it to the DOM, letting players click on the gameboard to place their marker.
    // Don’t forget the logic that keeps players from playing in spots that are already taken!

    // Add event listeners at each gridSpaceDiv to enable player marking functionality
    for (let gridSpaceDiv of gridSpaceDivs) {
        gridSpaceDiv.addEventListener("click", function (e) {
            let gridSpaceDivId = Number(e.target.dataset.gridSpace);

            // call the function to mark a symbol under certain condition

            // call the function to update the array in gameController

            // call the function to change current player under certain condition


        })
    }

    
    // Restart button event listener to:
    // Restart game
    // Unlock player selection
    // Unlock play button
    // Reset gaemGrid then display
    // ADD FUNCTIONALITY TO REVERT PLAYER SELECTION TO HUMAN v HUMAN or HUMAN v EASY AI
    restartButton.addEventListener("click", function () {
        enablePlayerSelection();
        playButton.disabled = false;

        gameController.resetGameGrid();
        displayGameGrid(gameController.getGameGrid());
        
        messageDiv.textContent = "Please select players' roles then press PLAY!"

    })

    return {

    }
})();

// Factory function to create player objects
const Player = function(position, symbol, role, playsNext) {

    return {
        position, // 1 , 2
        symbol, // "X" , "O"
        role, // "human", "ai-easy", "ai-normal", "ai-impossible"
        playsNext, // true , false
    }
}





// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!

    // Start by just getting the computer to make a random legal move.

    // Once you’ve gotten that, work on making the computer smart.
    // It is possible to create an unbeatable AI using the minimax algorithm
    // (read about it here, some googling will help you out with this one)
    
    // If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!


