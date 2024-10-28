import { startGame } from "./modules/game.js";

const mainMenu = document.getElementById("main-menu");
const playBtn = document.getElementById("play-btn");
const aboutBtn = document.getElementById("about-btn");
const exitBtn = document.getElementById("exit-btn");

addEventListeners();

export function open() {
  mainMenu.classList.remove("hidden");

  addEventListeners();
}

export function close() {
  mainMenu.classList.add("hidden");

  playBtn.removeEventListener("click", handlePlay);
  aboutBtn.removeEventListener("click", handleAbout);
  exitBtn.removeEventListener("click", handleExit);
}

function handlePlay() {
  close();
  startGame();
}

function handleAbout() {
  console.log("about");
}

function handleExit() {
  window.close();
}

function addEventListeners() {
  playBtn.addEventListener("click", handlePlay);
  aboutBtn.addEventListener("click", handleAbout);
  exitBtn.addEventListener("click", handleExit);
}
