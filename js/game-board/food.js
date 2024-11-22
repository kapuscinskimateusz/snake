import { randomGridPosition } from "./grid.js";
import { expandSnake, onSnake } from "./snake.js";
import { onObstacle } from "./obstacles.js";
import { incrementFoodEaten } from "./index.js";

let food = null;
export let shouldDrawFood = true;

const EXPANSION_RATE = 1;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    setFoodPosition(getRandomFoodPosition());
    incrementFoodEaten();
  }
}

export function draw(staticArea) {
  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  staticArea.appendChild(foodElement);

  shouldDrawFood = false;
}

export function setFoodPosition(position) {
  food = { x: position.x, y: position.y };

  shouldDrawFood = true;
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (
    !newFoodPosition ||
    onSnake(newFoodPosition) ||
    onObstacle(newFoodPosition)
  ) {
    newFoodPosition = randomGridPosition();
  }

  return newFoodPosition;
}
