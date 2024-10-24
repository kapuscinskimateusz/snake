const gameOver = document.getElementById("game-over");
const restartBtn = document.querySelector("#game-over .restart-btn");

export function open() {
  gameOver.showModal();

  restartBtn.addEventListener("click", handleRestart);
}

export function close() {
  gameOver.close();

  restartBtn.removeEventListener("click", handleRestart);
}

function handleRestart() {
  alert("restart");
}
