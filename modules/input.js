import { isGamePaused, pauseGame, resumeGame } from "./game.js";

const INITIAL_INPUT_DIRECTION = { x: 0, y: 0 };

let inputDirection = { ...INITIAL_INPUT_DIRECTION };
let lastInputDirection = { ...INITIAL_INPUT_DIRECTION };

export function enableInput() {
  window.addEventListener("keydown", handleInput);
}

export function disableInput() {
  window.removeEventListener("keydown", handleInput);
}

export function getInputDirection() {
  lastInputDirection = inputDirection;

  return inputDirection;
}

export function clearInputDirection() {
  inputDirection = { ...INITIAL_INPUT_DIRECTION };
  lastInputDirection = { ...INITIAL_INPUT_DIRECTION };
}

function handleInput(event) {
  switch (event.key) {
    case "Escape":
      event.preventDefault();

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
