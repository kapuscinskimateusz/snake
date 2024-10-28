import { restartGame } from "../game.js";

const gameOver = document.getElementById("game-over");
const restartBtn = gameOver.querySelector(".restart-btn");

export function open() {
  gameOver.showModal();

  restartBtn.addEventListener("click", handleRestart);
}

export function close() {
  gameOver.close();

  restartBtn.removeEventListener("click", handleRestart);
}

function handleRestart() {
  close();
  restartGame();
}
