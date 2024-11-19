import { close as closeGameBoard } from "../game-board/index.js";
import { open as openMainMenu } from "../main-menu.js";

const gameOverDialog = document.querySelector(".game-over");

const mainMenuBtn = gameOverDialog.querySelector(".game-over__main-menu-btn");

export function open() {
  gameOverDialog.showModal();

  mainMenuBtn.addEventListener("click", handleMainMenu);
}

export function close() {
  gameOverDialog.close();

  mainMenuBtn.removeEventListener("click", handleMainMenu);
}

function handleMainMenu() {
  close();
  closeGameBoard();

  openMainMenu();
}
