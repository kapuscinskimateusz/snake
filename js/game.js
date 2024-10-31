import { GRID_SIZE, outsideGrid } from "./grid.js";
import { enableInput, clearInputDirection, disableInput } from "./input.js";
import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
  resetSnake,
} from "./snake.js";
import { update as updateFood, draw as drawFood, resetFood } from "./food.js";

import { open as openMainMenu } from "../main-menu.js";
import {
  open as openPauseMenu,
  close as closePauseMenu,
} from "./dialogs/pause-menu.js";
import { open as openGameOver } from "./dialogs/game-over.js";

const gameBoard = document.getElementById("game-board");

gameBoard.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
gameBoard.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;

let lastRenderTime = 0;

export let isGameOver = false;
export let isGamePaused = false;

function main(currentTime) {
  if (gameBoard.classList.contains("hidden")) return;

  if (isGameOver) return openGameOver();

  window.requestAnimationFrame(main);

  if (isGamePaused) return;

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  if (!isGameOver) draw();
}

export function startGame() {
  restartGame();
  gameBoard.classList.remove("hidden");

  enableInput();

  window.requestAnimationFrame(main);
}

export function endGame() {
  gameBoard.classList.add("hidden");

  disableInput();

  openMainMenu();
}

function update() {
  updateSnake();
  updateFood();

  checkDeath();
}

function draw() {
  gameBoard.innerHTML = "";

  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  isGameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

export function pauseGame() {
  isGamePaused = true;

  openPauseMenu();
}

export function resumeGame() {
  isGamePaused = false;

  closePauseMenu();
}

export function restartGame() {
  isGameOver = false;
  isGamePaused = false;

  clearInputDirection();
  resetSnake();
  resetFood();

  window.requestAnimationFrame(main);
}
