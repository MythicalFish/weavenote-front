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
