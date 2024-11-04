export let gridSize = null;

export function setGridSize(gameBoard, size) {
  gridSize = size;

  gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

export function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > gridSize ||
    position.y < 1 ||
    position.y > gridSize
  );
}

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * gridSize) + 1,
    y: Math.floor(Math.random() * gridSize) + 1,
  };
}
