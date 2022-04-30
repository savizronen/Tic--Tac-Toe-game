const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let winnerId = 0;
let currentRound = 0;
let editedPlayer = 0;
let activePlayer = 0;

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

// open edit window.
const playerConfigOverlayElement = document.querySelector("#config-overlay");
const backDropElement = document.querySelector("#backdrop");

// close edit window.
const cancelEditButt = document.querySelector("#cancel-edit");

const editPlayer1BtnElement = document.querySelector("#edit-player-1-btn");
const editPlayer2BtnElement = document.querySelector("#edit-player-2-btn");

// get the form element
const formElement = document.querySelector("form");
const inputPlayerName = document.querySelector("#playername");

const errorsOutputElement = document.querySelector("#config-errors");
const startNewGameBtnElement = document.getElementById("start-game");
const gameAreaElement = document.getElementById("active-game");
const errorSetCustomElement = document.getElementById(
  "error-set-custom-players"
);
const activePlayerNameElement = document.getElementById("active-player-name");
const PlayerTurnParagraphElement = document.getElementById("player-turn");
console.log(PlayerTurnParagraphElement);

const cancelErrorSetCustomElement = document.getElementById(
  "cancel-error-custom-players"
);

const canvasElement = document.getElementById("canvas");

const winnerParagraphElement = document.getElementById("game-over");

const winnerName = document.getElementById("winner-name");
const textYouWinElement = document.getElementById("you-win-text");

const gameFieldElements = document.querySelectorAll("#game-board li");

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);
cancelEditButt.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameBtnElement.addEventListener("click", startNewGame);
cancelErrorSetCustomElement.addEventListener("click", errorSetCustomPlayers);

for (const gameFieldElement of gameFieldElements) {
  gameFieldElement.addEventListener("click", selectGameField);
}
