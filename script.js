let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let playerXScoreDisplay = document.getElementById("playerXScore");
let playerOScoreDisplay = document.getElementById("playerOScore");
let player1NameInput = document.getElementById("player1Name");
let player2NameInput = document.getElementById("player2Name");
let drawScoreDisplay = document.getElementById("drawScore");


// Winning Pattern 
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;
let playerXScore = 0;
let playerOScore = 0;
let player1Name = "";
let player2Name = "";
let draws = 0;



// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));

  popupRef.classList.remove("hide");
};

// Enable all buttons 
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });

  popupRef.classList.add("hide");
};

//executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = `&#x1F389; <br> ${player1Name} Wins`;
    playerXScore++;
  } else if (letter == "O") {
    msgRef.innerHTML = `&#x1F389; <br> ${player2Name} Wins`;
    playerOScore++;
} else {
    msgRef.innerHTML = "It's a Draw";
    draws++;
}

  updateScoreDisplay();
};


// Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = " <br> It's a Draw";
  draws++;
  updateScoreDisplay();

};

const saveNamesBtn = document.getElementById("save-names");

if (saveNamesBtn) {
  saveNamesBtn.addEventListener("click", () => {
    // Save the entered names
    player1Name = player1NameInput.value || "Player 1";
    player2Name = player2NameInput.value || "Player 2";

    // Display player names
    displayPlayerNames();
  });
}

// New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  player1Name = player1NameInput.value || "Player 1";
  player2Name = player2NameInput.value || "Player 2";
  displayPlayerNames();
});

// Restart
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  player1Name = player1NameInput.value || "Player 1";
  player2Name = player2NameInput.value || "Player 2";
  displayPlayerNames();

});

// Win Logic
const winChecker = () => {
  // Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];


    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        // If all 3 buttons have the same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

// Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;

      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;

      element.innerText = "O";
      element.disabled = true;
    }

    // Increment count on each click
    count += 1;

    // Check for win on every click
    winChecker();

    if (count % 2 === 0) {
      updateMessage(`This is ${player1Name}'s turn.`);
    } else {
      updateMessage(`This is ${player2Name}'s turn.`);
    }


    // if (count % 2 === 0) {
    //   updateMessage("This is X's turn.");
    // } else {
    //   updateMessage("This is O's turn.");
    // }

    // Check for draw
    if (count == 9) {
      drawFunction();
    }
  });
});

function updateMessage(message) {
  const messageContainer = document.querySelector(".message-container");
  if (messageContainer) {
    messageContainer.innerText = message;
  }
}


function updateScoreDisplay() {
  playerXScoreDisplay.innerText = playerXScore;
  playerOScoreDisplay.innerText = playerOScore;
}


window.onload = enableButtons;


function displayPlayerNames() {
  const player1NameDisplay = document.getElementById("displayPlayer1Name");
  const player2NameDisplay = document.getElementById("displayPlayer2Name");

  if (player1NameDisplay) {
    player1NameDisplay.innerText = player1Name;
  }

  if (player2NameDisplay) {
    player2NameDisplay.innerText = player2Name;
  }
}