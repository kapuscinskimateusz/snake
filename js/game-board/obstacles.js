import { equalPositions } from "../../utils/equalPositions.js";

let obstacles = [];

export function draw(staticArea) {
  obstacles.forEach((position) => {
    const obstacleEl = document.createElement("div");
    obstacleEl.style.gridRowStart = position.y;
    obstacleEl.style.gridColumnStart = position.x;
    obstacleEl.classList.add("obstacle");
    staticArea.appendChild(obstacleEl);
  });
}

export function setObstacles(newObstacles) {
  obstacles = newObstacles;
}

function onObstacle(position) {
  return obstacles.some((obstacle) => equalPositions(obstacle, position));
}

export function obstacleCollision(position) {
  return onObstacle(position);
}
