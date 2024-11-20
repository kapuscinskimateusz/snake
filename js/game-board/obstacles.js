import { gridSize } from "./grid.js";
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

export function setObstacles(newObstacles, { includeWalls = false } = {}) {
  if (includeWalls) {
    const walls = generateWalls(gridSize);

    // Filter new obstacles to remove those that are in the same place as the walls
    const filteredNewObstacles = newObstacles.filter(
      (obstacle) =>
        !walls.some((wall) => wall.x === obstacle.x && wall.y === obstacle.y)
    );

    obstacles = filteredNewObstacles.concat(walls);
  } else {
    obstacles = newObstacles;
  }
}

export function onObstacle(position) {
  return obstacles.some((obstacle) => equalPositions(obstacle, position));
}

export function obstacleCollision(position) {
  return onObstacle(position);
}

function generateWalls(size) {
  const walls = [];

  // Upper and lower walls
  for (let x = 1; x <= size; x++) {
    walls.push({ x, y: 1 });
    walls.push({ x, y: size });
  }

  // Left and right walls (without corners)
  for (let y = 2; y < size; y++) {
    walls.push({ x: 1, y });
    walls.push({ x: size, y });
  }

  return walls;
}
