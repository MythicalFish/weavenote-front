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

export function anchorPoints(anchors, size) {
  const p = {
    lineAnchors: [],
    midpoint: { x: 0, y: 0 },
  };
  anchors.forEach((anchor) => {
    const pos = pixelPosition(anchor.toJS(), size);
    p.lineAnchors.push(pos.x);
    p.lineAnchors.push(pos.y);
    p.midpoint.x += pos.x;
    p.midpoint.y += pos.y;
  });
  if (anchors.size > 1) {
    p.midpoint.x /= 2;
    p.midpoint.y /= 2;
  }
  return p;
}
