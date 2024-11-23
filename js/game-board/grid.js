export let gridSize = null;

export function setGridSize(area, size) {
  gridSize = size;

  area.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  area.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * gridSize) + 1,
    y: Math.floor(Math.random() * gridSize) + 1,
  };
}
