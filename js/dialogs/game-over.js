const gameOver = document.getElementById("game-over");
const restartBtn = gameOver.querySelector(".game-over__restart-btn");

export function open() {
  gameOver.showModal();

  restartBtn.addEventListener("click", handleRestart);
}

export function close() {
  gameOver.close();

  restartBtn.removeEventListener("click", handleRestart);
}

function handleRestart() {
  console.log("restart");
}
