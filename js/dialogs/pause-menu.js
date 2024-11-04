import { resumeGame, leaveGame } from "../game.js";

const pauseMenu = document.getElementById("pause-menu");
const resumeBtn = pauseMenu.querySelector(".pause-menu__resume-btn");
const restartBtn = pauseMenu.querySelector(".pause-menu__restart-btn");
const mainMenuBtn = pauseMenu.querySelector(".pause-menu__main-menu-btn");

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
  console.log("restart");
}

function handleMainMenu() {
  close();
  leaveGame();
}
