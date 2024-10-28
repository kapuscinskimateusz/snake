import { resumeGame, restartGame, endGame } from "../game.js";

const pauseMenu = document.getElementById("pause-menu");
const resumeBtn = document.getElementById("resume-btn");
const restartBtn = pauseMenu.querySelector(".restart-btn");
const homeBtn = document.getElementById("home-btn");

export function open() {
  pauseMenu.showModal();

  resumeBtn.addEventListener("click", resumeGame);
  restartBtn.addEventListener("click", handleRestart);
  homeBtn.addEventListener("click", handleHome);
}

export function close() {
  pauseMenu.close();

  resumeBtn.removeEventListener("click", resumeGame);
  restartBtn.removeEventListener("click", handleRestart);
  homeBtn.removeEventListener("click", handleHome);
}

function handleRestart() {
  close();
  restartGame();
}

function handleHome() {
  close();
  endGame();
}
