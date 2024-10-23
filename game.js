import { GRID_SIZE, outsideGrid } from "./js/grid.js";
import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./js/snake.js";
import { update as updateFood, draw as drawFood } from "./js/food.js";

const gameBoard = document.getElementById("game-board");

gameBoard.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
gameBoard.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;

let lastRenderTime = 0;
let gameOver = false;

function main(currentTime) {
  if (gameOver) {
    if (confirm("You lose. Press ok to restart the game.")) {
      window.location.reload();
    }

    return;
  }

  window.requestAnimationFrame(main);

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
