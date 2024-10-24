import { GRID_SIZE, outsideGrid } from "./modules/grid.js";
import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./modules/snake.js";
import { update as updateFood, draw as drawFood } from "./modules/food.js";
import { open as openPauseMenu } from "./modules/dialogs/pause-menu.js";
import { open as openGameOver } from "./modules/dialogs/game-over.js";

const gameBoard = document.getElementById("game-board");

gameBoard.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
gameBoard.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;

let lastRenderTime = 0;
let gameOver = false;
let paused = false;

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();

    openPauseMenu(pauseGame);
  }
});

function main(currentTime) {
  if (gameOver) {
    return openGameOver();
  }

  window.requestAnimationFrame(main);

  if (paused) return;

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

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
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function pauseGame() {
  paused = true;
}

export function resumeGame() {
  paused = false;
}
