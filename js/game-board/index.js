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
  shouldDrawFood,
  setFoodPosition,
} from "./food.js";
import {
  draw as drawObstacles,
  obstacleCollision,
  setObstacles,
} from "./obstacles.js";
import { enableMovement, disableMovement } from "./movement.js";
import { open as openMainMenu } from "../main-menu.js";
import { open as openGameOver } from "../dialogs/game-over.js";

const gameBoard = document.querySelector(".game-board");

const staticArea = gameBoard.querySelector(".game-board__static-area");
const renderArea = gameBoard.querySelector(".game-board__render-area");

let currentLevelObj = null;
let isGameOver = false;

let lastRenderTime = 0;

function gameLoop(currentTime) {
  if (!currentLevelObj) return; // If the game board is closed
  if (isGameOver) return openGameOver();

  window.requestAnimationFrame(gameLoop);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / snakeSpeed) return;

  lastRenderTime = currentTime;

  update();
  if (!isGameOver) draw();
}

export function open(levelObj) {
  currentLevelObj = levelObj;
  initLevel(levelObj);

  gameBoard.classList.remove("hidden");
  enableMovement();

  window.requestAnimationFrame(gameLoop);
}

export function close() {
  gameBoard.classList.add("hidden");
  disableMovement({ clear: true });

  currentLevelObj = null;
  openMainMenu();
}

function initLevel(levelObj) {
  isGameOver = false;

  setGridSize(staticArea, levelObj.gridSize);
  setFoodPosition(levelObj.food.startPosition);
  setObstacles(levelObj.obstacles, { includeWalls: levelObj.walls });
  staticArea.innerHTML = "";
  drawObstacles(staticArea);

  setGridSize(renderArea, levelObj.gridSize);
  setSnakePosition(levelObj.snake.startPosition);
  setSnakeSpeed(levelObj.snake.speed);
}

function update() {
  updateSnake();
  updateFood();

  checkDeath();
}

function draw() {
  renderArea.innerHTML = "";
  drawSnake(renderArea);

  if (shouldDrawFood) {
    const foodElement = staticArea.querySelector(".food");
    foodElement?.remove();

    drawFood(staticArea);
  }
}

function checkDeath() {
  isGameOver =
    outsideGrid(getSnakeHead()) ||
    snakeIntersection() ||
    obstacleCollision(getSnakeHead());
}
