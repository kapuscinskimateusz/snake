import { resumeGame } from "../../game.js";

const pauseMenu = document.getElementById("pause-menu");
const resumeBtn = document.querySelector("#pause-menu #resume");
const restartBtn = document.querySelector("#pause-menu .restart-btn");

export function open(callback) {
  pauseMenu.showModal();
  callback();

  resumeBtn.addEventListener("click", handleResume);
  restartBtn.addEventListener("click", handleRestart);
}

export function close() {
  pauseMenu.close();

  resumeBtn.removeEventListener("click", handleResume);
  restartBtn.removeEventListener("click", handleRestart);
}

function handleResume() {
  close();
  resumeGame();
}

function handleRestart() {
  alert("restart");
}
