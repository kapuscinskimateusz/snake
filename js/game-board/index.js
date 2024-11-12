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
import { enableMovement, disableMovement } from "./movement.js";
import { open as openMainMenu } from "../main-menu.js";

const gameBoard = document.getElementById("game-board");

let currentLevelObj = null;
let isGameOver = false;

let lastRenderTime = 0;

function gameLoop(currentTime) {
  if (!currentLevelObj) return;
  if (isGameOver) return;

  window.requestAnimationFrame(gameLoop);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();
  if (!isGameOver) draw();
}

export function open(levelObj) {
  initLevel(levelObj);
  gameBoard.classList.remove("hidden");
  enableMovement();

  window.requestAnimationFrame(gameLoop);
}

export function close() {
  gameBoard.classList.add("hidden");
  disableMovement();

  currentLevelObj = null;
  openMainMenu();
}

function initLevel(levelObj) {
  currentLevelObj = levelObj;
  isGameOver = false;

  setGridSize(gameBoard, levelObj.gridSize);
  setSnakePosition(levelObj.snake.startPosition);
  setSnakeSpeed(levelObj.snake.speed);
  setFoodPosition(levelObj.food.startPosition);
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
