export let gridSize = null;

export function setGridSize(area, size) {
  gridSize = size;

  area.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  area.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
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
