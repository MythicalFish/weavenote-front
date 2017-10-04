export function relativePosition(anchor, size) {
  return {
    x: anchor.x / size.width,
    y: anchor.y / size.height,
  };
}

export function pixelPosition(anchor, size) {
  return {
    x: anchor.x * size.width,
    y: anchor.y * size.height,
  };
}

export function getPosition(event, canvasSize) {
  const { offsetX: x, offsetY: y } = event;
  return relativePosition({ x, y }, canvasSize);
}
