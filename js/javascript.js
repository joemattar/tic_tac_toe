// Module to
// Store the gameboard as an array inside of a Gameboard object
const gameBoard = (function() {
    let gameboard = []
    for (let i = 0; i < 9; i++) {
        gameboard.push("");
    }

    function _mark() {

    }

    return {
        gameboard,
    };

})();

// Module that controls html elements
const displayController = (function() {
    const radioInputs = document.querySelectorAll(".radio-buttons");
    const radioLabels = document.querySelectorAll(".radio-labels");
    const playButton = document.getElementById("play-button")
    const gridSpaces = document.querySelectorAll(".grid-space");
    const restartButton = document.getElementById("restart-button");

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

    // Play button click event listener to:
    // Lock player selection
    // Return players.
    // Lock play button
    // RETURN PLAYERS FUNCTIONALITY ???
    playButton.addEventListener("click", function () {
        disablePlayerSelection();
        playButton.disabled = true;
    })



    // TO REVIEW
    for (let gridSpace of gridSpaces) {
        gridSpace.addEventListener("click", function (e) {
            let gridSpaceId = Number(e.target.dataset.gridSpace);
            console.log(gridSpaceId)
        })
    }

    
    // Restart button event listener to:
    // Restart game
    // Unlock player selection
    // Unlock play button
    restartButton.addEventListener("click", function () {
        enablePlayerSelection();
        playButton.disabled = false;
    })

    return {

    }
})();

// Factory function to create player objects
const Player = function(symbol, role) {

    return {

    }
}



// and you’re probably going to want an object to control the flow of the game itself.

// Write a JavaScript function that will render the contents of the gameboard array to the webpage


// Build the functions that allow players to add marks to a specific spot on the board,
// and then tie it to the DOM, letting players click on the gameboard to place their marker.
// Don’t forget the logic that keeps players from playing in spots that are already taken!

    // Think carefully about where each bit of logic should reside.
    // Each little piece of functionality should be able to fit in the game,
    // player or gameboard objects.. but take care to put them in “logical” places.
    // Spending a little time brainstorming here can make your life much easier later!


// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.


// Add a display element that congratulates the winning player!


// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!

    // Start by just getting the computer to make a random legal move.

    // Once you’ve gotten that, work on making the computer smart.
    // It is possible to create an unbeatable AI using the minimax algorithm
    // (read about it here, some googling will help you out with this one)
    
    // If you get this running definitely come show it off in the chatroom. It’s quite an accomplishment!



