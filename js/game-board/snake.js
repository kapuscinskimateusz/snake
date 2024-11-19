import { equalPositions } from "../../utils/equalPositions.js";
import { getMovementDirection } from "./movement.js";

let snakeBody = [];
export let snakeSpeed = null;
let newSegments = 0;

export function update() {
  addSegments();

  const direction = getMovementDirection();

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = { ...snakeBody[i - 1] };
  }

  snakeBody[0].x += direction.x;
  snakeBody[0].y += direction.y;
}

export function draw(renderArea) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    renderArea.appendChild(snakeElement);
  });
}

export function setSnakePosition(position) {
  snakeBody = [{ x: position.x, y: position.y }];
}

export function setSnakeSpeed(speed) {
  snakeSpeed = speed;
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;

    return equalPositions(segment, position);
  });
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}
