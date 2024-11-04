import { isGameOver, isGamePaused, pauseGame, resumeGame } from "./game.js";

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

export function enableInput() {
  window.addEventListener("keydown", handleInput);
}

export function disableInput({ clear = false } = {}) {
  window.removeEventListener("keydown", handleInput);

  if (clear) {
    inputDirection = { x: 0, y: 0 };
    lastInputDirection = { x: 0, y: 0 };
  }
}

export function getInputDirection() {
  lastInputDirection = inputDirection;

  return inputDirection;
}

function handleInput(event) {
  switch (event.key) {
    case "Escape":
      event.preventDefault();

      if (isGameOver) return;

      if (isGamePaused) {
        resumeGame();
      } else {
        pauseGame();
      }
      break;
    case "ArrowUp":
      if (lastInputDirection.y !== 0) break;

      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;

      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;

      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;

      inputDirection = { x: 1, y: 0 };
      break;
  }
}
