import { resumeGame, restartGame, endGame } from "../game.js";

const pauseMenu = document.getElementById("pause-menu");
const resumeBtn = document.getElementById("resume-btn");
const restartBtn = pauseMenu.querySelector(".restart-btn");
const mainMenuBtn = document.getElementById("main-menu-btn");

export function open() {
  pauseMenu.showModal();

  resumeBtn.addEventListener("click", resumeGame);
  restartBtn.addEventListener("click", handleRestart);
  mainMenuBtn.addEventListener("click", handleMainMenu);
}

export function close() {
  pauseMenu.close();

  resumeBtn.removeEventListener("click", resumeGame);
  restartBtn.removeEventListener("click", handleRestart);
  mainMenuBtn.removeEventListener("click", handleMainMenu);
}

function handleRestart() {
  close();
  restartGame();
}

function handleMainMenu() {
  close();
  endGame();
}
