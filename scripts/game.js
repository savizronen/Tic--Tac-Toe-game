function cleanTheGameBoard() {
  canvasElement.style.display = "none";
  winnerParagraphElement.style.display = "none";
  PlayerTurnParagraphElement.style.display = "block";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
    }
  }

  for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.textContent = "";
    gameFieldElement.classList.remove("disabled");
  }
}

function startNewGame() {
  winnerId = 0;
  currentRound = 0;
  if (players[0].name === "" || players[1].name === "") {
    errorSetCustomElement.style.display = "block";
    backDropElement.style.display = "block";
  } else {
    cleanTheGameBoard();
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = "block";
  }
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function checkForGameOver() {
  //Checking the rows for equality.
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  //Checking the cols for equality.
  for (let j = 0; j < 3; j++) {
    if (
      gameData[0][j] > 0 &&
      gameData[0][j] === gameData[1][j] &&
      gameData[1][j] === gameData[2][j]
    ) {
      return gameData[0][j];
    }
  }
  // Checking the left diagonal for equality.
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  // Checking the right diagonal for equality.
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function showWinnerName(winnerId) {
  if (winnerId === 1 || winnerId === 2) {
    if (winnerId === 1) {
      textYouWinElement.innerHTML =
        "<h2 id='you-win-text'>You won! <span id='winner-name'>" +
        players[0].name +
        "." +
        "</span></h2>";
    } else {
      textYouWinElement.innerHTML =
        "<h2 id='you-win-text'>You won! <span id='winner-name'>" +
        players[1].name +
        "." +
        "</span></h2>";
    }

    PlayerTurnParagraphElement.style.display = "none";
    disabledAllTheSelectedField();
    canvasElement.style.display = "block";
    console.log(winnerParagraphElement);
    winnerParagraphElement.style.display = "block";
  }

  if (winnerId === -1) {
    console.log(textYouWinElement.textContent);
    let html =
      "<h2 id='you-win-text'><span id='winner-name'>It's a draw!</span></h2>";
    textYouWinElement.innerHTML = html;
    PlayerTurnParagraphElement.style.display = "none";
    winnerParagraphElement.style.display = "block";
  }
}

function disabledAllTheSelectedField() {
  for (const gameFieldElement of gameFieldElements) {
    gameFieldElement.classList.add("disabled");
  }
}

function selectGameField(event) {
  const selectedField = event.target;

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  const selectedColumn = selectedField.dataset.col;
  const selectedRow = selectedField.dataset.row;

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  currentRound++;
  winnerId = checkForGameOver();
  showWinnerName(winnerId);
  switchPlayer();
}
