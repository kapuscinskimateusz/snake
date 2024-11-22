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
import { unlockLevel } from "../campaign.js";
import { open as openGameOver } from "../dialogs/game-over.js";
import { open as openLevelCompletion } from "../dialogs/level-completion.js";

const gameBoard = document.querySelector(".game-board");

const staticArea = gameBoard.querySelector(".game-board__static-area");
const renderArea = gameBoard.querySelector(".game-board__render-area");

let currentLevelObj = null;

let gameState = {
  foodEaten: 0,
  timeElapsed: null,
};

let isGameOver = false;
let isLevelCompleted = false;

let lastRenderTime = 0;

function gameLoop(currentTime) {
  if (!currentLevelObj) return; // If the game board is closed

  if (isGameOver) return openGameOver();

  if (isLevelCompleted) {
    unlockLevel(currentLevelObj.level + 1);
    openLevelCompletion(currentLevelObj.level);
    return;
  }

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
}

function initLevel(levelObj) {
  isGameOver = false;
  isLevelCompleted = false;

  gameState = {
    foodEaten: 0,
    timeElapsed: null,
  };

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

export function incrementFoodEaten() {
  gameState.foodEaten++;

  checkLevelCompletion();
}

function checkLevelCompletion() {
  isLevelCompleted =
    gameState.foodEaten >= currentLevelObj.completionCriteria.foodToEat;
}
