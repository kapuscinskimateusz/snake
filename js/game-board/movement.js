let direction = { x: 0, y: 0 };
let lastDirection = { x: 0, y: 0 };

export function enableMovement() {
  window.addEventListener("keydown", handleMovement);
}

export function disableMovement() {
  window.removeEventListener("keydown", handleMovement);
}

export function getMovementDirection() {
  lastDirection = direction;

  return direction;
}

function handleMovement(event) {
  switch (event.key) {
    case "ArrowUp":
      if (lastDirection.y !== 0) break;

      direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastDirection.y !== 0) break;

      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (lastDirection.x !== 0) break;

      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (lastDirection.x !== 0) break;

      direction = { x: 1, y: 0 };
      break;
  }
}
