import { setGridSize, outsideGrid } from "./grid.js";
import {
  update as updateSnake,
  draw as drawSnake,
  snakeSpeed,
  getSnakeHead,
  snakeIntersection,
  setSnakePosition,
  setSnakeSpeed,
} from "./snake.js";
import {
  update as updateFood,
  draw as drawFood,
  setFoodPosition,
} from "./food.js";
import { disableInput, enableInput } from "./input.js";
import { open as openGameOver } from "./dialogs/game-over.js";
import {
  open as openPauseMenu,
  close as closePauseMenu,
} from "./dialogs/pause-menu.js";
import { open as openMainMenu } from "../main-menu.js";

const gameBoard = document.getElementById("game-board");

let lastRenderTime = 0;

export let isGameOver = false;
export let isGamePaused = false;

function gameLoop(currentTime) {
  if (gameBoard.classList.contains("hidden")) return;

  if (isGameOver) return openGameOver();

  window.requestAnimationFrame(gameLoop);

  if (isGamePaused) return;

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();
  if (!isGameOver) draw();
}

export function startGame(levelObj) {
  initLevel(levelObj);
  gameBoard.classList.remove("hidden");

  enableInput();

  window.requestAnimationFrame(gameLoop);
}

export function leaveGame() {
  gameBoard.classList.add("hidden");

  disableInput({ clear: true });

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

function initLevel(levelObj) {
  isGameOver = false;
  isGamePaused = false;

  setGridSize(gameBoard, levelObj.gridSize);
  setSnakePosition(levelObj.snake.startPosition);
  setSnakeSpeed(levelObj.snake.speed);
  setFoodPosition(levelObj.food.startPosition);
}

function checkDeath() {
  isGameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

export function resumeGame() {
  isGamePaused = false;
  closePauseMenu();
}

export function pauseGame() {
  isGamePaused = true;
  openPauseMenu();
}
