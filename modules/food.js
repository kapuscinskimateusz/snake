import { randomGridPosition } from "./grid.js";
import { expandSnake, onSnake } from "./snake.js";

let food = getRandomFoodPosition();

const EXPANSION_RATE = 1;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");

  gameBoard.appendChild(foodElement);
}

export function resetFood() {
  food = getRandomFoodPosition();
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (!newFoodPosition || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }

  return newFoodPosition;
}
